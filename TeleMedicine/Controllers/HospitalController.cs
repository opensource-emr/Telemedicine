using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TestTele.Models;

namespace TestTele.Controllers
{
    public class HospitalController : Controller
    {
        private readonly ILogger<HospitalController> _logger;
        List<DoctorCabin> _doctorcabins = null;
        WaitingRoom _waitingroom = null;
        List<Doctor> _doctors = null;
        private int idletime = 0;

        public IConfiguration Configuration { get; }
        public IActionResult Index()
        {
            return View();
        }

        public HospitalController(ILogger<HospitalController> logger,
        List<DoctorCabin> doctorcabins, WaitingRoom waitingroom , 
        IConfiguration configuration , List<Doctor> doctors)
        {
            _doctors = doctors;
            Configuration = configuration;
            _logger = logger;
            _doctorcabins = doctorcabins;
            _waitingroom = waitingroom;
            idletime = Convert.ToInt32(configuration["IdleTime"]);
        }
        private DoctorCabin getCurrentDoctorCabin()
        {
            foreach (var item in _doctorcabins)
            {
                if(item.Doctor.Name == HttpContext.Session.GetString("Name"))
                {
                    return item;
                }

            }
            return null;
        }

        public IActionResult GetDoctorCabin()
        {
            return Json(getCurrentDoctorCabin());
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
            foreach (var t in removepats)
            {
                _waitingroom.Patients.Remove(t);
            }
        }

        public IActionResult ShouldIGoOut([FromBody]Patient obj)
        {
            foreach (var t in _waitingroom.Patients)
            {
                if ((obj.Name == t.Name))
                {
                    t.LastUpdated = DateTime.Now;
                    if ((t.Status ==(int) TeleConstants.PatientAttended))
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
            if (!(getPatientbyName(obj.Name) is null))
            {
                return StatusCode(500, "Patient already logged in");
            }
            obj.LastUpdated = DateTime.Now;
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
        public bool CheckDoctor(string name , string password)
        {
            foreach (var item in _doctors)
            {
                if(item.Name == name)
                {
                    if(item.Password == password)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }
        private void AddDoctorCabin(string DoctorName)
        {
            foreach (var item in _doctorcabins)
            {
                if(item.Doctor.Name == DoctorName)
                {
                    _doctorcabins.Remove(item);
                    _doctorcabins.Add(new DoctorCabin()
                    { Doctor = new Doctor() { Name = DoctorName } });
                    return;
                }
            }
            _doctorcabins.Add(new DoctorCabin()
            { Doctor = new Doctor() { Name = DoctorName } });

        }
        public IActionResult LoginDoctor([FromBody] Doctor obj, [FromBody] string Password)
        {
            if (CheckDoctor(obj.Name,obj.Password))
            {
                HttpContext.Session.SetString("Name",obj.Name);
                AddDoctorCabin(obj.Name);
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
                if (PatName == t.Name)
                {
                    return t;
                }
            }
            return null;
        }

        public IActionResult WriteMedication([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(getCurrentDoctorCabin().Patient.Name);
            if (p.Status ==(int)TeleConstants.DoctorAttending)
            {
                p.Medication = obj.Medication;
                p.Status = (int)TeleConstants.PatientAttended;
                return Ok(true);
            }
            else
            {
                return Ok(true);
            }
        }
        public IActionResult TakeFinalReport([FromBody]Patient p1)
        {
            Patient p = getPatientbyName(p1.Name);
            if (p is null) { return Ok(null); }
            if (p.Status == (int)TeleConstants.PatientAttended)
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
            Patient p = getPatientbyName(obj.Name);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                getCurrentDoctorCabin().Patient = new Patient();
                p.Status = (int)TeleConstants.PatientAttended;
                p.Medication = obj.Medication;
                return Ok(p);
            }
        }
        public IActionResult CallPatient([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(obj.Name);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                p.Status = (int)TeleConstants.DoctorAttending;
                p.DoctorNameAttending = HttpContext.Session.GetString("Name");
                p.LastUpdated = DateTime.Now;
                getCurrentDoctorCabin().Patient = p;
                return Ok(p);
            }
        }
        public IActionResult CanIComeIn([FromBody]Patient obj)
        {
            foreach (var t in _waitingroom.Patients)
            {
                if ((obj.Name == t.Name))
                {
                    t.LastUpdated = DateTime.Now;
                    if ((t.Status == (int)TeleConstants.DoctorAttending))
                    {
                            return Ok(t);
                    }
                }
            }

            return Ok(false);

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
