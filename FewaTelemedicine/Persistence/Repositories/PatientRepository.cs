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

        public List<PatientsAttendedModel> GetPatientList()
        {
            return _context.PatientsAttendedModels.ToList();
        }

        public PatientsAttendedModel GetPatientByUserName(string username)
        {
            return _context.PatientsAttendedModels.Where(d => d.PatientName == username).FirstOrDefault();
        }
        public PatientsAttendedModel AddNewPatient(PatientsAttendedModel patient)
        {
            _context.PatientsAttendedModels.Add(patient);
            _context.SaveChanges();
            return patient;
        }
    }
}
