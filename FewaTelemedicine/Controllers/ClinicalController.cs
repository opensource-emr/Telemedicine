using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FewaTelemedicine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicalController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;

        public ClinicalController(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }
        [HttpPost]
        public ActionResult SendInvitation([FromBody]DoctorCabin cabin)
        {
           
            try
            {
                DoctorsModel responseData = new DoctorsModel();
               // string reqType = this.ReadQueryStringData("reqType");
                //generate meeting id
                string meetingId = cabin.DoctorsModel.Id.ToString() + DateTime.Now.ToString("MMddHHmmss");

                return Ok(meetingId);
            }
            catch (Exception )
            {

                throw;
            }
        }
        [HttpGet]
        public ActionResult Get(string MobileNumber)
        {
            try
            {
                var doctor = new DoctorsModel();
                var doc = _doctorRepository.GetDoctorByUserName(doctor.UserName);
                if (doc != null)
                {
                    return StatusCode(500, new { DoctorsModel = doc, Message = "this mobile number is already registered" });
                }
                //pat.LastUpdated = DateTime.Now;
                doctor.Otp = GenerateOtp(MobileNumber);
                doctor.MobileNumber = MobileNumber;

                //if (_waitingroom.Patients != null)
                //{
                //    if (_waitingroom.Patients.Count > 0)
                //    {
                //        pat.PatientId = _waitingroom.Patients.Count;
                //    }
                //}
                return Ok(doctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        private string GenerateOtp(string MobileNumber)
        {
            string alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string small_alphabets = "abcdefghijklmnopqrstuvwxyz";
            string numbers = "1234567890";
            string characters = alphabets + small_alphabets + numbers + MobileNumber;
            string otp = string.Empty;
            int otpLength = 10;
            for (int i = 0; i < otpLength; i++)
            {
                string character = string.Empty;
                do
                {
                    int index = new Random().Next(0, characters.Length);
                    character = characters.ToCharArray()[index].ToString();
                } while (otp.IndexOf(character) != -1);
                otp += character;
            }
            return otp;
        }
        //private DoctorsModel getPatientbyName(string mobileno)
        //{
        //   // return _waitingroom.Patients.Find(a => a.MobileNumber == mobileno);
        //   return _doctorRepository.GetDoctorByUserName(doctor.UserName);
        //}

        [HttpPost]
        public ActionResult VerifyOTP(DoctorsModel doctor)
        {

            //  var p = _waitingroom.Patients.Find(a => a.MobileNumber == pat.MobileNumber);
            // var q = _waitingroom.Patients.Find(a => a.Email == pat.Email);
            var doc = _doctorRepository.GetDoctorByUserName(doctor.UserName);
            
            if (doc != null)
            {
                if (doc.Otp == doctor.Otp)
                {
                    return Ok(new { doctor = doc, Message = "otp verified" });
                }
                else
                {
                    return Unauthorized(new { doctor = doc, Message = "invalid otp" });
                }
            }
            else
            {
                return Unauthorized(new { DoctorsModel = doc, Message = "user not found" });
            }
        }
    }
}