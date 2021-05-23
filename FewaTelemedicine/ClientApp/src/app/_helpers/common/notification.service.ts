import { Injectable, EventEmitter, Provider } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Global } from './global.model';
import { Patient } from '../models/domain-model';
import { Router,NavigationExtras } from '@angular/router';
import { ChatModel, MessageModel } from '../models/chat.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  EventConnectionEstablished = new EventEmitter<Boolean>();
  EventGetAllPatients = new EventEmitter<Array<Patient>>();
  EventCallPatient = new EventEmitter<Patient>();
  EventCallEnd = new EventEmitter<Patient>();
  EventCompletePatient = new EventEmitter<Patient>();
  EventChatMessage = new EventEmitter<MessageModel>();
  EventGetAllProviders = new EventEmitter<Provider>();
  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(public global: Global,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }
  public GetAllPatients() {
    this._hubConnection.invoke("GetPatientAll")
      .catch(function (err) {
        // console.log(err);
      });
  }

  public CallPatient(callPatient: Patient) {
    //console.log(callPatient);
    this._hubConnection.invoke('PatientCall', callPatient)
      .catch(function (err) {
        // console.log(err);
      });
  }

  public CallEnds(patient: Patient) {
    //console.log(patient);
    this._hubConnection.invoke('CallEnds', patient)
      .catch(function (err) {
        // console.log(err);
      });
  }

  public PatientAttended(attendPatient: Patient) {
    //console.log(attendPatient);
    this.handleChatting("patientattended", attendPatient);
    this._hubConnection.invoke('PatientAttended', attendPatient)
      .catch(function (err) {
        // console.log(err);
      });
  }

  public CallPatientChat(currentChatUser) {
    //console.log(callPatient);
    this._hubConnection.invoke('PatientCall', currentChatUser)
      .catch(function (err) {
        // console.log(err);
      });
  }

  public SendChatMessage(chatMessage) {
    this.handleChatting('sentbyprovider', chatMessage);
    this._hubConnection.invoke('SendChatMessage', chatMessage)
      .catch(err => {
        // console.log(err);
      });
  }

  public LoadActiveDoctors() {
    this._hubConnection.invoke('GetActiveProviders').catch(err => {
      // console.log(err);
    });
  }

  public DisconnectUser() {
    this._hubConnection.stop();
  }

  public Connect() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.origin + '/NotificationHub?token=' + this.global.token)
      .build();
    /**
     * If the server hasn't sent a message in 1 minute, 
     * the client considers the server disconnected and triggers the onclose event.
     */
    this._hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 120;//120 min
    /**
     * after 15 seeconds ping server
     */
    this._hubConnection.keepAliveIntervalInMilliseconds = 1000 * 15;//15 seconds
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        // console.info('Hub connection started');
        // console.log(new Date());
        this.EventConnectionEstablished.emit(true);
      })
      .catch(err => {
        console.error('Error while establishing connection, retrying...');
        setTimeout(() => {
          this.Connect();
        }, 1000);
      });
    this._hubConnection.onclose((e) => {
      // console.warn("disconnected")
      // console.log(e);
      if (e) {
        if (e.name == "Error") {
          if (e.message.includes("WebSocket closed")) {
            alert(JSON.stringify(e.message));
            alert("Session timeout, please log in again!");
            //this.disconnects(e);
          } else {
            setTimeout(() => {
              this.startConnection();
            }, 1000);
          }
        } {
          setTimeout(() => {
            this.startConnection();
          }, 1000);
        }
        // console.log(e.name, e.message);
        //alert(e.message)
      } else {
        // console.log('Connection Closed.Logout Success.');
        this.disconnects(e);
        return;
      }
      // else {
      //   console.error('Connection Closed unexpectedly, connecting again...');
      //   setTimeout(() => {
      //     this.startConnection();
      //   }, 1000);
      //   if (this.global.isProvider) {
      //     this.router.navigate(['provider/login'])
      //   }
      //   else {
      //     this.router.navigate(['patient/intro']);
      //   }
      // }
    });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('GetAllPatients', (data: any) => {
      var obj: any = JSON.parse(data)
      this.handleChatting('adduser', obj);
      this.EventGetAllPatients.emit(obj);
      // console.log(obj);
    });

    this._hubConnection.on('CallPatient', (data: any) => {
      var obj: any = JSON.parse(data);
      this.EventCallPatient.emit(obj);
    });

    this._hubConnection.on('CallEnds', (data: any) => {
      var obj: any = JSON.parse(data);
      this.EventCallEnd.emit(obj);
    });

    this._hubConnection.on('CompletePatient', (data: any) => {
      //console.log('Complete Patient' + data);
      var obj: any = JSON.parse(data)
      this.EventCompletePatient.emit(obj);
    });

    this._hubConnection.on('ChatMessage', (data: any) => {
      // console.log('Message' + data);
      const msg: any = JSON.parse(data);
      this.handleChatting('sentbypatient', msg);
      this.EventChatMessage.emit(msg);
    });

    this._hubConnection.on('GetAllProviders', (data: any) => {
      const jsonData: any = JSON.parse(data);
      this.EventGetAllProviders.emit(jsonData);
      // console.log(jsonData);
    });

    //check for disconnected patient
    this._hubConnection.on('GetDisconnectedPatient',(data: string)=>{
      if (data == this.global.patientObj.name) {
        this.directToDashboard();
      }     
    });
  }


  //direct to dashboard if patient left/disconnected
  directToDashboard() {
    let navigationExtras: NavigationExtras =
    {
      queryParams: {
        "name": this.global.patientObj.name
      }
    };
    this.router.navigate(['/provider/dashboard'], navigationExtras);
  }

  private disconnects(e: Error) {
    if (this.global.isProvider) {
      this.router.navigate(['provider/login'])
    }
    else {
      this.router.navigate(['patient/intro']);
    }
  }

  private handleChatting(type: string, data: any) {
    if (this.global.isProvider == true) {
      if (type == "adduser") {
        data.forEach(p => {
          if (p.name) {
            let t = this.global.chatData.find(a => a.user == p.name);
            if (t == undefined || t == null) {
              let n = new ChatModel();
              n.user = p.name;
              n.isMobile = p.isMobile;
              this.global.chatData.push(n);
            }
          }
        });
        let t = this.global.chatData.filter(a => !data.find(b => b.name == a.user));
        t.forEach(a => {
          let idx = this.global.chatData.findIndex(b => b.user == a.user);
          if (idx >= 0) {
            this.global.chatData.splice(idx, 1);
          }
        })
      } else if (type == "sentbypatient") {
        //sender is patient
        let t = this.global.chatData.find(a => a.user == data.sender);
        if (t) {
          var n = new MessageModel();
          n.message = data.message;
          n.sender = data.sender;
          n.receiver = data.receiver;
          n.fileBinary = data.fileBinary;
          n.time = data.time;
          n.fileHeader = data.fileHeader;
          t.message.push(n);
          this.global.previousChats.push(n);
          if(n.fileBinary!="" && n.fileBinary!=undefined && n.fileBinary !=null){
            this._snackBar.open('FILE', data.sender, {
              duration: 2000,
              verticalPosition:'top'
            });
          }
          else{
            this._snackBar.open(data.message, data.sender, {
              duration: 2000,
              verticalPosition:'top'
            });
         }
       }
      } else if (type == 'sentbyprovider') {
        var t = this.global.chatData.find(a => a.user == data.receiver);
        if (t) {
          t.message.push(data as MessageModel);
        }
      } else if (type == "patientattended") {
        var idx = this.global.chatData.findIndex(a => a.user == data.name);
        if (idx >= 0)
          this.global.chatData.splice(idx, 1);
      }
    }
  }
}
