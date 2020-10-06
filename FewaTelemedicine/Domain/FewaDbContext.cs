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
            //  Seeding for provider and practice
            var providerSeed = CreateProvider(1, "provider", "FHBsjQhfB78CnRY7uVquqA==", "provider","practice");
            var providerSeed1 = CreateProvider(2, "doctor", "ajNJkHEqM5bu0szpIIhwzw==", "provider1", "practice1");
            var practiceSeed = CreatePractice(1, "practice", "1234567890", "abc@gmail.com", "Jitsi", "/img/logo.png", "https://localhost:44304/", "Welcome to the demo of Fewa. This is the place where you can put your hospital description. Fewa is a application which helps to connect doctors and patient using video. Patient can print advice , share documents with doctor and doctor also knows how much time he has given to attend the patient. To start using the demo login as username-provider,password provider , send a invitation to the patient and then both can communicate");
            var practiceSeed1 = CreatePractice(2, "practice1", "0987654321", "pqr@gmail.com", "Jitsi", "/img/logo.png", "https://localhost:44304/", "Welcome to the demo of Fewa. This is the place where you can put your hospital description. Fewa is a application which helps to connect doctors and patient using video. Patient can print advice , share documents with doctor and doctor also knows how much time he has given to attend the patient. To start using the demo login as username-doctor,password doctor , send a invitation to the patient and then both can communicate");
            modelBuilder.Entity<Provider>().ToTable("Provider");
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<Practice>().ToTable("Practice");
            modelBuilder.Entity<Patient>().Property(et => et.patientId)
                    .ValueGeneratedOnAdd();
            modelBuilder.Entity<Practice>().
                    HasData(practiceSeed, practiceSeed1);
            modelBuilder.Entity<Provider>().
                    HasData(providerSeed, providerSeed1); // he does not create tis table
           
        }
        public Provider CreateProvider(int _id,
                               string _userName,
                               string _password,
                               string _url,
                               string _practice)
        {
            var provider = new Provider
            {
                providerId = _id,
                userName = _userName,
                password = _password,
                roomName = Guid.NewGuid().ToString() + "-" + "name",
                practice=_practice,
                url = _url
            };

            return provider;
        }
        public Practice CreatePractice(int _id,
                               string _url,
                               string _contactNumber,
                               string _email,
                               string _callingPlatform,
                               string _logoPath,
                               string _serverName,
                               string _description
                               )
        {
            var _emailHtmlBody = "   <html>  " +
                                               "      <head>  " +
                                               "         <style>  " +
                                               "            .banner-color {  " +
                                               "            background-color: #eb681f!important;  " +
                                               "            }  " +
                                               "            .title-color {  " +
                                               "            color: #0066cc!important;  " +
                                               "            }  " +
                                               "            .button-color {  " +
                                               "            background-color: #0066cc!important;  " +
                                               "            }  " +
                                               "            @media screen and (min-width: 500px) {  " +
                                               "            .banner-color {  " +
                                               "            background-color: #eb681f!important;  " +
                                               "            }  " +
                                               "            .title-color {  " +
                                               "            color: black;  " +
                                               "            }  " +
                                               "            .button-color {  " +
                                               "            background-color: #0066cc!important;  " +
                                               "            }  " +
                                               "            }  " +
                                               "         </style>  " +
                                               "      </head>  " +
                                               "      <body>  " +
                                               "         <div style='background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important;height:100%!important'>  " +
                                               "            <table align='center' border='0' cellspacing='0' cellpadding='0' style='table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "               <tbody>  " +
                                               "                  <tr>  " +
                                               "                     <td align='center'>  " +
                                               "                        <center style='width:100%'>  " +
                                               "                           <table bgcolor='#FFFFFF' border='0' cellspacing='0' cellpadding='0' style='margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif' width='512'>  " +
                                               "                              <tbody style='position:absolute'>  " +
                                               "                                 <tr>  " +
                                               "                                    <td bgcolor='#F3F3F3' width='100%' style='background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec'>  " +
                                               "                                       <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important' width='100%'>  " +
                                               "                                          <tbody>  " +
                                               "                                             <tr>  " +
                                               "                                                <td align='left' valign='middle' width='50%'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'></span></td>  " +
                                               "                                                <td valign='middle' width='50%' align='right' style='padding:0 0 0 10px'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'>TodaysDate</span></td>  " +
                                               "                                                <td width='1'>&nbsp;</td>  " +
                                               "                                             </tr>  " +
                                               "                                          </tbody>  " +
                                               "                                       </table>  " +
                                               "                                    </td>  " +
                                               "                                 </tr>  " +
                                               "                                 <tr>  " +
                                               "                                    <td align='left' style='background-color:white'>  " +
                                               "                                       <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                          <tbody>  " +
                                               "                                             <tr>  " +
                                               "                                                <td width='100%'>  " +
                                               "                                                   <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                                      <tbody>  " +
                                               "                                                         <tr>  " +
                                               "                                                            <td align='center'  style='padding:20px 48px;color:#ffffff' class='banner-color'>  " +
                                               "                                                               <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                                                  <tbody>  " +
                                               "                                                                     <tr>  " +
                                               "                                                                        <td align='center' width='100%'>  " +
                                               "   																		<h1 style='padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px'>Invitation from HospitalName</h1>  " +
                                               "                                                                        </td>  " +
                                               "                                                                     </tr>  " +
                                               "                                                                  </tbody>  " +
                                               "                                                               </table>  " +
                                               "                                                            </td>  " +
                                               "                                                         </tr>  " +
                                               "                                                         <tr>  " +
                                               "                                                            <td align='center' style='padding:20px 0 10px 0'>  " +
                                               "                                                               <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "                                                                  <tbody>  " +
                                               "                                                                     <tr>  " +
                                               "   																		<td align='center' width='100%' style='padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;'>  " +
                                               "   																		<tr _ngcontent-kfm-c50<td _ngcontent-kfm-c50=''><img _ngcontent-kfm-c50='' src='{ImageUrl}' style='height: 80px;'></td></tr>  " +
                                               "   																		<h3 style='font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;' class='title-color'>Hi, This is <strong>DoctorNameTitle &nbsp;&nbsp;DoctorName</strong></h3>  " +
                                               "                                                                           <p style='margin: 20px 0 30px 0;font-size: 15px;text-align: center;'>EmailAdditionalContent &nbsp;</p>" +
                                               "                                                                           <p style='margin: 20px 0 30px 0;font-size: 15px;text-align: center;'>Please click this following button to join me for a secure video meeting <b>Join now</b>!</p>  " +
                                               "                                                                           <div style='font-weight: 200; text-align: center; margin: 25px;'><a style='padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold' class='button-color' href='{Join}'>Join the conference</a></div>  " +
                                               "                                                                        </td>  " +
                                               "                                                                     </tr>  " +
                                               "                                                                  </tbody>  " +
                                               "                                                               </table>  " +
                                               "   															<table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;font-family:Helvetica,Arial,sans-serif' width='100%'>  " +
                                               "   																<tbody>  " +
                                               "   																	<tr>  " +
                                               "   																		<td align='center' valign='middle' width='100%' style='border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px'>Regards,  " +
                                               "   																			<br><b>Powered by © Fewa Telehealth 2020</b>  " +
                                               "   																		</td>  " +
                                               "   																	</tr>  " +
                                               "   																</tbody>  " +
                                               "   															</table>  " +
                                               "                                                            </td>  " +
                                               "                                                         </tr>  " +
                                               "                                                      </tbody>  " +
                                               "                                                   </table>  " +
                                               "                                                </td>  " +
                                               "                                             </tr>  " +
                                               "                                          </tbody>  " +
                                               "                                       </table>  " +
                                               "                                    </td>  " +
                                               "                                 </tr>  " +
                                               "                                 <tr>  " +
                                               "                                  " +
                                               "                                 </tr>  " +
                                               "   							   <tr>  " +
                                               "                                    <td bgcolor='#F3F3F3' width='100%' style='background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec'>  " +
                                               "                                       <table border='0' cellspacing='0' cellpadding='0' style='font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important' width='100%'>  " +
                                               "                                          <tbody>  " +
                                               "                                             <tr>  " +
                                               "   												<td align='left' valign='middle' width='50%'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'></span></td>  " +
                                               "                                                <td valign='middle' width='50%' align='right' style='padding:0 0 0 10px'><span style='margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px'></span></td>  " +
                                               "                                                <td width='1'>&nbsp;</td>  " +
                                               "                                             </tr>  " +
                                               "                                          </tbody>  " +
                                               "                                       </table>  " +
                                               "                                    </td>  " +
                                               "                                 </tr>  " +
                                               "                              </tbody>  " +
                                               "                           </table>  " +
                                               "                        </center>  " +
                                               "                     </td>  " +
                                               "                  </tr>  " +
                                               "               </tbody>  " +
                                               "            </table>  " +
                                               "         </div>  " +
                                               "      </body>  " +
                                               "  </html>  ";
            var practice = new Practice
            {
                practiceId = _id,
                url = _url,
                contactNumber = _contactNumber,
                email = _email,
                callingPlatform = _callingPlatform,
                logoPath = _logoPath,
                serverName = _serverName,
                description = _description,
                emailHtmlBody = _emailHtmlBody
            };
            
            return practice;
        }
       
    }
}
