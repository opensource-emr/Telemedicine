import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Practice, Provider } from 'src/app/_helpers/models/domain-model';
import { Global } from '../../_helpers/common/global.model';
import { NotificationService } from '../../_helpers/common/notification.service';
import { AnySoaRecord } from 'dns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providerObj: Provider = new Provider();
  practiceObj: Practice = new Practice();
  providerForm: FormGroup;
  clicked: boolean = false;
  loadPracticeMsg: boolean = false; 
  connectErrorMsg: boolean= false;
  public errorMsg = '';
  adminVar : any;
  constructor(private httpClient: HttpClient,
    private routing: Router,
    public global: Global,
    private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getPractice();
    this.global.previousChats = [];
  }

  private getPractice() {
    var key="73l3M3D"; //hardcoded
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration?practice=' + this.global.currentPractice + "&" + "key=" + key)
      .subscribe(res => {
        this.global.practiceObj = res;
        if (!this.global.practiceObj.logoPath) {
          this.global.practiceObj.logoPath = '/assets/img/logo.png';
        }
        this.practiceObj = this.global.practiceObj;
      }, err => {
         //Can not load configuration please talk with admin.
        this.loadPracticeMsg = true;
        setTimeout(() => {
          this.loadPracticeMsg = false;
        }, 5000);
      });
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

  loginProvider() {
    if (this.providerForm.invalid) {
      this.clicked = false;
      return;
    }
    this.providerObj.userName = this.providerForm.value.providerUserName.replace(/\s/g, "").toLowerCase();
    this.providerObj.password = this.providerForm.value.providerPassword;
    this.providerObj.url = this.global.currentProvider;
    this.providerObj.practice=this.global.currentPractice;
    this.global.providerObj = this.providerObj;
    this.httpClient.
      post<any>(this.global.apiUrl + "Security/Login", this.providerObj)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.isProvider = true;
        this.global.providerObj = res.User;
        var roomname = this.global.providerObj.roomName.replace("name", this.global.providerObj.userName);
        this.global.providerObj.roomName = roomname;
        var url: string = this.global.config.videourl.replace("PROVIDERNAME", this.global.currentProvider);
        this.global.config.videourl = url;
        this.routing.navigateByUrl('/provider/dashboard', { state: this.global });
      },
        err => {
          this.global.providerObj = new Provider();
          this.clicked = false;
          this.errorMsg = err.error;
          this.connectErrorMsg = true;
        setTimeout(() => {
          this.connectErrorMsg = false;
        }, 7000);
        });
  }
  getSignUpLink(){
    window.location.assign(window.location.origin +'/#/provider/register');
  }
}
