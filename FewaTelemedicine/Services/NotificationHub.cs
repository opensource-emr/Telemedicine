using FewaTelemedicine.Common;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Services;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Services
{

    public class NotificationHub : Hub<INotificationHub>
    {
        WaitingRoom waitingroom = null;
        List<DoctorsModel> doctors = null;
        List<DoctorCabin> doctorcabins = null;
        FewaDbContext fewaDbContext = null;
        public NotificationHub(WaitingRoom _waitingroom,
                                List<DoctorsModel> _doctors,
                                List<DoctorCabin> _doctorcabins,
                                FewaDbContext _fewaDbContext)
        {
            fewaDbContext = _fewaDbContext;
            waitingroom = _waitingroom;
            doctors = _doctors;
            doctorcabins = _doctorcabins;
        }

        // This attaches user with Signalr connection id
        private void AttachUser(string userName, string connectionId)
        {
            var claims = Context.User.Claims;
            // Boolean isDoctor = true;

            if (IsDoctor())
            {
                foreach (var item in doctors)
                {
                    if (item.UserName == userName)
                    {
                        item.SignalRConnectionId = connectionId;
                        return;
                    }
                }
            }
            else
            {
                foreach (var item in waitingroom.Patients)
                {
                    if (item.PatientName == userName)
                    {
                        item.SignalRConnectionId = connectionId;
                        return;
                    }
                }
            }
            // This is where doctor is associated with Signalr ID


        }
        private void RemoveDoctor(string userName)
        {

            foreach (var item in doctors)
            {
                if (item.UserName == userName)
                {
                    item.SignalRConnectionId = null;
                    return;
                }
            }

        }
        // This removes the user when the disconnect event happens
        private void RemoveUser(string userName)
        {
            // You can not remove from live from collection
            // While browsing so you need temp.
            PatientsAttendedModel temp = null;

            foreach (var item in waitingroom.Patients)
            {
                if (item.PatientName == userName)
                {
                    item.SignalRConnectionId = null;
                    temp = item;
                }
            }
            if (temp != null)
            {
                waitingroom.Patients.Remove(temp);
            }
            else
            {
                RemoveDoctor(userName);
            }
        }
        private PatientsAttendedModel getPatientbyName(string PatName)
        {
            foreach (var t in waitingroom.Patients)
            {
                if (PatName == t.PatientName)
                {
                    return t;
                }
            }
            return null;
        }
        private DoctorsModel getDoctorByName(string docName)
        {
            foreach (var t in doctors)
            {
                if (docName == t.UserName)
                {
                    return t;
                }
            }
            return null;
        }

        private Boolean IsDoctor()
        {
            var claims = Context.User.Claims;
            string usertype = claims.FirstOrDefault(c => c.Type == "UserType").Value;
            if (usertype == "doctor") { return true; }
            return false;
        }

        private void SendUpdatedPatients()
        {
            var json = JsonConvert.SerializeObject(waitingroom.Patients);

            foreach (var item in doctors)
            {
                if (!(item.SignalRConnectionId is null))
                {

                    this.Clients.Clients(getDoctorByName(item.UserName)
                         .SignalRConnectionId)
                             .GetAllPatients(json);

                }
            }
        }
        private void SendUpdatedDoctors()
        {
            var activeDoctors = doctors.Where(a => a.SignalRConnectionId != null).ToList();
            var jsonStr = JsonConvert.SerializeObject(activeDoctors);

            foreach (var pat in waitingroom.Patients)
            {
                this.Clients.Clients(pat.SignalRConnectionId).GetAllDoctors(jsonStr);
            }
        }
        private DoctorCabin getCurrentDoctorCabin()
        {
            foreach (var item in doctorcabins)
            {
                if (item.DoctorsModel.UserName == Context.User.Identity.Name)
                {
                    return item;
                }

            }
            return null;
        }


        public override Task OnConnectedAsync()
        {
            AttachUser(Context.User.Identity.Name,
                Context.ConnectionId);
            // over here send message to all doctor that pateint has logged

            SendUpdatedPatients();
            if (IsDoctor())
            {
                SendUpdatedDoctors();
            }
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            RemoveUser(Context.User.Identity.Name);
            SendUpdatedPatients();
            if (IsDoctor())
            {
                SendUpdatedDoctors();
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task GetPatientAll()
        {
            // Only doctors can see patients and not patients
            if (IsDoctor())
            {
                var json = JsonConvert.SerializeObject(waitingroom.Patients);
                await this.Clients.Clients(getDoctorByName(Context.User.Identity.Name)
                        .SignalRConnectionId)
                            .GetAllPatients(json);
            }

        }

        public async Task GetActiveDoctors()
        {
            var activeDr = doctors.Where(a => a.SignalRConnectionId != null).ToList();
            var jsonStr = JsonConvert.SerializeObject(activeDr);
            await this.Clients.Client(getPatientbyName(Context.User.Identity.Name).SignalRConnectionId).GetAllDoctors(jsonStr);
        }

        public async Task PatientCall(PatientsAttendedModel obj)
        {
            PatientsAttendedModel p = getPatientbyName(obj.PatientName);
            if (p is null)
            {
                return;
            }
            else
            {
                p.Status = (int)TeleConstants.PatientCalled;
                p.DoctorNameAttending = getDoctorByName(Context.User.Identity.Name).UserName;
                p.AppointmentDate = DateTime.Now;
                p.LastUpdated = DateTime.Now;
                p.StartTime = DateTime.Now;
                
                getCurrentDoctorCabin().PatientsAttendedModel = p;
                var patient = JsonConvert.SerializeObject(p);

                SendUpdatedPatients();
                await this.Clients.Clients(getPatientbyName(obj.PatientName).SignalRConnectionId)
                    .CallPatient(patient);
                await this.Clients.Clients(getDoctorByName(Context.User.Identity.Name).SignalRConnectionId)
                     .CallPatient(patient);

            }
        }

        public async Task PatientAttended(PatientsAttendedModel obj)
        {
            try
            {
                PatientsAttendedModel p = getPatientbyName(obj.PatientName);
                if (p is null)
                {
                    return;
                }
                else
                {
                    getCurrentDoctorCabin().PatientsAttendedModel = new PatientsAttendedModel();
                    p.Status = (int)TeleConstants.PatientCompleted;
                    p.LabOrdersSent = obj.LabOrdersSent;
                    p.NewPrescriptionsSentToYourPharmacy = obj.NewPrescriptionsSentToYourPharmacy;
                    p.NewPrescriptionsMailedToYou = obj.NewPrescriptionsMailedToYou;
                    p.EndTime = DateTime.Now;
                    p.Medication = obj.Medication;
                    p.FollowUpNumber = obj.FollowUpNumber;
                    p.FollowUpMeasure = obj.FollowUpMeasure;


                    var patient = JsonConvert.SerializeObject(p);
                    await this.Clients.Clients(getPatientbyName(obj.PatientName).SignalRConnectionId)
                      .CompletePatient(patient);

                    waitingroom.Patients.Remove(p);
                    SendUpdatedPatients();

                    fewaDbContext.PatientsAttendedModels.Add(p);
                    fewaDbContext.SaveChanges();

                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task SendChatMessage(ChatMessage chatMessage)
        {
            string connId = "";
            ChatMessage chatMsg = new ChatMessage();
            if (chatMessage.IsDoctor)
            {
                connId = getDoctorByName(chatMessage.Name).SignalRConnectionId;

                chatMsg.IsDoctor = false;
                chatMsg.Name = getPatientbyName(Context.User.Identity.Name).PatientName;
            }
            else
            {
                connId = getPatientbyName(chatMessage.Name).SignalRConnectionId;

                chatMsg.IsDoctor = true;
                chatMsg.Name = getDoctorByName(Context.User.Identity.Name).UserName;
            }
            chatMsg.Message = chatMessage.Message;

            var chatMsgJsonStr = JsonConvert.SerializeObject(chatMsg);
            await this.Clients.Client(connId).ChatMessage(chatMsgJsonStr);
        }

    }


    public class Message
    {
        public string Type { get; set; }
        public string Payload { get; set; }
    }
}

