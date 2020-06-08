using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;

namespace TestTele.Controllers
{
    public class HomeController : Controller
    {
        public IConfiguration Configuration { get; }

        private readonly IHubContext<NotificationHub,INotificationHub> _notify;

        public HomeController(IConfiguration _configuration, IHubContext<NotificationHub,INotificationHub> notify)
        {
            Configuration = _configuration;
            _notify = notify;
        }
        public IActionResult Index()
        {
            ViewData["HospitalName"] = Configuration["HospitalName"];
            return View();
        }
    }
}