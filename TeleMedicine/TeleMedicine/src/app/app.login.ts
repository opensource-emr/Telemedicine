import { Component, NgZone } from '@angular/core';
import { Doctor, Patient } from "./model/app.model"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { Global } from '../common/app.global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './model/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.login.html'
})
export class LoginComponent {
  title = 'telemedicine';
  doctorObj: Doctor = new Doctor();
  patientObj: Patient = new Patient();
  patientFrm: FormGroup;
  doctorFrm: FormGroup;

  constructor(public httpClient: HttpClient,
    public routing: Router,
    public global: Global,
    private formBuilder: FormBuilder) {
    
    this.initForm();
  }

  private initForm() {
    this.patientFrm = this.formBuilder.group({
      patUsrName: ['', Validators.required]
    });
    this.doctorFrm = this.formBuilder.group({
      docUsrName: ['', Validators.required],
      docPassword: ['', Validators.required]
    });
    this.doctorObj.Name = "doc1";
    this.doctorObj.Password = "pass@123";
  }
  hasError(typeofvalidator: string, controlname: string): boolean {
    var control = this.doctorFrm.controls[controlname];
    if (control == undefined) {
      control = this.patientFrm.controls[controlname];
    }
    return control.hasError(typeofvalidator) && control.touched;
  }
  LoginDoctor() {
    if (this.doctorFrm.invalid) {
      return;
    }
    this.global.doctorObj = this.doctorObj;
    this.httpClient.
      post(this.global.ApiUrl + "LoginDoctor", this.doctorObj)
      .subscribe(res => this.SuccessDoctor(res),
        res => this.Error(res));
  }
  SuccessDoctor(res) {
    this.global.token = res.Value.Token;
    this.global.IsDoctor = true;
    var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.doctorObj.Name);
    this.global.config.videourl = url;
    this.routing.navigate(['/DoctorRoom']);
    
  }
  SuccessPatient(res) {
    this.global.token = res.Value.Token;
    this.global.IsPatient = true;
    this.global.patientObj = res.Value.User;
    this.routing.navigate(['/WaitingRoom']);
  }
  Error(res) {
    alert("Can not connect please talk with admin");
  }
  LoginPatient() {
    if (this.patientFrm.invalid) {
      return;
    }
    this.httpClient.
      post(this.global.ApiUrl + "LoginPatient", this.patientObj)
      .subscribe(res => this.SuccessPatient(res),
        res => this.Error(res));
  }
}
