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

        public async Task<bool> SendEmailAsync(string receiverEmail)
        {
            var bResponse = false;
            try
            {
                var pra = accessor.HttpContext.Session.GetString("practice");
                var username = accessor.HttpContext.Session.GetString("name");
                Practice practice = FewaDbContext.practices.Where(a => a.url == pra).FirstOrDefault();
 
               
                var provider = _providerRepository.getProviderByUserName(username);
                var TodaysDate =DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss");
                var client = new SendGridClient(practice.emailApiKey);
                var from = new EmailAddress(practice.email);
                var to = new EmailAddress(receiverEmail);
                var htmlContent = practice.emailHtmlBody;
                htmlContent = htmlContent.Replace("{ImageUrl}", practice.serverName + practice.logoPath);
                htmlContent = htmlContent.Replace("{Join}", practice.serverName+provider.practice+"/"+provider.url + "/#/Join");
                htmlContent = htmlContent.Replace("ProviderNameTitle", provider.nameTitle);
                htmlContent = htmlContent.Replace("ProviderName", provider.name);
                htmlContent= htmlContent.Replace("PracticeName", practice.name);
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
    }
}
