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
                var TodaysDate =DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
                var HospitalName = paramHospital.Find(a => a.ParameterName == "Name").ParameterValue;
                var LogoPath = paramHospital.Find(a => a.ParameterName == "LogoPath").ParameterValue;
                var HospitalContact = paramHospital.Find(a => a.ParameterName == "ContactNumber").ParameterValue;
                var apiKey = paramEmail.Find(a => a.ParameterName == "ApiKey").ParameterValue;
                var email = paramEmail.Find(a => a.ParameterName == "Email").ParameterValue;
                var name = paramEmail.Find(a => a.ParameterName == "Name").ParameterValue;
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress(email, name);
                var to = new EmailAddress(receiverEmail);
                var plainTextContent = paramEmail.Find(a => a.ParameterName == "EmailPlainBody").ParameterValue;
                var htmlContent = paramEmail.Find(a => a.ParameterName == "EmailHTMLBody").ParameterValue;
                htmlContent = htmlContent.Replace("{ImageUrl}", ServerName + LogoPath);
                htmlContent = htmlContent.Replace("{Join}", ServerName + "#/Join");
                htmlContent = htmlContent.Replace("DoctorNameTitle", doctor.NameTitle);
                htmlContent= htmlContent.Replace("DoctorName", doctor.DoctorName);
                htmlContent= htmlContent.Replace("HospitalName", HospitalName);
                htmlContent = htmlContent.Replace("TodaysDate", TodaysDate);
                subject = paramEmail.Find(a => a.ParameterName == "EmailSubject").ParameterValue;
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
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
    }
}
