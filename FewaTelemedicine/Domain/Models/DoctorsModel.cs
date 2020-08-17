using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Models
{

    public class DoctorsModel
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string NameTitle { get; set; }
        public string DoctorName { get; set; }
        public string Email { get; set; }
        public string Designation { get; set; }
        public string MedicalDegree { get; set; }
        public string MobileNumber { get; set; }
        public byte[] Image { get; set; }
        public string DoctorRoomName { get; set; }
        public string DoctorRoomKey { get; set; }
        public string Clinic { get; set; }
        [NotMapped]
        public string SignalRConnectionId { get; set; }
        [NotMapped]
        public string Otp { get; set; }
        [NotMapped]
        public string MeetingId { get; set; }
        [NotMapped]
        public string Message { get; set; }
        [NotMapped]
        public string Subject { get; set; }
    }
    public class DoctorCabin
    {
        public PatientsAttendedModel PatientsAttendedModel { get; set; }
        public DoctorsModel DoctorsModel { get; set; }

        public DoctorCabin()
        {
            this.PatientsAttendedModel = new PatientsAttendedModel();
            this.DoctorsModel = new DoctorsModel();
        }
    }
}
