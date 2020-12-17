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

        //public Provider getProviderByUserName(string username,string practice)
        //{
        //    return _context.providers.Where(d => d.userName == username&&d.practice==practice).FirstOrDefault();
        //}
        public Provider getProviderByUserName(string practiceName, string username, string email = "")
        {
            if (string.IsNullOrEmpty(email))
                return _context.providers.Where(d => d.userName.ToLower().Trim() == username.ToLower().Trim() && d.practice.ToLower().Trim()==practiceName.ToLower().Trim()).FirstOrDefault();
            else
                return _context.providers.Where(a =>( a.userName.ToLower().Trim() == username.ToLower().Trim() || a.email == email)&&a.practice.ToLower().Trim() == practiceName.ToLower().Trim()).FirstOrDefault();
        }
    }
}
