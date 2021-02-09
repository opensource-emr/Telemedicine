using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Services
{
    public class MessengerServ : IMessengerService
    {
        private readonly IMessengerRepository _messengerRepository;
        public MessengerServ(IMessengerRepository messengerRepository)
        {
            this._messengerRepository = messengerRepository;
        }

        public async Task<bool> SendEmailAsync(string receiverEmail,string provider, string hostname = "")
        {
            return await this._messengerRepository.SendEmailAsync(receiverEmail, provider, hostname);
        }
        public async Task<bool> SendPatientReportEmailAsync(Patient patient, string hostname = "")
        {
            return await this._messengerRepository.SendPatientReportEmailAsync(patient, hostname);
        }
        public async Task<bool> SendContactUsEmailAsync(ContactUs contactUs, string hostname = "")
        {
            return await this._messengerRepository.SendContactUsEmailAsync(contactUs, hostname);
        }
        public async Task<bool> SendOTP(int practiceId,string receiverEmail, string otp, string hostname = "")
        {
            return await this._messengerRepository.SendOTP(practiceId,receiverEmail, otp, hostname);
        }
        public async Task<bool> SendRegistrationOTP(string name,string receiverEmail, string otp, string hostname = "")
        {
            return await this._messengerRepository.SendRegistrationOTP(name,receiverEmail, otp, hostname);
        }
        public bool SendSMS(string message, string receiverContact)
        {
            return this._messengerRepository.SendSMS(message, receiverContact);
        }
    }
}
