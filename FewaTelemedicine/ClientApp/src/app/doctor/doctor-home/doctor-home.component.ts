import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, OnDestroy, AfterViewInit } from "@angular/core";
import { Router, NavigationStart, ActivatedRoute, Data } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model'
import { PatientsAttendedModel } from 'src/models/patients-attended.model';
import { HttpClient, HttpEventType , HttpEvent, HttpParams} from '@angular/common/http';
import { DoctorCabinModel } from 'src/models/doctor-cabin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorsModel } from 'src/models/doctors.model';
import { Observable } from 'rxjs';
import { SMSModel } from 'src/models/SMS.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ParametersModel } from 'src/models/parameters.model';



@Component({
  templateUrl: './doctor-home.component.html',
  template: `<pre>{{ state | async | json }}</pre>`,
  styleUrls: ['../../../assets/css/doctor-home-component.css']

})
export class DoctorHomeComponent implements OnInit,OnDestroy{
  private state: Observable<object>;
  public LogoToUpload:File = null;
  public selectedFile: File;
  public progress: number;
  public message: string;
  count:number=0;
  receivedImageData: any;
  retrievedImage: any;
  retrieveResponse: any;
  activeTab = 'updateProfile';
  HospitalName:string ="";
  HospitalContact: string = "";
  HospitalEmail:string = "";
  HospitalLogo: string = "";
  EmailSubject:string = "";
  EmailPlainBody:string = "";
  EmailHTMLBody :string = "";
  HospitalDesc: string = "";
  showChat: boolean = true;
  AllUserChats: any = {};
  ChatMessages: Array<any> = new Array<any>();
  ChatReceivedMessages: Array<any> = new Array<any>();
  ChatUserDropDowns: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  parameterArray: Array<ParametersModel> = null;
  
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  public InvitationButton: boolean = true;
  public SendInvitation: boolean = true;
  public CompletedAppointments: boolean = false;
  public AccountSettings: boolean = false;
  public ProfileUpdate: boolean = true;
  public ParamsUpdate: boolean = false;
  public EmailTemplateUpdate: boolean = false;
  public ChatSection: boolean = false;
  public CompletedPatients: Array<PatientsAttendedModel> = null;
  doctorObj: DoctorsModel = new DoctorsModel();
  @ViewChild('pcam') video:any; 
  Video:any;
  tokbox:string='Tokbox';
  // parameterObj: ParametersModel = new ParametersModel();
  public invitationForm: FormGroup;
  ngAfterViewInit() {
    let _video=this.video.nativeElement;
    this.Video=_video;
     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
       navigator.mediaDevices.getUserMedia({ video: true })
                             .then(stream => {
                               _video.srcObject = stream;
                               _video.play();
                              })
     }
   }
  constructor(private routing: Router, private notificationService: NotificationService, public global: GlobalModel, public httpClient: HttpClient, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,private toastr: ToastrService) {
    this.initForm();
    this.LoadPatientsAttended();
    this.patients.push(this.global.patientObj);
    if (this.global.IsPatient) {

      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.global.patientObj = _patient;
          this.patients = _patient;
          // this.PatientCompleted(_patient);
          this.ChatUserDropDowns = new Array<any>();
        }
        );
    }
    this.notificationService.Connect();
    this.notificationService.EventGetAllPatients
      .subscribe(_patients => {
        this.patients = _patients;
        this.ChatUserDropDowns = _patients;
      });

    this.notificationService.EventCallPatient.subscribe(_patient => {
      this.global.patientObj = _patient;
    }
    );

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
      this.count=this.count+1;

      // this.toastr.success(chatMsg.Message, chatMsg.Name,
      // {timeOut: 5000});
      //this.ChatReceivedMessages.push(chatMsg);
      this.pushChatMsgUserwise(data.Name, chatMsg);


      this.cdr.detectChanges();
     // this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });

    this.invitationForm = this.formBuilder.group({
      email: ['', Validators.email],
      mobileno: ['', Validators.required],
    })
    if (!this.global.doctorObj) {
      this.routing.navigate(['Login']);
    } else if (this.global.doctorObj.UserName == "") {
      this.routing.navigate(['Login']);
    }
    //this.RefreshPatients(); 
  }

  public showPatDetail: boolean = false;
  patients: Array<PatientsAttendedModel> = new Array<PatientsAttendedModel>();

 
  ngOnInit() {

    var params = new HttpParams().set('username',this.global.doctorObj.UserName );
    this.httpClient.
    get<any>(this.global.HospitalUrl + "GetUpdatedDoctor",{params : params})
    .subscribe(res => {
     this.doctorObj = res.User;
     this.parameterArray = res.Parameter;
     this.HospitalName = this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "Name").ParameterValue;
     this.HospitalLogo = this.parameterArray.find(a => a.ParameterName === 'LogoPath' && a.ParameterGroupName === "Hospital").ParameterValue;
     this.HospitalContact = this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "ContactNumber").ParameterValue;
     this.HospitalEmail = this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "Email").ParameterValue;
     this.HospitalDesc = this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "Description").ParameterValue;
     this.EmailSubject = this.parameterArray.find(a => a.ParameterGroupName === "EmailAPI" && a.ParameterName === "EmailSubject").ParameterValue;
     this.EmailPlainBody = this.parameterArray.find(a => a.ParameterGroupName === "EmailAPI" && a.ParameterName === "EmailPlainBody").ParameterValue;
     this.EmailHTMLBody = res.EmailHTMLBody;
     if(this.doctorObj.Image)
     this.retrievedImage = 'data:image/png;base64,' + this.doctorObj.Image;
    });
    this.state = history.state;
  }
 
    
   ngOnDestroy() { 
    const mediaStream = this.Video.srcObject;
    if(mediaStream==null)
    {
      return;
    }
    (<MediaStream>mediaStream).getTracks().forEach( stream => stream.stop());
  }
  Transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
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

  Difference(start: Date, end: Date): number {
    start = new Date(start);
    end = new Date(end);
    var startminutes = start.getMinutes();
    var endminutes = end.getMinutes();
    var diff = 0;
    if (endminutes > startminutes) {
      diff = endminutes - startminutes;
    }
    return diff;
  }
  Check(param) {
    let data = param;

    if (data == 'sendInv') {
      this.SendInvitation = true;
      this.CompletedAppointments = false;
      this.AccountSettings = false;
      this.ChatSection = false;
      this.LoadPatientsAttended();
    }
    else if (data == 'completedList') {
      this.SendInvitation = false;
      this.CompletedAppointments = true;
      this.AccountSettings = false;
      this.ChatSection = false;
      this.LoadPatientsAttended();
    }

    else if (data == 'accSett') {
      this.SendInvitation = false;
      this.CompletedAppointments = false;
      this.AccountSettings = true;
      this.ChatSection = false;
    }
    else if (data == 'chatSection') {
      this.SendInvitation = false;
      this.CompletedAppointments = false;
      this.AccountSettings = false;
      this.ChatSection = true;
    }
    else if (data == 'updateProfile') {
      this.SendInvitation = false;
      this.CompletedAppointments = false;
      this.AccountSettings = true;
      this.ProfileUpdate = true;
      this.activeTab = data;
      this.ParamsUpdate = false;
      this.EmailTemplateUpdate = false;
      this.ChatSection = false;
    }
    else if (data == 'updateParams') {
      this.SendInvitation = false;
      this.CompletedAppointments = false;
      this.AccountSettings = true;
      this.ProfileUpdate = false;
      this.ParamsUpdate = true;
      this.EmailTemplateUpdate = false;
      this.activeTab = data;
      this.ChatSection = false;
    }
    else if (data == 'updateEmailTemplate') {
      this.SendInvitation = false;
      this.CompletedAppointments = false;
      this.AccountSettings = true;
      this.ProfileUpdate = false;
      this.ParamsUpdate = false;
      this.activeTab = data;
      this.ChatSection = false;
      this.EmailTemplateUpdate = true;
    }
  }

  updateHospitalLogo(file:FileList) {
    this.LogoToUpload = file.item(0);
    //show image preview
    var reader = new FileReader();
    reader.onload = (event :any) => {
      this.HospitalLogo = event.target.result;
    }
    reader.readAsDataURL(this.LogoToUpload);
    //upload image
    const formData = new FormData();
    // To Rename File name 
    //var fileExtension = '.' + this.LogoToUpload.name.split('.').pop();
    //var filename = "hospitallogo" + new Date().getTime() + fileExtension;
    formData.append('image', this.LogoToUpload, this.LogoToUpload.name);
    //call to server
    this.httpClient.post(this.global.HospitalUrl + "UploadHospitalLogo", formData, { reportProgress: true, observe: 'events', responseType: 'text'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedImageData = event;
          this.message = 'Upload Success.';
          this.HospitalLogo = this.receivedImageData.body;
        }
        else {
          this.message = 'Upload Failed.';
        }
      });
  }

  onFileChanged(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = <File>event.target.files[0];
    const fd: any = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.doctorObj.UserName = this.global.doctorObj.UserName;
    //this.doctorObj.Password = this.global.doctorObj.Password;
    //fd.append('user', JSON.stringify(this.doctorObj));
    this.httpClient.post(this.global.HospitalUrl + "UploadImage", fd, { reportProgress: true, observe: 'events', responseType: 'json' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedImageData = event;
          this.message = 'Upload success.';
          this.doctorObj.Image = this.receivedImageData.body;
          //this.onUploadFinished.emit(event.body);
        }
      });
  }

  getImage() {
    //Make a call to backend to get the Image Bytes.
    this.httpClient.get(this.global.HospitalUrl + "GetImage")
      .subscribe(
        res => {
          this.retrieveResponse = res;
          if(this.retrieveResponse)
          this.retrievedImage = 'data:image/png;base64,' + this.retrieveResponse.Image;
        }
      );
  }

  UpdateProfile() {
    this.doctorObj.UserName = this.global.doctorObj.UserName;
    //this.doctorObj.Image = this.receivedImageData.body;
   // this.doctorObj.Password = this.global.doctorObj.Password;
    // this.global.doctorObj = this.doctorObj;
    // if (this.doctorObj.Password == this.doctorObj.ConfirmPassword) {
    this.httpClient.
      post<any>(this.global.HospitalUrl  + "UpdateProfile", this.doctorObj)
      .subscribe(res => {
        this.doctorObj = res;
        //this.global.doctorObj = res;
        this.getImage();
        alert("profile updated");
        //if (this.doctorObj.Password == this.doctorObj.ConfirmPassword) {
        this.doctorObj = res;
          //this.doctorObj = new DoctorsModel();
       // }
      },
        err => { console.log(err); });
    // else { alert("Password doesn't matched"); }
  }

  UpdateParameters() {
    this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "Name").ParameterValue = this.HospitalName ;
    this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "ContactNumber").ParameterValue = this.HospitalContact;
    this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "Email").ParameterValue = this.HospitalEmail;
    this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "Description").ParameterValue = this.HospitalDesc;
    this.parameterArray.find(a => a.ParameterGroupName === "EmailAPI" && a.ParameterName === "EmailSubject").ParameterValue  =  this.EmailSubject;
    this.parameterArray.find(a => a.ParameterGroupName === "EmailAPI" && a.ParameterName === "EmailPlainBody").ParameterValue  =  this.EmailPlainBody;
    this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "LogoPath").ParameterValue  = this.HospitalLogo;
    this.parameterArray.find(a => a.ParameterGroupName === "Hospital" && a.ParameterName === "VideoCallPlatform").ParameterValue= this.global.doctorObj.VideoCallPlatform;
    this.httpClient.
    post<any>(this.global.HospitalUrl  + "UpdateParameters", this.parameterArray)
    .subscribe(res => {
      this.parameterArray= res;
      alert("parameters updated");
    },
      err => { console.log(err); });
  }

  UpdateEmailTemplate() {
    this.parameterArray.find(a => a.ParameterGroupName === "EmailAPI" && a.ParameterName === "EmailHTMLBody").ParameterValue  = this.EmailHTMLBody;
    this.httpClient.
    post<any>(this.global.HospitalUrl  + "UpdateParameters", this.parameterArray)
    .subscribe(res => {
      this.parameterArray= res;
      alert("Email Template Updated");
    },
      err => { console.log(err); });
  }

  Invitation() {
    //this.httpClient.post("Messenger/SendSMS",data).subscribe(res=>this.SMSInvitationSuccess(res),err=>this.Error(err));
    this.httpClient.post("Messenger/SendEmail", this.global.doctorObj).subscribe(res => this.EmailInvitationSuccess(res), err => this.Error(err));
  }

  CallPatient(callPatient: PatientsAttendedModel) {
    if (this.global.patientObj.Status == 1) {
      this.global.patientObj=new PatientsAttendedModel;
    }
    console.log(this.global.doctorObj);
    this.showPatDetail = true;
    let dateTime = new Date();
    this.global.patientObj.AppointmentDate = dateTime;
    this.global.patientObj.PatientName = callPatient.PatientName;
    this.notificationService.CallPatient(callPatient);
  
    if(this.global.doctorObj.VideoCallPlatform==this.tokbox)
    {
      this.routing.navigateByUrl('/DoctorRoomTokbox', { state: this.global.patientObj });
    }
    else
    this.routing.navigateByUrl('/DoctorRoom', { state: this.global.patientObj });

  }

  LoadPatientsAttended() {
    this.httpClient.get("Hospital/GetPatientsAttended")
      .subscribe(res => this.LoadPatientSuccess(res), err => this.Error(err));

  }
  LoadPatientSuccess(res) {
    this.CompletedPatients = res;
  }

  NextPatient(res) {
    console.log(this.global.patientObj);
    if (res) {
      //console.log(this.patients);
      this.patients.forEach(p => {
        if (p.Id == res.Id) {
          p.Status = res.Status;
        }
      })
      this.global.patientObj = res;
    if(this.global.doctorObj.VideoCallPlatform==this.tokbox)
    {
      this.routing.navigateByUrl('/DoctorRoomTokbox', { state: this.global.patientObj });
    }
    else
    this.routing.navigateByUrl('/DoctorRoom', { state: this.global.patientObj });
      
     
    }
  }
  EmailInvitationSuccess(res) {
    console.log(res);
    if (res)
    {
      this.InvitationButton=true;
      alert("Email Invitation Sent has been sent ");
    }
    else
    {
      this.InvitationButton=true;
      alert("Sending failed!");
    }
  }
  // SMSInvitationSuccess(res)
  // {
  //   if(res)
  //    alert("Sms Invitation Sent has been sent ");
  //    else
  //    alert("Mobile number doesnot exists");
  // }
  Success(res) {
    this.patients = res;

  }
  Error(err) {
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