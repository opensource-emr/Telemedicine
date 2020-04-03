using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTele.Models
{
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
}
