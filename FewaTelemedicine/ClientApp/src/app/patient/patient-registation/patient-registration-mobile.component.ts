import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient, Practice, Provider } from 'src/models/DomainModels';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './patient-registration-mobile.component.html',
  selector: 'pat-reg-mobile'
})
export class PatientRegistrationMobileComponent implements OnInit {
  practiceObj: Practice = new Practice();
  patientObj: Patient = new Patient();
  providers: Array<Provider> = new Array<Provider>();
  public state: Observable<object>;
  patRegForm: FormGroup;
  disableCheckInBtn = true;
  constructor(public httpClient: HttpClient,
    public routing: Router,
    public global: Global,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private route: ActivatedRoute) {
    this.patRegForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      acceptTerms: [true, Validators.required]
    });
    this.patRegForm.get('acceptTerms').valueChanges.subscribe(x => {
      this.disableCheckInBtn = x;
    });
  }
  ngOnInit() {
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration')
      .subscribe(res => {
        if (res && res.Value && res.Value.length > 0) {
          for (let temp of res.Value) {
            if (temp.url == this.global.currentPractice) {
              this.practiceObj = temp;
            }
          }
        }
      }, err => {
        alert('Can not load configuration please talk with admin.');
      });
    this.state = history.state;
  }
  LoginPatient() {
    if (this.patRegForm.invalid) {
      this.patRegForm.get('patientName').markAsTouched();
      return;
    }
    this.patientObj.url = this.global.currentProvider;
    this.patientObj.providerNameAttending = this.global.currentProvider;
    this.patientObj.name = this.patRegForm.get('patientName').value;
    this.global.practiceObj.url = this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "LoginPatient", this.patientObj)
      .subscribe(res => {
        this.global.token = res.Value.Token;
        this.global.isProvider = false;
        this.global.isPatient = true;
        this.global.patientObj.name = res.Value.User.name;

        sessionStorage.setItem('PatientName', this.global.patientObj.name);
        this.global.patientObj = res.Value.User;
        this.global.patientObj.patientId = res.Value.patientId;
        this.global.patientObj.name = res.Value.name;
        // this.global.patientObj.url = res.Value.User.url;
        this.routing.navigateByUrl('/Waiting', { state: this.global });
      },
        res => {
          alert('User Already logged in');
        });
  }
  isControlHasError(contolName, validator): boolean {
    const control = this.patRegForm.controls[contolName];
    if (!control) {
      return;
    }
    return control.touched && control.hasError(validator);
  }
}