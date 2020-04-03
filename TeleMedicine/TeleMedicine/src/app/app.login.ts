import { Component } from '@angular/core';
import {Doctor,Patient} from "./app.model"
import {HttpClient} from "@angular/common/http"
import { Router } from "@angular/router"
import { Global } from './app.global';
@Component({
  selector: 'app-root',
  templateUrl: './app.login.html'
})
export class LoginComponent {
  title = 'telemedicine';
  doctorObj:Doctor = new Doctor();
  patientObj:Patient = new Patient();
  constructor(public httpClient:HttpClient , 
    public routing:Router ,
    public global:Global){

  }
  
  LoginDoctor(){
    this.global.doctorObj = this.doctorObj;
    this.httpClient.
    post(this.global.ApiUrl + "LoginDoctor", this.doctorObj)
    .subscribe(res=>this.SuccessDoctor(res),
    res=>this.Error(res));
  }
  SuccessDoctor(res){
    this.global.IsDoctor = true;
    this.routing.navigate(['/DoctorRoom']);
  }
  SuccessPatient(res){
    this.global.patientObj = this.patientObj;
    this.routing.navigate(['/WaitingRoom']);
  }
  Error(res){
    alert("Can not connect please talk with admin");
  }
  LoginPatient(){
    this.httpClient.
    post(this.global.ApiUrl +"LoginPatient", this.patientObj)
    .subscribe(res=>this.SuccessPatient(res),
    res=>this.Error(res));
  }
}
