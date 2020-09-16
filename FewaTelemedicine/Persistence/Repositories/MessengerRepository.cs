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

        public async Task<bool> SendEmailAsync(string subject, string message, string receiverEmail)
        {
            var bResponse = false;

            try
            {

                List<Practice> practice = FewaDbContext.practices.ToList();
                var ServerName = practice.Select(a => a.serverName);
                var username = accessor.HttpContext.Session.GetString("Name");
                var doctor = _providerRepository.getProviderByUserName(username);
                var TodaysDate =DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
                var HospitalName = practice.Select(a => a.name);
                var LogoPath = practice.Select(a => a.logoPath);
                var HospitalContact = practice.Select(a => a.contactNumber);
                var apiKey = practice.Select(a => a.emailApiKey);
                var email = practice.Select(a => a.email);
                var name = practice.Select(a => a.name);
                //var client = new SendGridClient(apiKey);
                //var from = new EmailAddress(email, name);
                var to = new EmailAddress(receiverEmail);
                var plainTextContent = practice.Select(a => a.emailPlainBody);
                var htmlContent = practice.Select(a => a.emailHtmlBody);
                //htmlContent = htmlContent.Replace("{ImageUrl}", ServerName + LogoPath);
                //htmlContent = htmlContent.Replace("{Join}", ServerName + "#/Join?DoctorName="+doctor.DoctorId);
                //htmlContent = htmlContent.Replace("DoctorNameTitle", doctor.NameTitle);
                //htmlContent= htmlContent.Replace("DoctorName", doctor.DoctorName);
                //htmlContent= htmlContent.Replace("HospitalName", HospitalName);
                //htmlContent = htmlContent.Replace("TodaysDate", TodaysDate);
                //subject = practice.Select(a => a.emailSubject);
                //var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                //var res = await client.SendEmailAsync(msg);
                //if (res.StatusCode == System.Net.HttpStatusCode.OK || res.StatusCode == System.Net.HttpStatusCode.Accepted)
                //{
                //    bResponse = true;
                //}
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
    }
}
