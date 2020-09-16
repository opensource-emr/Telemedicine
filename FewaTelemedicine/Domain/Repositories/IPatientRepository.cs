using FewaTelemedicine.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Repositories
{
    public interface IPatientRepository
    {
        List<Patient> getPatientList();
        Patient GetPatientByUserName(string username);
        Patient AddNewPatient(Patient patient);
    }
}
