
#region Hospital Controller Description 
/* This file contains Definition of  Methods for Login Patient, Get and Add Waiting Room,Doctor Cabin,Updated Doctor,
 * ProfileUpdate and Update Parameter.
 */
#endregion
#region Log History
/* #39 6/9/2020 - Bhavana => Added Email Template Changes in Get Updated Doctor.
*  #40 6/9/2020 - Bhavana => Updated  Added Upload Option to update for Doctor Logo.
 */
#endregion 
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.InteropServices.WindowsRuntime;
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
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace FewaTelemedicine.Controllers
{
    public class HospitalController : Controller
    {
        private readonly ILogger<HospitalController> _logger;
        private readonly IProviderRepository _providerRepository;
        List<ProviderCabin> _providerCabins = null;

        WaitingRoom _waitingroom = null;
        private readonly IPatientRepository _patientRepository;
        List<Provider> _providers = null;
        private int idletime = 0;
        private readonly IHubContext<NotificationHub,
            INotificationHub> _notify;
        private readonly IConfiguration _config;
        private IWebHostEnvironment _hostingEnvironment;
        private  FewaDbContext FewaDbContext = null;
        public IConfiguration Configuration { get; }

        public HospitalController(
            ILogger<HospitalController> logger,
            List<ProviderCabin> providerCabins,
            WaitingRoom waitingroom,
            IConfiguration configuration,
            List<Provider> providers,
            IHubContext<NotificationHub,
                INotificationHub> notify,
            IConfiguration config,
            IPatientRepository patientRepository,
            IProviderRepository providerRepository,
            IWebHostEnvironment hostEnvironment,
            FewaDbContext  fewaDbContext)
            {
                FewaDbContext = fewaDbContext;
                _patientRepository = patientRepository;
                _providers = providers;
                Configuration = configuration;
                _logger = logger;
                _providerCabins = providerCabins;
                _waitingroom = waitingroom;
                _providerRepository = providerRepository;
                idletime = Convert.ToInt32(configuration["IdleTime"]);
                _notify = notify;
                _config = config;
                _hostingEnvironment= hostEnvironment;
            }
            public IActionResult Index()
            {
                return View();
            }
       
        [AllowAnonymous]
        public IActionResult LoginPatient([FromBody] Patient obj)
        {
            if (!(getPatientbyName(obj.name) is null))
            {
                return StatusCode(500, "Patient already logged in");
            }
            obj.lastUpdated = DateTime.Now;

            _waitingroom.patients.Add(obj);
           

            var token = GenerateJSONWebToken(obj.name,"Patient");
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
       
        public bool CheckProvider(string name, string password)
        {
            foreach (var item in _providers)
            {
                if (item.userName == name)
                {
                    if (item.password == password)
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
        private void AddProviderCabin(string name)
        {
            foreach (var item in _providerCabins)
            {
                if (item.provider.userName == name)
                {
                    _providerCabins.Remove(item);
                    _providerCabins.Add(new ProviderCabin()
                    { provider = new Provider() { userName = name } });
                    return;
                }
            }
            _providerCabins.Add(new ProviderCabin()
            { provider = new Provider() { userName = name } });

        }
        public List<Patient> GetPatientsAttended()
        {
            var attendedPatients = (from temp in FewaDbContext.patients
                                    orderby temp.startTime descending
                                    select temp
                                    ).ToList<Patient>();
            return attendedPatients;
        }

        //public IActionResult GetUpdatedDoctor(string username)
        //{

        //    var parameter = FewaDbContext.ParametersModels.ToList();
        //    var doctor = (from temp in FewaDbContext.DoctorsModels
        //                         where temp.UserName == username
        //                         select temp).FirstOrDefault();
        //    doctor.DoctorRoomName = doctor.DoctorRoomName.Replace("DoctorName", doctor.UserName);
        //    var TodaysDate = DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
        //    var ServerName = parameter.Find(a => a.ParameterGroupName == "Server").ParameterValue;
        //    var LogoPath = parameter.Find(a => a.ParameterGroupName == "Hospital" && a.ParameterName == "LogoPath").ParameterValue;
        //    var HospitalName = parameter.Find(a => a.ParameterName == "Name").ParameterValue;
        //    var htmlContent = parameter.Find(a => a.ParameterGroupName == "EmailAPI" && a.ParameterName == "EmailHTMLBody").ParameterValue;
        //    htmlContent = htmlContent.Replace("{ImageUrl}", ServerName + LogoPath);
        //    htmlContent = htmlContent.Replace("{Join}", ServerName + "#/Join?DoctorName=" + doctor.DoctorId);
        //    htmlContent = htmlContent.Replace("DoctorNameTitle", doctor.NameTitle);
        //    htmlContent = htmlContent.Replace("DoctorName", doctor.DoctorName);
        //    htmlContent = htmlContent.Replace("HospitalName", HospitalName);
        //    htmlContent = htmlContent.Replace("TodaysDate", TodaysDate);
        //    doctor.Password = Cipher.Decrypt(doctor.Password, doctor.UserName);
        //    var data = new
        //    {
        //        User = doctor,
        //        Parameter = parameter,
        //        EmailHTMLBody = htmlContent
        //    };
        //    return Ok(data);
        //}
        public IActionResult GetProviderCabin()
        {
            return Json(getCurrentProviderCabin());
        }
        private ProviderCabin getCurrentProviderCabin()
        {
            foreach (var item in _providerCabins)
            {
                if (item.provider.userName == HttpContext.Session.GetString("Name"))
                {
                    return item;
                }

            }
            return null;
        }
        public IActionResult CallPatient([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(obj.name);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                p.status = (int)TeleConstants.PatientCalled;
                //p.DoctorNameAttending = HttpContext.Session.GetString("Name");
                p.lastUpdated = DateTime.Now;
                getCurrentProviderCabin().patient = p;
                //var dd = JsonSerializer.Serialize(_waitingroom.PatientsAttendedModels);
                //_notify.Clients.All.BroadcastMessage("PatientLoggedIn", dd);
                //var patient = JsonSerializer.Serialize(p);
                //_notify.Clients.All.BroadcastMessage("CallPatient", patient);
                return Ok(p);
            }
        }
        private Patient getPatientbyName(string PatName)
        {
            foreach (var t in _waitingroom.patients)
            {
                if (PatName == t.name)
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
            return Json(_waitingroom.patients);
        }
        public IActionResult WriteMedication([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(getCurrentProviderCabin().patient.name);
            if (p.status == (int)TeleConstants.PatientCalled)
            {
                p.status = (int)TeleConstants.PatientCompleted;
                p.labOrdersSent = obj.labOrdersSent;
                p.newPrescriptionsSentToYourPharmacy = obj.newPrescriptionsSentToYourPharmacy;
                p.newPrescriptionsMailedToYou = obj.newPrescriptionsMailedToYou;
                p.medication = obj.medication;
                p.followUpNumber = obj.followUpNumber;
                p.followUpMeasure = obj.followUpMeasure;
                p.status = (int)TeleConstants.PatientCompleted;
                return Ok(true); 
            }
            else
            {
                return Ok(true);
            }
        }
        public IActionResult TakeFinalReport([FromBody]Patient p1)
        {
            Patient p = getPatientbyName(p1.name);
            if (p is null) { return Ok(null); }
            if (p.status == (int)TeleConstants.PatientCompleted)
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
        public IActionResult Patient([FromBody]Patient obj)
        {
            Patient p = getPatientbyName(obj.name);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                getCurrentProviderCabin().patient = new Patient();
                p.status = (int)TeleConstants.PatientCompleted;
                p.labOrdersSent = obj.labOrdersSent;
                p.newPrescriptionsSentToYourPharmacy = obj.newPrescriptionsSentToYourPharmacy;
                p.newPrescriptionsMailedToYou = obj.newPrescriptionsMailedToYou;
                p.medication = obj.medication;
                p.followUpNumber = obj.followUpNumber;
                p.followUpMeasure = obj.followUpMeasure;                
                _waitingroom.patients.Remove(p);

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
            var removepats = new List<Patient>();

            foreach (var t in _waitingroom.patients)
            {
                var diffInSeconds = DateTime.Now.Subtract(t.lastUpdated)
                    .TotalSeconds;
                t.totalCheckupTime = diffInSeconds;
                if (diffInSeconds > idletime)
                {
                    removepats.Add(t);
                }
            }
            foreach (var t in removepats)
            {
                _waitingroom.patients.Remove(t);
            }
        }

        public IActionResult UpdateProfile([FromBody] Provider obj)
        {
            var provider = _providerRepository.getProviderByUserName(obj.userName);
            if (provider is null)
            {
                return StatusCode(500);
            }
            else
            {
                provider.nameTitle = obj.nameTitle;
                provider.name = obj.name;
                provider.email = obj.email;
                provider.mobileNumber = obj.mobileNumber;
                provider.designation = obj.designation;
                provider.medicalDegree = obj.medicalDegree;
                //doc.Password = Cipher.Decrypt(doc.Password, doc.UserName);
                if (obj.image != null)
                    provider.image = obj.image;
            }
            FewaDbContext.providers.Update(provider);
            FewaDbContext.SaveChanges();
            return Ok(provider);
        }
        public IActionResult UploadHospitalLogo()
        {
            string logoPath = null;
            var file = Request.Form.Files[0];
            if (file != null)
            {
                string folderName = "img";
                string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, folderName);
                logoPath = Path.Combine(folderName, file.FileName);
                string filePath = Path.Combine(uploadsFolder, file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
            }
            return Ok(logoPath);
        }

        public  IActionResult UploadProfileImage()
        {
            try
            {
                string username = HttpContext.Session.GetString("Name");
                //var user = JsonSerializer.Deserialize<DoctorsModel>(Request.Form["user"].ToString());               
                var file = Request.Form.Files[0];
                var provider = _providerRepository.getProviderByUserName(username);
                if (provider is null)
                {
                    return StatusCode(500);
                }

                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);

                    // Upload the file if less than 2 MB
                    if (memoryStream.Length < 2097152)
                    {
                        provider.image = memoryStream.ToArray();
                        //_fewaDbContext.DoctorsModels.Update(doc);
                        //await _fewaDbContext.SaveChangesAsync();
                    }
                    else
                    {
                        ModelState.AddModelError("File", "The file is too large.");
                    }
                    return Ok(provider.image);
                }
            }
            catch (System.Exception ex)
            {
                return Ok("Upload Failed: " + ex.Message);
            }
        }

        public IActionResult GetProfileImage()
        {
            try
            {
                string username = HttpContext.Session.GetString("Name");
                var provider = _providerRepository.getProviderByUserName(username);
                if (provider.image != null)
                {
                    return Ok(provider.image);
                }
                return Ok(provider.image);
            }
            catch(Exception ex)
            {
                return Ok("Unable to fetch Image " + ex.Message);
            }
            
        }
        public IActionResult AddNewProvider([FromBody]Provider obj)
        {
            try
            { 
               
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return Ok("Unsucessfull" + ex.Message);
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