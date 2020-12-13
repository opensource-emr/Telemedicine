using FewaTelemedicine.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Repositories
{
    public interface IProviderRepository
    {
        List<Provider> getProvidersList();
        Provider getProviderByUserName(string practiceName,string username, string email = "");
    }
}
