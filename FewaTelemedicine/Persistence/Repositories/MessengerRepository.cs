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
    public class MessengerRepository: IMessengerRepository
    {

        private ILoggerService _logger;
        private FewaDbContext FewaDbContext = null;
        private readonly IHttpContextAccessor accessor;
        private readonly IDoctorRepository _doctorRepository;
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
                var ServerName = FewaDbContext.ParametersModels.FirstOrDefault(a => a.ParameterGroupName == "Server").ParameterValue;
                var username = accessor.HttpContext.Session.GetString("Name");
                var doctor = _doctorRepository.GetDoctorByUserName(username);
                var imageURL = "https://source.unsplash.com/QAB-WJcbgJk/60x60";
                var HospitalName = paramHospital.Find(a => a.ParameterName == "Name").ParameterValue;
                var HospitalContact = paramHospital.Find(a => a.ParameterName == "ContactNumber").ParameterValue;
                //var doctor = FewaDbContext.DoctorsModels.FirstOrDefault(a => a.UserName == username);
                var apiKey = paramEmail.Find(a => a.ParameterName == "ApiKey").ParameterValue;
                if (doctor.Image != null)
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
                var newHtmlContent = "<body id='page-top'>"+
                                       "< div id = 'wrapper' >"+
                                        "< div id = 'content-wrapper' class='d-flex flex-column'>"+
                                            "<div id = 'content' >"+
                                             " < div class='container-fluid'>"+          
                                                "<div class='row m-w100'>"+
                                                  "<div class='col-md-4 col-sm-12 col-xs-12 m-auto'>"+
                                                    "<div class='card'>"+
                                                      "<div class='card-body'>"+
                                                        "<table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'>"+
                                                         " < tr >"+
                                                          "  < td >"+
                                                              "< img src='+ imageURL +' style='height: 80px;'>"+
                                                            "</td>"+
                                                         " </tr>"+
                                                          "<tr>"+
                                                            "<td>"+
                   
                                                             " <p style = 'margin-top: 5px; margin-bottom: 15px; font-size: 15px; font-weight: 600'>< span style='display: block;'>"+HospitalName+"</span></p>"+
                                                              "<span style = 'display: block; margin-top: 5px;' >Phone No."+ HospitalContact +"</span>"+
                                                            "</td>"+
                                                          "</tr>"+
                                                        "</table>"+
					                                    "<table style = 'font-family: Verdana; font-size: 13px; width: 100%;border-collapse: inherit !important;'>"+
                                                          "< tr style='border: 1px solid #fff; border-top: none'>"+
                                                            "<td style = 'padding: 8px; padding-top: 0' align='center'>This is <strong>"+ doctor.NameTitle +"&nbsp;&nbsp;"+ doctor.DoctorName +"</strong>.<br/> Please click on following button to join me for a secure video meeting"+

                                                              "</td>"+
                                                          "</tr>"+
                      
                                                        "</table>"+
                                                        "<table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;' >"+
  
                                                            "< tr >"+
  
                                                              "< td >"+
  
                                                            "< a href ='"+ServerName+"#/Join' style= 'text-decoration:none;' > < h5 style= 'font-weight: 600;font-size: 15px; background: #009688; padding: 15px; color: #fff;' > Invitation from Fewa Telemedicine</h5></a>"+
                                                            "</td>"+
                                                          "</tr>"+  
                                                        "</table>"+
                                                      "</div>"+
                                                    "</div>"+
                                                  "</div>"+
                                                "</div>"+
                                              "</div>"+
                                            "</div>"+
                                            "<footer class='sticky-footer bg-white'>"+
                                              "<div class='container my-auto'>"+
                                                "<div class='copyright text-center my-auto' style='position:absolute;left:41%'>"+
                                                  "<span >Powered by © Fewa Telehealth 2020 <a href = '"+ ServerName +"#/Join' style='text-decoration:none;'>"+
                                              "</div>" +
                                            "</footer>"+
                                          "</div>"+
                                        "</div>"+
                                      "</body>";
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
                const string accountSid = "ACd3214af8b133290431f4e58030ad6429"; // hardcoded
                const string authToken = "16ff3cb51a8cfbea333d4213476393ac"; // hardcoded

                TwilioClient.Init(accountSid, authToken);

                var messageResource = MessageResource.Create(
                    body: message,
                    from: new Twilio.Types.PhoneNumber("+13343423821"),  // hardcoded
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
