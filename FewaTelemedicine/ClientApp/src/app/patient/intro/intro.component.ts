// Login Patient ,Validationa nd 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Practice, Patient, Provider } from '../../_helpers/models/domain-model';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/_helpers/common/notification.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  practiceObj: Practice = new Practice();
  patRegForm: FormGroup;
  disableCheckInBtn = true;
  isWaiting = false;

  constructor(public httpClient: HttpClient,
    public routing: Router,
    public global: Global,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
    this.initializeForm();
  }

  private initializeForm() {
    this.patRegForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      acceptTerms: new FormControl({ value: true }, Validators.required)
    });
    this.patRegForm.get('acceptTerms').valueChanges.subscribe(x => {
      this.disableCheckInBtn = x;
    });
  }

  ngOnInit(): void {
    this.getPracticeConfiguration();
  }

  private getPracticeConfiguration() {
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration?practice=' + this.global.currentPractice)
      .subscribe(res => {
        if (res && res.Value) {
          this.practiceObj = res.Value;
        }
      }, err => {
        alert('Can not load configuration please talk with admin.');
      });
  }

  isControlHasError(contolName, validator): boolean {
    const control = this.patRegForm.controls[contolName];
    if (!control) {
      return;
    }
    return control.touched && control.hasError(validator);
  }

  loginPatient() {
    if (this.patRegForm.invalid) {
      this.patRegForm.get('patientName').markAsTouched();
      return;
    }
    var patient = new Patient();
    patient.name = this.patRegForm.controls.patientName.value;
    patient.url = this.global.currentProvider;
    this.global.practiceObj.url = this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "LoginPatient", patient)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.isProvider = false;
        this.global.isPatient = true;
        this.global.patientObj = res.User;
        sessionStorage.setItem('PatientName', this.global.patientObj.name);
        var url: string = this.global.config.videourl.replace("PROVIDERNAME", this.global.currentProvider);
        this.global.config.videourl = url;
        this.isWaiting = true;
        this.initiateNotifications();
      },
        res => {
          alert('User already logged in');
        });
  }
  
  private initiateNotifications() {
    this.notificationService.Connect();
    this.notificationService.EventCallPatient.subscribe(_data => {
      this.routing.navigateByUrl('/patient/live');
    });
  }
}
