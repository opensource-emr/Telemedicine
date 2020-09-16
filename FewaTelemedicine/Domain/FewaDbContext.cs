using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using Microsoft.IdentityModel.Protocols;
using System.Configuration;
using System.Data;
using Microsoft.Extensions.Configuration;

namespace FewaTelemedicine.Domain
{
   public class FewaContextFactory : IDesignTimeDbContextFactory<FewaDbContext>
    {
        // private readonly IHttpContextAccessor accessor;

        public FewaDbContext CreateDbContext(string[] args)
        {
            string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            // Build config
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();
            var connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<FewaDbContext>();
            optionsBuilder.UseNpgsql(connectionString);
            return new FewaDbContext(optionsBuilder.Options);
        }

    }


    public class FewaDbContext : DbContext
    {
        //private readonly IHttpContextAccessor accessor;

        public FewaDbContext(DbContextOptions<FewaDbContext> options)
            : base(options)
        {
            //this.accessor = httpContextAccessor;
             
        }
        public DbSet<Practice> practices { get; set; }
        public DbSet<Provider> providers { get; set; }
        public DbSet<Patient> patients { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var providerseed = Create(1, "doctor", "ajNJkHEqM5bu0szpIIhwzw==", "DefaultDoctor");
            modelBuilder.Entity<Provider>().ToTable("Provider");
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<Practice>().ToTable("Practice");
            modelBuilder.Entity<Patient>().Property(et => et.patientId)
                    .ValueGeneratedOnAdd();
            modelBuilder.Entity<Provider>().
                    HasData(providerseed); // he does not create tis table
           
        }
        public Provider Create(int _id,
                               string _userName,
                               string _password,
                               string _url)
        {
            var provider = new Provider
            {
                providerId = _id,
                userName = _userName,
                password = _password,
                roomName = Guid.NewGuid().ToString() + "-" + "name",
                url = _url
            };
            
            return provider;
        }
       
    }
}
