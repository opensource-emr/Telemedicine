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

        public async Task<bool> SendEmailAsync(string receiverEmail, string providerUserName, string hostname = "")
        {
            var bResponse = false;
            try
            {
                var pra = accessor.HttpContext.Session.GetString("practice");
                var username = accessor.HttpContext.Session.GetString("name");
                Practice practice = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == pra.ToLower().Trim()).FirstOrDefault();
                if (practice == null)
                {
                    return false;
                }
                var provider = _providerRepository.getProviderByUserName(practice.url, providerUserName);
                if (provider == null)
                {
                    return false;
                }
                if (!string.IsNullOrEmpty(hostname))
                {
                    practice.serverName = hostname;
                }
                //var TodaysDate =DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
                Practice prac = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == "practice").FirstOrDefault();
                if (prac == null)
                {
                    return false;
                }
                var client = new SendGridClient(prac.emailApiKey);
                var from = new EmailAddress(prac.email);
                var to = new EmailAddress(receiverEmail);
                var htmlContent = practice.emailHtmlBody;
                htmlContent = htmlContent.Replace("{imageUrl}", practice.serverName + practice.logoPath);
                htmlContent = htmlContent.Replace("{join}", practice.serverName + "/" + provider.practice.ToLower().Trim() + "/" + provider.url.ToLower().Trim() + "/#/patient");
                htmlContent = htmlContent.Replace("providerNameTitle", provider.nameTitle);
                if (string.IsNullOrEmpty(provider.name))
                    htmlContent = htmlContent.Replace("providerName", provider.userName);
                else
                    htmlContent = htmlContent.Replace("providerName", provider.name);
                htmlContent = htmlContent.Replace("practiceName", practice.name);
                htmlContent = htmlContent.Replace("{serverName}", practice.serverName);
                htmlContent = htmlContent.Replace("PatientEmail", receiverEmail);
                if (practice.emailAdditionalContent == "EmailAdditionalContent")
                {
                    htmlContent = htmlContent.Replace("EmailAdditionalContent", "");
                }
                else
                {
                    htmlContent = htmlContent.Replace("EmailAdditionalContent", practice.emailAdditionalContent);
                }
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
        public async Task<bool> SendOTP(int practiceId,string receiverEmail, string otp, string hostname = "")
        {
            var bResponse = false;
            var name = "";
            try
            {
                Provider provider = FewaDbContext.providers.Where(a => (a.email == receiverEmail || a.userName == receiverEmail)&&a.practiceId==practiceId).FirstOrDefault();
                if (provider == null)
                {
                    return false;
                }
                Practice practice = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == provider.practice.ToLower().Trim()).FirstOrDefault();
                if (practice == null)
                {
                    return false;
                }
                if (!string.IsNullOrEmpty(hostname))
                {
                    practice.serverName = hostname;
                }
                name = (!string.IsNullOrEmpty(provider.name))
                    ? ((!string.IsNullOrEmpty(provider.nameTitle) ? provider.nameTitle : "") + provider.name)
                    : provider.email;

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
                                 "                           Fewa Tele - Password Reset  " +
                                 "                       </h1>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               <tr>  " +
                                 "                   <td style='text-align: left; padding: 0px 50px;' valign='top'>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "                           Hi " + name + ",  " +
                                 "                       </p>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "                           Your one time password to reset your password is:-  " +
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
                practice.emailSubject = "Fewa Tele - Password verification";
                Practice pra = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == "practice").FirstOrDefault();
                if (pra == null)
                {
                    return false;
                }
                var client = new SendGridClient(pra.emailApiKey);
                var from = new EmailAddress(pra.email);
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
        public async Task<bool> SendRegistrationOTP(string practiceName, string receiverEmail, string otp, string hostname = "")
        {
            var bResponse = false;
            try
            {
                Practice practice = FewaDbContext.practices.Where(a => a.email == receiverEmail || a.name == practiceName.ToLower().Trim() || a.url.ToLower().Trim() == practiceName.ToLower().Trim()).FirstOrDefault();
                if (practice != null)
                {
                    return false;
                }
                var emailPlainBody = "";
                var htmlContent = "   <table align='center' cellpadding='0' cellspacing='0' border='0' width='100%'bgcolor='#f0f0f0'>  " +
                                 "           <tr>  " +
                                 "           <td style='padding: 30px 30px 20px 30px;'>  " +
                                 "               <table cellpadding='0' cellspacing='0' border='0' width='100%' bgcolor='#ffffff' style='margin: auto;'>  " +
                                 "               <tr>  " +
                                 "                   <td colspan='2' align='center' style='padding: 50px 50px 0px 50px;'>  " +
                                 "                       <h1 style='padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;'>  " +
                                 "                         Fewa Tele - Verification email for new practice  " +
                                 "                       </h1>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               <tr>  " +
                                 "                   <td style='text-align: left; padding: 0px 50px;' valign='top'>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "                           Hi " + receiverEmail + ",  " +
                                 "                       </p>  " +
                                 "                       <p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "                           Your one time password is:-  " +
                                 "                       </p>  " +
                                 "   					<h1 style='padding-right: 0em; margin: 0; line-height: 0px; font-weight:300; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em; font-size: 25px;'>  " +
                                 "                           " + otp + "  " +
                                 "                       </h1>  " +
                                 "   					<p style='font-size: 18px; margin: 0; line-height: 24px; font-family: \"Nunito Sans\", Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;'>  " +
                                 "   						<strong>Note:</strong>&nbsp; One time password is case sensitive.<br>  " +
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
                                 "                           Powered by &copy; 2020  Fewa Telehealth" +
                                 "                       </p>  " +
                                 "                   </td>  " +
                                 "               </tr>  " +
                                 "               </table>  " +
                                 "           </td>  " +
                                 "       </tr>  " +
                                 "  </table>  ";
                var emailSubject = "Fewa Tele - Verification email for new practice";
                Practice pra = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == "practice").FirstOrDefault();
                if (pra == null)
                {
                    return false;
                }
                var client = new SendGridClient(pra.emailApiKey);
                var from = new EmailAddress(pra.email);
                var to = new EmailAddress(receiverEmail);

                var msg = MailHelper.CreateSingleEmail(from, to, emailSubject, emailPlainBody, htmlContent);
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
        public async Task<bool> SendPatientReportEmailAsync(Patient patient, string hostname = "")
        {
            var bResponse = false;
            var slash = "";
            var followUpNum = "";
            var _medication = "";
            try
            {
                Provider provider = FewaDbContext.providers.Where(a => a.url.ToLower().Trim() == patient.url.ToLower().Trim() && a.practice == patient.practice.ToLower().Trim()).FirstOrDefault();
                if (provider == null)
                {
                    return false;
                }
                Practice practice = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == provider.practice.ToLower().Trim()).FirstOrDefault();
                if (practice == null)
                {
                    return false;
                }

                if (!string.IsNullOrEmpty(hostname))
                {
                    practice.serverName = hostname;
                }
                var adviceList = "";
                if (!string.IsNullOrEmpty(patient.followUpNumber))
                {
                    slash = "/";
                    followUpNum = "Follow Up in:";
                }
                if (!string.IsNullOrEmpty(patient.medication))
                    _medication = "Advice:";

                Practice pra = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == "practice").FirstOrDefault();
                if (pra == null)
                {
                    return false;
                }
                var client = new SendGridClient(pra.emailApiKey);
                var from = new EmailAddress(pra.email);
                var to = new EmailAddress(patient.email);
                List<ProviderAdvice> getAllAdvice = patient.advice.ToList();
                for (var i = 0; i < getAllAdvice.Count; i++)
                {
                    var value = getAllAdvice[i].isChecked == true ? "Yes" : "No";
                    var adv = getAllAdvice.ElementAt(i).advice;
                    adviceList += "<tr><td align='left' valign='top' style = 'font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>" +
                                  "<b style='color:#000;'>" + adv + ":</b>&nbsp;" + value + "</td></tr>";
                }
                //var labOrdersSent = patient.labOrdersSent == true ? "Yes" : "No";
                //var newPrescriptionsSentToYourPharmacy = patient.newPrescriptionsSentToYourPharmacy == true ? "Yes" : "No";
                //var newPrescriptionsMailedToYou = patient.newPrescriptionsMailedToYou == true ? "Yes" : "No";
                var htmlContent = "   <!DOCTYPE html>  " +
                                 "   <html lang='en'>  " +
                                 "     " +
                                 "   <head>  " +
                                 "       <meta charset='UTF-8'>  " +
                                 "       <meta name='viewport' content='width=device-width, initial-scale=1.0'>  " +
                                 "       <title>Fema mailer</title>  " +
                                 "       <link href=“https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800” rel=“stylesheet”>  " +
                                 "     " +
                                 "       <style type='text/css'>  " +
                                 "           body {  " +
                                 "               margin: 0 !important;  " +
                                 "               padding: 0 !important;  " +
                                 "               -webkit-text-size-adjust: 100% !important;  " +
                                 "               -ms-text-size-adjust: 100% !important;  " +
                                 "               -webkit-font-smoothing: antialiased !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           img {  " +
                                 "               border: 0 !important;  " +
                                 "               outline: none !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           p {  " +
                                 "               Margin: 0px !important;  " +
                                 "               Padding: 0px !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           table {  " +
                                 "               border-collapse: collapse;  " +
                                 "               mso-table-lspace: 0px;  " +
                                 "               mso-table-rspace: 0px;  " +
                                 "           }  " +
                                 "     " +
                                 "           td,  " +
                                 "           a,  " +
                                 "           span {  " +
                                 "               border-collapse: collapse;  " +
                                 "               mso-line-height-rule: exactly;  " +
                                 "           }  " +
                                 "     " +
                                 "           .ExternalClass ' {  " +
                                 "               line-height: 100%;  " +
                                 "           }  " +
                                 "     " +
                                 "           .em_defaultlink a {  " +
                                 "               color: inherit !important;  " +
                                 "               text-decoration: none !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           span.MsoHyperlink {  " +
                                 "               mso-style-priority: 99;  " +
                                 "               color: inherit;  " +
                                 "           }  " +
                                 "     " +
                                 "           span.MsoHyperlinkFollowed {  " +
                                 "               mso-style-priority: 99;  " +
                                 "               color: inherit;  " +
                                 "           }  " +
                                 "     " +
                                 "           @media only screen and (min-width:481px) and (max-width:699px) {  " +
                                 "               .em_main_table {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_wrapper {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_hide {  " +
                                 "                   display: none !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_img {  " +
                                 "                   width: 100% !important;  " +
                                 "                   height: auto !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_h20 {  " +
                                 "                   height: 20px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_padd {  " +
                                 "                   padding: 20px 10px !important;  " +
                                 "               }  " +
                                 "           }  " +
                                 "     " +
                                 "           @media screen and (max-width: 480px) {  " +
                                 "               .em_main_table {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_wrapper {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_hide {  " +
                                 "                   display: none !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_img {  " +
                                 "                   width: 100% !important;  " +
                                 "                   height: auto !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_h20 {  " +
                                 "                   height: 20px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_padd {  " +
                                 "                   padding: 20px 10px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_text1 {  " +
                                 "                   font-size: 16px !important;  " +
                                 "                   line-height: 24px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               u+.em_body .em_full_wrap {  " +
                                 "                   width: 100% !important;  " +
                                 "                   width: 100vw !important;  " +
                                 "               }  " +
                                 "           }  " +
                                 "       </style>  " +
                                 "     " +
                                 "   </head>  " +
                                 "     " +
                                 "   <body style='margin:0px; padding:0px;'' bgcolor=' #efefef'>  " +
                                 "       <table align='center' width='700' border='0' cellspacing='0' cellpadding='0' class='em_main_table'  " +
                                 "           style='width:700px;'>  " +
                                 "           <tr>  " +
                                 "               <td style='padding:25px;' class='em_padd' valign='top' bgcolor='#fff' align='center'>  " +
                                 "                   <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center'>  " +
                                 "                       <tbody>  " +
                                 "                           <tr>  " +
                                 "                               <td style='font-family:\"Open Sans\", Arial, sans-serif; font-size:21px; line-height:15px;font-weight: 600; color:#20325F;' valign='top' align='center'>" + practice.name + "</td>  " +
                                 "                           </tr>  " +
                                 "                       </tbody>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center'>  " +
                                 "                   <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center'>  " +
                                 "                       <tbody>  " +
                                 "                           <tr>  " +
                                 "                               <td valign='top' align='center'><img class='em_img' alt='hospital_logo'  " +
                                 "                                       style='display:block; font-family:Arial, sans-serif; font-size:30px; line-height:34px; color:#000000; max-width:700px;'  " +
                                 "                                       src='" + practice.serverName + practice.logoPath + "' width='700' border='0' height='190'></td>  " +
                                 "                           </tr>  " +
                                 "                       </tbody>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center' bgcolor='#fff' style='padding:35px 70px 30px;' class='em_padd'>  " +
                                 "                   <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:20px;font-weight: 600; line-height:30px; color:#20325F;'>  " +
                                 "                               Summary report</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='15' style='font-size:0px; line-height:0px; height:15px;'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:16px; line-height:22px;font-weight: 600; color:#000; letter-spacing:2px; padding-bottom:12px;'>  " +
                                 "                               Hi " + patient.name + ",  " +
                                 "                           </td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='5' class='em_h20' style='font-size:0px; line-height:0px; height:5px;'>&nbsp;</td>  " +
                                 "                       </tr>  " + adviceList +
                                 "   					 <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                            style='font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                                <b style='color:#000;'>"+ _medication+"</b>&nbsp;" + patient.medication + "</td>  " +
                                 "                       </tr>  " +
                                 "   					 <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                                <b style='color:#000;'>"+ followUpNum +"</b>&nbsp;" + patient.followUpNumber + slash + patient.followUpMeasure + "</td>  " +
                                 "                          </tr>  " +
                                 "                          <tr>  " +
                                 "                              <td height='15' class='em_h20' style='font-size:0px; line-height:0px; height:15px;'>&nbsp;</td>  " +
                                 "                          </tr>  " +
                                 "                           " +
                                 "                      </table>  " +
                                 "                  </td>  " +
                                 "              </tr>  " +
                                 "              <tr>  " +
                                 "                  <td valign='top' align='center' bgcolor='#f4f7ff' style='padding:38px 30px;' class='em_padd'>  " +
                                 "                      <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                          <tr>  " +
                                 "                              <td align='center' valign='top' colspan='3' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:20px;font-weight: 600; line-height:30px; color:#20325F;'>How Its Work</td>  " +
                                 "                          </tr>  " +
                                 "                          <tr>  " +
                                 "                              <td height='20' class='em_h20' colspan='3' style='font-size:0px; line-height:0px; height:20px;'>&nbsp;</td>  " +
                                 "                          </tr>  " +
                                 "                          <tr>  " +
                                 "                              <td align='center' valign='top'>  " +
                                 "                                  <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                      <tr>  " +
                                 "                                          <td align='center' valign='top'><img src='" + practice.serverName + "/img/Ellipse-34.png'></td>  " +
                                 "                                      </tr>  " +
                                 "                                      <tr>  " +
                                 "                                          <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:30px; color:#000;'>Join Conference</td>  " +
                                 "                                      </tr>  " +
                                 "                                  </table>  " +
                                 "                              </td>  " +
                                 "                              <td align='center' valign='top'>  " +
                                 "                                  <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                      <tr>  " +
                                 "                                          <td align='center' valign='top'><img src='" + practice.serverName + "/img/Ellipse-35.png'></td>  " +
                                 "                                      </tr>  " +
                                 "                                      <tr>  " +
                                 "                                          <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:24px; color:#000;'>Communicates<br>with Doctor</td>  " +
                                 "                                      </tr>  " +
                                 "                                  </table>  " +
                                 "                              </td>  " +
                                 "                              <td align='center' valign='top'>  " +
                                 "                                  <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                      <tr>  " +
                                 "                                          <td align='center' valign='top'><img src='" + practice.serverName + "/img/Ellipse-36.png'></td>  " +
                                 "                                      </tr>  " +
                                 "                                      <tr>  " +
                                 "                                          <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:24px; color:#000;'>chat with doctor<br>to Patient </td>  " +
                                 "                                      </tr>  " +
                                 "                                  </table>  " +
                                 "                              </td>  " +
                                 "                          </tr>  " +
                                 "                      </table>  " +
                                 "                  </td>  " +
                                 "              </tr>  " +
                                 "              <tr>  " +
                                 "                  <td valign='top' align='center' bgcolor='#20325f' style='padding:38px 30px;' class='em_padd'>  " +
                                 "                      <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                          <tr>  " +
                                 "                              <td valign='top' align='center' style='padding-bottom:16px;'>  " +
                                 "                                  <table align='center' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                      <tr>  " +
                                 "                                          <td valign='top' align='center'><a href='#' target='_blank'  " +
                                 "                                                  style='text-decoration:none;'><img src='" + practice.serverName + "/img/twitter.png' alt='fb'  " +
                                 "                                                      style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px;'  " +
                                 "                                                      border='0' width='26' height='26' /></a></td>  " +
                                 "                                          <td width='6' style='width:6px;'>&nbsp;</td>  " +
                                 "                                          <td valign='top' align='center'><a href='#' target='_blank'  " +
                                 "                                                  style='text-decoration:none;'><img src='" + practice.serverName + "/img/linkedin.png' alt='tw'  " +
                                 "                                                      style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px'  " +
                                 "                                                      border='0' width='27' height='26' /></a></td>  " +
                                 "                                          <td width='6' style='width:6px;'>&nbsp;</td>  " +
                                 "                                          <td valign='top' align='center'><a href='#' target='_blank'  " +
                                 "                                                  style='text-decoration:none;'><img src='" + practice.serverName + "/img/rss.png' alt='yt'  " +
                                 "                                                      style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px'  " +
                                 "                                                      border='0' width='26' height='26' /></a></td>  " +
                                 "                                      </tr>  " +
                                 "                                  </table>  " +
                                 "                              </td>  " +
                                 "                          </tr>  " +
                                 "                          <tr>  " +
                                 "                              <td align='center' valign='top'  " +
                                 "                                  style='font-family:\"Open Sans\", Arial, sans-serif; font-size:11px; line-height:18px; color:#fff;'>  " +
                                 "                                  <a href='#' target='_blank' style='color:#fff; text-decoration:underline;'>PRIVACY  " +
                                 "                                      STATEMENT</a> | <a href='#' target='_blank'  " +
                                 "                                      style='color:#fff; text-decoration:underline;'>TERMS OF SERVICE</a> | <a href='#'  " +
                                 "                                      target='_blank' style='color:#fff; text-decoration:underline;'>RETURNS</a><br />  " +
                                 "                                  &copy; 2020 Fewa Telemedicine. All Rights Reserved.<br />  " +
                                 "                                  If you do not wish to receive any further emails from us, please <a href='#' target='_blank'  " +
                                 "                                      style='text-decoration:none; color:#fff;'>unsubscribe</a></td>  " +
                                 "                          </tr>  " +
                                 "                      </table>  " +
                                 "                  </td>  " +
                                 "              </tr>  " +
                                 "          </table>  " +
                                 "      </body>  " +
                                 "        " +
                                 "     </html>  ";

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
        public async Task<bool> SendContactUsEmailAsync(ContactUs contactUs, string hostname = "")
        {
            var bResponse = false;
            try
            { 
                Practice pra = FewaDbContext.practices.Where(a => a.url.ToLower().Trim() == "practice").FirstOrDefault();
                if (pra == null)
                {
                    return false;
                }
                if (!string.IsNullOrEmpty(hostname))
                {
                    pra.serverName = hostname;
                }
                var client = new SendGridClient(pra.emailApiKey);
                var from = new EmailAddress(pra.email);
                var to = new EmailAddress(pra.email);
                var htmlContent = "   <!DOCTYPE html>  " +
                                 "   <html lang='en'>  " +
                                 "     " +
                                 "   <head>  " +
                                 "       <meta charset='UTF-8'>  " +
                                 "       <meta name='viewport' content='width=device-width, initial-scale=1.0'>  " +
                                 "       <title>Fema mailer</title>  " +
                                 "       <link href=“https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800” rel=“stylesheet”>  " +
                                 "     " +
                                 "       <style type='text/css'>  " +
                                 "           body {  " +
                                 "               margin: 0 !important;  " +
                                 "               padding: 0 !important;  " +
                                 "               -webkit-text-size-adjust: 100% !important;  " +
                                 "               -ms-text-size-adjust: 100% !important;  " +
                                 "               -webkit-font-smoothing: antialiased !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           img {  " +
                                 "               border: 0 !important;  " +
                                 "               outline: none !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           p {  " +
                                 "               Margin: 0px !important;  " +
                                 "               Padding: 0px !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           table {  " +
                                 "               border-collapse: collapse;  " +
                                 "               mso-table-lspace: 0px;  " +
                                 "               mso-table-rspace: 0px;  " +
                                 "           }  " +
                                 "     " +
                                 "           td,  " +
                                 "           a,  " +
                                 "           span {  " +
                                 "               border-collapse: collapse;  " +
                                 "               mso-line-height-rule: exactly;  " +
                                 "           }  " +
                                 "     " +
                                 "           .ExternalClass ' {  " +
                                 "               line-height: 100%;  " +
                                 "           }  " +
                                 "     " +
                                 "           .em_defaultlink a {  " +
                                 "               color: inherit !important;  " +
                                 "               text-decoration: none !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           span.MsoHyperlink {  " +
                                 "               mso-style-priority: 99;  " +
                                 "               color: inherit;  " +
                                 "           }  " +
                                 "     " +
                                 "           span.MsoHyperlinkFollowed {  " +
                                 "               mso-style-priority: 99;  " +
                                 "               color: inherit;  " +
                                 "           }  " +
                                 "     " +
                                 "           @media only screen and (min-width:481px) and (max-width:699px) {  " +
                                 "               .em_main_table {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_wrapper {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_hide {  " +
                                 "                   display: none !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_img {  " +
                                 "                   width: 100% !important;  " +
                                 "                   height: auto !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_h20 {  " +
                                 "                   height: 20px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_padd {  " +
                                 "                   padding: 20px 10px !important;  " +
                                 "               }  " +
                                 "           }  " +
                                 "     " +
                                 "           @media screen and (max-width: 480px) {  " +
                                 "               .em_main_table {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_wrapper {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_hide {  " +
                                 "                   display: none !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_img {  " +
                                 "                   width: 100% !important;  " +
                                 "                   height: auto !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_h20 {  " +
                                 "                   height: 20px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_padd {  " +
                                 "                   padding: 20px 10px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_text1 {  " +
                                 "                   font-size: 16px !important;  " +
                                 "                   line-height: 24px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               u+.em_body .em_full_wrap {  " +
                                 "                   width: 100% !important;  " +
                                 "                   width: 100vw !important;  " +
                                 "               }  " +
                                 "           }  " +
                                 "       </style>  " +
                                 "     " +
                                 "   </head>  " +
                                 "     " +
                                 "   <body style='margin:0px; padding:0px;'' bgcolor=' #efefef'>  " +
                                 "       <table align='center' width='700' border='0' cellspacing='0' cellpadding='0' class='em_main_table'  " +
                                 "           style='width:700px;'>  " +
                                 "           <tr>  " +
                                 "               <td style='padding:25px;' class='em_padd' valign='top' bgcolor='#fff' align='center'>  " +
                                 "                   <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center'>  " +
                                 "                       <tbody>  " +
                                 "                           <tr>  " +
                                 "                               <td style='font-family:\"Open Sans\", Arial, sans-serif; font-size:21px; line-height:15px;font-weight: 600; color:#20325F;' valign='top' align='center'></td>  " +
                                 "                           </tr>  " +
                                 "                       </tbody>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center'>  " +
                                 "                   <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center'>  " +
                                 "                       <tbody>  " +
                                 "                           <tr>  " +
                                 "                           </tr>  " +
                                 "                       </tbody>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center' bgcolor='#fff' style='padding:35px 70px 30px;' class='em_padd'>  " +
                                 "                   <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:20px;font-weight: 600; line-height:30px; color:#20325F;'>  " +
                                 "                               fewa user feedback</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='15' style='font-size:0px; line-height:0px; height:15px;'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:16px; line-height:22px;font-weight: 600; color:#000; letter-spacing:2px; padding-bottom:12px;'>  " +
                                 "                               Hi " + pra.email + ",  " +
                                 "                           </td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "   					 <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                            style='font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                                <b style='color:#000;'>Name:</b>&nbsp;" + contactUs.firstName + "&nbsp;" +contactUs.lastName+
                                 "                          </td>  " +
                                 "                       </tr>  " +
                                  "   					 <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                            style='font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                                <b style='color:#000;'>Email:</b>&nbsp;" + contactUs.email +
                                 "                       </tr>  " +
                                  "   					 <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                            style='font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                                <b style='color:#000;'>Phone number:</b>&nbsp;" + contactUs.phoneNumber+
                                 "                          </td>  " +
                                 "                       </tr>  " +
                                 "   					 <tr>  " +
                                 "                           <td align='left' valign='top'  " +
                                 "                            style='font-family:\"Open Sans\", Arial, sans-serif; font-size:14px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                                <b style='color:#000;'>Message:</b>&nbsp;" + contactUs.message + "</td>  " +
                                 "                       </tr>  " +
                                 "                        <tr>  " +
                                 "                           <td height='15' class='em_h20' style='font-size:0px; line-height:0px; height:15px;'>&nbsp;</td>  " +
                                 "                        </tr>  " +
                                 "                           " +
                                 "                      </table>  " +
                                 "                  </td>  " +
                                 "              </tr>  " +
                                 //"              <tr>  " +
                                 //"                  <td valign='top' align='center' bgcolor='#f4f7ff' style='padding:38px 30px;' class='em_padd'>  " +
                                 //"                      <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 //"                          <tr>  " +
                                 //"                              <td align='center' valign='top' colspan='3' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:20px;font-weight: 600; line-height:30px; color:#20325F;'>How Its Work</td>  " +
                                 //"                          </tr>  " +
                                 //"                          <tr>  " +
                                 //"                              <td height='20' class='em_h20' colspan='3' style='font-size:0px; line-height:0px; height:20px;'>&nbsp;</td>  " +
                                 //"                          </tr>  " +
                                 //"                          <tr>  " +
                                 //"                              <td align='center' valign='top'>  " +
                                 //"                                  <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 //"                                      <tr>  " +
                                 //"                                          <td align='center' valign='top'><img src='" + pra.serverName + "/img/Ellipse-34.png'></td>  " +
                                 //"                                      </tr>  " +
                                 //"                                      <tr>  " +
                                 //"                                          <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:30px; color:#000;'>Join Conference</td>  " +
                                 //"                                      </tr>  " +
                                 //"                                  </table>  " +
                                 //"                              </td>  " +
                                 //"                              <td align='center' valign='top'>  " +
                                 //"                                  <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 //"                                      <tr>  " +
                                 //"                                          <td align='center' valign='top'><img src='" + pra.serverName + "/img/Ellipse-35.png'></td>  " +
                                 //"                                      </tr>  " +
                                 //"                                      <tr>  " +
                                 //"                                          <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:24px; color:#000;'>Communicates<br>with Doctor</td>  " +
                                 //"                                      </tr>  " +
                                 //"                                  </table>  " +
                                 //"                              </td>  " +
                                 //"                              <td align='center' valign='top'>  " +
                                 //"                                  <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 //"                                      <tr>  " +
                                 //"                                          <td align='center' valign='top'><img src='" + pra.serverName + "/img/Ellipse-36.png'></td>  " +
                                 //"                                      </tr>  " +
                                 //"                                      <tr>  " +
                                 //"                                          <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:24px; color:#000;'>chat with doctor<br>to Patient </td>  " +
                                 //"                                      </tr>  " +
                                 //"                                  </table>  " +
                                 //"                              </td>  " +
                                 //"                          </tr>  " +
                                 //"                      </table>  " +
                                 //"                  </td>  " +
                                 //"              </tr>  " +
                                 "              <tr>  " +
                                 "                  <td valign='top' align='center' bgcolor='#20325f' style='padding:38px 30px;' class='em_padd'>  " +
                                 "                      <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                          <tr>  " +
                                 "                              <td valign='top' align='center' style='padding-bottom:16px;'>  " +
                                 "                                  <table align='center' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                      <tr>  " +
                                 "                                          <td valign='top' align='center'><a href='#' target='_blank'  " +
                                 "                                                  style='text-decoration:none;'><img src='" + pra.serverName + "/img/twitter.png' alt='fb'  " +
                                 "                                                      style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px;'  " +
                                 "                                                      border='0' width='26' height='26' /></a></td>  " +
                                 "                                          <td width='6' style='width:6px;'>&nbsp;</td>  " +
                                 "                                          <td valign='top' align='center'><a href='#' target='_blank'  " +
                                 "                                                  style='text-decoration:none;'><img src='" + pra.serverName + "/img/linkedin.png' alt='tw'  " +
                                 "                                                      style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px'  " +
                                 "                                                      border='0' width='27' height='26' /></a></td>  " +
                                 "                                          <td width='6' style='width:6px;'>&nbsp;</td>  " +
                                 "                                          <td valign='top' align='center'><a href='#' target='_blank'  " +
                                 "                                                  style='text-decoration:none;'><img src='" + pra.serverName + "/img/rss.png' alt='yt'  " +
                                 "                                                      style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px'  " +
                                 "                                                      border='0' width='26' height='26' /></a></td>  " +
                                 "                                      </tr>  " +
                                 "                                  </table>  " +
                                 "                              </td>  " +
                                 "                          </tr>  " +
                                 "                          <tr>  " +
                                 "                              <td align='center' valign='top'  " +
                                 "                                  style='font-family:\"Open Sans\", Arial, sans-serif; font-size:11px; line-height:18px; color:#fff;'>  " +
                                 "                                  <a href='#' target='_blank' style='color:#fff; text-decoration:underline;'>PRIVACY  " +
                                 "                                      STATEMENT</a> | <a href='#' target='_blank'  " +
                                 "                                      style='color:#fff; text-decoration:underline;'>TERMS OF SERVICE</a> | <a href='#'  " +
                                 "                                      target='_blank' style='color:#fff; text-decoration:underline;'>RETURNS</a><br />  " +
                                 "                                  &copy; 2020 Fewa Telemedicine. All Rights Reserved.<br />  " +
                                 "                                  If you do not wish to receive any further emails from us, please <a href='#' target='_blank'  " +
                                 "                                      style='text-decoration:none; color:#fff;'>unsubscribe</a></td>  " +
                                 "                          </tr>  " +
                                 "                      </table>  " +
                                 "                  </td>  " +
                                 "              </tr>  " +
                                 "          </table>  " +
                                 "      </body>  " +
                                 "        " +
                                 "     </html>  ";

                var emailSubject = "Feedback from user";
                var msg = MailHelper.CreateSingleEmail(from, to, emailSubject, pra.emailPlainBody, htmlContent);
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

