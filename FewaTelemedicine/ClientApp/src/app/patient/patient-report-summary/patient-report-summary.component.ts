import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalModel } from 'src/Common/global.model';

@Component({
    templateUrl:'./patient-report-summary.component.html'
})
export class PatientReportSummaryComponent
{
    constructor(public httpClient:HttpClient , 
        public routing:Router ,
        public global:GlobalModel){ 
        } 
         SuccessTestDone(res){
           this.global.patientObj=res;
          alert(res);
        }
}