import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/_helpers/common/global.model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Patient, ProviderAdvice } from 'src/app/_helpers/models/domain-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary-mobile.component.html',
  styleUrls: ['./summary-mobile.component.scss']
})
export class SummaryMobileComponent implements OnInit {
  patient: Patient;// = new Patient();
  emailForm: FormGroup;
  disableButton: boolean = false;
  public providerAdvice: Array<ProviderAdvice> = [];
  sendEmailMsg: boolean = false;
  emailFailMsg: boolean = false;

  constructor(
    private notificationService: NotificationService,
    public global: Global,
    private fb: FormBuilder,
    public httpClient: HttpClient
  ) {
    this.patient = this.global.patientObj;
    this.initConn();
  }

  ngOnInit(): void {
    this.loadAdvice();
  }

  loadAdvice() {
    this.httpClient.post<any>(this.global.practiceUrl + "GetAllAdvice", this.global.providerObj)
      .subscribe(res => {
        if (res) {
          for (let temp of res) {
            if (temp.providerId === this.global.providerObj.providerId) {
              this.providerAdvice.push(temp);
            }
          }
        }
      });
  }
  
  private initConn() {
    this.initForm();
    this.notificationService.Connect();
    // this.notificationService.EventCompletePatient.subscribe(_patient => {
    //   this.patient = _patient;
      //console.log(_patient);
    //})
  }
  private initForm() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$")]]
    });
  }
  get emailFormControls() {
    return this.emailForm.controls;
  }
  sendReport() {
    if (this.emailForm.invalid) {
      return;
    }
    var key="73l3M3D"; //hardcoded
    this.disableButton = true;
    this.patient.email = this.emailForm.value.email.trim();
    this.httpClient.post("/Messenger/EmailPatientReport?key=" + key, this.patient)
      .subscribe(res => this.emailReportSuccess(res), err => this.error(err));
  }

  emailReportSuccess(res) {
    this.disableButton = false;
    this.emailForm.reset();
    if (res){
     //Report has been sent to your email
    this.sendEmailMsg = true;
    setTimeout(() => {
      this.sendEmailMsg = false;
    }, 10000);
     
    }
    else{
      //Unable to send try again!
      this.emailFailMsg = true;
    setTimeout(() => {
      this.emailFailMsg = false;
    }, 10000);
    }          
  }
  error(res) {
    this.disableButton = false;
    alert(res);
  }
  printReport() {
    window.print();
  }
}
