import { Component } from '@angular/core';
import { timer  } from 'rxjs';
import { map } from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from './app.global';
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
    if(res){
    this.routing.navigate(['/DoctorRoom']);
    }
  }
 
  Error(res){
  console.log(res);    
  }
}