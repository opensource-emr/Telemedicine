// Login Patient ,Validationa nd 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Practice, Patient, Provider } from '../../_helpers/models/domain-model';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/_helpers/common/notification.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro-mobile.component.html',
  styleUrls: ['./intro-mobile.component.scss']
})
export class IntroMobileComponent implements OnInit {
  practiceObj: Practice = new Practice();
  patRegForm: FormGroup;
  disableCheckInBtn = true;
  loadConfigMsg : boolean = false;
  userLoggedMsg : boolean = false;
  constructor(public httpClient: HttpClient,
    public routing: Router,
    public global: Global,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
    this.initializeForm();
  }

  private initializeForm() {
    this.patRegForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      acceptTerms: new FormControl({ value: true }, Validators.required)
    });
    this.patRegForm.get('acceptTerms').valueChanges.subscribe(x => {
      this.disableCheckInBtn = x;
    });
  }

  ngOnInit(): void {
    this.global.isProvider = false;
    this.global.isPatient = true;
    this.getPractice();
  }

  private getPractice() {
    var key="73l3M3D"; //hardcoded
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration?practice=' + this.global.currentPractice + "&" + "key=" + key)
      .subscribe(res => {
        this.global.practiceObj = res;
        if (!this.global.practiceObj.logoPath) {
          this.global.practiceObj.logoPath = '/assets/img/logo.png';
        }
        this.practiceObj = this.global.practiceObj;
      }, err => {
        //'Can not load configuration please talk with admin.
        this.loadConfigMsg = true;
        setTimeout(() => {
          this.loadConfigMsg = false;
        }, 5000);
      });
  }
  
  isControlHasError(contolName, validator): boolean {
    const control = this.patRegForm.controls[contolName];
    if (!control) {
      return;
    }
    return control.touched && control.hasError(validator);
  }

  loginPatient() {
    if (this.patRegForm.invalid) {
      this.patRegForm.get('patientName').markAsTouched();
      return;
    }
    var patient = new Patient();
    patient.name = this.patRegForm.controls.patientName.value;
    patient.url = this.global.currentProvider;
    patient.practice=this.global.currentPractice.replace(/\s/g, "").toLowerCase();
    patient.providerNameAttending=this.global.currentProvider.replace(/\s/g, "").toLowerCase();
    this.global.practiceObj.url = this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "LoginPatient", patient)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.patientObj = res.User;
        sessionStorage.setItem('PatientName', this.global.patientObj.name);
        var url: string = this.global.config.videourl.replace("PROVIDERNAME", this.global.currentProvider);
        this.global.config.videourl = url;
        this.routing.navigateByUrl('/patient/live-mobile');
      },
        res => {
          //alert('User already logged in');
          this.userLoggedMsg = true;
        setTimeout(() => {
          this.userLoggedMsg = false;
        }, 5000);
    });
  }
}
