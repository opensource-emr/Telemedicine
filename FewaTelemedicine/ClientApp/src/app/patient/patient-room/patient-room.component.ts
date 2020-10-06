import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'src/vendor/jitsi/external_api.js';
import { Provider } from 'src/models/DomainModels';
import { Observable } from 'rxjs';
declare var JitsiMeetExternalAPI : any;

@Component({
  templateUrl: './patient-room.component.html'
})
export class PatientRoomComponent {
  showChat: boolean = false;
  providers: Array<Provider> = new Array<Provider>();
  retrievedImage:any;
  ChatMessages: Array<any> = new Array<any>();
  ChatReceivedMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  AllUserChats: any = {};
  options: {};
  domain:string;
  api:any;
  public state: Observable<object>;
  providerObj:Provider=new Provider();

  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  constructor(private notificationService: NotificationService,
    public global: Global,
    public routing: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public httpClient: HttpClient) {
    this.initForm();
    this.providerObj=this.global.providerObj;
    this.notificationService.EventCompletePatient
      .subscribe(_patient => {
        this.global.patientObj = _patient;
        this.SuccessTestDone(_patient);
      }
      );
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
      this.pushChatMsgUserwise(chatData.name, chatMsg);

       this.cdr.detectChanges();
      //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });
    this.notificationService.EventGetAllProviders.subscribe(_providers => {
     this.providers= _providers;
      // this.doctorObj=_doctors[0];
      // this.global.providerObj=_providers[0];
      if (this.global.providerObj.image) {
        this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
      }
      // console.log(this.doctors);
    });
    if (this.global.providerObj.image) {
      this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
    }
    // gets doctor list
    // this.notificationService.LoadActiveDoctors();
  }

  Transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
  }

  ngOnInit() {
    this.state = history.state;
    this.domain = "meet.jit.si";
    this.options = {
      roomName:this.global.providerObj.roomName,
      width: 950,
      height: 570,
      parentNode: document.querySelector('#meet'),
      configOverwrite: {
        doNotStoreRoom:true,    
        disableInviteFunctions:true,
        startWithVideoMuted: true,
        startWithAudioMuted: true,
        disableRemoteMute:true,
        enableWelcomePage:false,
        prejoinPageEnabled:false,
        remoteVideoMenu: {
		// If set to true the 'Kick out' button will be disabled.
		disableKick: true
	}
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        GENERATE_ROOMNAMES_ON_WELCOME_PAGE:false,
        DISPLAY_WELCOME_PAGE_CONTENT:false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT:false,
        DEFAULT_REMOTE_DISPLAY_NAME:this.global.providerObj.nameTitle + " " + this.global.providerObj.name,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview']
      }
    } 
    this.api = new JitsiMeetExternalAPI(this.domain, this.options); 
  }

  private initForm() {
    this.ChatForm = this.formBuilder.group({
      selUser: [null, Validators.required],
      chatMessage: ['', Validators.required]
    });
  }
  hasError(typeofvalidator: string, controlname: string): boolean {
    const control = this.ChatForm.controls[controlname];
    return control.hasError(typeofvalidator) && control.touched;
  }
  SuccessTestDone(res) {
    this.global.patientObj = res;
    this.routing.navigate(['ReportSummary']);
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


        this.notificationService.SendChatMessage(chatMsg);

        this.ChatForm.reset();
        this.ChatForm.controls['selUser'].setValue(chatMsg.name);
        this.cdr.detectChanges();

        this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom

      }
    } catch (e) { }
  }
  OnChatUserChange() {
    try {
      const selUser = this.ChatForm.controls['selUser'].value;
      if (this.AllUserChats.hasOwnProperty(selUser)) {
        this.ChatMessages = this.AllUserChats[selUser].slice();
        //this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
      } else {
        this.ChatMessages = new Array<any>();
        //this.ChatReceivedMessages=new Array<any>();
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