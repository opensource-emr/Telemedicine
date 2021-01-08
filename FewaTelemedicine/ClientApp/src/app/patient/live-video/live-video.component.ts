import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Provider, Patient } from '../../_helpers/models/domain-model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Global } from 'src/app/_helpers/common/global.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModel, ChatModel } from 'src/app/_helpers/models/chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.scss']
})
export class LiveVideoComponent implements OnInit, AfterViewInit {
  isSubmitting: boolean = true;
  patientObj: Patient = new Patient();
  providerObj: Provider = new Provider();
  chatForm: FormGroup;
  currentChat: Array<MessageModel> = new Array<MessageModel>();
  roomName = "FewaTelemedicine";
  remoteUserDisplayName = "Fewa User";
  isMeetStart = false;
  isWaiting: boolean = false;

  constructor(public httpClient: HttpClient,
    private notificationService: NotificationService,
    public global: Global,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    this.initialize();
    this.initForm();
  }

  ngOnInit(): void {
    var params = new HttpParams().set('username', this.global.currentProvider);
    this.httpClient.
      get<any>(this.global.practiceUrl + "GetUpdatedProvider", { params: params })
      .subscribe(res => {
        this.global.providerObj = res.User;
        this.roomName = this.global.providerObj.roomName;
        this.remoteUserDisplayName = this.global.patientObj.name;
        for (let temp of res.Configuration) {
          if (temp.url == this.global.providerObj.practice) {
            this.global.practiceObj = temp;
          }
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isWaiting = true;
      this.cdr.detectChanges();
    }, 1000);
    this.scrollToBottom();
  }
  private initForm() {
    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required]
    });
  }

  private initialize() {
    this.notificationService.Connect();
    this.patientObj = this.global.patientObj;
    this.notificationService.EventCallPatient.subscribe(patient => {
      this.isWaiting = false;
      this.isMeetStart = true;
    });

    this.notificationService.EventGetAllProviders.subscribe(_providers => {
      //get current provider
      this.providerObj = _providers.find(p => p.url == this.global.currentProvider && p.practice.toLowerCase() == this.global.currentPractice);
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });

    this.notificationService.EventChatMessage.subscribe(chatData => {
      //handle received messages
      //console.log(chatData)
      var s = new MessageModel();
      s.message = chatData.message;
      s.receiver = this.patientObj.name;
      s.sender = chatData.sender;
      s.time = new Date();
      this.currentChat.push(s);
      this.scrollToBottom();
    });
    this.notificationService.EventCallEnd
      .subscribe(_patient => {
        this.global.patientObj = _patient;
        this.endMeet();
      });
  }

  sendChatMsg() {
    if (this.chatForm.invalid) {
      return;
    }
    var sendingChatMsg = new MessageModel();
    sendingChatMsg.sender = sessionStorage.getItem("PatientName");;
    sendingChatMsg.receiver = this.providerObj.userName;
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

  endMeet() {
    this.isMeetStart = false;
    this.router.navigate(['patient/summary']);
  }
}
