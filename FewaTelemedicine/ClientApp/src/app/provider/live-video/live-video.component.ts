import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { UploadDownloadService } from 'src/app/_helpers/common/upload-download.service';
import { ChatModel, MessageModel } from 'src/app/_helpers/models/chat.model';
import { Patient, ProviderAdvice } from 'src/app/_helpers/models/domain-model';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.scss']
})
export class LiveVideoComponent implements OnInit, OnDestroy {
  isDisplayed = false;
  patient: Patient = null;
  roomName = "FewaTelemedicine";
  remoteUserDisplayName = "Fewa User";
  isMeetStart = false;
  chatForm: FormGroup;
  reportForm: FormGroup;
  currentChat: Array<MessageModel> = new Array<MessageModel>();
  public providerAdvice: Array<ProviderAdvice> = [];

  constructor(public httpClient: HttpClient,
    public router: Router,
    private formBuilder: FormBuilder,
    public notificationService: NotificationService,
    public global: Global,
    private cdr: ChangeDetectorRef,
    public service: UploadDownloadService,
    public http: HttpClient,
    public _snackBar:MatSnackBar) {
    this.patient = this.global.patientObj;
    this.initVideoConference();
    this.initForm();
    this.roomName = this.global.providerObj.roomName;
    this.remoteUserDisplayName = this.global.providerObj.userName;
    this.isMeetStart = true;
  }

  ngOnInit(): void {
    this.loadAdvice();
    var previousChats = this.global.previousChats
    previousChats.forEach(element => {
      this.currentChat.push(element);
    });
  }

  ngOnDestroy() {
    this.currentChat = [];
  }

  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
  }

  loadAdvice() {
    this.httpClient.post<any>(this.global.practiceUrl + "GetAllAdvice", this.global.providerObj)
      .subscribe(res => {
        if (res) {
          for (let temp of res) {
            if (temp.providerId === this.global.providerObj.providerId) {
              this.providerAdvice.push(temp);
            }
          }
        }
      });
  }

  initVideoConference() {
    if (this.global.isPatient) {
      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.patient = _patient;
          //this.patientCompleted(_patient);
          //this.ChatUserDropDowns = new Array<any>();
        });

      this.notificationService.EventGetAllProviders.subscribe(_providers => {
        //this.ChatUserDropDowns = _providers.filter(t => t.practice == this.global.practiceObj.url);
      });

      // gets doctor list
      this.notificationService.LoadActiveDoctors();
    }

    else {
      this.notificationService.Connect();
      this.notificationService.EventCallPatient.subscribe(_patient => {
        this.patient = _patient;
      }
      );
      this.notificationService.EventChatMessage.subscribe(chatData => {
        //handle received messages
        var s = new MessageModel();
        s.message = chatData.message;
        s.receiver = chatData.receiver;
        s.sender = chatData.sender;
        s.time = new Date();
        this.currentChat.push(s);
        this.scrollToBottom();
      });
    }
  }

  private initForm() {
    this.chatForm = this.formBuilder.group({
      chatMessage: ['', Validators.required]
    });
    this.reportForm = this.formBuilder.group({
      // labOrdersSent: new FormControl(true, Validators.nullValidator),
      // newPrescriptionsSentToYourPharmacy: new FormControl(true, Validators.nullValidator),
      // newPrescriptionsMailedToYou: new FormControl(true, Validators.nullValidator),
      medication: new FormControl('', Validators.nullValidator),
      followUpNumber: new FormControl('', [Validators.nullValidator, Validators.pattern("^[0-9]{1,10}$")]),
      followUpMeasure: new FormControl('', Validators.nullValidator),
    });
  }

  error(res) {
    alert(res.status);
  }

  sendChatMsg() {
    if (this.chatForm.invalid) {
      return;
    }
    var sendingChatMsg = new MessageModel();
    sendingChatMsg.isProvider = true;
    sendingChatMsg.sender = this.global.providerObj.userName
    sendingChatMsg.receiver = this.global.patientObj.name;
    sendingChatMsg.message = this.chatForm.value.chatMessage;
    this.currentChat.push(sendingChatMsg);
    this.notificationService.SendChatMessage(sendingChatMsg);
    this.scrollToBottom();
    this.chatForm.reset();
  }

  onChatSectionUp(){
    this.scrollToBottom();
  }

  scrollToBottom() {
    var div = document.getElementById("scrollingContainer");
    if (div){
    this.cdr.detectChanges();
      div.scrollIntoView(false);
    }
  }

  onChatEnter(event) {
    if (event.keyCode === 13) {
      this.sendChatMsg();
    }
  }
  get getValidationControl() {
    return this.chatForm.controls;
  }

  completeVisit() {
    if (this.reportForm.value.followUpNumber && !this.reportForm.value.followUpMeasure) {
      this._snackBar.open('Please select follow up measure','Dismiss', {
        duration: 10000,
        verticalPosition: 'top'
       });
       return;
    }
    if(!this.reportForm.value.followUpNumber && this.reportForm.value.followUpMeasure) {
        this._snackBar.open('Please enter follow up number','Dismiss', {
          duration: 10000,
          verticalPosition: 'top'
         });
       return;
    }
    this.isMeetStart = false;
    this.patient.url = this.global.providerObj.url;
    this.patient.endTime = new Date();
    this.patient.practice = this.global.currentPractice;
    this.patient.advice = new Array<ProviderAdvice>();
    for (let temp of this.providerAdvice) {
      this.patient.advice.push(temp);
    }
    var v: Patient = this.reportForm.getRawValue();
    this.patient.medication = v.medication;
    this.patient.followUpNumber = v.followUpNumber.toString();
    this.patient.followUpMeasure = v.followUpMeasure;
    // this.patient.followUpMeasure = v.followUpMeasure != "" ? v.followUpMeasure
    //   : (parseInt(v.followUpNumber) <= 1 ? "Week" : "Weeks");
    // if (this.patient.mobileNumber) {
    //   this.patient.mobileNumber = this.patient.mobileNumber.toString();
    // }
    this.httpClient.post<any>(this.global.practiceUrl + "PatientAttended", this.patient).subscribe(res => {
      if (res) {
        this.notificationService.CallEnds(this.patient);
        this.notificationService.PatientAttended(this.patient);
        this.global.patientObj = this.patient;
        this.router.navigate(['/provider/dashboard']);
        this._snackBar.open('Report Submitted Sucessfully','Dismiss', {
          duration: 10000,
          verticalPosition: 'top'
         });
      }
    });
  }
}
