import { ChangeDetectorRef, Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/Common/global.model';
import { Patient } from 'src/models/DomainModels';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './patient-report-summary.component.html'
})
export class PatientReportSummaryComponent {
  patientObj: Patient = null;
  isMobile: boolean;
  constructor(public httpClient: HttpClient,
    public routing: Router,
    public global: Global,
    private changeDetector: ChangeDetectorRef,
    private title: Title) {
    this.title.setTitle("Fewa Telemdicine-Report");
    this.isMobile = this.global.isMobile.test(window.navigator.userAgent);
    window.onresize = () => {
      this.isMobile = this.global.isMobile.test(window.navigator.userAgent);
    }
  }
  SuccessTestDone(res) {
    this.patientObj = res;
    alert(res);
  }
}