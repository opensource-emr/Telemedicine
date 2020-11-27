import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { UploadDownloadService } from 'src/app/_helpers/common/upload-download.service';
import { MessageModel } from 'src/app/_helpers/models/chat.model';
import { Patient } from 'src/app/_helpers/models/domain-model';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.scss']
})
export class LiveVideoComponent implements OnInit {
  isDisplayed = false;
  patient: Patient = null;
  roomName = "FewaTelemedicine";
  remoteUserDisplayName = "Fewa User";
  isMeetStart = false;
  chatForm: FormGroup;
  currentChat: Array<MessageModel> = new Array<MessageModel>();
  reportForm: FormGroup;

  constructor(public httpClient: HttpClient,
    public router: Router,
    private formBuilder: FormBuilder,
    public notificationService: NotificationService,
    public global: Global,
    private cdr: ChangeDetectorRef,
    public service: UploadDownloadService) {
    this.patient = this.global.patientObj;
    this.initVideoConference();
    this.initForm();
    this.roomName = this.global.providerObj.roomName;
    this.remoteUserDisplayName = this.global.patientObj.name;
    this.isMeetStart = true;
  }

  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed
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
      labOrdersSent: new FormControl(true, Validators.nullValidator),
      newPrescriptionsSentToYourPharmacy: new FormControl(true, Validators.nullValidator),
      newPrescriptionsMailedToYou: new FormControl(true, Validators.nullValidator),
      medication: new FormControl('', Validators.nullValidator),
      followUpNumber: new FormControl('', Validators.nullValidator),
      followUpMeasure: new FormControl('', Validators.nullValidator),
    });
  }

  ngOnInit(): void {
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
  scrollToBottom() {
    var div = document.getElementById("scrollingContainer");
    if (div)
      div.scrollIntoView(false);
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
    this.isMeetStart = false;
    this.patient.url = this.global.providerObj.url;
    this.patient.endTime = new Date();
    this.global.patientObj = this.patient;
    this.notificationService.CallEnds(this.patient);

    var v: Patient = this.reportForm.getRawValue();
    this.patient.labOrdersSent = v.labOrdersSent;
    this.patient.newPrescriptionsSentToYourPharmacy = v.newPrescriptionsSentToYourPharmacy;
    this.patient.newPrescriptionsMailedToYou = v.newPrescriptionsMailedToYou;
    this.patient.medication = v.medication;
    this.patient.followUpNumber = v.followUpNumber.toString();
    this.patient.followUpMeasure = v.followUpMeasure;
    if (this.patient.mobileNumber) {
      this.patient.mobileNumber = this.patient.mobileNumber.toString();
    }
    this.global.patientObj = this.patient;
    this.notificationService.PatientAttended(this.patient);
    this.router.navigate(['/provider/dashboard']);
  }
}
