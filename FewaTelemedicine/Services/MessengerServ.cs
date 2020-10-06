using FewaTelemedicine.Domain.Repositories;
using FewaTelemedicine.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Services
{
    public class MessengerServ: IMessengerService
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

        public bool SendSMS(string message, string receiverContact)
        {
            return this._messengerRepository.SendSMS(message, receiverContact);
        }
    }
}
