using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TestTele
{
    public class ClinicalHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            
            return base.OnConnectedAsync();
        }
        public async Task Send(string message)
        {
            await Clients.All.SendAsync("Send", message);
        }
    }
}
