using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTele.Models
{
    public class WaitingRoom
    {
        public List<Patient> Patients { get; set; }
        public WaitingRoom()
        {
            this.Patients = new List<Patient>();
        }
    }
}
