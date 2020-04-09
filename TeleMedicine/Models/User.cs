using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTele.Models
{
    public class Patient
    {
        public int PatientId { get; set; }
        public string PatientName { get; set; }

        public string Age { get; set; }
        public string Sex { get; set; }
        public string  Email { get; set; }
        public string MobileNumber { get; set; }
        public string Address { get; set; }
        public bool Fever { get; set; }
        public bool Cough { get; set; }
        public bool BreathingDifficulty { get; set; }
        public bool Tiredness { get; set; }
        public bool SoreThroat { get; set; }
        public bool Bodyache { get; set; }
        public bool ChestPain { get; set; }
        public bool Diarrhea { get; set; }
        public string AnyOtherSymptoms { get; set; }
        public bool HeartDisease { get; set; }
        public bool HighBloodPressure { get; set; }
        public bool Diabetes { get; set; }
        public bool Copd { get; set; }
        public bool Transplant { get; set; }
        public bool RecentTravel { get; set; }
        public bool Cancer { get; set; }
        public bool TransPlant { get; set; }
        public bool Exposure { get; set; }

        public string PatientMedicalSymptomps { get; set; }
        public string OtherPatientInformation { get; set; }
        public int Status { get; set; }
        public string Medication { get; set; }
        public DateTime LastUpdated { get; set; }
    }
    
    public class Doctor
    {
        public string DoctorName { get; set; }
        public string Password { get; set; }
    }
}
