import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './app.global';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.finalreport.html'
  })
  export class FinalReportComponent {
    constructor(public httpClient:HttpClient , 
      public routing:Router ,
      public global:Global){
      
      }
      Success(res){
        alert(res.PatientName);
      }
  }
  