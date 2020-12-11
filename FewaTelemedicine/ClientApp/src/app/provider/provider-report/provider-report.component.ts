import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Patient } from 'src/app/_helpers/models/domain-model';

@Component({
  selector: 'app-provider-report',
  templateUrl: './provider-report.component.html',
  styleUrls: ['./provider-report.component.scss']
})
export class ProviderReportComponent implements OnInit {

  isDisplayed = false;
  isSubmitting: boolean = true;
  patient: Patient = new Patient();
  reportForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    public global: Global,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.patient = this.global.patientObj;
    this.initForm();
  }

  private initForm() {
    this.reportForm = this.formBuilder.group({
      labOrdersSent: new FormControl(true, Validators.nullValidator),
      newPrescriptionsSentToYourPharmacy: new FormControl(true, Validators.nullValidator),
      newPrescriptionsMailedToYou: new FormControl(true, Validators.nullValidator),
      medication: new FormControl('', Validators.nullValidator),
      followUpNumber: new FormControl('', Validators.nullValidator),
      followUpMeasure: new FormControl('', Validators.nullValidator),
    });
  }

  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed;
    this.isSubmitting = false;
    //console.log(this.isSubmitting)
  }

  ngOnInit(): void {
    this.notificationService.Connect();
  }
  completeVisit() {
    var v: Patient = this.reportForm.getRawValue();
    this.patient.labOrdersSent = v.labOrdersSent;
    this.patient.newPrescriptionsSentToYourPharmacy = v.newPrescriptionsSentToYourPharmacy;
    this.patient.newPrescriptionsMailedToYou = v.newPrescriptionsMailedToYou;
    this.patient.medication = v.medication;
    this.patient.followUpNumber = v.followUpNumber.toString();
    this.patient.followUpMeasure = v.followUpMeasure;
    this.patient.practice=this.global.currentPractice;
    if(this.patient.mobileNumber) {
      this.patient.mobileNumber = this.patient.mobileNumber.toString();
    }
    this.global.patientObj = this.patient;
    this.notificationService.PatientAttended(this.patient);
    this.router.navigate(['/provider/dashboard']);
  }
}
