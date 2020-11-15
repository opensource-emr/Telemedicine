using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Twilio.TwiML.Voice;

namespace FewaTelemedicine.Controllers
{
    [Route("Messenger")]
    public class MessengerController : Controller
    {
        private static IMessengerService _messengerService;
        private static ILoggerService _logger;
        private readonly IProviderRepository _providerRepo;

        public MessengerController(IMessengerService messengerService, 
                                   ILoggerService logger,
                                    IProviderRepository providerRepo)
        {
            _messengerService = messengerService;
            _logger = logger;
            _providerRepo = providerRepo;
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

        [Route("EmailPatientReport")]
        [HttpPost]
        public async Task<bool> SendEmailPatientReport([FromBody] Patient email)
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
                return await _messengerService.SendPatientReportEmailAsync(email);
            }
            catch (Exception ex)
            {
                _logger.LogError($"file: MessengerController.cs method: SendEmailPatientReport() error: {ex.Message} ");
                return false;
            }
        }


        [Route("SendOTP")]
        [HttpPost]
        public async Task<bool> SendOTP([FromBody] Provider obj)
        {

            try
            {
                if (obj is null)
                {
                    return false;
                }
                //get provider by username or email
                Provider provider = _providerRepo.getProviderByUserName(obj.email, obj.email);
                if (provider == null)
                {
                    return false;
                }
                if (!string.IsNullOrEmpty(provider.email))
                {
                    provider.otp = GenerateOtp(provider.email);
                    var result = await _messengerService.SendOTP(provider.email, provider.otp);
                    if (result == true)
                    {
                        HttpContext.Session.SetString("otp", JsonConvert.SerializeObject(provider));
                    }
                    return result;
                }
                else
                {
                    provider.otp = GenerateOtp(provider.userName);
                    var result = await _messengerService.SendOTP(provider.userName, provider.otp);
                    if (result == true)
                    {
                        HttpContext.Session.SetString("otp", JsonConvert.SerializeObject(provider));
                    }
                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"file: MessengerController.cs method: SendEmail() error: {ex.Message} ");
                return false;
            }
        }
        [Route("ResendOTP")]
        [HttpGet]
        public async Task<bool> ResendOTP()
        {

            try
            {
                Provider pro = JsonConvert.DeserializeObject<Provider>(HttpContext.Session.GetString("otp"));
                if (pro == null)
                {
                    return false;
                }
                //get provider by username or email
                Provider provider = _providerRepo.getProviderByUserName(pro.userName);
                if (provider == null)
                {
                    return false;
                }

                if (pro.email == provider.email || provider.userName == pro.userName)
                {
                    var result = await _messengerService.SendOTP(pro.email, pro.otp);
                    return result;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"file: MessengerController.cs method: SendEmail() error: {ex.Message} ");
                return false;
            }
        }
        private string GenerateOtp(string plainText)
        {
            string alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string small_alphabets = "abcdefghijklmnopqrstuvwxyz";
            string numbers = "1234567890";
            string characters = alphabets + small_alphabets + numbers + plainText;
            string otp = string.Empty;
            int otpLength = 6;
            for (int i = 0; i < otpLength; i++)
            {
                string character = string.Empty;
                do
                {
                    int index = new Random().Next(0, characters.Length);
                    character = characters.ToCharArray()[index].ToString();
                } while (otp.IndexOf(character) != -1);
                otp += character;
            }
            HttpContext.Session.SetString("otp", otp);
            return otp;
        }
    }
}
