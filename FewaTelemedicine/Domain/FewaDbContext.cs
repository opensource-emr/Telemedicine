using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using Microsoft.AspNetCore.Http;
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
       // private readonly IHttpContextAccessor accessor;


        public FewaDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<FewaDbContext>();
            optionsBuilder.UseNpgsql("Server=localhost;Database=fewatelemedicine;Port=5432;User Id=postgres;Password=password@123");
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
            { Id = 1, UserName = "doctor", Password = "doctor" }
            );

            // Filling the parameter table with default names
             modelBuilder.Entity<ParametersModel>().HasData(
                        new
                        {
                            Id = 1,
                            ParameterGroupName = "Hospital",
                            ParameterName = "Name",
                            ParameterValue = "Fewa Telemedicine",
                            ValueDataType = "string"
                        },
                        new
                        {
                            Id = 2,
                            ParameterGroupName = "Hospital",
                            ParameterName = "Description",
                            ParameterValue = "..Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem facilis aliquam veritatis, quam debitis beatae quaerat id totam dolor, ipsa dolorum, at iusto. Explicabo numquam, nostrum iste voluptatem maiores.",
                            ValueDataType = "string"
                        },
                        new
                        {
                            Id = 3,
                            ParameterGroupName = "Hospital",
                            ParameterName = "ContactNumber",
                            ParameterValue = "98465175",
                            ValueDataType = "string"
                        },
                        new
                        {
                            Id = 4,
                            ParameterGroupName = "Hospital",
                            ParameterName = "Email",
                            ParameterValue = "shivkoirala@outlook.com",
                            ValueDataType = "string"
                        },
                        new
                        {
                            Id = 5,
                            ParameterGroupName = "Hospital",
                            ParameterName = "LogoPath",
                            ParameterValue = "img/logo.png",
                            ValueDataType = "string"
                        },                     
                         new
                         {
                             Id = 6,
                             ParameterGroupName = "EmailAPI",
                             ParameterName = "ApiKey",
                             ParameterValue = "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",
                             ValueDataType = "string"
                         },
                        new
                        {
                            Id = 7,
                            ParameterGroupName = "EmailAPI",
                            ParameterName = "Email",
                            ParameterValue = "shivkoirala@outlook.com",
                            ValueDataType = "string"
                        },
                        new
                        {
                            Id = 8,
                            ParameterGroupName = "EmailAPI",
                            ParameterName = "Name",
                            ParameterValue = "Fewa",
                            ValueDataType = "string"
                        },
                        new
                        {
                            Id = 9,
                            ParameterGroupName = "SMSAPI",
                            ParameterName = "AccountSID",
                            ParameterValue = "AC16e650acdc77e525ae4806245e143b5f",
                            ValueDataType = "string"
                        },
                         new
                         {
                             Id = 10,
                             ParameterGroupName = "SMSAPI",
                             ParameterName = "AuthToken",
                             ParameterValue = "ad9a67225b9096b02f0e7aa3109e3afb",
                             ValueDataType = "string"
                         },
                          new
                          {
                              Id = 11,
                              ParameterGroupName = "SMSAPI",
                              ParameterName = "PhoneNumber",
                              ParameterValue = "+12058989147",
                              ValueDataType = "string"
                          },
                           new
                           {
                               Id = 12,
                               ParameterGroupName = "EmailAPI",
                               ParameterName = "EmailPlainBody",
                               ParameterValue = "Please attend the doctor.",
                               ValueDataType = "string"
                           },
                           new
                           {
                               Id = 13,
                               ParameterGroupName = "EmailAPI",
                               ParameterName = "EmailHTMLBody",
                               ParameterValue = "<body id='page-top'><div id='wrapper'><!--Content Wrapper-->" +
                                                "<div id='content-wrapper' class='d-flex flex-column'>" +
                                                "<!-- Main Content --><div id = 'content'><!-- Topbar -->" +
                                                "<nav class='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>" +
                                                "<!-- Sidebar Toggle(Topbar) -->" +
                                                //"<button id='sidebarToggleTop' class='btn btn-link d-md-none rounded-circle mr-3'>" +
                                                //"<i class='fa fa-bars'></i></button><!-- Topbar Navbar -->" +
                                                "<a class='sidebar-brand d-flex align-items-center justify-content-center' href='index.html'>" +
                                                "<div class='sidebar-brand-text mx-3'><img src = 'https://localhost:44304/./img/logo.png' alt=''></div></a>" +
                                                "<ul class='navbar-nav ml-auto'><div class='topbar-divider d-none d-sm-block'></div>" +
                                                "<!-- Nav Item - User Information --><li class='nav-item dropdown no-arrow'>" +
                                                "<a class='nav-link dropdown-toggle' href='#' id='userDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                                "<span class='mr-2 d-none d-lg-inline text-gray-600 small'>Manoj Adhikari</span>" +
                                                "<img class='img-profile rounded-circle' src='https://source.unsplash.com/QAB-WJcbgJk/60x60' style='padding-left:5%;'></a>" +
                                                "<!-- Dropdown - User Information --><div class='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>" +
                                                "<a class='dropdown-item' href='#'><i class='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>Profile</a> " +
                                                "<a class='dropdown-item' href='#'><i class='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>Settings </a>" +
                                                "<a class='dropdown-item' href='#'><i class='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>Activity </a>" +
                                                "<div class='dropdown-divider'></div>" +
                                                "<a class='dropdown-item' href='#' data-toggle='modal' data-target='#logoutModal'>" +
                                                "<i class='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i> Logout</a>" +
                                                "</div></li></ul></nav><!-- End of Topbar --><!-- Begin Page Content -->" +
                                                "<div class='container-fluid'><div class='row m-w100'><div class='col-md-4 col-sm-12 col-xs-12 m-auto'>" +
                                                 "<div class='card'>" +
                                                "<div class='card-body'><!-- Report Printable Area --><style type = 'text/css' media='Print'>" +
                                                "table{font-family: 'Verdana';} @media Print{table{font - family: 'Verdana';}}</style>" +
                                                "<table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'><tr>" +
                                                "<td><img src = 'https://localhost:44304/img/logo.png' style='height: 80px;'></td></tr><tr><td><h4 style = 'margin-top: 15px; margin-bottom: 5px; font-weight: 800'>" +
                                                "<span style = 'display: block; margin-top: 15px;'>John Doe International Hospital</span></h4>" +
                                                "<p style = 'margin-top: 5px; margin-bottom: 15px; font-size: 15px; font-weight: 600'>" +
                                                "<span style = 'display: block;'>Hospital Address two</span></p>" +
                                                "<span style = 'display: block; margin-top: 5px;'>Phone No. *********, Fax: **********</span>" +
                                                "</td></tr></table><table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'>" +
                                                "<tr><td><a href = 'https://localhost:44304/#/Join'>   <h5 style = 'font-weight: 600;font-size: 15px;" +
                                                "background: #009688; padding: 15px; color: #fff;'>Invitation from Fewa Telemedicine" +
                                                "</h5></a></td></tr></table>" +
                                                "<table style = 'font-family: Verdana; font-size: 13px; width: 100%;border-collapse: inherit !important;'>" +
                                                "<tr style = 'border: 1px solid #fff; border-top: none'>" +
                                                "<td style='padding: 8px; padding-top: 0' align='center'>This is <strong>" + /*accessor.HttpContext.Session.GetString("Name") + */"&nbsp;&nbsp;" /*+ GetDoctor().DoctorName*/ +
                                                "</strong>.<br/> Please click this link to join me for a secure video meeting - <br/>" +
                                                "<a href = 'https://localhost:44304/#/Join' style= 'margin-top:15px'" +
                                                "[queryParams]='{'MeetingId':this.global.doctorObj.MeetingId}' [state]=''>link</a></td>" +
                                                "</tr> </table>" +
                                                "<!-- Report Printable area end -->" +
                                                "</div></div></div></div></div></div>" +
                                                "<footer class='sticky-footer bg-white'><div class='container my-auto'>" +
                                                "<div class='copyright text-center my-auto'>" +
                                                "<span class=''>Powered by © Fewa Telehealth 2020 <img src='https://localhost:44304/./img/logo-cap.png' style='height:50px' class='powered-footer-logo'></span>" +
                                                "</div></div></footer></div></div></body>",
                               ValueDataType = "string"
                           },
                             new
                             {
                                 Id = 14,
                                 ParameterGroupName = "EmailAPI",
                                 ParameterName = "EmailSubject",
                                 ParameterValue = "fewa Telemedicine call today schedule.",
                                 ValueDataType = "string"
                             },
                              new
                              {
                                  Id = 15,
                                  ParameterGroupName = "Server",
                                  ParameterName = "ServerName",
                                  ParameterValue = "https://localhost:44304/",
                                  ValueDataType = "string"
                              }

                          );
            // Default entry in to paramete table

        }
    }
}
