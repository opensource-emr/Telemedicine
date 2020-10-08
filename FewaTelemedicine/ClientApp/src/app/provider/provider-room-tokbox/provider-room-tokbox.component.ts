import { Component, ChangeDetectorRef, ElementRef, ViewChild,EventEmitter ,Output} from "@angular/core";
import { Router } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { HttpClient , HttpEventType } from '@angular/common/http';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { ProgressStatus, ProgressStatusEnum } from 'src/models/progress-status.model';
import { Patient } from 'src/models/DomainModels';
// import 'src/vendor/jitsi/external_api.js';
// declare var JitsiMeetExternalAPI : any;
@Component({
    templateUrl:'./provider-room-tokbox.component.html'
})
export class ProviderRoomTokboxComponent {
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
  private state: Observable<object>;
  options: {};
  domain:string;
  api:any;
  patientObj:Patient=null;
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

      this.notificationService.EventGetAllProviders.subscribe(_providers => {
        this.ChatUserDropDowns = _providers;
      });

      // gets doctor list
      this.notificationService.LoadActiveDoctors();
    }
    else {
      this.notificationService.Connect();
      this.notificationService.EventGetAllPatients
        .subscribe(_patients => {
          this.patients = _patients;
          this.ChatUserDropDowns = _patients;
          console.log(this.ChatUserDropDowns);
        });

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
    this.CompletedPatients = res.filter(t=>t.url==this.global.practiceObj.url);;
  }

  CallPatient(callPatient: Patient) {
    if (this.patientObj.status == 1) {
      this.patientObj=new Patient;
    }
    this.showPatDetail = true;
    this.notificationService.CallPatient(callPatient);
  }

  PatientCompleted(res) {
    if (res.name == this.patientObj.name) {
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
