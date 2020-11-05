using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public Provider getProviderByUserName(string username)
        {
            return _context.providers.Where(d => d.userName == username).FirstOrDefault();
        }
        public Provider getProviderByUserName(string username, string email = "")
        {
            if (string.IsNullOrEmpty(email))
                return _context.providers.Where(d => d.userName == username).FirstOrDefault();
            else
                return _context.providers.Where(a => a.userName == username || a.email == email).FirstOrDefault();
        }
    }
}
