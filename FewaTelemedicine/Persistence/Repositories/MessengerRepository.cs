using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
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
        public MessengerRepository(ILoggerService logger)
        {
            _logger = logger;
        }

        public async Task<bool> SendEmailAsync(string subject, string message, string receiverEmail)
        {
            var bResponse = false;
            
            try
            {
                var apiKey = "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";   // hardcoded
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("ramavtar.jangid@outlook.in", "Ramavtar Jangid");       // hardcoded
                var to = new EmailAddress(receiverEmail);
                var plainTextContent = message;
                var htmlContent = message;
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
