import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, OnDestroy, AfterViewInit } from "@angular/core";
import { Router, NavigationStart, ActivatedRoute, Data } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model'
import { HttpClient, HttpEventType, HttpEvent, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SMSModel } from 'src/models/SMS.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Provider, Patient, Practice } from 'src/models/DomainModels';

@Component({
  templateUrl: './provider-home.component.html',
  template: `<pre>{{ state | async | json }}</pre>`,
  styleUrls: ['../../../assets/css/doctor-home-component.css']

})
export class ProviderHomeComponent implements OnInit, AfterViewInit {
  public state: Observable<object>;
  public LogoToUpload: File = null;
  public selectedFile: File;
  public progress: number;
  public message: string;
  count: number = 0;
  receivedImageData: any;
  retrievedImage: any;
  retrieveResponse: any;
  activeTab = 'updateProfile';
  HospitalName: string = "";
  HospitalContact: string = "";
  HospitalEmail: string = "";
  HospitalLogo: string = "";
  EmailSubject: string = "";
  EmailPlainBody: string = "";
  EmailHTMLBody: string = "";
  HospitalDesc: string = "";
  showChat: boolean = true;
  AllUserChats: any = {};
  ChatMessages: Array<any> = new Array<any>();
  ChatReceivedMessages: Array<any> = new Array<any>();
  ChatUserDropDowns: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  usrname: string;

  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  public InvitationButton: boolean = true;
  public InvitationSuccess: boolean = false;
  public InvitationFailure: boolean = false;
  public SendInvitation: boolean = true;
  public AdminScreen: boolean = false;
  public CompletedAppointments: boolean = false;
  public AccountSettings: boolean = false;
  public ProfileUpdate: boolean = true;
  public ParamsUpdate: boolean = false;
  public EmailTemplateUpdate: boolean = false;
  public ChatSection: boolean = false;
  public CompletedPatients: Array<Patient> = null;
  public CompPatients: Array<Patient> = null;
  public AddedDoctors: Array<Provider> = null;
  providerObj: Provider = new Provider();
  practiceObj: Practice = new Practice();
  patientObj: Patient = new Patient();

  public showPatDetail: boolean = false;
  patients: Array<Patient> = new Array<Patient>();

