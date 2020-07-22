using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FewaTelemedicine.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "mst_Doctors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    NameTitle = table.Column<string>(nullable: true),
                    DoctorName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Designation = table.Column<string>(nullable: true),
                    MedicalDegree = table.Column<string>(nullable: true),
                    MobileNumber = table.Column<string>(nullable: true),
                    Image = table.Column<byte[]>(nullable: true),
                    Clinic = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mst_Doctors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "mst_Parameters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ParameterGroupName = table.Column<string>(nullable: true),
                    ParameterName = table.Column<string>(nullable: true),
                    ParameterValue = table.Column<string>(nullable: true),
                    ValueDataType = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mst_Parameters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "txn_Patients_Attended",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppointmentDate = table.Column<DateTime>(nullable: false),
                    MeetingId = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false),
                    DoctorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_txn_Patients_Attended", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "mst_Doctors",
                columns: new[] { "Id", "Clinic", "Designation", "DoctorName", "Email", "Image", "MedicalDegree", "MobileNumber", "NameTitle", "Password", "UserName" },
                values: new object[] { 1, null, null, null, null, null, null, null, null, "doctor", "doctor" });

            migrationBuilder.InsertData(
                table: "mst_Parameters",
                columns: new[] { "Id", "Description", "ParameterGroupName", "ParameterName", "ParameterValue", "ValueDataType" },
                values: new object[,]
                {
                    { 1, null, "Hospital", "Name", "Fewa Telemedicine", "string" },
                    { 2, null, "Hospital", "Description", "..Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem facilis aliquam veritatis, quam debitis beatae quaerat id totam dolor, ipsa dolorum, at iusto. Explicabo numquam, nostrum iste voluptatem maiores.", "string" },
                    { 3, null, "Hospital", "ContactNumber", "98465175", "string" },
                    { 4, null, "Hospital", "Email", "shivkoirala@outlook.com", "string" },
                    { 5, null, "Hospital", "LogoPath", "img/logo.png", "string" },
                    { 6, null, "EmailAPI", "ApiKey", "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", "string" },
                    { 7, null, "EmailAPI", "Email", "shivkoirala@outlook.com", "string" },
                    { 8, null, "EmailAPI", "Name", "Fewa", "string" },
                    { 9, null, "SMSAPI", "AccountSID", "AC16e650acdc77e525ae4806245e143b5f", "string" },
                    { 10, null, "SMSAPI", "AuthToken", "ad9a67225b9096b02f0e7aa3109e3afb", "string" },
                    { 11, null, "SMSAPI", "PhoneNumber", "+12058989147", "string" },
                    { 12, null, "EmailAPI", "EmailPlainBody", "Please attend the doctor.", "string" },
                    { 13, null, "EmailAPI", "EmailHTMLBody", "<body id='page-top'><div id='wrapper'><!--Content Wrapper--><div id='content-wrapper' class='d-flex flex-column'><!-- Main Content --><div id = 'content'><!-- Topbar --><nav class='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'><!-- Sidebar Toggle(Topbar) --><a class='sidebar-brand d-flex align-items-center justify-content-center' href='index.html'><div class='sidebar-brand-text mx-3'><img src = 'https://localhost:44304/./img/logo.png' alt=''></div></a><ul class='navbar-nav ml-auto'><div class='topbar-divider d-none d-sm-block'></div><!-- Nav Item - User Information --><li class='nav-item dropdown no-arrow'><a class='nav-link dropdown-toggle' href='#' id='userDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><span class='mr-2 d-none d-lg-inline text-gray-600 small'>Manoj Adhikari</span><img class='img-profile rounded-circle' src='https://source.unsplash.com/QAB-WJcbgJk/60x60' style='padding-left:5%;'></a><!-- Dropdown - User Information --><div class='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'><a class='dropdown-item' href='#'><i class='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>Profile</a> <a class='dropdown-item' href='#'><i class='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>Settings </a><a class='dropdown-item' href='#'><i class='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>Activity </a><div class='dropdown-divider'></div><a class='dropdown-item' href='#' data-toggle='modal' data-target='#logoutModal'><i class='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i> Logout</a></div></li></ul></nav><!-- End of Topbar --><!-- Begin Page Content --><div class='container-fluid'><div class='row m-w100'><div class='col-md-4 col-sm-12 col-xs-12 m-auto'><div class='card'><div class='card-body'><!-- Report Printable Area --><style type = 'text/css' media='Print'>table{font-family: 'Verdana';} @media Print{table{font - family: 'Verdana';}}</style><table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'><tr><td><img src = 'https://localhost:44304/img/logo.png' style='height: 80px;'></td></tr><tr><td><h4 style = 'margin-top: 15px; margin-bottom: 5px; font-weight: 800'><span style = 'display: block; margin-top: 15px;'>John Doe International Hospital</span></h4><p style = 'margin-top: 5px; margin-bottom: 15px; font-size: 15px; font-weight: 600'><span style = 'display: block;'>Hospital Address two</span></p><span style = 'display: block; margin-top: 5px;'>Phone No. *********, Fax: **********</span></td></tr></table><table style = 'width: 100%; text-align: center; margin: 45px 0; font-size: 13px; font-family: Verdana;'><tr><td><a href = 'https://localhost:44304/#/Join'>   <h5 style = 'font-weight: 600;font-size: 15px;background: #009688; padding: 15px; color: #fff;'>Invitation from Fewa Telemedicine</h5></a></td></tr></table><table style = 'font-family: Verdana; font-size: 13px; width: 100%;border-collapse: inherit !important;'><tr style = 'border: 1px solid #fff; border-top: none'><td style='padding: 8px; padding-top: 0' align='center'>This is <strong>&nbsp;&nbsp;</strong>.<br/> Please click this link to join me for a secure video meeting - <br/><a href = 'https://localhost:44304/#/Join' style= 'margin-top:15px'[queryParams]='{'MeetingId':this.global.doctorObj.MeetingId}' [state]=''>link</a></td></tr> </table><!-- Report Printable area end --></div></div></div></div></div></div><footer class='sticky-footer bg-white'><div class='container my-auto'><div class='copyright text-center my-auto'><span class=''>Powered by © Fewa Telehealth 2020 <img src='https://localhost:44304/./img/logo-cap.png' style='height:50px' class='powered-footer-logo'></span></div></div></footer></div></div></body>", "string" },
                    { 14, null, "EmailAPI", "EmailSubject", "fewa Telemedicine call today schedule.", "string" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "mst_Doctors");

            migrationBuilder.DropTable(
                name: "mst_Parameters");

            migrationBuilder.DropTable(
                name: "txn_Patients_Attended");
        }
    }
}
