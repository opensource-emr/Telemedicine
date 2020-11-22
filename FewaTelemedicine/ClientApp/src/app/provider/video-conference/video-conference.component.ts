import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Patient } from 'src/app/_helpers/models/domain-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Global } from 'src/app/_helpers/common/global.model';
import { UploadDownloadService } from 'src/app/_helpers/common/upload-download.service';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/_helpers/models/chat.model';

@Component({
  selector: 'app-video-conference',
  templateUrl: './video-conference.component.html',
  styleUrls: ['./video-conference.component.scss']
})
export class VideoConferenceComponent implements OnInit {
  isDisplayed = false;
  isSubmitting: boolean = true;
  patientObj: Patient = null;
  roomName = "FewaTelemedicine";
  remoteUserDisplayName = "Fewa User";
  isMeetStart = false;
  chatForm: FormGroup;
  currentChat: Array<MessageModel> = new Array<MessageModel>();

  constructor(public httpClient: HttpClient,
    public routing: Router,
    private formBuilder: FormBuilder,
    public notificationService: NotificationService,
    public global: Global,
    private cdr: ChangeDetectorRef,
    public service: UploadDownloadService) {
    this.initVideoConference();
    this.initForm();
    this.roomName = this.global.providerObj.roomName;
    this.remoteUserDisplayName = this.global.patientObj.name;
    this.isMeetStart = true;
  }
  
  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed;
    this.isSubmitting = false;
  }

  initVideoConference() {
    if (this.global.isPatient) {
      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.patientObj = _patient;
          this.patientCompleted(_patient);
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
        this.patientObj = _patient;
      }
      );
      this.notificationService.EventChatMessage.subscribe(chatData => {
        //handle received messages
        var s=new MessageModel();
        s.message=chatData.message;
        s.receiver = chatData.receiver;
        s.sender = chatData.sender;
        s.time=new Date();
        this.currentChat.push(s);
        this.scrollToBottom();
      });
    }
  }

  private initForm() {
    this.chatForm = this.formBuilder.group({
      chatMessage: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
  }

  patientCompleted(res) {
    if (res.name == this.global.patientObj.name) {
      this.global.patientObj = res;
      this.routing.navigate(['/ReportSummary']);
    }
  }

  error(res) {
    alert(res.status);
  }
  
  endMeet() {
    this.isMeetStart = false;
    this.patientObj.url = this.global.providerObj.url;
    this.patientObj.endTime = new Date();
    this.global.patientObj = this.patientObj;
    this.notificationService.CallEnds(this.patientObj);
    this.routing.navigate(['provider/report']);
  }
  sendChatMsg() {
    if (this.chatForm.invalid) {
      return;
    }
    var sendingChatMsg = new MessageModel();
    sendingChatMsg.isProvider=true;
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
}
