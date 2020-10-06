using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
            ViewBag.BaseHref = HttpContext.Request.Path;
            return View();
        }
    }
}
