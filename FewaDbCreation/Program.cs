using FewaTelemedicine.Domain;

using System;
using Microsoft.Extensions.Configuration;

using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FewaDbCreation
{
    class Program
    {
       
        static void Main(string[] args)
        {

            Console.Write("Are you sure you want to run database migration? [y/n] ");
            string option = Console.ReadLine();

            if (option == "y")
            {
               // Console.WriteLine("yes");
               // string bilConString = ConfigurationManager.ConnectionStrings["fewadb"].ConnectionString;
                IDesignTimeDbContextFactory<FewaDbContext> factory = new FewaContextFactory();
                var ctx = factory.CreateDbContext(new string[0]);
                ctx.Database.Migrate();
                ctx.Dispose();
                Console.WriteLine("You have successfully migrated database");
            }
            else
            {
                Console.WriteLine("No");
            }

        }
    }
}
