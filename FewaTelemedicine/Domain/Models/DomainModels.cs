using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Models
{
    public class Practice
    {
        [Key]
        public int practiceId { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string contactNumber { get; set; }
        public string email { get; set; }
        public string description { get; set; }
        public string callingPlatform { get; set; }
        public string url { get; set; }
        public string logoPath { get; set; }
        // email configration 
        public string emailApiKey { get; set; }
        public string emailApiName { get; set; }
        public string emailPlainBody { get; set; }
        public string emailSubject{ get; set; }
        public string emailHtmlBody { get; set; }
        public string emailAdditionalContent { get; set; }
        public string emailMessage { get; set; }
        // sms configration
        public string smsApiAccountSID { get; set; }
        public string smsApiAuthToken { get; set; }
        public string smsPhoneNumber { get; set; }
        [NotMapped]
        public string serverName { get; set; }
        // all configuration as properies
        public List<Provider> providers { get; set; }
        [NotMapped]
        public string otp { get; set; }
        [NotMapped]
        public IFormFile logo { get; set; }

    }
    public class Provider
    {
        [Key]
        public int providerId { get; set; } // change 1
        public string userName { get; set; }
        public string password { get; set; }
        public string nameTitle { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string designation { get; set; }
        public string medicalDegree { get; set; }
        public string mobileNumber { get; set; }
        //public byte[] image { get; set; } // doctors
        public string image { get; set; }
        public string roomName { get; set; }
        public string roomKey { get; set; }
        public string url { get; set; }
        public string practice { get; set; }
        public int practiceId { get; set; }
        [NotMapped]
        public string signalRConnectionId { get; set; }

        [NotMapped]
        public string otp { get; set; }
        [NotMapped]
        public string newPassword { get; set; }
        [NotMapped]
        public IFormFile profilePhoto { get; set; } //For receiving image file from client side

    }
    public class ProviderCabin
    {
        public Patient patient { get; set; }
        public Provider provider { get; set; }

        public ProviderCabin()
        {
            this.patient = new Patient();
            this.provider = new Provider();
        }
    }
    public class Patient
    {
        [Key]
        public int patientId { get; set; }
        [NotMapped]
        public string name { get; set; }
        public DateTime appointmentDate { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public string url { get; set; }

        [NotMapped]
        public string providerNameAttending { get; set; }
        [NotMapped]
        public int status { get; set; }
        [NotMapped]
        public DateTime lastUpdated { get; set; }
        [NotMapped]
        public double totalCheckupTime { get; set; }
        [NotMapped]
        public string email { get; set; }
        [NotMapped]
        public string mobileNumber { get; set; }
        [NotMapped]
        public bool labOrdersSent { get; set; }
        [NotMapped]
        public bool newPrescriptionsSentToYourPharmacy { get; set; }
        [NotMapped]
        public bool newPrescriptionsMailedToYou { get; set; }
        [NotMapped]
        public string followUpNumber { get; set; }
        [NotMapped]
        public string followUpMeasure { get; set; }
        [NotMapped]
        public string message { get; set; }        
        [NotMapped]
        public string signalRConnectionId { get; set; }
        [NotMapped]
        public string medication { get; set; }
        
        public Provider provider { get; set; }
        [NotMapped]
        public List<ProviderAdvice> advice { get; set; }
        public string practice { get; set; }
        public int providerId { get; set; }
        public int practiceId { get; set; }
        [NotMapped]
        public Boolean isMobile { get; set; }
        public Patient()
        {
            this.isMobile = false;
        }
    }
    public class WaitingRoom
    {
        public List<Patient> patients { get; set; }
        public WaitingRoom()
        {
            this.patients = new List<Patient>();
        }
    }
    public class ChatMessage
    {
        public bool isProvider { get; set; }
        public string message { get; set; }
        public string fileBinary { get; set; }
        public string fileHeader { get; set; }
        public string sender { get; set; }
        public string receiver { get; set; }
    }
    public class ProviderAdvice
    {
        [Key]
        public int adviceId { get; set; }
        public string advice { get; set; }
        public string? inputType { get; set; }
        public bool isChecked { get; set; }
        public int providerId { get; set; }
        public int practiceId { get; set; }
    }
    public class ContactUs
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string message { get; set; }
    }
}
