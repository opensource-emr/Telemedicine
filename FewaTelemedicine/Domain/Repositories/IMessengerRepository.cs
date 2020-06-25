using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Repositories
{
    public interface IMessengerRepository
    {
        bool SendSMS(string message, string receiverContact);
        Task<bool> SendEmailAsync(string subject, string message, string receiverEmail);
    }
}
        