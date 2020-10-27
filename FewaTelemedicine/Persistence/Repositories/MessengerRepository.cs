using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Storage;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using System.Web;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace FewaTelemedicine.Persistence.Repositories
{
    public class MessengerRepository : IMessengerRepository
    {

        private ILoggerService _logger;
        private FewaDbContext FewaDbContext = null;
        private readonly IHttpContextAccessor accessor;
        private readonly IProviderRepository _providerRepository;
        public MessengerRepository(ILoggerService logger, FewaDbContext fewaDbContext, IHttpContextAccessor HttpContextAccessor, IProviderRepository providerRepository)
        {
            _logger = logger;
            FewaDbContext = fewaDbContext;
            accessor = HttpContextAccessor;
            _providerRepository = providerRepository;
        }

        public async Task<bool> SendEmailAsync(string receiverEmail)
        {
            var bResponse = false;
            try
            {
                var pra = accessor.HttpContext.Session.GetString("practice");
                var username = accessor.HttpContext.Session.GetString("name");
                Practice practice = FewaDbContext.practices.Where(a => a.url == pra).FirstOrDefault();
                var provider = _providerRepository.getProviderByUserName(username);
                var TodaysDate = DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
                var client = new SendGridClient(practice.emailApiKey);
                var from = new EmailAddress(practice.email);
                var to = new EmailAddress(receiverEmail);
                var htmlContent = practice.emailHtmlBody;
                htmlContent = htmlContent.Replace("{ImageUrl}", practice.serverName + practice.logoPath);
                htmlContent = htmlContent.Replace("{Join}", practice.serverName + provider.practice + "/" + provider.url + "/#/Join");
                htmlContent = htmlContent.Replace("ProviderNameTitle", provider.nameTitle);
                htmlContent = htmlContent.Replace("ProviderName", provider.name);
                htmlContent = htmlContent.Replace("PracticeName", practice.name);
                htmlContent = htmlContent.Replace("TodaysDate", TodaysDate);
                htmlContent = htmlContent.Replace("EmailAdditionalContent", practice.emailAdditionalContent);
                var msg = MailHelper.CreateSingleEmail(from, to, practice.emailSubject, practice.emailPlainBody, htmlContent);
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
                const string accountSid = "****"; // hardcoded
                const string authToken = "****"; // hardcoded

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
        public async Task<bool> SendOTP(string receiverEmail, string otp)
        {
            var bResponse = false;
            var name = "";
            try
            {
                Provider provider = FewaDbContext.providers.Where(a => a.email == receiverEmail || a.userName == receiverEmail).FirstOrDefault();
                if (provider == null)
                {
                    return false;
                }
                Practice practice = FewaDbContext.practices.Where(a => a.url == provider.practice).FirstOrDefault();
                if (practice == null)
                {
                    return false;
                }
                if (!string.IsNullOrEmpty(provider.name))
                {
                    name = "Dr." + provider.name;
                }
                else
                {
                    name = provider.email;
                }
                practice.emailPlainBody = "";
                var htmlContent = "   <table align='center' cellpadding='0' cellspacing='0' border='0' width='100%'bgcolor='#f0f0f0'>  " +
                                 "           <tr>  " +
                                 "           <td style='padding: 30px 30px 20px 30px;'>  " +
                                 "               <table cellpadding='0' cellspacing='0' border='0' width='100%' bgcolor='#ffffff' style='margin: auto;'>  " +
                                 "               <tr style='    background-color: #4caf5000;padding: 40px;border: solid 1px;border-radius: 10px;box-shadow: 5px 5px 20px;'>  " +
                                 "                   <td colspan='2' align='center' style='padding: 10px;'>  " +
                                 "                       <a href='" + practice.serverName + "' target='_blank'><img src='" + practice.serverName + practice.logoPath + "' style='max-height: 150px;' border='0' /></a>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               <tr>  " +
                                 "                   <td colspan='2' align='center' style='padding: 50px 50px 0px 50px;'>  " +
                                 "                       <h1 style='padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;'>  " +
                                 "                           Password Reset  " +
                                 "                       </h1>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               <tr>  " +
                                 "                   <td style='text-align: left; padding: 0px 50px;' valign='top'>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "                           Hi " + name + ",  " +
                                 "                       </p>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "                           Seems like you forgot your password for Fewa Telehealth. If this is true, use below one time password to reset your password.  " +
                                 "                       </p>  " +
                                 "   					<h1 style='padding-right: 0em; margin: 0; line-height: 0px; font-weight:300; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: center; padding-bottom: 1em; font-size: 25px;'>  " +
                                 "                           " + otp + "  " +
                                 "                       </h1>  " +
                                 "   					<p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "   						<strong>Note:</strong>&nbsp; One time password is case sensitive.<br>  " +
                                 "                           If you did not forgot your password you can safely ignore this email.  " +
                                 "                       </p>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               <tr>  " +
                                 "                   <td style='text-align: left; padding: 30px 50px 50px 50px' valign='top'>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;'>  " +
                                 "                           Thanks,<br/>Fewa Team  " +
                                 "                       </p>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               <tr>  " +
                                 "                   <td colspan='2' align='center' style='padding: 20px 40px 40px 40px;' bgcolor='#f0f0f0'>  " +
                                 "                       <p style='font-size: 12px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #777;'>  " +
                                 "                           Powered by &copy; 2020  " +
                                 "                           <a href='" + practice.serverName + "' target='_blank' style='color: #777; text-decoration: none'> Fewa Telehealth</a>  " +
                                 "                       </p>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               </table>  " +
                                 "           </td>  " +
                                 "       </tr>  " +
                                 "  </table>  ";
                practice.emailSubject = "otp for password reset";
                var client = new SendGridClient(practice.emailApiKey);
                var from = new EmailAddress(practice.email);
                var to = new EmailAddress(provider.email);

                var msg = MailHelper.CreateSingleEmail(from, to, practice.emailSubject, practice.emailPlainBody, htmlContent);
                var res = await client.SendEmailAsync(msg);
                if (res.StatusCode == System.Net.HttpStatusCode.OK || res.StatusCode == System.Net.HttpStatusCode.Accepted)
                {
                    bResponse = true;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"file: SecurityController.cs method: SendOtpAsync() error: {ex.Message} ");
            }
            return bResponse;
        }

        public async Task<bool> SendPatientReportEmailAsync(Patient patient)
        {
            var bResponse = false;
            try
            {
                var provider = _providerRepository.getProviderByUserName(patient.url);
                Practice practice = FewaDbContext.practices.Where(a => a.url == provider.practice).FirstOrDefault();
                var TodaysDate = DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
                var client = new SendGridClient(practice.emailApiKey);
                var from = new EmailAddress(practice.email);
                var to = new EmailAddress(patient.email);
                var htmlContent = " <html>  " +
                                               "      <head>  " +
                                               "         <style>  " +
                                               "            table { " +
                                               "            font-family: 'Verdana';" +
                                               "            }   " +
                                               "            .banner-color {  " +
                                               "            background-color: #eb681f!important;  " +
                                               "            }  " +
                                               "            .heading-color {  " +
                                               "            color: #eb681f!important;  " +
                                               "            }  " +
                                               "            .title-color {  " +
                                               "            color: #0066cc!important;  " +
                                               "            }  " +
                                               "            .button-color {  " +
                                               "            background-color: #0066cc!important;  " +
                                               "            }  " +
                                               "            @media screen and (min-width: 500px) {  " +
                                               "            .banner-color {  " +
                                               "            background-color: #eb681f!important;  " +
                                               "            }  " +
                                               "            .title-color {  " +
                                               "            color: black;  " +
                                               "            }  " +
                                               "            .button-color {  " +
                                               "            background-color: #0066cc!important;  " +
                                               "            }  " +
                                               "            }  " +
                                               "         </style>  " +
                                               "      </head>  " +
                                               "      <body>  " +
                                               "         <div style='background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important;height:100%!important'>  " +
                                               "            <table align='center' border='0' cellspacing='0' cellpadding='0' style='table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>" +
                                               "               <tbody>  " +
                                               "                  <tr>  " +
                                               "                     <td align='center'>  " +
                                               "                        <center style='width:100%'>  " +
                                               "                           <table bgcolor='#FFFFFF' border='0' cellspacing='0' cellpadding='0' style='margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif' width='512'>" +
                                               "                              <tbody style='position:absolute'>" +
                                               "                                 <tr>  " +
                                               "                                    <td bgcolor='#F3F3F3' width='100%' style='background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec'>  " +
                                               "                                       <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important' width='100%'>" +
                                               "                                          <tbody>" +
                                               "                                             <tr>" +
                                               "                                                <td align='left' valign='middle' width='50%'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'></span></td>  " +
                                               "                                                <td valign='middle' width='50%' align='right' style='padding:0 0 0 10px'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'>TodaysDate</span></td>  " +
                                               "                                                <td width='1'>&nbsp;</td>  " +
                                               "                                             </tr>  " +
                                               "                                          </tbody>  " +
                                               "                                       </table>  " +
                                               "                                    </td>  " +
                                               "                                 </tr>  " +
                                               "                                 <tr>  " +
                                               "                                    <td align='left' style='background-color:white'>  " +
                                               "                                       <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                          <tbody>  " +
                                               "                                             <tr>  " +
                                               "                                                <td width='100%'>  " +
                                               "                                                   <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                                      <tbody>  " +
                                               "                                                         <tr>  " +
                                               "                                                            <td align='center'  style='padding:20px 48px;color:#ffffff' class='banner-color'>  " +
                                               "                                                               <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                                                  <tbody>  " +
                                               "                                                                     <tr>  " +
                                               "                                                                        <td align='center' width='100%'>  " +
                                               "   																		<h1 style='padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px'>Patient Report Summary </h1>  " +
                                               "                                                                        </td>  " +
                                               "                                                                     </tr>  " +
                                               "                                                                  </tbody>  " +
                                               "                                                               </table>  " +
                                               "                                                            </td>  " +
                                               "                                                         </tr>  " +
                                               "                                                         <tr>  " +
                                               "                                                            <td align='center' style='padding:20px 0 10px 0'>  " +
                                               "                                                               <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                                                  <tbody>  " +
                                               "                                                                     <tr>  " +
                                               "   																		<td align='center' width='100%' style='padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;'>  " +
                                               "   																		<tr _ngcontent-kfm-c50<td _ngcontent-kfm-c50=''><img _ngcontent-kfm-c50='' src='{ImageUrl}' style='height: 80px;'></td></tr>  " +
                                               "                                                                        <tr><td><h3 style='font-size:15px;text-align:center;'>" +
                                               "                                                                        <span style='display:block;text-align:center;' class='heading-color'>{PracticeName}</span></h3>" +
                                               "                                                                        <h5 style ='font-size:15px;text-align:center;'><span style='display:block;'>{PracticeAddress}</span></h5>" +
                                               "                                                                        <p><span style = 'display:block;text-align:center;'> Phone No:{ContactNo} , Fax: **********</span><p>" +
                                               "                                                                        </td></tr>" +
                                               "                                                                           <tr> <td> " +
                                               "   																		   <h3 style='font-size:18px;text-align:center;' class='title-color'>Hi, This is <strong>ProviderNameTitle &nbsp;&nbsp;ProviderName</strong></h3>" +
                                               "                                                                           <h5 style='font-size:15px;text-align:center;'><u>After Visit Summary Report</u>&nbsp;</h5></td></tr>" +
                                               "                                                                        </td>  " +
                                               "                                                                     </tr>  " +
                                               "                                                                  </tbody>  " +
                                               "                                                               </table>  " +
                                               "                                                       <table style = 'border:1px solid #000; font-family:Verdana;font-size:13px;margin:5% 5% 5% 5%;width:90%;border-collapse:inherit !important;'>" +
                                               "                                                            <tr style= 'border: 1px solid #fff'>" +
                                               "                                                                <td style= 'padding: 8px;'><strong> Lab Orders Sent:</strong>{labOrdersSent}</td>" +
                                               "                                                            </tr>" +
                                               "                                                            <tr style = 'border: 1px solid #fff'>" +
                                               "                                                                <td style='padding: 8px;'><strong>New prescriptions sent to your pharmacy:</strong>{newPrescriptionsSent}</td>" +
                                               "                                                            </tr>" +
                                               "                                                            <tr style = 'border: 1px solid #fff'>" +
                                               "                                                                <td style='padding: 8px;'><strong>New prescriptions mailed to you:</strong>{newPrescriptionsMailed}</td>" +
                                               "                                                            </tr>" +
                                               "                                                            <tr style = 'border: 1px solid #fff; border-bottom: none;'>" +
                                               "                                                                <td style='padding: 8px;'><strong><u>Advice</u></strong></td>" +
                                               "                                                            </tr>" +
                                               "                                                            <tr style = 'border: 1px solid #fff; border-top: none'>" +
                                               "                                                                <td style='padding:8px;padding-top:0'>{medication}</td>" +
                                               "                                                            </tr>" +
                                               "                                                            <tr>" +
                                               "                                                                <td style ='padding: 8px;'><strong> Follow up in:</strong><span>{followUpNumber}</span>{followUpMeasure}</td>" +
                                               "                                                            </tr>" +
                                               "                                                         </table>" +
                                               "   															<table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "   																<tbody>  " +
                                               "   																	<tr>  " +
                                               "   																		<td align='center' valign='middle' width='100%' style='border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px'>Regards,  " +
                                               "   																			<br><b>Powered by © Fewa Telehealth 2020</b>  " +
                                               "   																		</td>  " +
                                               "   																	</tr>  " +
                                               "   																</tbody>  " +
                                               "   															</table>  " +
                                               "                                                            </td>  " +
                                               "                                                         </tr>  " +
                                               "                                                      </tbody>  " +
                                               "                                                   </table>  " +
                                               "                                                </td>  " +
                                               "                                             </tr>  " +
                                               "                                          </tbody>  " +
                                               "                                       </table>  " +
                                               "                                    </td>  " +
                                               "                                 </tr>  " +
                                               "                                 <tr>  " +
                                               "                                  " +
                                               "                                 </tr>  " +
                                               "   							   <tr>  " +
                                               "                                    <td bgcolor='#F3F3F3' width='100%' style='background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec'>  " +
                                               "                                       <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important' width='100%'>  " +
                                               "                                          <tbody>  " +
                                               "                                             <tr>  " +
                                               "   												<td align='left' valign='middle' width='50%'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'></span></td>  " +
                                               "                                                <td valign='middle' width='50%' align='right' style='padding:0 0 0 10px'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'></span></td>  " +
                                               "                                                <td width='1'>&nbsp;</td>  " +
                                               "                                             </tr>  " +
                                               "                                          </tbody>  " +
                                               "                                       </table>  " +
                                               "                                    </td>  " +
                                               "                                 </tr>  " +
                                               "                              </tbody>  " +
                                               "                           </table>  " +
                                               "                        </center>  " +
                                               "                     </td>  " +
                                               "                  </tr>  " +
                                               "               </tbody>  " +
                                               "            </table>  " +
                                               "         </div>  " +
                                               "      </body>  " +
                                               "  </html>  ";

                /*        var htmlReportContent = "<div class='container-fluid'> <div class='row m-w100' id='print-section'>" + 
                                          "<div class='col-md-12 col-sm-12 col-xs-12'><div class='card'>" + 
                                          "<div class='card-body'><!-- Report Printable Area -->" +
                                          "<style type = 'text/css' media='Print'>" +
                                           " table { " +
                                           "  font-family: 'Verdana';" +
                                            " } " +
                                            "</style>" +
                                            "<table style = 'width:100%;text-align:center;margin:45px 0;font-size:13px;font-family:Verdana;'>" +
                                            "<tr><td><img src='{ImageUrl}' style='height: 80px;'>" +
                                            "</td></tr>"+
                                            "<tr><td><h3 style='margin-top:15px;margin-bottom:5px;'>" +
                                            "<span style='display:block;margin-top:15px;'>{PracticeName}</span></h3>" +
                                            "<h5 style ='margin-top: 5px;margin-bottom:15px;'><span style='display:block;'>{PracticeAddress}</span></h5>" +
                                            "<span style = 'display: block;margin-top: 5px;'> Phone No. *********, Fax: **********</span>" +
                                            "</td></tr>" +
                                            "</table>" + 
                                            "<table style = 'width: 100%;text-align:center;margin:45px 0;font-size: 13px; font-family:Verdana;'>" +
                                            "<tr><td><h5><u>After Visit Summary Report</u></h5></td></tr>" +
                                            "</table>" +
                                            "<table style = 'border:1px solid #000; font-family:Verdana;font-size:13px;width:100%;border-collapse:inherit !important;'>" +
                                            "<tr style= 'border: 1px solid #fff'>" +
                                            "<td style= 'padding: 8px;'><strong> Lab Orders Sent:</strong>{labOrdersSent}</td></tr>" +
                                            "<tr style = 'border: 1px solid #fff'>" +
                                            "<td style='padding: 8px;'><strong>New prescriptions sent to your pharmacy:</strong>{newPrescriptionsSent}</td></tr>" +
                                            "<tr style = 'border: 1px solid #fff'><td style='padding: 8px;'><strong>New prescriptions mailed to you:</strong>{{patientObj?.newPrescriptionsMailedToYou}}</td></tr>" +
                                            "<tr style = 'border: 1px solid #fff; border-bottom: none;'><td style='padding: 8px;'><strong><u>Advice</u></strong></td></tr>" +
                                            "<tr style = 'border: 1px solid #fff; border-top: none'><td style='padding:8px;padding-top:0'>{{patientObj?.medication}}</td></tr>" +
                                            "<tr><td style ='padding: 8px;'><strong> Follow up in:</strong><span>{{patientObj?.followUpNumber}}</span> {{patientObj?.followUpMeasure}}</td></tr>" +
                                            "</table>" +
                                            "<!-- Report Printable area end -->" +
                                            "</div></div></div></div></div>";*/
                var labOrdersSent = patient.labOrdersSent == true ? "Yes" : "No";
                var newPrescriptionsSent = patient.newPrescriptionsSentToYourPharmacy ? "Yes" : "No";
                var newPrescriptionsMailed = patient.newPrescriptionsMailedToYou ? "Yes" : "No";
                htmlContent = htmlContent.Replace("{ContactNo}", practice.contactNumber);
                htmlContent = htmlContent.Replace("{labOrdersSent}", labOrdersSent);
                htmlContent = htmlContent.Replace("{newPrescriptionsSent}", newPrescriptionsSent);
                htmlContent = htmlContent.Replace("{newPrescriptionsMailed}", newPrescriptionsMailed);
                htmlContent = htmlContent.Replace("{medication}", patient.medication);
                htmlContent = htmlContent.Replace("{followUpNumber}", patient.followUpNumber);
                htmlContent = htmlContent.Replace("{followUpMeasure}", patient.followUpMeasure);
                htmlContent = htmlContent.Replace("{ImageUrl}", practice.serverName + practice.logoPath);
                htmlContent = htmlContent.Replace("{PracticeAddress}", practice.address);
                htmlContent = htmlContent.Replace("ProviderNameTitle", provider.nameTitle);
                htmlContent = htmlContent.Replace("ProviderName", provider.name);
                htmlContent = htmlContent.Replace("{PracticeName}", practice.name);
                htmlContent = htmlContent.Replace("TodaysDate", TodaysDate);
                var emailSubject = "After Visit Summary Report";
                var msg = MailHelper.CreateSingleEmail(from, to, emailSubject, practice.emailPlainBody, htmlContent);
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

    }
}

