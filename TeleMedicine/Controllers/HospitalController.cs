using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel;
using TestTele.Models;

namespace TestTele.Controllers
{
    [Authorize]
    public class HospitalController : Controller
    {
        private readonly ILogger<HospitalController> _logger;
        List<DoctorCabin> _doctorcabins = null;
        WaitingRoom _waitingroom = null;
        List<Doctor> _doctors = null;
        private int idletime = 0;
        private readonly IHubContext<NotificationHub, INotificationHub> _notify;
        private readonly IConfiguration _config;

        public IConfiguration Configuration { get; }
        public IActionResult Index()
        {
            return View();
        }

        public HospitalController(ILogger<HospitalController> logger,
        List<DoctorCabin> doctorcabins, WaitingRoom waitingroom,
        IConfiguration configuration, List<Doctor> doctors,
        IHubContext<NotificationHub, INotificationHub> notify,
        IConfiguration config)
        {
            
            _doctors = doctors;
            Configuration = configuration;
            _logger = logger;
            _doctorcabins = doctorcabins;
            _waitingroom = waitingroom;
            idletime = Convert.ToInt32(configuration["IdleTime"]);
            _notify = notify;
            _config = config;
        }

        [AllowAnonymous]
        public IActionResult LoginPatient([FromBody] Patient obj)
        {
            // 
            
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
            //var dd = JsonSerializer.Serialize(_waitingroom.Patients);
            
            var token = GenerateJSONWebToken(obj.Name , "patient");
            var result = new
            {
                User = obj,
                Token = token
            };
            return Ok(Json(result));
        }
        public IActionResult WaitingRoom()
        {
            return Json(_waitingroom);
        }
        [AllowAnonymous]
        public IActionResult LoginDoctor([FromBody] Doctor obj, [FromBody] string Password)
        {
            if (CheckDoctor(obj.Name, obj.Password))
            {
                HttpContext.Session.SetString("Name", obj.Name);
                var token = GenerateJSONWebToken(obj.Name , "doctor");
                AddDoctorCabin(obj.Name);
                var result = new
                {
                    User = obj,
                    Token = token
                };
                return Ok(Json(result));
            }
            else
            {
                return StatusCode(401);
            }

        }
        public bool CheckDoctor(string name, string password)
        {
            foreach (var item in _doctors)
            {
                if (item.Name == name)
                {
                    if (item.Password == password)
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
                if (item.Doctor.Name == DoctorName)
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
        public IActionResult GetDoctorCabin()
        {
            return Json(getCurrentDoctorCabin());
        }
        private DoctorCabin getCurrentDoctorCabin()
        {
            foreach (var item in _doctorcabins)
            {
                if (item.Doctor.Name == HttpContext.Session.GetString("Name"))
                {
                    return item;
                }

            }
            return null;
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
                p.Status = (int)TeleConstants.PatientCalled;
                p.DoctorNameAttending = HttpContext.Session.GetString("Name");
               p.LastUpdated = DateTime.Now;
                getCurrentDoctorCabin().Patient = p;
              
                return Ok(p);
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
        public IActionResult CurrentPatients()
        {

            this.RemoveIdle();
           
            return Json(_waitingroom.Patients);
        }
        public IActionResult WriteMedication([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(getCurrentDoctorCabin().Patient.Name);
            if (p.Status == (int)TeleConstants.PatientCalled)
            {
                p.Medication = obj.Medication;
                p.Status = (int)TeleConstants.PatientCompleted;
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
            if (p.Status == (int)TeleConstants.PatientCompleted)
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
                p.Status = (int)TeleConstants.PatientCompleted;
                p.Medication = obj.Medication;
                _waitingroom.Patients.Remove(p);

               
                RemoveIdle();


                return Ok(p);
            }
        }
        private void RemoveIdle()
        {
            var removepats = new List<Patient>();

            foreach (var t in _waitingroom.Patients)
            {
                var diffInSeconds = DateTime.Now.Subtract(t.LastUpdated).TotalSeconds;
                t.TotalCheckupTime = diffInSeconds;
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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private string GenerateJSONWebToken(string username , string usertype)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("Issuer", _config["Jwt:Issuer"]),
                new Claim("UserType",usertype),
                new Claim(JwtRegisteredClaimNames.UniqueName, username)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
