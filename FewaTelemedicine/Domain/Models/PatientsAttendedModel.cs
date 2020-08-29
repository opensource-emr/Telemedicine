using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Models
{
    public class PatientsAttendedModel
    {
        [Key]
        public int Id { get; set; }
        [NotMapped]
        public string PatientName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string MeetingId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int DoctorId { get; set; }
        [NotMapped]
        public string DoctorNameAttending { get; set; }
        [NotMapped]
        public int Status { get; set; }
        
        [NotMapped]
        public DateTime LastUpdated { get; set; }
        [NotMapped]
        public double TotalCheckupTime { get; set; }
        [NotMapped]
        public string Email { get; set; }
        [NotMapped]
        public string MobileNumber { get; set; }
        [NotMapped]
        public bool LabOrdersSent { get; set; }
        [NotMapped]
        public bool NewPrescriptionsSentToYourPharmacy { get; set; }
        [NotMapped]
        public bool NewPrescriptionsMailedToYou { get; set; }
        [NotMapped]
        public string FollowUpNumber { get; set; }
        [NotMapped]
        public string FollowUpMeasure { get; set; }
        [NotMapped]
        public string Message { get; set; }
        [NotMapped]
        public string Subject { get; set; }
        [NotMapped]
        public string SignalRConnectionId { get; set; }
        [NotMapped]
        public string Medication { get; set; }
        [NotMapped]
        public string VideoCallPlatform { get; set; }
    }
    public class WaitingRoom
    {
        public List<PatientsAttendedModel> Patients { get; set; }
        public WaitingRoom()
        {
            this.Patients = new List<PatientsAttendedModel>();
        }
    }
}
