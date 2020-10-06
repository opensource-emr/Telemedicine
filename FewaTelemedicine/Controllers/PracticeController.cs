
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
    public class PracticeController : Controller
    {
        private readonly ILogger<PracticeController> _logger;
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

        public PracticeController(
            ILogger<PracticeController> logger,
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
        public IActionResult GetPracticeConfiguration()
        {
            try
            {
                List<Practice> result = FewaDbContext.practices.ToList();
                return Ok(Json(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }

        }
        [AllowAnonymous]
        public IActionResult LoginPatient([FromBody] Patient obj)
        {
            if (!(GetPatientbyName(obj.name) is null))
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

        public IActionResult GetUpdatedProvider(string username)
        {

            var configuration = FewaDbContext.practices.ToList();
            var provider = (from temp in FewaDbContext.providers
                            where temp.userName == username
                            select temp).FirstOrDefault();
            var data = new
            {
                User = provider,
                Configuration = configuration
            };
            return Ok(data);
        }
        public IActionResult GetProviderCabin()
        {
            return Json(GetCurrentProviderCabin());
        }
        private ProviderCabin GetCurrentProviderCabin()
        {
            foreach (var item in _providerCabins)
            {
                if (item.provider.userName == HttpContext.Session.GetString("name"))
                {
                    return item;
                }

            }
            return null;
        }
        public IActionResult CallPatient([FromBody]Patient obj)
        {
            Patient p = GetPatientbyName(obj.name);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                p.status = (int)TeleConstants.PatientCalled;
                //p.DoctorNameAttending = HttpContext.Session.GetString("Name");
                p.lastUpdated = DateTime.Now;
                GetCurrentProviderCabin().patient = p;
                //var dd = JsonSerializer.Serialize(_waitingroom.PatientsAttendedModels);
                //_notify.Clients.All.BroadcastMessage("PatientLoggedIn", dd);
                //var patient = JsonSerializer.Serialize(p);
                //_notify.Clients.All.BroadcastMessage("CallPatient", patient);
                return Ok(p);
            }
        }
        private Patient GetPatientbyName(string PatName)
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
            Patient p = GetPatientbyName(GetCurrentProviderCabin().patient.name);
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
            Patient p = GetPatientbyName(p1.name);
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
        public IActionResult PatientAttended([FromBody]Patient obj)
        {
            Patient p = GetPatientbyName(obj.name);
            if (p is null)
            {
                return StatusCode(500);
            }
            else
            {
                GetCurrentProviderCabin().patient = new Patient();
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
        public IActionResult UpdatePracticeConfiguration([FromBody] Practice obj)
        {
            if (obj is null)
            {
                return StatusCode(500);
            }
            FewaDbContext.practices.Update(obj);
            FewaDbContext.SaveChanges();
            return Ok(obj);
        }
        public IActionResult UploadPracticeLogo()
        {
            string logoPath = null;
            var file = Request.Form.Files[0];
            if (file != null)
            {
                string folderName = "img";
                string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, folderName);
                //logoPath = Path.Combine(folderName, file.FileName);
                logoPath = '/'+folderName+'/' + file.FileName;
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
                string username = HttpContext.Session.GetString("name");
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
                string username = HttpContext.Session.GetString("name");
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
       

         public IActionResult PreviewEmailTemplate([FromBody] Practice list)
        {
            if (ModelState.IsValid)
            {
                var newEmailContent = list.emailAdditionalContent;           
                var oldEmailContent = FewaDbContext.practices.Select(a => a.emailAdditionalContent).FirstOrDefault();
                var htmlContent = FewaDbContext.practices.Select(a => a.emailHtmlBody).FirstOrDefault();      
                    if (!(string.IsNullOrEmpty(oldEmailContent)) && htmlContent.Contains(oldEmailContent))
                    {
                        htmlContent = htmlContent.Replace(oldEmailContent, newEmailContent);
                    }                  
                    else if (htmlContent.Contains("EmailAdditionalContent"))
                    {
                        htmlContent = htmlContent.Replace("EmailAdditionalContent", newEmailContent);
                    }                       
                  
                var data = new
                {
                    EmailHTMLBody = htmlContent,
                    PreviewEmailContent = newEmailContent
                };

                
                return Ok(data);
            }
            else
            {
                return Ok("Cannot Load Preview.");
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