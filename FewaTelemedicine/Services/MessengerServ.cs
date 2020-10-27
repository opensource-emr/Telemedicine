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

        public async Task<bool> SendEmailAsync(string receiverEmail)
        {
            return await this._messengerRepository.SendEmailAsync(receiverEmail);
        }
        public async Task<bool> SendPatientReportEmailAsync(Patient patient)
        {
            return await this._messengerRepository.SendPatientReportEmailAsync(patient);
        }
        public async Task<bool> SendOTP(string receiverEmail, string otp)
        {
            return await this._messengerRepository.SendOTP(receiverEmail, otp);
        }
        public bool SendSMS(string message, string receiverContact)
        {
            return this._messengerRepository.SendSMS(message, receiverContact);
        }
    }
}
