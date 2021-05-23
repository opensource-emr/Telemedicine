import { AfterViewInit, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Patient, Practice, Provider } from 'src/app/_helpers/models/domain-model';
import { Global } from 'src/app/_helpers/common/global.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard'
import { MatSnackBar } from '@angular/material/snack-bar';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public completedPatients: Array<Patient> = null;
  public filteredCompletedPatients: Array<Patient> = [];
  providerObj: Provider = new Provider();
  practiceObj: Practice = new Practice();
  patientObj: Patient = new Patient();
  searchText: string = "";
  invitationLink: string = this.getInvitationLink();
  selectedDate: NgbDateStruct;
  patients: Array<Patient> = new Array<Patient>();
  disconnectedPatient='';
  public showPatDetail: boolean = false;
  @ViewChild('pcam') video: any;
  Video: any;
  tokbox: string = 'Tokbox';
  form: FormGroup = new FormGroup({});
  public invitationButton: boolean = false;
  public invitationSuccess: boolean = false;
  public invitationFailure: boolean = false;
  isCamOn: boolean;
  position: TooltipPosition = "above";
  disconnectPatient : boolean= false;
  constructor(private cdr: ChangeDetectorRef,
    private routing: Router,
    public global: Global,
    public httpClient: HttpClient,
    private calendar: NgbCalendar,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public clipboard: Clipboard,
    public _snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute) {
    this.selectedDate = calendar.getToday();
    this.displayPatientDisconnectedMessage();
    this.loadPatientsAttended();
    this.startCommunication();
    this.initForm();
  }

  //if patient disconnected display message
  displayPatientDisconnectedMessage(){
    this.activatedRoute.queryParams.subscribe(m => {
      this.disconnectedPatient = m['name'];
    });
    if(this.disconnectedPatient!=undefined){
      //has disconnected 
      this.disconnectPatient= true;
      setTimeout(() => {
        this.disconnectPatient = false;
      }, 5000);
    }
  }

  /*
  Start Communication added by Bhavana Vanjani
  */
  private startCommunication() {
    this.notificationService.Connect();
    if (this.global.isPatient) {
      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.patients = _patient;
        });
    }
    this.notificationService.EventGetAllPatients
      .subscribe(_patients => {
        this.patients = _patients.filter(t => t.url == this.global.currentProvider && t.practice == this.global.currentPractice);
      });

    this.notificationService.EventCallPatient
      .subscribe(_patient => {
        this.global.patientObj = _patient;
      });

    if (!this.providerObj) {
      this.routing.navigate(['/provider/dashboard']);
    }
    else if (this.providerObj.userName == "") {
      this.routing.navigate(['/provider/dashboard']);
    }
    this.practiceObj = this.global.practiceObj;
    this.providerObj = this.global.providerObj;
  }

  ngOnInit() {
    this.providerObj = this.global.providerObj;
  }

  ngAfterViewInit() {
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$")]],
      mobile_number: ['', [Validators.pattern("^\\+?[0-9]{3}[0-9]{0,9}$")]],
    })
  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let finalDate = year + "-" + month + "-" + day;
    this.searchText = finalDate;
    this.loadPatientsAttended();
  }

  sendInvitation() {
    if (this.form.invalid) {
      return
    }
    var key="73l3M3D"; //hardcoded
    this.invitationButton = true;
    this.patientObj.email = this.form.value.email.trim();
    this.patientObj.mobileNumber = this.form.value.mobile_number;
    this.patientObj.providerNameAttending = this.providerObj.userName;
    this.httpClient.post("/Messenger/SendEmail?key=" + key, this.patientObj)
      .subscribe(res => this.emailInvitationSuccess(res), err => this.error(err));
  }

  getInvitationLink() {
    // https://host/practiceurl/providerurl/#/patient/intro
    let link = "";
    let host = window.location.host;
    let protocol = window.location.protocol;
    let practiceUrl = this.global.currentPractice;
    let providerUrl = this.global.currentProvider;
    return link = protocol + "//" + host + "/" + practiceUrl + "/" + providerUrl + "/#/patient"
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  copyToClipBoard() {
    this.clipboard.copy(this.invitationLink)
    this.openSnackBar('Link Copied to Clipboard', '');
  }

  emailInvitationSuccess(res) {
    if (res) {
      this.invitationButton = false;
      this.invitationSuccess = true;
      this.form.reset();
      setTimeout(() => {
        this.invitationSuccess = false;
      }, 10000);
    }
    else {
      this.invitationButton = false;
      this.invitationFailure = true;
      setTimeout(() => {
        this.invitationFailure = false;
      }, 10000);
    }
  }

  loadPatientsAttended() {
    this.completedPatients = [];
    this.httpClient.post<any>(this.global.practiceUrl + "GetPatientsAttended?searchString="
      + this.searchText, this.global.providerObj)
      .subscribe(res => this.loadPatientSuccess(res), err => this.error(err));
  }

  loadPatientSuccess(res) {
    this.filteredCompletedPatients = res;
    this.cdr.detectChanges();
  }

  error(err) {
    alert(err.status);
  }

  callPatient(callPatient: Patient) {
    if (this.patientObj.status == 1) {
      this.patientObj = new Patient();
    }
    this.showPatDetail = true;
    let dateTime = new Date();
    this.patientObj.appointmentDate = dateTime;
    this.patientObj.name = callPatient.name;
    this.patientObj.practice = this.global.currentPractice;
    this.patientObj.providerId=this.global.providerObj.providerId;
    this.patientObj.practiceId=this.global.providerObj.practiceId;
    this.global.isMobile=callPatient.isMobile;
    this.notificationService.CallPatient(callPatient);

    if (this.practiceObj.callingPlatform == this.tokbox) {
      this.routing.navigate(['/provider/live'], { state: this.global });
    }
    else
      this.routing.navigate(['/provider/live']);
  }

  difference(start: Date, end: Date) {
    var endTime = end;
    var startTime = start;
    diff = moment.utc(moment(endTime, "YYYY-MM-DD HH:mm:ss").diff(moment(startTime, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");
    var ms = moment.utc(moment(endTime, "YYYY-MM-DD HH:mm:ss").diff(moment(startTime, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");
    var d = moment.duration(ms);
    var diff = d.get("minutes") + " min " + d.get("seconds") + " sec ";
    return diff;
  }

  logout() {
    this.global.providerObj = new Provider();
    this.notificationService.DisconnectUser();
    this.global.previousChats = [];
    this.routing.navigateByUrl('/provider/login');
  }

  get loginFormControls() {
    return this.form.controls;
  }
}
