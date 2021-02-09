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
        public DbSet<ProviderAdvice> advices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //  Seeding for provider and practice
            var practiceSeed = CreatePractice(1, "practice", "1234567890", "abc@gmail.com", "Jitsi", "/img/logo.png", "Fewa Telemedicine Call Today Schedule", "Please attend the provider", "EmailAdditionalContent");
            var providerSeed = CreateProvider(1, "provider", "FHBsjQhfB78CnRY7uVquqA==", "provider", "practice", 1);
            var practiceSeed1 = CreatePractice(2, "practice1", "0987654321", "pqr@gmail.com", "Jitsi", "/img/logo.png", "Fewa Telemedicine Call Today Schedule", "Please attend the provider", "EmailAdditionalContent");
            var providerSeed1 = CreateProvider(2, "doctor", "ajNJkHEqM5bu0szpIIhwzw==", "provider1", "practice1", 2);
            var provideradviceSeed = CreateProviderAdvice(1, "Lab Orders Sent", " ", 1, 1);
            var provideradviceSeed1 = CreateProviderAdvice(2, "New prescriptions sent to your pharmacy", " ", 1, 1);
            var provideradviceSeed2 = CreateProviderAdvice(3, "New prescriptions mailed to you", " ", 1, 1);
            modelBuilder.Entity<Practice>().ToTable("Practice");
            modelBuilder.Entity<Provider>().ToTable("Provider");
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<ProviderAdvice>().ToTable("ProviderAdvice");
            modelBuilder.Entity<Practice>().HasIndex(b => b.url).IsUnique();
            modelBuilder.Entity<Practice>().HasData(practiceSeed, practiceSeed1);
            modelBuilder.Entity<Provider>().HasData(providerSeed, providerSeed1); // he does not create this table
            modelBuilder.Entity<ProviderAdvice>().HasData(provideradviceSeed, provideradviceSeed1, provideradviceSeed2);
            modelBuilder.Entity<ProviderAdvice>().Property(et => et.adviceId).ValueGeneratedOnAdd();
            modelBuilder.Entity<ProviderAdvice>().Property(e => e.isChecked).HasColumnType("boolean").HasDefaultValueSql("false").ValueGeneratedOnAdd();
            modelBuilder.Entity<Patient>().Property(et => et.patientId).ValueGeneratedOnAdd();
            modelBuilder.Entity<Practice>().Property(et => et.practiceId).ValueGeneratedOnAdd();
            modelBuilder.Entity<Provider>().Property(et => et.providerId).ValueGeneratedOnAdd();
            modelBuilder.Entity<ProviderAdvice>().Property(et => et.adviceId).ValueGeneratedOnAdd();
        }
        public Provider CreateProvider(int _id,
                               string _userName,
                               string _password,
                               string _url,
                               string _practice,
                               int _practiceId)
        {
            var provider = new Provider
            {
                providerId = _id,
                userName = _userName,
                password = _password,
                roomName = Guid.NewGuid().ToString() + "-" + "name",
                practice = _practice,
                url = _url,
                practiceId = _practiceId
            };
            return provider;
        }
        public Practice CreatePractice(int _id,
                               string _url,
                               string _contactNumber,
                               string _email,
                               string _callingPlatform,
                               string _logoPath,
                               //string _serverName,
                               // string _description,
                               string _emailSubject,
                               string _emailPlainBody,
                               string _emailAdditionalContent
                               )
        {


            var practice = new Practice
            {
                practiceId = _id,
                url = _url,
                contactNumber = _contactNumber,
                email = _email,
                callingPlatform = _callingPlatform,
                logoPath = _logoPath,
                //serverName = _serverName,
                description = FewaDbContext._description,
                emailHtmlBody = FewaDbContext._emailHtmlBody,
                emailSubject = _emailSubject,
                emailPlainBody = _emailPlainBody,
                emailAdditionalContent = _emailAdditionalContent

            };

            return practice;
        }
        public ProviderAdvice CreateProviderAdvice(int _id,
                               string _advice,
                               string _inputType,
                               int _providerId,
                               int _practiceId)
        {
            var providerAdvice = new ProviderAdvice
            {
                adviceId = _id,
                advice = _advice,
                inputType = _inputType,
                providerId = _providerId,
                practiceId = _practiceId,

            };
            return providerAdvice;
        }
        public static string _advice1 = "Lab Orders Sent";
        public static string _advice2 = "New prescriptions sent to your pharmacy";
        public static string _advice3 = "New prescriptions mailed to you";
        public static string _description = "Welcome to the demo of Fewa. This is the place where you can put your practice description. Fewa is a application which helps to connect providers and patient using video. Patient can print advice , share documents with provider and provider also knows how much time he has given to attend the patient. Send a invitation to the patient and then both can communicate";
        public static string _emailHtmlBody = "   <!DOCTYPE html>  " +
                                 "   <html lang='en'>  " +
                                 "     " +
                                 "   <head>  " +
                                 "       <meta charset='UTF-8'>  " +
                                 "       <meta name='viewport' content='width=device-width, initial-scale=1.0'>  " +
                                 "       <title>Fema mailer</title>  " +
                                 "       <link href=“https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800” rel=“stylesheet”>  " +
                                 "     " +
                                 "       <style type='text/css'>  " +
                                 "           body {  " +
                                 "               margin: 0 !important;  " +
                                 "               padding: 0 !important;  " +
                                 "               -webkit-text-size-adjust: 100% !important;  " +
                                 "               -ms-text-size-adjust: 100% !important;  " +
                                 "               -webkit-font-smoothing: antialiased !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           img {  " +
                                 "               border: 0 !important;  " +
                                 "               outline: none !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           p {  " +
                                 "               Margin: 0px !important;  " +
                                 "               Padding: 0px !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           table {  " +
                                 "               border-collapse: collapse;  " +
                                 "               mso-table-lspace: 0px;  " +
                                 "               mso-table-rspace: 0px;  " +
                                 "           }  " +
                                 "     " +
                                 "           td,  " +
                                 "           a,  " +
                                 "           span {  " +
                                 "               border-collapse: collapse;  " +
                                 "               mso-line-height-rule: exactly;  " +
                                 "           }  " +
                                 "     " +
                                 "           .ExternalClass * {  " +
                                 "               line-height: 100%;  " +
                                 "           }  " +
                                 "     " +
                                 "           .em_defaultlink a {  " +
                                 "               color: inherit !important;  " +
                                 "               text-decoration: none !important;  " +
                                 "           }  " +
                                 "     " +
                                 "           span.MsoHyperlink {  " +
                                 "               mso-style-priority: 99;  " +
                                 "               color: inherit;  " +
                                 "           }  " +
                                 "     " +
                                 "           span.MsoHyperlinkFollowed {  " +
                                 "               mso-style-priority: 99;  " +
                                 "               color: inherit;  " +
                                 "           }  " +
                                 "     " +
                                 "           @media only screen and (min-width:481px) and (max-width:699px) {  " +
                                 "               .em_main_table {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_wrapper {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_hide {  " +
                                 "                   display: none !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_img {  " +
                                 "                   width: 100% !important;  " +
                                 "                   height: auto !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_h20 {  " +
                                 "                   height: 20px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_padd {  " +
                                 "                   padding: 20px 10px !important;  " +
                                 "               }  " +
                                 "           }  " +
                                 "     " +
                                 "           @media screen and (max-width: 480px) {  " +
                                 "               .em_main_table {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_wrapper {  " +
                                 "                   width: 100% !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_hide {  " +
                                 "                   display: none !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_img {  " +
                                 "                   width: 100% !important;  " +
                                 "                   height: auto !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_h20 {  " +
                                 "                   height: 20px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_padd {  " +
                                 "                   padding: 20px 10px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               .em_text1 {  " +
                                 "                   font-size: 16px !important;  " +
                                 "                   line-height: 24px !important;  " +
                                 "               }  " +
                                 "     " +
                                 "               u+.em_body .em_full_wrap {  " +
                                 "                   width: 100% !important;  " +
                                 "                   width: 100vw !important;  " +
                                 "               }  " +
                                 "           }  " +
                                 "       </style>  " +
                                 "     " +
                                 "   </head>  " +
                                 "     " +
                                 "   <body style='margin:0px; padding:0px;'' bgcolor=' #efefef'>  " +
                                 "       <table align='center' width='700' border='0' cellspacing='0' cellpadding='0' class='em_main_table'" +
                                 "           style='width:700px;'>  " +
                                 "           <tr>  " +
                                 "               <td style='padding:25px;' class='em_padd' valign='top' bgcolor='#fff' align='center'>  " +
                                 "                   <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center' >  " +
                                 "                       <tbody>  " +
                                 "                           <tr>  " +
                                 "                               <td bgcolor='white' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:21px; line-height:15px;font-weight: 600; color:#20325F;' valign='top' align='center'>practiceName</td>  " +
                                 "                           </tr>  " +
                                 "                       </tbody>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center' bgcolor='white'>  " +
                                 "                   <table width='100%' cellspacing='0' cellpadding='0' border='0' align='center'>  " +
                                 "                       <tbody>  " +
                                 "                           <tr>  " +
                                 "                               <td valign='top' align='center' bgcolor='white' ><img class='em_img' alt='hospital_logo'  " +
                                 "                                       style='display:block; font-family:Arial, sans-serif; font-size:30px; line-height:34px; color:#000000; max-width:700px;'  " +
                                 "                                       src='{imageUrl}' width='700' border='0' height='190'></td>  " +
                                 "                           </tr>  " +
                                 "                       </tbody>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center' bgcolor='#fff' style='padding:35px 70px 30px;' class='em_padd'>  " +
                                 "                   <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top' bgcolor='white'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:20px;font-weight: 600; line-height:30px; color:#20325F;'>  " +
                                 "                               Invitation to Join Conference</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='15' bgcolor='white' style='font-size:0px; line-height:0px; height:15px;'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='left' valign='top' bgcolor='white'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:16px; line-height:22px;font-weight: 600; color:#000; letter-spacing:2px; padding-bottom:12px;'>  " +
                                 "                               Hi PatientEmail,  " +
                                 "                           </td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='5' class='em_h20' bgcolor='white' style='font-size:0px; line-height:0px; height:5px;'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='left' valign='top' bgcolor='white' " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:16px; line-height:22px; color:#666;padding-bottom:12px;'>  " +
                                 "                               I’m <b style='color:#000;'>providerNameTitle providerName</b>, Please click following button to join me for a secure video meeting join now!</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='5' class='em_h20' bgcolor='white' style='font-size:0px; line-height:0px; height:5px;'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top' bgcolor='white'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:18px; line-height:22px;padding-bottom:12px;'>  " +
                                 "                               <a href='{join}'style='display:inline-block;background:#20325F;font-weight:600;font-family:\"Open Sans\", Arial, sans-serif;font-size: 15px;text-transform:uppercase;color: #fff;text-decoration: none;padding: 10px 50px;border-radius: 30px;'>Click to join</a>  " +
                                 "                               </td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='15' class='em_h20' style='font-size:0px; line-height:0px; height:15px;' bgcolor='white'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr >  " +
                                 "                           <td align='left' valign='top' bgcolor='white'" +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:16px;" +
                                 "                              line-height:22px;color:#666;padding-bottom:12px;' id='edit'>" +
                                 "                               EmailAdditionalContent</td>  " +
                                 "                       </tr>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center' bgcolor='#f4f7ff' style='padding:38px 30px;' class='em_padd'>  " +
                                 "                   <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top' colspan='3' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:20px;font-weight: 600; line-height:30px; color:#20325F;'>How Its Work</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td height='20' class='em_h20' colspan='3' style='font-size:0px; line-height:0px; height:20px;'>&nbsp;</td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top'>  " +
                                 "                               <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                   <tr>  " +
                                 "                                       <td align='center' valign='top'><img src='{serverName}/img/Ellipse-34.png'></td>  " +
                                 "                                   </tr>  " +
                                 "                                   <tr>  " +
                                 "                                       <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:30px; color:#000;'>Join Conference</td>  " +
                                 "                                   </tr>  " +
                                 "                               </table>  " +
                                 "                           </td>  " +
                                 "                           <td align='center' valign='top'>  " +
                                 "                               <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                   <tr>  " +
                                 "                                       <td align='center' valign='top'><img src='{serverName}/img/Ellipse-35.png'></td>  " +
                                 "                                   </tr>  " +
                                 "                                   <tr>  " +
                                 "                                       <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:24px; color:#000;'>Communicates<br>with Doctor</td>  " +
                                 "                                   </tr>  " +
                                 "                               </table>  " +
                                 "                           </td>  " +
                                 "                           <td align='center' valign='top'>  " +
                                 "                               <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                   <tr>  " +
                                 "                                       <td align='center' valign='top'><img src='{serverName}/img/Ellipse-36.png'></td>  " +
                                 "                                   </tr>  " +
                                 "                                   <tr>  " +
                                 "                                       <td align='center' valign='top' style='font-family:\"Open Sans\", Arial, sans-serif; font-size:17px;line-height:24px; color:#000;'>chat with doctor<br>to Patient </td>  " +
                                 "                                   </tr>  " +
                                 "                               </table>  " +
                                 "                           </td>  " +
                                 "                       </tr>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "           <tr>  " +
                                 "               <td valign='top' align='center' bgcolor='#20325f' style='padding:38px 30px;' class='em_padd'>  " +
                                 "                   <table align='center' width='100%' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                       <tr>  " +
                                 "                           <td valign='top' align='center' bgcolor='#20325f' style='padding-bottom:16px;'>  " +
                                 "                               <table align='center' border='0' cellspacing='0' cellpadding='0'>  " +
                                 "                                   <tr>  " +
                                 "                                       <td valign='top' align='center' bgcolor='#20325f'><a href='#' target='_blank'  " +
                                 "                                               style='text-decoration:none;'><img src='{serverName}/img/twitter.png' alt='fb'  " +
                                 "                                                   style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px;'  " +
                                 "                                                   border='0' width='26' height='26' /></a></td>  " +
                                 "                                       <td width='6' style='width:6px;' bgcolor='#20325f'>&nbsp;</td>  " +
                                 "                                       <td valign='top' align='center' bgcolor='#20325f'><a href='#' target='_blank'  " +
                                 "                                               style='text-decoration:none;'><img src='{serverName}/img/linkedin.png' alt='tw'  " +
                                 "                                                   style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px'  " +
                                 "                                                   border='0' width='27' height='26' /></a></td>  " +
                                 "                                       <td width='6' style='width:6px;' bgcolor='#20325f'>&nbsp;</td>  " +
                                 "                                       <td valign='top' align='center'bgcolor='#20325f' ><a href='#' target='_blank'  " +
                                 "                                               style='text-decoration:none;'><img src='{serverName}/img/rss.png' alt='yt'  " +
                                 "                                                   style='display:block; font-family:Arial, sans-serif; font-size:14px; line-height:14px; color:#ffffff; max-width:20px;margin-right: 15px;max-height: 20px'  " +
                                 "                                                   border='0' width='26' height='26' /></a></td>  " +
                                 "                                   </tr>  " +
                                 "                               </table>  " +
                                 "                           </td>  " +
                                 "                       </tr>  " +
                                 "                       <tr>  " +
                                 "                           <td align='center' valign='top'  " +
                                 "                               style='font-family:\"Open Sans\", Arial, sans-serif; font-size:11px; line-height:18px; color:#fff;'>  " +
                                 "                               <a href='#' target='_blank' style='color:#fff; text-decoration:underline;'>PRIVACY  " +
                                 "                                   STATEMENT</a> | <a href='#' target='_blank'  " +
                                 "                                   style='color:#fff; text-decoration:underline;'>TERMS OF SERVICE</a> | <a href='#'  " +
                                 "                                   target='_blank' style='color:#fff; text-decoration:underline;'>RETURNS</a><br />  " +
                                 "                               &copy; 2020 Fewa Telemedicine. All Rights Reserved.<br />  " +
                                 "                               If you do not wish to receive any further emails from us, please <a href='#' target='_blank'  " +
                                 "                                   style='text-decoration:none; color:#fff;'>unsubscribe</a></td>  " +
                                 "                       </tr>  " +
                                 "                   </table>  " +
                                 "               </td>  " +
                                 "           </tr>  " +
                                 "       </table>  " +
                                 "   </body>  " +
                                 "     " +
                                 "  </html>  ";
    }
}
