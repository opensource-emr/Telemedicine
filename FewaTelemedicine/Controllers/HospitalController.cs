using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using FewaTelemedicine.Common;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
using FewaTelemedicine.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace FewaTelemedicine.Controllers
{
    public class HospitalController : Controller
    {
        private readonly ILogger<HospitalController> _logger;
        List<DoctorCabin> _doctorcabins = null;

        WaitingRoom _waitingroom = null;
        private readonly IPatientRepository _patientRepository;
        List<DoctorsModel> _doctorsmodels = null;
        private int idletime = 0;
        private readonly IHubContext<NotificationHub, INotificationHub> _notify;
        private readonly IConfiguration _config;
        private  FewaDbContext FewaDbContext = null;
        public IConfiguration Configuration { get; }

        public HospitalController(
            ILogger<HospitalController> logger,
            List<DoctorCabin> doctorcabins,
            WaitingRoom waitingroom,
            IConfiguration configuration,
            List<DoctorsModel> doctorsmodels,
            IHubContext<NotificationHub, INotificationHub> notify,
            IConfiguration config,IPatientRepository patientRepository,
            FewaDbContext  fewaDbContext)
        {
            FewaDbContext = fewaDbContext;
            _patientRepository = patientRepository;
            _doctorsmodels = doctorsmodels;
            Configuration = configuration;
            _logger = logger;
            _doctorcabins = doctorcabins;
            _waitingroom = waitingroom;
            idletime = Convert.ToInt32(configuration["IdleTime"]);
            _notify = notify;
            _config = config;
        }
        public IActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public IActionResult LoginPatient([FromBody] PatientsAttendedModel obj)
        {
            if (!(getPatientbyName(obj.PatientName) is null))
            {
                return StatusCode(500, "Patient already logged in");
            }
            obj.LastUpdated = DateTime.Now;
            _waitingroom.Patients.Add(obj);
           

            var token = GenerateJSONWebToken(obj.PatientName,"Patient");
            var result = new
            {
                User = obj,
                Token = token
            };
            return Ok(Json(result));
            // return Ok(Json(obj));
        }
        public IActionResult WaitingRoom()
        {
            return Json(_waitingroom);
        }
        [AllowAnonymous]
        //public IActionResult LoginDoctor([FromBody] DoctorsModel obj)
        //{
        //    //if (CheckDoctor(obj.Name, obj.Password))
        //    {
        //        HttpContext.Session.SetString("Name", obj.UserName);
        //        var token = GenerateJSONWebToken(obj.UserName,"Patient");
        //        AddDoctorCabin(obj.UserName);
        //        var result = new
        //        {
        //            User = obj,
        //            Token = token
        //        };
        //        return Ok(Json(result));
        //    }
        //    //else
        //    //{
        //    //    return StatusCode(401);
        //    //}

        //}
        public bool CheckDoctor(string name, string password)
        {
            foreach (var item in _doctorsmodels)
            {
                if (item.UserName == name)
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
                if (item.DoctorsModel.UserName == DoctorName)
                {
                    _doctorcabins.Remove(item);
                    _doctorcabins.Add(new DoctorCabin()
                    { DoctorsModel = new DoctorsModel() { UserName = DoctorName } });
                    return;
                }
            }
            _doctorcabins.Add(new DoctorCabin()
            { DoctorsModel = new DoctorsModel() { UserName = DoctorName } });

        }
        public List<PatientsAttendedModel> GetPatientsAttended()
        {
            var attendedPatients = (from temp in FewaDbContext.PatientsAttendedModels
                                    orderby temp.StartTime descending
                                    select temp
                                    ).ToList<PatientsAttendedModel>();
            return attendedPatients;
        }
        public IActionResult GetDoctorCabin()
        {
            return Json(getCurrentDoctorCabin());
        }
        private DoctorCabin getCurrentDoctorCabin()
        {
            foreach (var item in _doctorcabins)
            {
                if (item.DoctorsModel.UserName == HttpContext.Session.GetString("Name"))
                {
                    return item;
                }

            }
            return null;
        }
        public IActionResult CallPatient([FromBody]PatientsAttendedModel obj)
        {
            PatientsAttendedModel p = getPatientbyName(obj.PatientName);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                p.Status = (int)TeleConstants.PatientCalled;
                //p.DoctorNameAttending = HttpContext.Session.GetString("Name");
                p.LastUpdated = DateTime.Now;
                getCurrentDoctorCabin().PatientsAttendedModel = p;
                //var dd = JsonSerializer.Serialize(_waitingroom.PatientsAttendedModels);
                //_notify.Clients.All.BroadcastMessage("PatientLoggedIn", dd);
                //var patient = JsonSerializer.Serialize(p);
                //_notify.Clients.All.BroadcastMessage("CallPatient", patient);
                return Ok(p);
            }
        }
        private PatientsAttendedModel getPatientbyName(string PatName)
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
        public IActionResult CurrentPatients()
        {

            this.RemoveIdle();
            //var dd = JsonSerializer.Serialize(_waitingroom.PatientsAttendedModels);
            //_notify.Clients.All.BroadcastMessage("PatientLoggedIn", dd);
            return Json(_waitingroom.Patients);
        }
        public IActionResult WriteMedication([FromBody]PatientsAttendedModel obj)
        {
            PatientsAttendedModel p = getPatientbyName(getCurrentDoctorCabin().PatientsAttendedModel.PatientName);
            if (p.Status == (int)TeleConstants.PatientCalled)
            {
                p.Status = (int)TeleConstants.PatientCompleted;
                p.LabOrdersSent = obj.LabOrdersSent;
                p.NewPrescriptionsSentToYourPharmacy = obj.NewPrescriptionsSentToYourPharmacy;
                p.NewPrescriptionsMailedToYou = obj.NewPrescriptionsMailedToYou;
                p.Medication = obj.Medication;
                p.FollowUpNumber = obj.FollowUpNumber;
                p.FollowUpMeasure = obj.FollowUpMeasure;
                p.Status = (int)TeleConstants.PatientCompleted;
                return Ok(true); 
            }
            else
            {
                return Ok(true);
            }
        }
        public IActionResult TakeFinalReport([FromBody]PatientsAttendedModel p1)
        {
            PatientsAttendedModel p = getPatientbyName(p1.PatientName);
            if (p is null) { return Ok(null); }
            if (p.Status == (int)TeleConstants.PatientCompleted)
            {
                var patient = JsonSerializer.Serialize(p);

                //_notify.Clients.All.BroadcastMessage("PatientCompleted", patient);
                //_waitingroom.PatientsAttendedModels.Remove(p);

                return Ok(p);
            }
            else
            {
                return Ok(null);
            }
        }
        public IActionResult PatientAttended([FromBody]PatientsAttendedModel obj)
        {
            PatientsAttendedModel p = getPatientbyName(obj.PatientName);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                getCurrentDoctorCabin().PatientsAttendedModel = new PatientsAttendedModel();
                p.Status = (int)TeleConstants.PatientCompleted;
                p.LabOrdersSent = obj.LabOrdersSent;
                p.NewPrescriptionsSentToYourPharmacy = obj.NewPrescriptionsSentToYourPharmacy;
                p.NewPrescriptionsMailedToYou = obj.NewPrescriptionsMailedToYou;
                p.Medication = obj.Medication;
                p.FollowUpNumber = obj.FollowUpNumber;
                p.FollowUpMeasure = obj.FollowUpMeasure;                
                _waitingroom.Patients.Remove(p);

                //var dd = JsonSerializer.Serialize(_waitingroom.PatientsAttendedModels);
                //_notify.Clients.All.BroadcastMessage("PatientLoggedIn", dd);

                //var patient = JsonSerializer.Serialize(p);
                //_notify.Clients.All.BroadcastMessage("PatientCompleted", patient);
                RemoveIdle();


                return Ok(p);
            }
        }
        private void RemoveIdle()
        {
            var removepats = new List<PatientsAttendedModel>();

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
                _waitingroom.Patients   .Remove(t);
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private string GenerateJSONWebToken(string username, string usertype)
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