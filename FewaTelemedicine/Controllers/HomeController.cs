using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
namespace FewaTelemedicine.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            ViewBag.BaseHref = "/";
        }

        public IActionResult Index()
        {
            var session =HttpContext.Session.GetString("admin");
            int count= HttpContext.Request.Path.Value.Count(x => (x == '/'));
            if (session != null && count ==1)
            {
                ViewBag.BaseHref = HttpContext.Request.Path + session;
                HttpContext.Session.Remove("admin");
            }
            //else if(count==3) ViewBag.BaseHref = HttpContext.Request.Path.Value.Replace("/favicon.ico", "/");
            else ViewBag.BaseHref = HttpContext.Request.Path;
            return View();
        }
    }
}