  @ViewChild('pcam') video: any;
  Video: any;
  tokbox: string = 'Tokbox';
  showPreview: boolean = false;
  public invitationForm: FormGroup;
  ngAfterViewInit() {
    let _video = this.video.nativeElement;
    this.Video = _video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          _video.srcObject = stream;
          _video.play();
        })
    }
  }
  constructor(private routing: Router,
    private notificationService: NotificationService,
    public global: Global,
    public httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer) {

    this.initForm();
    this.LoadPatientsAttended();
    this.practiceObj = this.global.practiceObj;
    this.providerObj = this.global.providerObj;
    if (this.global.isPatient) {
      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          // this.global.patientObj = _patient;
          this.patients = _patient;
          // this.patients = _patient;
          // this.PatientCompleted(_patient);
          this.ChatUserDropDowns = new Array<any>();
        });
    }

    this.notificationService.Connect();
    this.notificationService.EventGetAllPatients
      .subscribe(_patients => {
        this.patients = _patients;
        // this.patients = _patients;
        this.ChatUserDropDowns = _patients;
      });

    this.notificationService.EventCallPatient
      .subscribe(_patient => {
        this.global.patientObj = _patient;
      });

    this.notificationService.EventChatMessage
      .subscribe(data => {
        if (this.ChatForm.controls['selUser'].value != data.name) {
          this.ChatForm.controls['selUser'].setValue(data.name);
          this.OnChatUserChange();
        }
        if (!this.showChat) {
          this.showChat = true;
        }
        const chatMsg = { name: data.name, message: data.message, Class: 'receiver-msg' };
        this.ChatMessages.push(chatMsg);
        this.count = this.count + 1;
        this.pushChatMsgUserwise(data.Name, chatMsg);

        this.cdr.detectChanges();
        // this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
      });

    this.invitationForm = this.formBuilder.group(
      {
        email: ['', Validators.email],
        mobileno: ['', Validators.required],
      })
    if (!this.providerObj) {
      this.routing.navigate(['Login']);
    }
    else if (this.providerObj.userName == "") {
      this.routing.navigate(['Login']);
    }
  }

  ngOnInit() {
    var config = new HttpParams().set('username', this.global.providerObj.userName);
    this.httpClient.get<any>(this.global.practiceUrl + "GetUpdatedProvider", { params: config })
      .subscribe(res => {
        this.providerObj = res.User;
        if (this.providerObj.image) {
          this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
        }
      });

  }

  ngOnDestroy() {
    const mediaStream = this.Video?.srcObject;
    if (mediaStream == null) {
      return;
    }
    (<MediaStream>mediaStream).getTracks().forEach(stream => stream.stop());
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
    else if (data == 'Admin') {
      this.SendInvitation = false;
      this.CompletedAppointments = false;
      this.AccountSettings = false;
      this.ChatSection = false;
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

  updatePracticeLogo(file: FileList) {
    this.LogoToUpload = file.item(0);
    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
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
    this.httpClient.post(this.global.practiceUrl + "UploadPracticeLogo", formData, { reportProgress: true, observe: 'events', responseType: 'text' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedImageData = event;
          this.message = 'Upload Success.';
          this.practiceObj.logoPath = this.receivedImageData.body;
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
    // this.providerObj.userName = this.providerObj.userName;
    //this.doctorObj.Password = this.global.doctorObj.Password;
    //fd.append('user', JSON.stringify(this.doctorObj));
    this.httpClient.post(this.global.practiceUrl + "UploadProfileImage", fd, { reportProgress: true, observe: 'events', responseType: 'json' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedImageData = event;
          this.message = 'Upload success.';
          this.providerObj.image = this.receivedImageData.body;
          //this.onUploadFinished.emit(event.body);
        }
      });
  }

  getImage() {
    //Make a call to backend to get the Image Bytes.
    this.httpClient.get(this.global.practiceUrl + "GetProfileImage")
      .subscribe(
        res => {
          this.retrieveResponse = res;
          if (this.retrieveResponse)
            this.retrievedImage = 'data:image/png;base64,' + this.retrieveResponse;
        }
      );
  }
  UpdatePracticeConfiguration() {
    this.httpClient.
      post<any>(this.global.practiceUrl + "UpdatePracticeConfiguration", this.global.practiceObj)
      .subscribe(res => {
        this.practiceObj = res;
        alert("Practice Configuration updated");
      },
        err => { console.log(err); });
  }

  UpdateProfile() {
    console.log(this.providerObj);
    this.httpClient.
      post<any>(this.global.practiceUrl + "UpdateProfile", this.providerObj)
      .subscribe(res => {
        this.providerObj = res;
        //this.global.doctorObj = res;
        this.getImage();
        alert("profile updated");
        this.providerObj = res;
      },
        err => { console.log(err); });
  }
  EmailTemplateUrl() {
    return this.sanitizer.bypassSecurityTrustHtml(this.practiceObj.emailHtmlBody);
  }
  PreviewEmailTemplate() {

    this.httpClient.
      post<any>(this.global.practiceUrl + "PreviewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
        // this.PreviewEmailContent = res.PreviewEmailContent;
        this.showPreview = true;
      },
        err => { console.log(err); });
  }
  UpdateEmailTemplate() {
    this.httpClient.
      post<any>(this.global.practiceUrl + "UpdatePracticeConfiguration", this.practiceObj.emailHtmlBody)
      .subscribe(res => {
        this.practiceObj = res;
        alert("Email Template Updated");
      },
        err => { console.log(err); });
  }

  Invitation() {
    this.InvitationButton = false;
    this.httpClient.post("/Messenger/SendEmail", this.patientObj).subscribe(res => this.EmailInvitationSuccess(res), err => this.Error(err));
    this.invitationForm.reset();
  }

  CallPatient(callPatient: Patient) {
    if (this.patientObj.status == 1) {
      this.patientObj = new Patient;
    }
    console.log(this.providerObj);
    this.showPatDetail = true;
    let dateTime = new Date();
    this.patientObj.appointmentDate = dateTime;
    this.patientObj.name = callPatient.name;
    this.notificationService.CallPatient(callPatient);

    if (this.practiceObj.callingPlatform == this.tokbox) {
      this.routing.navigateByUrl('/ProviderRoomTokbox', { state: this.global });
    }
    else
      this.routing.navigateByUrl('/ProviderRoom', { state: this.global });

  }

  LoadPatientsAttended() {
    this.httpClient.get(this.global.practiceUrl + "GetPatientsAttended")
      .subscribe(res => this.LoadPatientSuccess(res), err => this.Error(err));

  }
  LoadPatientSuccess(res) {
    this.CompletedPatients = res.filter(t => t.url == this.global.providerObj.url);
    // this.CompletedPatients=res;
  }

  NextPatient(res) {
    console.log(this.patientObj);
    if (res) {
      //console.log(this.patients);
      this.patients.forEach(p => {
        if (p.patientId == res.Id) {
          p.status = res.status;
        }
      })
      this.patientObj = res;
    }
  }
  EmailInvitationSuccess(res) {
    console.log(res);
    if (res) {
      this.InvitationButton = true;
      this.InvitationSuccess = true;

      //alert("Email Invitation Sent has been sent ");
    }
    else {
      this.InvitationButton = true;
      this.InvitationFailure = true;
      //alert("Sending failed!");
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