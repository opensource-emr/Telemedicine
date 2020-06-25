using FewaTelemedicine.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain
{
    public class FewaContextFactory : IDesignTimeDbContextFactory<FewaDbContext>
    {
        public FewaDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<FewaDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;User Id=postgres;Password=password@123;Database=Fewa_Telemedicine");

            return new FewaDbContext(optionsBuilder.Options);
        }

        
    }

    public class FewaDbContext : DbContext
    {
        
        public FewaDbContext(DbContextOptions<FewaDbContext> options)
            : base(options)
        {
        }
        public DbSet<DoctorsModel> DoctorsModels { get; set; }
        public DbSet<PatientsAttendedModel> PatientsAttendedModels { get; set; }
        public DbSet<ParametersModel> ParametersModels { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DoctorsModel>().ToTable("mst_Doctors");
            modelBuilder.Entity<PatientsAttendedModel>().ToTable("txn_Patients_Attended");
            modelBuilder.Entity<PatientsAttendedModel>().Property(et => et.Id)
                    .ValueGeneratedOnAdd();
            modelBuilder.Entity<ParametersModel>().ToTable("mst_Parameters");
            // Default user name and password
            modelBuilder.Entity<DoctorsModel>().HasData(new DoctorsModel
            {UserName = "shiv",Password = "pass"}
            );
        }
    }
}
