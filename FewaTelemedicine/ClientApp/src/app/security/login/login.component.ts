import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/Common/notification.service';
import { Provider, Patient, Practice } from 'src/models/DomainModels';
import { Global } from 'src/Common/global.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  providerObj: Provider = new Provider();
  practiceObj: Practice = new Practice();
  providerForm: FormGroup;
  clicked: boolean = false;
  practiceDetails = { description: '', contactNo: Number, email: '', logoPath: '' };
  patients: Array<Patient> = new Array<Patient>();
  getAllPatients: any;
  paramCheck: any;
  public state: Observable<object>;


  constructor(private httpClient: HttpClient,
    private routing: Router,
    public global: Global,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration')
      .subscribe(res => {
        if (res && res.Value && res.Value.length > 0) {
          var splitted = window.location.pathname.split("/", 3);
          this.global.providerObj.url = splitted[2];
          for (let temp of res.Value) {
            if (temp.url == splitted[1]) {
              this.global.practiceObj = temp;
              this.practiceObj = temp;
              this.global.isLogo = true;
            }
          }
        }
      }, err => {
        alert('Can not load configuration please talk with admin.');
      });
    this.state = history.state;
  }

  private initForm() {
    this.providerForm = this.formBuilder.group({
      providerUserName: ['', Validators.required],
      providerPassword: ['', Validators.required]
    });
  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    var control = this.providerForm.controls[controlname];
    if (!control) {
      return false;
    }
    return control.hasError(typeofvalidator) && control.touched;
  }

  LoginProvider() {
    if (this.providerForm.invalid) {
      return;
    }
    this.providerObj.userName = this.providerForm.value.providerUserName;
    this.providerObj.password = this.providerForm.value.providerPassword;
    this.global.providerObj = this.providerObj;
    this.httpClient.
      post<any>(this.global.apiUrl + "Security/Login", this.providerObj)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.isProvider = true;
        this.global.providerObj = res.User;
        var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.providerObj.userName);
        this.global.config.videourl = url;
        this.routing.navigateByUrl('/Home', { state: this.global });
      },
        res => {
          this.global.providerObj = new Provider();
          this.clicked = false;
          alert('Can not connect please talk with admin.')
        });
  }
}
