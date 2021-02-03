using FewaTelemedicine.Common;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace FewaTelemedicine.Services
{

    public class NotificationHub : Hub<INotificationHub>
    {
        WaitingRoom waitingroom = null;
        List<Provider> providers = null;
        List<ProviderCabin> providerCabins = null;
        [Obsolete]
        private IHostingEnvironment _hostingEnvironment;
        [Obsolete]
        public NotificationHub(WaitingRoom _waitingroom,
          List<Provider> _providers,

            List<ProviderCabin> _providerCabins,

                IHostingEnvironment hostingEnvironment)
        {
            waitingroom = _waitingroom;
            providers = _providers;
            providerCabins = _providerCabins;
            _hostingEnvironment = hostingEnvironment;
        }

        // This attaches user with Signalr connection id
        private void AttachUser(string userName, string connectionId)
        {
            var claims = Context.User.Claims;
            string practiceId = claims.FirstOrDefault(c => c.Type == "PracticeId")?.Value; //get practiceId from Jwtclaims
            string providerId = claims.FirstOrDefault(c => c.Type == "ProviderId")?.Value; //get providerId from Jwtclaim
            // Boolean isDoctor = true;

            if (IsProvider())
            {
                foreach (var item in providers)
                {
                    if (item.userName == userName &&item.providerId==int.Parse(providerId)&&item.practiceId==int.Parse(practiceId))
                    {
                        item.signalRConnectionId = connectionId;
                        return;
                    }
                }
            }
            else
            {
                foreach (var item in waitingroom.patients)
                {
                    if (item.name == userName)
                    {
                        item.signalRConnectionId = connectionId;
                        return;
                    }
                }
            }
            // This is where doctor is associated with Signalr ID


        }
        private void RemoveProvider(string userName)
        {

            foreach (var item in providers)
            {
                if (item.userName == userName)
                {
                    item.signalRConnectionId = null;
                    return;
                }
            }

        }
        // This removes the user when the disconnect event happens
        private void RemoveUser(string userName)
        {
            // You can not remove from live from collection
            // While browsing so you need temp.
            Patient temp = null;

            foreach (var item in waitingroom.patients)
            {
                if (item.name == userName)
                {
                    item.signalRConnectionId = null;
                    temp = item;
                }
            }
            if (temp != null)
            {
                waitingroom.patients.Remove(temp);
            }
            else
            {
                RemoveProvider(userName);
            }
        }
        private Patient GetPatientbyName(string patName)
        {
            return waitingroom.patients.Where(a => a.name.ToLower().Trim() == patName.ToLower().Trim()).FirstOrDefault();
        }
        private Provider GetProviderByName(string userName,int providerId,int practiceId)
        {  
            return providers.Where(a => a.userName== userName && a.providerId==providerId&&a.practiceId==practiceId)
                            .FirstOrDefault();
        }

        private Boolean IsProvider()
        {
            var claims = Context.User.Claims;
            string usertype = claims.FirstOrDefault(c => c.Type == "UserType")?.Value;
            if (usertype == "provider") { return true; }
            return false;
        }

        private void SendUpdatedPatients()
        {
            foreach (var item in providers)
            {
                if (!(item.signalRConnectionId is null))
                {
         
                    var json = JsonConvert.SerializeObject(waitingroom.patients
                                        .Where(a => a.providerId ==item.providerId
                                            && a.practiceId == item.practiceId));
                    this.Clients.Clients(GetProviderByName(item.userName,item.providerId,item.practiceId)
                         .signalRConnectionId)
                             .GetAllPatients(json);

                }
            }
        }

        public void sendDisconnectedPatient(string pat)
        {
            foreach (var item in providers)
            {
                if(item.signalRConnectionId != null)
                {
                    this.Clients.Clients(GetProviderByName(item.userName, item.providerId, item.practiceId).signalRConnectionId).GetDisconnectedPatient(pat);
                }
            }

        }

        private void SendUpdatedProviders()
        {
            var activeProviders = providers.Where(a => a.signalRConnectionId != null).ToList();
            var jsonStr = JsonConvert.SerializeObject(activeProviders);

            foreach (var pat in waitingroom.patients)
            {
                this.Clients.Clients(pat.signalRConnectionId).GetAllProviders(jsonStr);
            }
        }
        private ProviderCabin GetCurrentProviderCabin()
        {
            foreach (var item in providerCabins)
            {
                if (item.provider.userName == Context.User.Identity.Name)
                {
                    return item;
                }

            }
            return null;
        }

        ///******SATRT Section: SignalR Default Events******///
        ///OnConnected
        ///OnDisconnected
        ///
        public override Task OnConnectedAsync()
        {
            AttachUser(Context.User.Identity.Name,
                Context.ConnectionId);

            // over here send message to all doctor that pateint has logged

            SendUpdatedPatients();
            if (IsProvider())
            {
                SendUpdatedProviders();
            }
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (string.IsNullOrEmpty(Context.User.Identity.Name))
            {
                return base.OnDisconnectedAsync(new Exception("User Not Found"));
            }
            sendDisconnectedPatient(Context.User.Identity.Name);
            RemoveUser(Context.User.Identity.Name);
            string folderName = "Upload";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            if (Directory.Exists(newPath))
            {
                DirectoryInfo di = new DirectoryInfo(newPath);
                foreach (FileInfo dir in di.GetFiles())
                {
                    dir.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
            }
            SendUpdatedPatients();
            if (IsProvider())
            {
                SendUpdatedProviders();
            }
            if(exception == null)
            {
                return base.OnDisconnectedAsync(new Exception("User Logged Out"));
            }
            return base.OnDisconnectedAsync(exception);
        }
        ///******END Section: SignalR Default Events******///

        public async Task GetPatientAll()
        {
            // Only doctors can see patients and not patients
            if (IsProvider())
            {
               
            var claims = Context.User.Claims;
            string practiceId = claims.FirstOrDefault(c => c.Type == "PracticeId")?.Value; //get practiceId from Jwtclaims
            string providerId = claims.FirstOrDefault(c => c.Type == "ProviderId")?.Value; //get providerId from Jwtclaim
            var json = JsonConvert.SerializeObject(waitingroom.patients
                                .Where(a => a.providerId == int.Parse(providerId)
                                    && a.practiceId == int.Parse(practiceId)));
                await this.Clients.Clients(GetProviderByName(Context.User.Identity.Name,int.Parse(providerId),int.Parse(practiceId))
                        .signalRConnectionId)
                            .GetAllPatients(json);
            }

        }

        public async Task GetActiveProviders()
        {
            var activeDr = providers?.Where(a => a.signalRConnectionId != null).ToList();
            if (activeDr != null)
            {
                var jsonStr = JsonConvert.SerializeObject(activeDr);
                var patConId = GetPatientbyName(Context.User.Identity.Name)?.signalRConnectionId;
                if (!string.IsNullOrEmpty(patConId))
                {
                    await this.Clients.Client(patConId).GetAllProviders(jsonStr);
                }
            }
        }

        public async Task PatientCall(Patient obj)
        {
            Patient p = GetPatientbyName(obj.name);
            if (p is null)
            {
                return;
            }
            else
            {
                p.status = (int)TeleConstants.PatientCalled;
                p.providerNameAttending = GetProviderByName(Context.User.Identity.Name, obj.providerId,obj.practiceId).userName;
                p.appointmentDate = DateTime.Now;
                p.lastUpdated = DateTime.Now;
                p.startTime = DateTime.Now;
                GetCurrentProviderCabin().patient = p;
                var patient = JsonConvert.SerializeObject(p);
                SendUpdatedPatients();
                await this.Clients.Clients(GetPatientbyName(obj.name).signalRConnectionId)
                    .CallPatient(patient);
                await this.Clients.Clients(GetProviderByName(Context.User.Identity.Name, obj.providerId,obj.practiceId).signalRConnectionId)
                     .CallPatient(patient);
            }
        }

        public async Task CallEnds(Patient obj)
        {
            try
            {
                Patient p = GetPatientbyName(obj.name);
                if (p is null)
                {
                    return;
                }
                else
                {
                    GetCurrentProviderCabin().patient = new Patient();
                    p.practice = obj.practice;
                    p.status = (int)TeleConstants.PatientCompleted;
                    p.labOrdersSent = obj.labOrdersSent;
                    p.newPrescriptionsSentToYourPharmacy = obj.newPrescriptionsSentToYourPharmacy;
                    p.newPrescriptionsMailedToYou = obj.newPrescriptionsMailedToYou;
                    p.endTime = DateTime.Now;
                    p.medication = obj.medication;
                    p.followUpNumber = obj.followUpNumber;
                    p.followUpMeasure = obj.followUpMeasure;
                    p.url = obj.url;
                    p.practice = obj.practice;
                    p.advice = obj.advice;
                    var patient = JsonConvert.SerializeObject(p);
                    await this.Clients.Clients(GetPatientbyName(obj.name).signalRConnectionId).CallEnds(patient);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task PatientAttended(Patient obj)
        {
            try
            {
                //Patient obj = JsonConvert.DeserializeObject<Patient>(obj1.ToString());
                Patient p = GetPatientbyName(obj.name);
                if (p is null)
                {
                    return;
                }
                else
                {
                    GetCurrentProviderCabin().patient = new Patient();
                    p.practice = obj.practice;
                    p.status = (int)TeleConstants.PatientCompleted;
                    p.labOrdersSent = obj.labOrdersSent;
                    p.newPrescriptionsSentToYourPharmacy = obj.newPrescriptionsSentToYourPharmacy;
                    p.newPrescriptionsMailedToYou = obj.newPrescriptionsMailedToYou;
                    p.endTime = DateTime.Now;
                    p.medication = obj.medication;
                    p.followUpNumber = obj.followUpNumber;
                    p.followUpMeasure = obj.followUpMeasure;
                    p.url = obj.url;
                    p.practice = obj.practice;
                    p.advice = obj.advice;
                    var patient = JsonConvert.SerializeObject(p);
                    await this.Clients.Clients(GetPatientbyName(obj.name).signalRConnectionId).CompletePatient(patient);
                    waitingroom.patients.Remove(p);
                    SendUpdatedPatients();

                    //fewaDbContext.patients.Add(p);
                    //fewaDbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task SendChatMessage([FromBody] ChatMessage chatMessage)
        {
            string connId = "";
            var claims = Context.User.Claims;
            string practiceId = claims.FirstOrDefault(c => c.Type == "PracticeId")?.Value; //get practiceId from Jwtclaims
            string providerId = claims.FirstOrDefault(c => c.Type == "ProviderId")?.Value; //get providerId from Jwtclaim
            if (!chatMessage.isProvider)
            {
                //sender is patient
                connId = GetProviderByName(chatMessage.receiver,int.Parse(providerId),int.Parse(practiceId))?.signalRConnectionId;
            }
            else
            {
                //sender is provider
                connId = GetPatientbyName(chatMessage.receiver)?.signalRConnectionId;
            }
            if (string.IsNullOrEmpty(connId))
            {
                throw new Exception("Client connection id not found");
            }
            var chatMsgJsonStr = JsonConvert.SerializeObject(chatMessage);
            await this.Clients.Client(connId).ChatMessage(chatMsgJsonStr);
        }

    }


    public class Message
    {
        public string Type { get; set; }
        public string Payload { get; set; }
    }
}

