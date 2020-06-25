using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Persistence.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly FewaDbContext _context;

        public DoctorRepository(FewaDbContext context)
        {
            _context = context;
        }

        public List<DoctorsModel> GetDoctorsList()
        {
            return _context.DoctorsModels.ToList();
        }

        public DoctorsModel GetDoctorByUserName(string username)
        {
            return _context.DoctorsModels.Where(d => d.UserName == username).FirstOrDefault();
        }
    }
}
