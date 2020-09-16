using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Persistence.Repositories
{
    public class PatientRepository:IPatientRepository
    {
        private readonly FewaDbContext _context;

        public PatientRepository(FewaDbContext context)
        {
            _context = context;
        }

        public List<Patient> getPatientList()
        {
            return _context.patients.ToList();
        }

        public Patient GetPatientByUserName(string username)
        {
            return _context.patients.Where(d => d.name == username).FirstOrDefault();
        }
        public Patient AddNewPatient(Patient patient)
        {
            _context.patients.Add(patient);
            _context.SaveChanges();
            return patient;
        }
    }
}
