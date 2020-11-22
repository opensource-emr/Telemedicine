import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/_helpers/common/global.model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Patient } from 'src/app/_helpers/models/domain-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  patient: Patient;// = new Patient();
  emailForm:FormGroup;
  disableButton:boolean=false;

  constructor(
    private notificationService: NotificationService,
    public global: Global,
    private fb:FormBuilder,
    public httpClient:HttpClient
  ){
    //this.patient = this.global.patientObj;
    this.initConn();
  }

  ngOnInit(): void {
  }
  private initConn() {
    this.initForm();
    this.notificationService.Connect();
    this.notificationService.EventCompletePatient.subscribe(_patient=>{
      this.patient = _patient;
      //console.log(_patient);
    })
  }
  private initForm() {
    this.emailForm = this.fb.group({
      email: ['',  [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }
  get emailFormControls() {
    return this.emailForm.controls;
  }
  sendReport()
  {
    if(this.emailForm.invalid){
      return;
    }
    this.disableButton=true;
    this.patient.email=this.emailForm.value.email;
    this.httpClient.post("/Messenger/EmailPatientReport", this.patient)
    .subscribe(res => this.emailReportSuccess(res), err => this.error(err));
  }
  emailReportSuccess(res) {
    this.disableButton=false;
    if(res)
    alert("Report has been sent to your email");
  }
  error(res){ 
    this.disableButton=false;
    alert(res);
  }
  printReport(){
  window.print();
  }
}
