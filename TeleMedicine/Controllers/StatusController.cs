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
        private readonly DoctorCabin _doctorcabin;

        public StatusController(WaitingRoom waitingroom, DoctorCabin doctorcabin)
        {
            _waitingroom = waitingroom;
            _doctorcabin = doctorcabin;
        }

        public IActionResult Index()
        {
            ViewBag.DoctorCabin = _doctorcabin.Doctor;
            ViewBag.PatientList = _waitingroom.Patients;
            ViewBag.DoctorCabinPatient = _doctorcabin.Patient;
            return View();
        }
    }
}