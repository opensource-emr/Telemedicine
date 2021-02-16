import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Provider, Patient } from '../../_helpers/models/domain-model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Global } from 'src/app/_helpers/common/global.model';
import { Observable, Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModel, ChatModel } from 'src/app/_helpers/models/chat.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
  fileBinaryFromClient: any;
  fileHeaderFromClient: any;
  selectedFile: File;
  myFile: Observable<any>;
  fileFormatMsg : boolean = false; 
  fileSizeMsg : boolean = false;
  constructor(public httpClient: HttpClient,
    private notificationService: NotificationService,
    public global: Global,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public sanitizer: DomSanitizer ) {
    this.initialize();
    this.initForm();
  }

  ngOnInit(): void {
    var params = new HttpParams().set('username', this.global.currentProvider).set('practiceName',this.global.currentPractice);
    this.httpClient.
      get<any>(this.global.practiceUrl + "GetUpdatedProvider", { params: params })
      .subscribe(res => {
        this.global.providerObj = res.User;
        this.roomName = this.global.providerObj.roomName;
        this.remoteUserDisplayName = this.global.patientObj.name;
        this.global.practiceObj = res.Configuration;
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
      s.fileBinary = chatData.fileBinary;
      s.fileHeader = chatData.fileHeader;
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

  onFileChanged(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = <File>event.target.files[0];
    let ext = this.selectedFile.name.split('.').pop().toLowerCase();
    if (ext != "jpg" && ext != "png" && ext != "jpeg" && ext != "pdf") {
      //upload only image or pdf file, other format not allowed
      this.fileFormatMsg = true;
      setTimeout(() => {
        this.fileFormatMsg = false;
      }, 5000);
      this.selectedFile = undefined;
      return;
    }
    if (this.selectedFile.size > 2000000) {
      //Please upload file less than 2MB
      this.fileSizeMsg = true;
      setTimeout(() => {
        this.fileSizeMsg = false;
      }, 5000);
      return;
    }
    this.convertToBase64(this.selectedFile,ext);
  }

  convertToBase64(file: File,ext:string) {
    this.myFile = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    this.myFile.subscribe((d: string) => {
      console.log(d);
      this.fileBinaryFromClient = d;
      this.fileHeaderFromClient = ext;
      this.sendChatMsg();
      d = undefined;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  sendChatMsg() {
    if (this.chatForm.invalid && this.fileBinaryFromClient == null && this.fileBinaryFromClient == undefined) {
      return;
    }
    var sendingChatMsg = new MessageModel();
    sendingChatMsg.sender = sessionStorage.getItem("PatientName");;
    sendingChatMsg.receiver = this.providerObj.userName;
    sendingChatMsg.message = this.chatForm.value.chatMessage;
    sendingChatMsg.fileBinary = this.fileBinaryFromClient;
    sendingChatMsg.time = new Date();
    sendingChatMsg.fileHeader = sendingChatMsg.sender + sendingChatMsg.time.getHours() + sendingChatMsg.time.getMinutes() + sendingChatMsg.time.getSeconds() + "." + this.fileHeaderFromClient
    this.currentChat.push(sendingChatMsg);
    this.notificationService.SendChatMessage(sendingChatMsg);
    this.scrollToBottom();
    this.fileBinaryFromClient = undefined;
    this.fileHeaderFromClient = undefined;
    this.chatForm.reset();
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

  endMeet() {
    this.isMeetStart = false;
    this.router.navigate(['patient/summary']);
  }
}
