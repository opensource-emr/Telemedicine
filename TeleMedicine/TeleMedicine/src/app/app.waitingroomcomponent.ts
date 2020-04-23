import { Component } from '@angular/core';
import { timer, config  } from 'rxjs';
import { map } from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from '../common/app.global';
@Component({
    selector: 'app-root',
    templateUrl: './app.waitingroom.html'
  })
export class WaitingRoom{
    timer1:any = timer(5000,8000);
  constructor(public httpClient:HttpClient , 
    public routing:Router ,
    public global:Global){
      this.timer1.subscribe(
        ()=>{this.httpClient.post(global.ApiUrl+
          "CanIComeIn", this.global.patientObj)
          .subscribe(res=>this.Success(res))
          ;
        }
      );    
  }
  Success(res){
    if(res==false){return;}
    if(res.DoctorNameAttending.length>0){

    this.global.patientObj.DoctorNameAttending=res.DoctorNameAttending;
    var url:string = this.global.config.videourl.replace("DOCTORNAME",this.global.patientObj.DoctorNameAttending);
    this.global.config.videourl = url;
    this.routing.navigate(['/DoctorRoom']);
    }
  }
 
  Error(res){
  console.log(res);    
  }
}