import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { DoctorsModel } from 'src/models/doctors.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import 'src/vendor/jitsi/external_api.js';
declare var JitsiMeetExternalAPI : any;

@Component({
  templateUrl: './patient-room.component.html'
})
export class PatientRoomComponent {
  showChat: boolean = false;
  doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
  doctorObj: DoctorsModel = new DoctorsModel();
  retrievedImage:any;
  ChatMessages: Array<any> = new Array<any>();
  ChatReceivedMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  AllUserChats: any = {};
  options: {};
  domain:string;
  api:any;

  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  constructor(private notificationService: NotificationService,
    public global: GlobalModel,
    public routing: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,private toastr: ToastrService) {
    this.initForm();
    this.notificationService.EventCompletePatient
      .subscribe(_patient => {
        this.global.patientObj = _patient;
        this.SuccessTestDone(_patient);
      }
      );
    this.notificationService.EventChatMessage.subscribe(chatData => {
      if (this.ChatForm.controls['selUser'].value != chatData.Name) {
        this.ChatForm.controls['selUser'].setValue(chatData.Name);
        this.OnChatUserChange();
      }
      if (!this.showChat) {
        this.showChat = true;
      }
      const chatMsg = { Name: chatData.Name, Message: chatData.Message, Class: 'receiver-msg' };
      this.ChatMessages.push(chatMsg);
      // this.toastr.success(chatMsg.Message, chatMsg.Name,
      //   {timeOut: 5000});
      //this.ChatReceivedMessages.push(chatMsg);
      this.pushChatMsgUserwise(chatData.Name, chatMsg);

       this.cdr.detectChanges();
      //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });
    this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
      this.doctors = _doctors;
      this.doctorObj=_doctors[0];
      this.global.doctorObj=_doctors[0];
      if (this.global.doctorObj.Image) {
        this.retrievedImage = 'data:image/png;base64,' + this.global.doctorObj.Image;
      }
      console.log(this.doctors);
    });
    this.routing.navigate([],
      { queryParams:{DoctorName:this.global.patientObj.DoctorId},
        queryParamsHandling:"merge"
    },
      );
    // gets doctor list
    // this.notificationService.LoadActiveDoctors();
  }

  Transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
  }

  ngOnInit() {
    this.domain = "meet.jit.si";
    this.options = {
      roomName:this.global.doctorObj.DoctorRoomName,
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
        DEFAULT_REMOTE_DISPLAY_NAME:this.global.doctorObj.NameTitle + " " + this.global.doctorObj.DoctorName,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        TOOLBAR_BUTTONS: ['microphone', 'camera', ,'videoquality']
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
          IsDoctor: this.global.IsDoctor ? false : true,
          Name: this.ChatForm.controls['selUser'].value,
          Message: this.ChatForm.controls['chatMessage'].value
        };
        const chatmsgObj = { Name: 'Me', Message: chatMsg.Message, Class: 'sender-msg' };
        this.ChatMessages.push(chatmsgObj);
        this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);


        this.notificationService.SendChatMessage(chatMsg);

        this.ChatForm.reset();
        this.ChatForm.controls['selUser'].setValue(chatMsg.Name);
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