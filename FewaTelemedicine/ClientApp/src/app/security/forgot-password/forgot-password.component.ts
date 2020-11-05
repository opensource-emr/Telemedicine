import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from 'src/Common/global.model';
import { Provider, Practice } from 'src/models/DomainModels';
import { ConfirmedValidator } from 'src/Common/confirmed-validator';

@Component({
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {
  disableSubmitButton: boolean = false;
  disableResendButton: boolean = true;
  showOtpSection: boolean = true;
  showOtpVerifySection: boolean = false;
  showResetPasswordSection: boolean = false;
  countDownTime: number = 30;
  providerObj: Provider = new Provider();
  practiceObj: Practice = new Practice();
  form: FormGroup = new FormGroup({});

  constructor(public httpClient: HttpClient, public routing: Router,
    public global: Global, private fb: FormBuilder) {
    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }
  ngOnInit(): void {
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration')
      .subscribe(res => {
        if (res && res.Value && res.Value.length > 0) {
          for (let temp of res.Value) {
            if (temp.url == this.global.currentPractice) {
              this.practiceObj = temp;
              this.global.isLogo = true;
            }
          }
        }
      }, err => {
        alert('Can not load configuration please talk with admin.');
      });
  }
  CountDown(): void {

    var countDown = setInterval(() => {
      this.countDownTime--;
      document.getElementById('countdown').innerHTML = this.countDownTime.toString();
      if (this.countDownTime === 0) {
        this.disableResendButton = false;
        clearInterval(countDown);
      }
    }, 1000);
  }
  SendOtp() {
    this.disableSubmitButton = true;
    this.httpClient.post("/Messenger/SendOTP", this.providerObj)
      .subscribe(res => this.SuccessOTP(res),
        res => this.Error(res));
  }
  ReSendOTP() {
    this.disableResendButton = true;
    this.httpClient.get("/Messenger/ReSendOTP")
      .subscribe(res => this.SuccessResendOTP(res),
        res => this.Error(res));
  }
  VerifyOTP() {
    this.httpClient.post(this.global.apiUrl + "Security/VerifyOTP", this.providerObj)
      .subscribe(res => this.SuccessVerify(res),
        res => this.Error(res));
  }
  ResetPassword() {
    this.disableSubmitButton = true;
    if (this.form.invalid) {
      return;
    }
    this.providerObj.newPassword = this.form.value.password;
    this.providerObj.confirmedPassword = this.form.value.confirm_password;
    this.disableSubmitButton = true;

    this.httpClient.post(this.global.apiUrl + "Security/ResetPassword", this.providerObj)
      .subscribe(res => this.SuccessResetPassword(res),
        res => this.Error(res));
  }

  SuccessOTP(res) {
    if (res) {
      this.showOtpSection = false;
      this.showOtpVerifySection = true;
      this.disableSubmitButton = false;
      this.CountDown();
    }
    else
      alert(res);
    this.disableSubmitButton = false;
  }
  SuccessResendOTP(res) {
    if (res) {

      this.disableResendButton = false;
      // this.showResetPasswordSection=true;
      // this.disableResendButton=false;
    }
    else {
      this.disableResendButton = false;
      alert(res);
    }
    // this.disableResendButton=false;
  }

  SuccessVerify(res) {
    if (res) {
      this.showOtpVerifySection = false;
      this.showResetPasswordSection = true;
      this.disableSubmitButton = false;
    }
    else
      alert(res);
    this.disableSubmitButton = false;
  }

  SuccessResetPassword(res) {
    this.disableSubmitButton = false;
    alert(res.Message);
    this.routing.navigate(["/Login"]);

  }

  Error(res) {
    if (res.error.Message)
      alert(res.error.Message);
  }
  get f() {
    return this.form.controls;
  }
}