using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
using Microsoft.AspNetCore.Http;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace FewaTelemedicine.Persistence.Repositories
{
    public class MessengerRepository : IMessengerRepository
    {

        private ILoggerService _logger;
        private readonly IDoctorRepository _doctorRepository;
        private FewaDbContext FewaDbContext = null;
        private IHttpContextAccessor accessor;
        public MessengerRepository(ILoggerService logger, FewaDbContext fewaDbContext, IHttpContextAccessor HttpContextAccessor, IDoctorRepository doctorRepository)
        {
            _logger = logger;
            FewaDbContext = fewaDbContext;
            accessor = HttpContextAccessor;
            _doctorRepository = doctorRepository;
        }

        public async Task<bool> SendEmailAsync(string subject, string message, string receiverEmail)
        {
            var bResponse = false;
            try
            {
                List<ParametersModel> paramEmail = FewaDbContext.ParametersModels.Where(a => a.ParameterGroupName == "EmailAPI").ToList();
                List<ParametersModel> paramHospital = FewaDbContext.ParametersModels.Where(a => a.ParameterGroupName == "Hospital").ToList();
                var username = accessor.HttpContext.Session.GetString("Name");
                var doctor = _doctorRepository.GetDoctorByUserName(username);
                var imageURL = "https://source.unsplash.com/QAB-WJcbgJk/60x60";
                var HospitalName = paramHospital.Find(a => a.ParameterName == "Name").ParameterValue;
                var HospitalContact = paramHospital.Find(a => a.ParameterName == "ContactNumber").ParameterValue;
                //var doctor = FewaDbContext.DoctorsModels.FirstOrDefault(a => a.UserName == username);
                var apiKey = paramEmail.Find(a => a.ParameterName == "ApiKey").ParameterValue;
               if(doctor.Image != null)
                {
                    string base64Data = Convert.ToBase64String(doctor.Image);
                     imageURL = string.Format("data:image/png;base64,{0}", base64Data); 
                }
                var email = paramEmail.Find(a => a.ParameterName == "Email").ParameterValue;
                var name = paramEmail.Find(a => a.ParameterName == "Name").ParameterValue;
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress(email, name);
                var to = new EmailAddress(receiverEmail);
                var plainTextContent = paramEmail.Find(a => a.ParameterName == "EmailPlainBody").ParameterValue;
                var htmlContent = paramEmail.Find(a => a.ParameterName == "EmailHTMLBody").ParameterValue;
                var newHtmlContent = "<body id='page-top'><div id='wrapper'><!--Content Wrapper-->" +
                                     "<script>" +
                                     "document.getElementById('img').onError = function() { " +
                                     "var url2 = 'https://source.unsplash.com/QAB-WJcbgJk/60x60' ;" +
                                     "document.getElementById('img').setAttribute('src', url2);}" +
                                     //"(function(){ while(img = document.evaluate('//img[contains(@src, \'googleusercontent.com\')]'," +                                   
                                    //" document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue){ var src = img.attributes.src.value;" +
                                    //"src = src.substr(src.indexOf('#')+1);" +
                                    //" img.attributes.src.value = src; } })(); +
                                    "</script>" +
                                     "<div id='content-wrapper' class='d-flex flex-column'>" +
                                     "<!-- Main Content --><div id = 'content'><!-- Topbar -->" +
                                     "<nav class='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>" +
                                     "<!-- Sidebar Toggle(Topbar) -->" +
                                     //"<button id='sidebarToggleTop' class='btn btn-link d-md-none rounded-circle mr-3'>" +
                                     //"<i class='fa fa-bars'></i></button><!-- Topbar Navbar -->" +
                                     "<a class='sidebar-brand d-flex align-items-center justify-content-center' href='#'>" +
                                     "<div class='sidebar-brand-text mx-3'><img src='https://localhost:44304/./img/logo.png' alt='Fewa Telemedicine'></div></a>" +
                                     "<ul class='navbar-nav ml-auto'><div class='topbar-divider d-none d-sm-block'></div>" +
                                     "<!-- Nav Item - User Information --><li class='nav-item dropdown no-arrow'>" +
                                     "<a class='nav-link dropdown-toggle' href='#' id='userDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                     "<span class='mr-2 d-none d-lg-inline text-gray-600 small'>" + doctor.NameTitle + "&nbsp;&nbsp;"+  doctor.DoctorName + "</span>" +
                                     "<img class='img-profile rounded-circle' id='img'  style='height:60px;padding-left:5%;' " +
                                     " src='" + imageURL + "'>" +
                                     //"<img class='img-profile rounded-circle' src='https://source.unsplash.com/QAB-WJcbgJk/60x60' style='padding-left:5%;'></a>" +
                                     //"<!-- Dropdown - User Information --><div class='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>" +
                                     //"<a class='dropdown-item' href='#'><i class='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>Profile</a> " +
                                     //"<a class='dropdown-item' href='#'><i class='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>Settings </a>" +
                                     //"<a class='dropdown-item' href='#'><i class='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>Activity </a>" +
                                     //"<div class='dropdown-divider'></div>" +
                                     //"<a class='dropdown-item' href='#' data-toggle='modal' data-target='#logoutModal'>" +
                                     //"<i class='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i> Logout</a></div>" +
                                     "</li></ul></nav><!-- End of Topbar --><!-- Begin Page Content -->" +
                                     "<div class='container-fluid'><div class='row m-w100'><div class='col-md-4 col-sm-12 col-xs-12 m-auto'>" +
                                     "<div class='card'>" +
                                     "<div class='card-body'><!-- Report Printable Area --><style type = 'text/css' media='Print'>" +
                                     "table{font-family: 'Verdana';} @media Print{table{font - family: 'Verdana';}}</style>" +
                                     "<table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'><tr>" +
                                     "<td><img src = 'https://localhost:44304/img/logo.png' style='height: 80px;' alt='Fewa Telemedicine'></td></tr><tr><td><h4 style = 'margin-top: 15px; margin-bottom: 5px; font-weight: 800'>" +
                                     "<span style = 'display: block;margin-top:15px;font-size:16px;'>" + HospitalName + "</span></h4>" +
                                     "<p style = 'margin-top: 5px; margin-bottom: 15px; font-size: 15px; font-weight: 600'>" +
                                     "<span style = 'display: block;'>Hospital Address two</span></p>" +
                                     "<span style = 'display: block; margin-top: 5px;'>Phone No." + HospitalContact + ", Fax: **********</span>" +
                                     "</td></tr></table><table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'>" +
                                     "<tr><td><a href = 'https://localhost:44304/#/Join' style='text-decoration:none;'><h5 style='font-weight: 600;font-size: 15px;" +
                                     "background: #009688; padding: 15px; color: #fff;'>Invitation from Fewa Telemedicine" +
                                     "</h5></a></td></tr></table>" +
                                     "<table style = 'font-family: Verdana; font-size: 13px; width: 100%;border-collapse: inherit !important;'>" +
                                     "<tr style = 'border: 1px solid #fff; border-top: none'>" +
                                     "<td style='padding: 8px; padding-top: 0' align='center'>This is <strong>" + doctor.NameTitle + "&nbsp;&nbsp;" + doctor.DoctorName +
                                     "</strong>.<br/> Please click this link to join me for a secure video meeting - <br/>" +
                                     "<a href='https://localhost:44304/#/Join?MeetingId:" + doctor.MeetingId + " ' style='margin-top:15px'>" +
                                     /*"[queryParams]='{'MeetingId':this.global.doctorObj.MeetingId}' [state]=''>"*/  "link</a></td>" +
                                     "</tr> </table>" +
                                     "<!-- Report Printable area end -->" +
                                     "</div></div></div></div></div></div>" +
                                     "<footer class='sticky-footer bg-white'><div class='container my-auto'>" +
                                     "<div class='copyright text-center my-auto'>" +
                                     "<span class=''>Powered by © Fewa Telehealth 2020 <img src='https://localhost:44304/./img/logo-cap.png' alt='Fewa Telemedicine' style='height:50px' class='powered-footer-logo'></span>" +
                                     "</div></div></footer></div></div></body>";
                subject = paramEmail.Find(a => a.ParameterName == "EmailSubject").ParameterValue;
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, newHtmlContent);
                var res = await client.SendEmailAsync(msg);
                if (res.StatusCode == System.Net.HttpStatusCode.OK || res.StatusCode == System.Net.HttpStatusCode.Accepted)
                {
                    bResponse = true;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"file: MessengerController.cs method: SendEmailAsync() error: {ex.Message} ");
            }
            return bResponse;
        }

        public bool SendSMS(string message, string receiverContact)
        {
            try
            {
                // string[] parameters = { "AccountSID", "AuthToken", "PhoneNumber" };
                // List<string> paramsList = new List<string>(parameters);
                List<ParametersModel> result = FewaDbContext.ParametersModels.Where(a => a.ParameterGroupName == "SMSAPI").ToList();
                var accountSid = result.Find(a => a.ParameterName == "AccountSID").ParameterValue;
                var authToken = result.Find(a => a.ParameterName == "AuthToken").ParameterValue;
                var phone = result.Find(a => a.ParameterName == "PhoneNumber").ParameterValue;
                //const string accountSid = "ACd3214af8b133290431f4e58030ad6429"; // hardcoded
                //const string authToken = "16ff3cb51a8cfbea333d4213476393ac"; // hardcoded

                TwilioClient.Init(accountSid, authToken);

                var messageResource = MessageResource.Create(
                    body: message,
                    from: new Twilio.Types.PhoneNumber(phone),
                    //from: new Twilio.Types.PhoneNumber("+13343423821"),  // hardcoded
                    to: new Twilio.Types.PhoneNumber(receiverContact)
                );
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"file: MessengerRepository.cs method: SendSMS() error: {ex.Message} ");
                return false;
            }

        }
    }
}
