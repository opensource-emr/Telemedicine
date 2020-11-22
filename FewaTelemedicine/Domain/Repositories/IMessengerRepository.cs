using FewaTelemedicine.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Repositories
{
    public interface IMessengerRepository
    {
        bool SendSMS(string message, string receiverContact);
        Task<bool> SendEmailAsync(string receiverEmail, string hostname = "");
        Task<bool> SendOTP(string receiverEmail, string otp, string hostname = "");
        Task<bool> SendPatientReportEmailAsync(Patient patient, string hostname = "");
    }
}
