using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TestTele.Models;

namespace TestTele.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        DoctorCabin _doctorcabin = null;
        WaitingRoom _waitingroom = null;
        private int idletime = 0;
        public IConfiguration Configuration { get; }
        public IActionResult Index()
        {
            ViewData["HospitalName"] = Configuration["HospitalName"];
            return View();
        }
        public HomeController(ILogger<HomeController> logger,
        DoctorCabin doctorcabin, WaitingRoom waitingroom , IConfiguration configuration)
        {
            Configuration = configuration;
            _logger = logger;
            _doctorcabin = doctorcabin;
            _waitingroom = waitingroom;
            idletime = Convert.ToInt32(configuration["IdleTime"]);

        }
        
        public IActionResult GetDoctor()
        {
            return Json(_doctorcabin.Doctor);
        }
        public IActionResult CurrentPatients()
        {
            this.RemoveIdle();
            return Json(_waitingroom.Patients);
        }
        private void RemoveIdle()
        {
            var removepats = new List<Patient>();

            foreach (var t in _waitingroom.Patients)
            {
                var diffInSeconds = DateTime.Now.Subtract(t.LastUpdated).TotalSeconds;
                if (diffInSeconds > idletime)
                {
                    removepats.Add(t);
                }
            }
            foreach(var t in removepats)
            {
                _waitingroom.Patients.Remove(t);
            }
        }
        
        public IActionResult ShouldIGoOut([FromBody]Patient obj)
        {
            foreach (var t in _waitingroom.Patients)
            {
                if ((obj.PatientName == t.PatientName))
                {
                    t.LastUpdated = DateTime.Now;
                    if ((t.Status == -1))
                    {
                        return Ok(true);
                    }
                }
            }

            return Ok(false);

        }
        public IActionResult CanIComeIn([FromBody]Patient obj)
        {
            foreach (var t in _waitingroom.Patients)
            {
                if ((obj.PatientName == t.PatientName))
                {
                    t.LastUpdated = DateTime.Now;
                    if ((t.Status == 1))
                    {
                        return Ok(true);
                    }
                }
            }

            return Ok(false);

        }
        public IActionResult WaitingRoom()
        {
            return Json(_waitingroom);
        }
        public IActionResult LoginPatient([FromBody] Patient obj)
        {
            if (!(getPatientbyName(obj.PatientName) is  null))
            {
               return StatusCode(500,"Patient already logged in");
            }
            obj.LastUpdated =  DateTime.Now;
            _waitingroom.Patients.Add(obj);
            
            if (_waitingroom.Patients != null)
            {
                 if (_waitingroom.Patients.Count > 0)
                {
                    obj.PatientId = _waitingroom.Patients.Count;
                }
            }
            //obj.PatientId = _waitingroom.Patients.Count+1;
            return Ok(Json(obj));
        }
        public IActionResult LoginDoctor([FromBody] Doctor obj, [FromBody] string Password)
        {
            if (obj.Password == "test123")
            {
                _doctorcabin.Doctor = obj;
                return Ok(Json(obj));
            }
            else
            {
                return StatusCode(401);
            }

        }

        private Patient getPatientbyName(string PatName)
        {
            foreach (var t in _waitingroom.Patients)
            {
                if (PatName == t.PatientName)
                {
                    return t;
                }
            }
            return null;
        }
        public IActionResult WriteMedication([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(_doctorcabin.Patient.PatientName);
            if (p.Status == -1)
            {
                p.Medication = obj.Medication;
                return Ok(true);
            }
            else
            {
                return Ok(true);
            }
        }
        public IActionResult TakeFinalReport([FromBody]Patient p1)
        {
            Patient p = getPatientbyName(p1.PatientName);
            if (p is null) { return Ok(null); }
            if (p.Status == -1)
            {
                _waitingroom.Patients.Remove(p);
                return Ok(p);

            }
            else
            {
                return Ok(null);
            }
        }
        public IActionResult PatientAttended([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(obj.PatientName);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                _doctorcabin.Patient = new Patient();
                p.Status = -1;
                p.Medication = obj.Medication;
                return Ok(p);
            }
        }
        public IActionResult CallPatient([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(obj.PatientName);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                p.Status = 1;
                p.LastUpdated = DateTime.Now;
                _doctorcabin.Patient = p;
                return Ok(p);
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
