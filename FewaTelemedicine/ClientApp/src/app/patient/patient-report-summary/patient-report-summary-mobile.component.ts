import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/Common/global.model';
import { Patient } from 'src/models/DomainModels';

@Component({
    templateUrl: './patient-report-summary-mobile.component.html',
    selector: 'pat-summery-report'
})
export class PatientReportSummaryMobileComponent {
    patientObj: Patient = null;
    showEmailModal: boolean = false;
    constructor(public httpClient: HttpClient,
        public routing: Router,
        public global: Global) {
    }
    SuccessTestDone(res) {
        this.global.patientObj = res;
        alert(res);
    }

    openEmailModal() {
        this.showEmailModal = true;
    }
}