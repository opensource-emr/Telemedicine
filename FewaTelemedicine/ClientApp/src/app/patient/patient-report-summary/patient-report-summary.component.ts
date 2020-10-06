import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Global } from 'src/Common/global.model';
import { Patient } from 'src/models/DomainModels';

@Component({
    templateUrl:'./patient-report-summary.component.html'
})
export class PatientReportSummaryComponent
{
  patientObj:Patient=null;
    constructor(public httpClient:HttpClient , 
        public routing:Router ,
        public global:Global){ 
          this.routing.navigate([],
            { queryParams:{ProviderId:this.global.patientObj.url},
              queryParamsHandling:"preserve"
          },
            );
        } 
         SuccessTestDone(res){
           this.patientObj=res;
          alert(res);
      
        }
}