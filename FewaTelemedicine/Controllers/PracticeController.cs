

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
using System.Runtime.InteropServices;
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
        private readonly IHttpContextAccessor accessor;
        WaitingRoom _waitingroom = null;
        private readonly IPatientRepository _patientRepository;
        List<Provider> _providers = null;
        private int idletime = 0;
        private readonly IHubContext<NotificationHub,
            INotificationHub> _notify;
        private readonly IConfiguration _config;
        private IWebHostEnvironment _hostingEnvironment;
        private FewaDbContext FewaDbContext = null;
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
            FewaDbContext fewaDbContext,
            IHttpContextAccessor HttpContextAccessor)
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
            accessor = HttpContextAccessor;
            _hostingEnvironment = hostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetPracticeConfiguration(string practice)
        {
            try
            {
                if (!string.IsNullOrEmpty(practice))
                {
                    return Ok(FewaDbContext.practices.Where(a => a.url == practice).FirstOrDefault());
                }
                List<Practice> result = FewaDbContext.practices.ToList();
                return Ok(result);
            }
            catch (Exception)
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


            var token = GenerateJSONWebToken(obj.name, "Patient");
            var result = new
            {
                User = obj,
                Token = token
            };
            return Ok(result);
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

        public List<Patient> GetPatientsAttended(string provider,[Optional] string searchString)
        {
            var attendedPatients = new List<Patient>();
            //Add Optional paramter if value is in parameter then filter.
            // Else no filter.
            // if no search text then today's all records and if no today's records
            // then top 10 records.
            // if value in search text then  return values matching with search text.
            if (string.IsNullOrEmpty(searchString)|| string.IsNullOrEmpty(provider))
            {
                DateTime startDateTime = DateTime.Today; //Today at 00:00:00
                DateTime endDateTime = DateTime.Today.AddDays(1).AddTicks(-1); //Today at 23:59:59
                /* Display Today's Records */
                attendedPatients = (from temp in FewaDbContext.patients
                                    where (temp.appointmentDate >= startDateTime && temp.appointmentDate <= endDateTime&&temp.url==provider)
                                    orderby temp.startTime descending
                                    select temp
                                   ).ToList<Patient>();
                /*Display  Previous Records  if no today's records */
                if (attendedPatients.Count <= 0)
                {
                    attendedPatients = (from temp in FewaDbContext.patients
                                        where(temp.url==provider)
                                        orderby temp.startTime, temp.appointmentDate descending
                                        select temp
                                  ).OrderByDescending(a => a.startTime).Take(10).ToList<Patient>();

                }
            }
            else if (!string.IsNullOrEmpty(searchString)|| !string.IsNullOrEmpty(provider))
            {
                /* Display Records Matching With SearchString */
                attendedPatients = (from temp in FewaDbContext.patients
                                    where
                                    (
                                    temp.appointmentDate.Month.ToString().Contains(searchString) ||
                                    temp.appointmentDate.Date.ToString().Contains(searchString) ||
                                    temp.appointmentDate.Year.ToString().Contains(searchString))
                                    orderby temp.appointmentDate descending
                                    select temp).Take(10).AsEnumerable().ToList<Patient>();
            }

            return attendedPatients;
        }

        public IActionResult GetUpdatedProvider(string username)
        {
            if (string.IsNullOrEmpty(username) || username == "undefined")
            { return BadRequest(); }

            var configuration = FewaDbContext.practices.ToList();
            var provider = (from temp in FewaDbContext.providers
                            where temp.userName == username || temp.url == username
                            select temp).FirstOrDefault();
            provider.roomName = provider.roomName.Replace("name", provider.userName);
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
        public IActionResult CallPatient([FromBody] Patient obj)
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
        public IActionResult WriteMedication([FromBody] Patient obj)
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
        public IActionResult TakeFinalReport([FromBody] Patient p1)
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
        public IActionResult PatientAttended([FromBody] Patient obj)
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
                p.endTime = DateTime.Now;
                p.medication = obj.medication;
                p.followUpNumber = obj.followUpNumber;
                p.followUpMeasure = obj.followUpMeasure;
                p.url = obj.url;
                p.advice = obj.advice;
                FewaDbContext.patients.Add(p);
                FewaDbContext.SaveChanges();
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
        public IActionResult UpdateProfile([FromForm] Provider obj)
        {
            if (obj == null)
            {
                return BadRequest();
            }
            var files = Request.Form.Files;
            if (files.Count > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    files[0].CopyTo(memoryStream);

                    // Upload the file if less than 2 MB
                    if (memoryStream.Length < 2097152)
                    {
                        var arr = memoryStream.ToArray();
                        obj.image = "data:image/"
                            + Path.GetExtension(files[0].FileName).Replace(".", "")
                            + ";base64,"
                            + Convert.ToBase64String(arr);
                    }
                    else
                    {
                        ModelState.AddModelError("File", "The file is too large.");
                    }
                }
            }
            var provider = _providerRepository.getProviderByUserName(obj.practice,obj.userName);
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
                logoPath = '/' + folderName + '/' + file.FileName;
                string filePath = Path.Combine(uploadsFolder, file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
            }
            return Ok(logoPath);
        }
        public IActionResult PreviewEmailTemplate([FromBody] Practice list)
        {
            if (ModelState.IsValid)
            {
                if (list == null)
                {
                    return BadRequest();
                }
                // var oldEmail = "";
                var username = accessor.HttpContext.Session.GetString("name");
                var provider = _providerRepository.getProviderByUserName(list.name,username);
                var newEmailContent = list.emailAdditionalContent;
                var oldEmailContent = FewaDbContext.practices.Select(a => a.emailAdditionalContent).FirstOrDefault();
                var htmlContent = FewaDbContext.practices.Select(a => a.emailHtmlBody).FirstOrDefault();
                htmlContent = htmlContent.Replace("{imageUrl}", list.serverName + list.logoPath);             
                htmlContent = htmlContent.Replace("{join}", list.serverName + "/" + provider.practice + "/" + provider.url + "/#/patient/intro");
                htmlContent = htmlContent.Replace("{serverName}", list.serverName);
                htmlContent = htmlContent.Replace("providerNameTitle", provider.nameTitle);
                if (!(string.IsNullOrEmpty(provider.name)))
                    htmlContent = htmlContent.Replace("providerName", provider.name);
                if (string.IsNullOrEmpty(provider.name))
                    htmlContent = htmlContent.Replace("providerName", provider.userName);
                htmlContent = htmlContent.Replace("practiceName", list.name);
                /* if (string.IsNullOrEmpty(oldEmailContent))
                 {
                     oldEmail = oldEmailContent;
                     oldEmailContent = "old";
                 } */
                if (!string.IsNullOrEmpty(oldEmailContent) && htmlContent.Contains(oldEmailContent) && !string.IsNullOrEmpty(newEmailContent))
                {
                    htmlContent = htmlContent.Replace(oldEmailContent, newEmailContent);
                }
                else if (htmlContent.Contains("EmailAdditionalContent") && !string.IsNullOrEmpty(newEmailContent))
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

        public IActionResult GetAllAdvice()
        {
            try
            {
                List<ProviderAdvice> getAllAdvice = FewaDbContext.advice.ToList();
                if (getAllAdvice.Count > 0)
                {
                    return Ok(getAllAdvice);
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return Ok("Error In Retrieving Records" + ex.Message);
            }
        }
        public IActionResult SaveAdvice([FromBody] List<ProviderAdvice> adviceList)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (adviceList == null)
                    {
                        return BadRequest();
                    }
                    foreach (var i in adviceList)
                    {
                        if (i.adviceId > 0)
                        {
                            FewaDbContext.advice.Update(i);
                        }
                        else
                        {
                            FewaDbContext.advice.Add(i);
                        }


                        FewaDbContext.SaveChanges();
                    }
                    return Ok();
                }
                catch (Exception ex)
                {
                    return Ok("Error Adding New Advice: " + ex.Message);
                }
            }
            else
            {
                return Ok("Unable to Save Advice.");
            }
        }
        public IActionResult DeleteAdvice(int id)
        {
            ProviderAdvice removeAdvice = FewaDbContext.advice.Find(id);
            if (removeAdvice == null)
            {
                return NotFound();
            }
            FewaDbContext.advice.Remove(removeAdvice);
            FewaDbContext.SaveChanges();
            return Ok(removeAdvice);
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