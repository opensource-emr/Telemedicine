using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Twilio.TwiML.Voice;

namespace FewaTelemedicine.Controllers
{
    [Route("Messenger")]
    public class MessengerController : Controller
    {
        private static IMessengerService _messengerService;
        private static ILoggerService _logger;
        public MessengerController(IMessengerService messengerService, ILoggerService logger)
        {
            _messengerService = messengerService;
            _logger = logger;
        }

        //[Route("SendSMS")]
        //[HttpPost]
    
        //public bool SendSMS([FromBody]DoctorsModel sms)
        //{
        //    string meetingId = sms.Id.ToString() + DateTime.Now.ToString("MMddHHmmss");
        //    sms.MeetingId = meetingId;
        //    var  result = false;
        //    try
        //    { 
        //        if(sms is null)
        //        {
        //            return false;
        //        }
        //        if(string.IsNullOrEmpty(sms.Message)&&string.IsNullOrEmpty(sms.MobileNumber))
        //        {
        //            return false;
        //        }
        //        result = _messengerService.SendSMS(sms.Message, sms.MobileNumber);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"file: MessengerController.cs method: SendSMS() error: {ex.Message} ");
        //    }
        //    return result;
        //}

        [Route("SendEmail")]
        [HttpPost]
        public async Task<bool> SendEmail([FromBody] Patient email)
        { 
           
            try
            {
                if (email is null)
                {
                    return false;
                }
                if (string.IsNullOrEmpty(email.email))
                {
                    return false;
                }
                return await _messengerService.SendEmailAsync(email.email);
            }
            catch (Exception ex)
            {
                _logger.LogError($"file: MessengerController.cs method: SendEmail() error: {ex.Message} ");
                return false;
            }
        }
    }
}