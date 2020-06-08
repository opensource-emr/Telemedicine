using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTele.Models
{
    public class User
    {
        public string SignalRConnectionId { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
    }
    public class Patient : User
    {
        public int PatientId { get; set; }
        public string DoctorNameAttending { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string  Email { get; set; }
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
      /*  public bool TransPlant { get; set; }*/
        public bool Exposure { get; set; }

        public string PatientMedicalSymptoms { get; set; }
        //public string OtherPatientInformation { get; set; }
        public int Status { get; set; }
        public string Medication { get; set; }
        public DateTime LastUpdated { get; set; }
       public double TotalCheckupTime { get; set; }
    }
    
    public class Doctor : User
    {
        public string Password { get; set; }

    }

    public class DoctorCabin
    {
        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }




        public DoctorCabin()
        {
            this.Patient = new Patient();
            this.Doctor = new Doctor();
        }
    }

    public class WaitingRoom
    {
        public List<Patient> Patients { get; set; }
        public WaitingRoom()
        {
            this.Patients = new List<Patient>();
        }
    }

    public class Singleton
    {
        public int MyProperty { get; set; }
    }
    public class ChatMessage
    {
        public bool IsDoctor { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
    }
}
