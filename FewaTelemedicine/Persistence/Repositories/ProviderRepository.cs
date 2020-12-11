using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace FewaTelemedicine.Persistence.Repositories
{
    public class ProviderRepository : IProviderRepository
    {
        private readonly FewaDbContext _context;

        public ProviderRepository(FewaDbContext context)
        {
            _context = context;
        }

        public List<Provider> getProvidersList()
        {
            return _context.providers.ToList();
        }

        public Provider getProviderByUserName(string username,string practice)
        {
            return _context.providers.Where(d => d.userName == username&&d.practice==practice).FirstOrDefault();
        }
        public Provider getProviderByUserName(string practiceName, string username, [Optional] string email = "")
        {
            if (string.IsNullOrEmpty(email))
                return _context.providers.Where(d => d.userName == username&&d.practice==practiceName).FirstOrDefault();
            else
                return _context.providers.Where(a =>( a.userName == username || a.email == email)&&a.practice==practiceName).FirstOrDefault();
        }
    }
}
