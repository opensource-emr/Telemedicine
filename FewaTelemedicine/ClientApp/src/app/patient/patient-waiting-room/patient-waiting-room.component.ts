import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Provider } from 'src/models/DomainModels';

@Component({
  templateUrl: './patient-waiting-room.component.html'
})
export class PatientWaitingRoomComponent implements OnDestroy {
  @ViewChild('pcam') video: any;
  Video: any;
  showChat: boolean = true;
  providers: Array<Provider> = new Array<Provider>();
  ChatMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  AllUserChats: any = {};
  tokbox: string = "Tokbox";
  public state: Observable<object>;
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  patientObj: Patient = new Patient();
  providerObj: Provider = new Provider();
  isMobile: boolean;

  ngAfterViewInit() {
    if (this.video) {
      let _video = this.video.nativeElement;
      this.Video = _video;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            _video.srcObject = stream;
            _video.play();
          })
      }
    }
  }
  constructor(
    public httpClient: HttpClient, private notificationService: NotificationService,
    public routing: Router, private formBuilder: FormBuilder,
    public global: Global, private cdr: ChangeDetectorRef) {
    this.isMobile = this.global.isMobile.test(window.navigator.userAgent);
    window.onresize = () => {
      setTimeout(() => {
        this.isMobile = this.global.isMobile.test(window.navigator.userAgent);
        if (!this.isMobile) {
          this.initialize();
          this.ngAfterViewInit();
        }
      }, 100);
    }
    if (!this.isMobile) {
      this.initialize();
    }
  }
  private initialize() {
    this.initForm();
    this.notificationService.Connect();
    this.patientObj = this.global.patientObj;

    this.notificationService.EventCallPatient.subscribe(patient => {
      this.GotoDoctorRoom(patient);
    });

    this.notificationService.EventChatMessage.subscribe(chatData => {
      if (this.ChatForm.controls['selUser'].value != chatData.name) {
        this.ChatForm.controls['selUser'].setValue(chatData.name);
        this.OnChatUserChange();
      }
      if (!this.showChat) {
        this.showChat = true;
      }
      const chatMsg = { name: chatData.name, message: chatData.message, Class: 'receiver-msg' };
      this.ChatMessages.push(chatMsg);
      // this.toastr.success(chatMsg.Message, chatMsg.Name,
      //   {timeOut: 5000});
      this.pushChatMsgUserwise(chatData.name, chatMsg);

      this.cdr.detectChanges();
      // this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });

    this.notificationService.EventGetAllProviders.subscribe(_providers => {
      this.providers = _providers;
      this.providerObj = this.providers.find(p => p.url == this.global.currentProvider && p.practice == this.global.currentPractice);
      if (this.providerObj) {
        this.ChatForm.controls['selUser'].setValue(this.providerObj.userName);
      }
      //this.global.doctorObj=_doctors[0];
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });
    this.state = history.state;
  }
  ngOnDestroy() {
    if (this.video) {
      const mediaStream = this.Video.srcObject;
      if (mediaStream == null) {
        return;
      }
      (<MediaStream>mediaStream).getTracks().forEach(stream => stream.stop());
    }
  }

  private initForm() {
    this.ChatForm = this.formBuilder.group({
      selUser: [null, Validators.required],
      chatMessage: ['', Validators.required]
    });
  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    const control = this.ChatForm.controls[controlname];
    return control.hasError(typeofvalidator) && control.dirty;
  }

  SendToken(res) {

  }

  GotoDoctorRoom(res) {
    if (res == false) { return; }
    if (res.providerNameAttending.length > 0 && res.name == sessionStorage.getItem('PatientName')) {
      this.patientObj.providerNameAttending = res.providerNameAttending;
      var params = new HttpParams().set('username', this.patientObj.providerNameAttending);
      this.httpClient.
        get<any>(this.global.practiceUrl + "GetUpdatedProvider", { params: params })
        .subscribe(res => {
          this.global.providerObj = res.User
          for (let temp of res.Configuration) {
            if (temp.url == this.global.providerObj.practice) {
              this.global.practiceObj = temp;
            }
          }
          //console.log(this.providerObj);
          var url: string = this.global.config.videourl.replace("DOCTORNAME", this.patientObj.providerNameAttending);
          this.global.config.videourl = url;
          if (this.global.practiceObj.callingPlatform == this.tokbox) {
            this.routing.navigateByUrl('/PatientRoomTokbox', { state: this.global });
          }
          else {
            this.routing.navigate(['/PatientRoom'], { queryParams: { state: this.global } })//('/PatientRoom', { state: this.global });
          }
        });
    }
  }

  Error(res) {
    console.error(res);
  }

  SendChatMsg() {
    try {
      for (const i in this.ChatForm.controls) {
        this.ChatForm.controls[i].markAsDirty();
        this.ChatForm.controls[i].updateValueAndValidity();
      }

      if (this.ChatForm.valid) {
        const chatMsg = {
          isProvider: this.global.isProvider ? false : true,
          name: this.ChatForm.controls['selUser'].value,
          message: this.ChatForm.controls['chatMessage'].value
        };
        const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
        this.ChatMessages.push(chatmsgObj);
        this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);

        this.cdr.detectChanges();
        this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom

        this.notificationService.SendChatMessage(chatMsg);

        this.ChatForm.reset();
        this.ChatForm.controls['selUser'].setValue(chatMsg.name);
      }
    } catch (e) { }
  }

  OnChatUserChange() {
    try {
      const selUser = this.ChatForm.controls['selUser'].value;
      if (this.AllUserChats.hasOwnProperty(selUser)) {
        this.ChatMessages = this.AllUserChats[selUser].slice();
      } else {
        this.ChatMessages = new Array<any>();
      }
    } catch (e) { }
  }

  OnShowHideChat() {
    try {
      this.showChat = !this.showChat;
    } catch (e) { }
  }

  onChatEnter(event) {
    if (event.keyCode === 13) {
      this.SendChatMsg();
    }
  }

  pushChatMsgUserwise(user, messageObj) {
    try {
      if (!this.AllUserChats.hasOwnProperty(user)) {
        this.AllUserChats[user] = new Array<any>();
      }
      this.AllUserChats[user].push(messageObj);
    } catch (e) { }
  }
}