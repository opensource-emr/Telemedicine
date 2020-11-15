using FewaTelemedicine.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Services
{
    public interface IMessengerService
    {

        bool SendSMS(string message, string receiverContact);
        Task<bool> SendEmailAsync(string receiverEmail);
        Task<bool> SendOTP(string receiverEmail, string otp);

        Task<bool> SendPatientReportEmailAsync(Patient patient);
    }
}
