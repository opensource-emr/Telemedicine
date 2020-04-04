import { Component } from '@angular/core';
import { Doctor, Patient } from "./app.model"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { Global } from './app.global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  }
  hasError(typeofvalidator:string,controlname:string):boolean
  {
    var control=this.doctorFrm.controls[controlname];
    if(control == undefined){
      control = this.patientFrm.controls[controlname];
    }
    return control.hasError(typeofvalidator) && control.touched;
  }
  LoginDoctor() {
    if(this.doctorFrm.invalid)
    {
      alert("Doctor form is invalid");
      return;
    }
    this.global.doctorObj = this.doctorObj;
    this.httpClient.
      post(this.global.ApiUrl + "LoginDoctor", this.doctorObj)
      .subscribe(res => this.SuccessDoctor(res),
        res => this.Error(res));
  }
  SuccessDoctor(res) {
    this.global.IsDoctor = true;
    this.routing.navigate(['/DoctorRoom']);
  }
  SuccessPatient(res) {
    this.global.patientObj = res.Value;
    this.routing.navigate(['/WaitingRoom']);
  }
  Error(res) {
    alert("Can not connect please talk with admin");
  }
  LoginPatient() {
    if(this.patientFrm.invalid){
      alert("Patient form invalid");
      return;
    }
    this.httpClient.
      post(this.global.ApiUrl + "LoginPatient", this.patientObj)
      .subscribe(res => this.SuccessPatient(res),
        res => this.Error(res));
  }
}
