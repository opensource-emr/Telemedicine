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
        public string  Problem { get; set; }
        public bool Fever { get; set; }
        public bool Cough { get; set; }
        public bool Breathing { get; set; }
        public bool TiredNess { get; set; }
        public string Medication { get; set; }
        public int Status { get; set; }

        public DateTime LastUpdated { get; set; }
    }
    
    public class Doctor
    {
        public string DoctorName { get; set; }
        public string Password { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
