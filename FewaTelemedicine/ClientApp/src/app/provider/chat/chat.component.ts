import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Global } from 'src/app/_helpers/common/global.model';
import { Provider, Patient, Practice } from 'src/app/_helpers/models/domain-model';
import { ChatModel, MessageModel } from 'src/app/_helpers/models/chat.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  chatForm: FormGroup
  providerObj: Provider = new Provider();
  userChat: Array<ChatModel> = [];
  currentChatUser: ChatModel = new ChatModel();
  container: HTMLElement;
  disableSendButton: boolean = true;
  filteredPatients: Array<ChatModel> = [];
  searchPatient: string = "";
  hideChatSection :boolean = false;
  public completedPatients: Array<Patient> = null;
  public filteredCompletedPatients: Array<Patient> = [];
  patientObj: Patient = new Patient();
  practiceObj: Practice = new Practice();
  public showPatDetail: boolean = false;
  searchText: string = "";
  @ViewChild('pcam') video: any;
  Video: any;
  tokbox: string = 'Tokbox';
  constructor(private notificationService: NotificationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public global: Global,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private routing: Router,) {
    this.initForm();
    this.initialize();

  }
  private initForm() {
    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required]
    });
  }
  private initialize() {
    this.notificationService.Connect();

    this.notificationService.EventGetAllPatients.subscribe((_patients: Array<Patient>) => {
      let pp=_patients.filter(a=>a.practice==this.global.currentPractice&&a.providerNameAttending==this.global.currentProvider)
      pp.forEach(p => {
        if (p.name) {
          var t = this.userChat.find(a => a.user == p.name);
          if (t == undefined || t == null) {
            var n = new ChatModel();
            n.user = p.name;
            this.userChat.push(n);
          }
        }
      });
      this.filteredPatients = [...this.userChat];
    });

    this.notificationService.EventChatMessage
      .subscribe(data => {
        if (data.sender) {
          var n = new MessageModel();
          var t = this.userChat.find(a => a.user == data.sender);
          if (t) {
            n.message = data.message;
            n.sender = data.sender;
            n.receiver = data.receiver;
            n.time = new Date();
            t.message.push(n);
          }
          if (this.currentChatUser) {
            if (this.currentChatUser.user) {
              var s = [...this.userChat].find(a => a.user == this.currentChatUser.user);
              this.currentChatUser = s;
              this.scrollToBottom();
            }
          }
        }
      });
  }
  ngOnInit() {
    this.providerObj = this.global.providerObj;
    this.userChat = JSON.parse(JSON.stringify(this.global.chatData));
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    var div = document.getElementById("scrollingContainer");
    if (div)
      div.scrollIntoView(false);
  }
  searchPatients() {
    this.filteredPatients = [...this.userChat]
      .filter(a => a.user.toLowerCase()
        .includes(this.searchPatient.toLowerCase()));
  }

  onChatUserChange(currentUser) {
    this.hideChatSection = true;
    this.currentChatUser = currentUser;
    this.disableSendButton = false;
    this.scrollToBottom();
  }

  loadPatientsAttended() {
    this.completedPatients = [];
    this.httpClient.get<any>(this.global.practiceUrl + "GetPatientsAttended?provider="
                            +this.global.providerObj.url+"&searchString="+this.searchText)
                    .subscribe(res => this.loadPatientSuccess(res), err => this.error(err));
  }

  loadPatientSuccess(res) {
    this.filteredCompletedPatients = res;
    this.cdr.detectChanges();
  }
  error(err) {
    alert(err.status);
  } 
  callPatient(currentChatUser){
    if (this.patientObj.status == 1) {
      this.patientObj = new Patient();
    }
    this.showPatDetail = true;
    let dateTime = new Date();
    this.patientObj.appointmentDate = dateTime;
    this.patientObj.name = currentChatUser.user;
    this.patientObj.practice = this.global.currentPractice;
    this.notificationService.CallPatientChat(this.patientObj);

    if (this.practiceObj.callingPlatform == this.tokbox) {
      this.routing.navigate(['/provider/live'], { state: this.global });
    }
    else
      this.routing.navigate(['/provider/live']);
  }
  sendChatMsg() {
    try {
      if (this.chatForm.invalid) {
        return;
      }
      var sendingChatMsg = new MessageModel();
      sendingChatMsg.isProvider = true;
      sendingChatMsg.sender = this.global.providerObj.userName;
      sendingChatMsg.receiver = this.currentChatUser.user;
      sendingChatMsg.message = this.chatForm.value.chatMessage;
      var t = this.userChat.find(a => a.user == this.currentChatUser.user);
      if (t) {
        sendingChatMsg.time = new Date();
        t.message.push(sendingChatMsg);
      }
      if (this.currentChatUser) {
        if (this.currentChatUser.user) {
          var s = [...this.userChat].find(a => a.user == this.currentChatUser.user);
          this.currentChatUser = s;
          this.scrollToBottom();
        }
      }
      this.notificationService.SendChatMessage(sendingChatMsg);
      this.chatForm.reset();
    } catch (e) { }
  }

  onChatEnter(event) {
    if (this.currentChatUser == null || this.currentChatUser == undefined) {
      this._snackBar.open('Please select patient from list', '', {
        duration: 2000,
        verticalPosition: 'top'
       });
    } else if (this.currentChatUser.user == null || this.currentChatUser.user == undefined || this.currentChatUser.user == "") {
      this._snackBar.open('Please select patient from list', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
    if (event.keyCode === 13) {
      this.sendChatMsg();
    }
  }

  get chatFormControls() {
    return this.chatForm.controls;
  }
}
