import { Component, ChangeDetectorRef, ElementRef, ViewChild,EventEmitter ,Output} from "@angular/core";
import { Router } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model';
import { PatientsAttendedModel } from 'src/models/patients-attended.model';
import { HttpClient , HttpEventType } from '@angular/common/http';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { ProgressStatus, ProgressStatusEnum } from 'src/models/progress-status.model';
import { ToastrService } from 'ngx-toastr';
// import 'src/vendor/jitsi/external_api.js';
// declare var JitsiMeetExternalAPI : any;
@Component({
    templateUrl:'./doctor-room-tokbox.component.html'
})
export class DoctorRoomTokboxComponent {
  public documentArray: any[] = [];
  FileName: string;
  FileAdr:string;
  public showDownloadError: boolean;
  public progress: number;
  public message: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  public CompletedPatients: Array<PatientsAttendedModel> = null;


  public showPatDetail: boolean = false;
  patients: Array<PatientsAttendedModel> = new Array<PatientsAttendedModel>();
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
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  

  constructor(
    public httpClient: HttpClient, public routing: Router, private formBuilder: FormBuilder,
    public notificationService: NotificationService, 
    public global: GlobalModel, private cdr: ChangeDetectorRef, public service: UploadDownloadService,private toastr: ToastrService) {
    this.initForm();
    this.state = history.state; 

    if (this.global.IsPatient) {    
      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.global.patientObj = _patient;
          this.PatientCompleted(_patient);
          this.ChatUserDropDowns = new Array<any>();
        }
        );

      this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
        this.ChatUserDropDowns = _doctors;
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
        this.global.patientObj = _patient;
      }
      );
    }
    
    this.notificationService.EventChatMessage.subscribe(data => {
      if (this.ChatForm.controls['selUser'].value != data.Name) {
        this.ChatForm.controls['selUser'].setValue(data.Name);
        this.OnChatUserChange();
      }
      if (!this.showChat) {
        this.showChat = true;
      }
      const chatMsg = { Name: data.Name, Message: data.Message, Class: 'receiver-msg' };
      this.ChatMessages.push(chatMsg);
      // this.toastr.success(chatMsg.Message, chatMsg.Name,
      //   {timeOut: 5000});
      //this.ChatReceivedMessages.push(chatMsg);
      this.pushChatMsgUserwise(data.Name, chatMsg);
      

      this.cdr.detectChanges();
     //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });
    this.routing.navigate([],
      { queryParams:{DoctorName:this.global.doctorObj.DoctorId},
        queryParamsHandling:"merge"
    },
      );
  }

  ngOnInit() { 
    
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
  
  PatientAttended(attendedPatient: PatientsAttendedModel) {
    this.showPatDetail = false;
    attendedPatient.Medication = this.global.patientObj.Medication;
    attendedPatient.DoctorId=this.global.doctorObj.DoctorId;
    this.notificationService.PatientAttended(attendedPatient);
    this.global.patientObj=attendedPatient;

    this.routing.navigateByUrl('/Home', { state: this.global.patientObj});
   
  }

  LoadPatientSuccess(res) {
    this.CompletedPatients = res;
  }

  CallPatient(callPatient: PatientsAttendedModel) {
    if (this.global.patientObj.Status == 1) {
      this.global.patientObj=new PatientsAttendedModel;
    }
    this.showPatDetail = true;
    this.notificationService.CallPatient(callPatient);
  }

  PatientCompleted(res) {
    if (res.PatientName == this.global.patientObj.PatientName) {
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
          IsDoctor: this.global.IsDoctor ? false : true,
          Name: this.ChatForm.controls['selUser'].value,
          Message: this.ChatForm.controls['chatMessage'].value
        };
        const chatmsgObj = { Name: 'Me', Message: chatMsg.Message, Class: 'sender-msg' };
        this.ChatMessages.push(chatmsgObj);
        this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);

        this.cdr.detectChanges();
        this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom

        this.notificationService.SendChatMessage(chatMsg);

        this.ChatForm.reset();
        this.ChatForm.controls['selUser'].setValue(chatMsg.Name);
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
