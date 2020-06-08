using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestTele.Models;

namespace TestTele.Controllers
{
    public class StatusController : Controller
    {
        private readonly WaitingRoom _waitingroom;
        private readonly List<DoctorCabin> _doctorcabins;

        //private readonly List<Doctor> _doctors;

        public StatusController(WaitingRoom waitingroom, List<DoctorCabin> doctorcabins)
        {
            _waitingroom = waitingroom;
            _doctorcabins = doctorcabins;
            //_doctors = doctors;
        }

        public IActionResult Index()
        { 
            //ViewBag.DoctorList = _doctors;
            ViewBag.PatientList = _waitingroom.Patients;
            ViewBag.DoctorCabins = _doctorcabins;
              return View();
        }
    }
}