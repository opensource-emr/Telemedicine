using FewaTelemedicine.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Repositories
{
    public interface IDoctorRepository
    {
        List<DoctorsModel> GetDoctorsList();
        DoctorsModel GetDoctorByUserName(string username);
       
    }
}
