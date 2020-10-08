import { Component, ChangeDetectorRef, ElementRef, ViewChild,EventEmitter ,Output} from "@angular/core";
import { Router } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { HttpClient , HttpEventType } from '@angular/common/http';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { ProgressStatus, ProgressStatusEnum } from 'src/models/progress-status.model';
import 'src/vendor/jitsi/external_api.js';
import { Patient, Provider } from 'src/models/DomainModels';
declare var JitsiMeetExternalAPI : any;
@Component({
    templateUrl:'./provider-room.component.html'
})
export class ProviderRoomComponent {
  public documentArray: any[] = [];
  FileName: string;
  FileAdr:string;
  public showDownloadError: boolean;
  public progress: number;
  public message: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  public CompletedPatients: Array<Patient> = null;


  public showPatDetail: boolean = false;
  patients: Array<Patient> = new Array<Patient>();
  showChat: boolean = true;
  AllUserChats: any = {};
  ChatMessages: Array<any> = new Array<any>();
  ChatReceivedMessages: Array<any> = new Array<any>();
  ChatUserDropDowns: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  public state: Observable<object>;
  options: {};
  domain:string;
  api:any;
  proObj:Provider=new Provider();
  patientObj:Patient=new Patient();
  providerObj:Provider=new Provider();
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  

  constructor(
    public httpClient: HttpClient, public routing: Router, private formBuilder: FormBuilder,
    public notificationService: NotificationService, 
    public global: Global, private cdr: ChangeDetectorRef, public service: UploadDownloadService) {
    this.initForm();
    this.state = history.state; 

    if (this.global.isPatient) {    
      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.patientObj = _patient;
          this.PatientCompleted(_patient);
          this.ChatUserDropDowns = new Array<any>();
        }
        );

      // this.notificationService.EventGetAllProviders.subscribe(_providers => {
      //   for(let p of _providers)
      //   {
      //     if(p.url==this.global.currentProvider&&p.practice==this.global.currentPractice)
      //    {
      //     this.proObj=p;
      //    }
         
      //   }
      // });

      // gets doctor list
      this.notificationService.LoadActiveDoctors();
    }
    else {
      this.notificationService.Connect();
      // this.notificationService.EventGetAllPatients
      //   .subscribe(_patients => {
         
      //     for(let p of _patients)
      //     {
      //       if(p.url==this.global.currentProvider)
      //       {
      //         this.patients=p;
      //       }
      //     }
      //     this.ChatUserDropDowns = _patients;
      //     console.log(this.ChatUserDropDowns);
      //   });

      this.notificationService.EventCallPatient.subscribe(_patient => {
        this.patientObj = _patient;
        this.ChatForm.controls['selUser'].setValue(this.patientObj.name);
      }
      );
    }
    
    this.notificationService.EventChatMessage.subscribe(data => {
      if (this.ChatForm.controls['selUser'].value != data.name) {
        this.ChatForm.controls['selUser'].setValue(data.name);
        this.OnChatUserChange();
      }
      if (!this.showChat) {
        this.showChat = true;
      }
      const chatMsg = { name: data.name, message: data.message, Class: 'receiver-msg' };
      this.ChatMessages.push(chatMsg);
      // this.toastr.success(chatMsg.Message, chatMsg.Name,
      //   {timeOut: 5000});
      //this.ChatReceivedMessages.push(chatMsg);
      this.pushChatMsgUserwise(data.name, chatMsg);
      

      this.cdr.detectChanges();
     //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });
  }

  ngOnInit() { 
    this.state = history.state;
    /*8/9/2020 => Updated by Bhavana Vanjani*/ 
    this.domain = "meet.jit.si";
    this.options = {
      roomName: this.global.providerObj.roomName,
      width: 950,
      height: 570,
      parentNode: document.querySelector('#meet'),
      configOverwrite: {   
        doNotStoreRoom:true,    
        disableInviteFunctions:true,
        startWithVideoMuted: true,
        startWithAudioMuted: true,
        enableWelcomePage:false,
        disableRemoteMute:true,
        prejoinPageEnabled:false,
        remoteVideoMenu: {
	// If set to true the 'Kick out' button will be disabled.
	      disableKick: true
	},
      },
      interfaceConfigOverwrite: {
        //DISABLE_VIDEO_BACKGROUND: true,
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK:false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        GENERATE_ROOMNAMES_ON_WELCOME_PAGE:false,
        JITSI_WATERMARK_LINK: '',
        BRAND_WATERMARK_LINK: '',
        DISPLAY_WELCOME_PAGE_CONTENT:false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT:false,
        DEFAULT_REMOTE_DISPLAY_NAME:this.global.patientObj.name,
        disable1On1Mode: false,
        REMOTE_THUMBNAIL_RATIO: 0, // 1:1
        filmStripOnly: false,
        TOOLBAR_BUTTONS: ['microphone', 'camera','videoquality']
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
    return control.hasError(typeofvalidator) && control.dirty;
  }

  public getFiles() {
    this.httpClient.get<any[]>(this.service.apiFileUrl).subscribe(
      data => {

      if (data && data.length > 0)
      {
     
        for (var i = 0; i < data.length; i++) 
        {
          this.FileName = data[i].replace(/^.*[\\\/]/, '');
          this.documentArray[i] = 
          {
            filename: this.FileName,
            filepath: data[i],
            fileAdr:this.service.DownloadUrl+this.FileName
          }
        }
      }
      else{
        alert("files are not uploaded yet");
      }
    }
      
    );
  }
  
  PatientAttended(attendedPatient: Patient) {
    this.showPatDetail = false;
    attendedPatient.medication = this.patientObj.medication;
    attendedPatient.url=this.global.providerObj.url;
    this.notificationService.PatientAttended(attendedPatient);
    this.patientObj=attendedPatient;
    this.routing.navigateByUrl('/Home', { state: this.global});

  }

  LoadPatientSuccess(res) {
    this.CompletedPatients = res;
  }

  CallPatient(callPatient: Patient) {
    if (this.global.patientObj.status == 1) {
      this.global.patientObj=new Patient;
    }
    this.showPatDetail = true;
    this.notificationService.CallPatient(callPatient);
  }

  PatientCompleted(res) {
    if (res.name == this.global.patientObj.name) {
      this.global.patientObj = res;
      this.routing.navigate(['/ReportSummary']);
    }
  }

  Error(res) {
    alert(res.status);
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
       // this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
      } else {
        this.ChatMessages = new Array<any>();
       // this.ChatReceivedMessages=new Array<any>();
      }
    } catch (e) { }
  }

  OnShowHideChat() {
    try {
      this.showChat = !this.showChat;
    } catch (e) {

    }
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
