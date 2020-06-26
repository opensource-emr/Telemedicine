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
                columns: new[] { "Id", "Clinic", "Designation", "DoctorName", "Email", "MedicalDegree", "MobileNumber", "NameTitle", "Password", "UserName" },
                values: new object[] { 1, null, null, null, null, null, null, null, "pass", "shiv" });
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
