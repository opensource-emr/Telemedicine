import { AfterViewInit, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Patient, Practice, Provider } from 'src/app/_helpers/models/domain-model';
import { Global } from 'src/app/_helpers/common/global.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  selectedDate: NgbDateStruct;
  patients: Array<Patient> = new Array<Patient>();
  public showPatDetail: boolean = false;
  @ViewChild('pcam') video: any;
  Video: any;
  tokbox: string = 'Tokbox';
  form: FormGroup = new FormGroup({});
  public invitationButton: boolean = false;
  public invitationSuccess: boolean = false;
  public invitationFailure: boolean = false;
  isCamOn: boolean;

  constructor(private cdr: ChangeDetectorRef,
    private routing: Router,
    public global: Global,
    public httpClient: HttpClient,
    private calendar: NgbCalendar,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService,
    private fb: FormBuilder) {
    this.selectedDate = calendar.getToday();
    this.loadPatientsAttended();
    this.startCommunication();
    this.initForm();
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
        this.patients = _patients.filter(t => t.url == this.global.currentProvider);
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
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
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
    this.invitationButton = true;
    this.patientObj.email = this.form.value.email
    this.patientObj.mobileNumber = this.form.value.mobile_number;
    this.patientObj.providerNameAttending = this.providerObj.userName;
    this.httpClient.post("/Messenger/SendEmail", this.patientObj)
    .subscribe(res => this.emailInvitationSuccess(res), err => this.error(err));
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
    let params = new HttpParams().set('searchString', this.searchText);
    this.httpClient.get<any>(this.global.practiceUrl + "GetPatientsAttended", { params: params })
      .subscribe(res => this.loadPatientSuccess(res), err => this.error(err));
  }

  loadPatientSuccess(res) {
    this.completedPatients = res.filter(t => t.url == this.global.providerObj.url);
    this.filteredCompletedPatients = [...this.completedPatients];
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
    var diff = d.get("minutes") + "min" + d.get("seconds") + "sec";
    return diff;
  }

  logout() {
    this.global.providerObj = new Provider();
    this.notificationService.DisconnectUser();
    this.routing.navigateByUrl('/provider/login');
  }
  
  get loginFormControls() {
    return this.form.controls;
  }
}
