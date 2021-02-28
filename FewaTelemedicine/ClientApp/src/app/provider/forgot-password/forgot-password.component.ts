import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider, Practice } from '../../_helpers/models/domain-model';
import { ConfirmedValidator } from 'src/app/_helpers/common/confirmed-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  disableSubmitButton: boolean = false;
  disableResendButton: boolean = true;
  showOtpSection: boolean = true;
  showOtpVerifySection: boolean = false;
  showResetPasswordSection: boolean = false;
  providerObj: Provider = new Provider();
  practiceObj: Practice = new Practice();
  providerForm: FormGroup;
  countDownTime: number = 60;
  form: FormGroup = new FormGroup({});
  showCountDown = true;
  sendOtpMsg: boolean = false;
  resendOtpMsg: boolean = false;
  getPracticeMsg: boolean = false;
  invalidOtpMsg: boolean = false;
  constructor(public httpClient: HttpClient,
    public routing: Router,
    public global: Global,
    public fb: FormBuilder,
    public router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
    if (!this.global.practiceObj.url) {
      this.getPractice();
    }
  }

  private getPractice() {
    var key = "73l3M3D"; //hardcoded
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration?practice=' + this.global.currentPractice + "&" + "key=" + key)
      .subscribe(res => {
        this.global.practiceObj = res;
        if (!this.global.practiceObj.logoPath) {
          this.global.practiceObj.logoPath = '/assets/img/logo.png';
        }
        this.practiceObj = this.global.practiceObj;
      }, err => {
        //Can not load configuration please talk with admin.
        this.getPracticeMsg = true;
          setTimeout(() => {
            this.getPracticeMsg = false;
          }, 5000);
      });
  }
  private initForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      otp: ['', Validators.required],
      email_username: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$")]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  countDown(): void {
    this.showCountDown = true;
    var countDown = setInterval(() => {
      this.countDownTime--;
      if (document.getElementById('countdown')) {
        document.getElementById('countdown').innerHTML = "Resend OTP in " + this.countDownTime.toString() + "s";
        if (this.countDownTime === 0) {
          this.disableResendButton = false;
          clearInterval(countDown);
          this.showCountDown = false;
        }
      } else {
        clearInterval(countDown);
      }
    }, 1000);
  }

  sendOTP() {
    if (this.form.get("email_username").invalid) {
      return;
    }
    var key = "73l3M3D"; //hardcoded
    this.providerObj.email = this.form.value.email_username.trim();
    if (this.providerObj.email.search("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")) {
      this.providerObj.userName = this.providerObj.email;
    }
    this.providerObj.practice = this.global.currentPractice;
    this.disableSubmitButton = true;
    this.httpClient.post("/Messenger/SendOTP?key=" + key, this.providerObj)
      .subscribe(res => this.successOTP(res),
        res => this.error(res));
  }

  resendOTP() {
    var key = "73l3M3D"; //hardcoded
    this.disableResendButton = true;
    this.httpClient.get("/Messenger/ResendOTP?key=" + key)
      .subscribe(res => this.successResendOTP(res),
        res => this.error(res));
  }

  verifyOTP() {
    if (this.form.get("otp").invalid) {
      return;
    }
    this.providerObj.otp = this.form.value.otp;
    this.httpClient.post(this.global.apiUrl + "Security/VerifyOTP", this.providerObj)
      .subscribe(res => this.successVerify(res),
        // res => this.error(res));
        err => {
          this.invalidOtpMsg = true;
          setTimeout(() => {
            this.invalidOtpMsg = false;
          }, 5000);
        });
  }

  resetPassword() {
    if (this.form.get("password").invalid || this.form.get("confirm_password").invalid) {
      return;
    }
    this.providerObj.newPassword = this.form.value.password;
    this.providerObj.confirmedPassword = this.form.value.confirm_password;
    this.disableSubmitButton = true;

    this.httpClient.post(this.global.apiUrl + "Security/ResetPassword", this.providerObj)
      .subscribe(res => this.successResetPassword(res),
        res => this.error(res));
  }

  successOTP(res) {
    if (res) {
      //"Your OTP is sent to your email address. It may take few minutes for the email delivery. Please check your promotions/spam folder as well. You may request another OTP after a minute by clicking Resend OTP."
      this.sendOtpMsg = true;
          setTimeout(() => {
            this.sendOtpMsg = false;
          }, 10000);
      this.showOtpSection = false;
      this.showOtpVerifySection = true;
      this.disableSubmitButton = false;
      this.countDown();
    }
    else
      //alert(res);
    this.disableSubmitButton = false;
  }

  successResendOTP(res) {
    if (res) {
      //"Your OTP is sent to your email address again. It may take few minutes for the email delivery. Please check your promotions/spam folder as well. You may request another OTP after a minute by clicking Resend OTP."
      this.resendOtpMsg = true;
      setTimeout(() => {
        this.resendOtpMsg = false;
      }, 10000);
      this.disableResendButton = true;
      // this.showResetPasswordSection=true;
      // this.disableResendButton=false;
      this.countDownTime = 60;
      this.countDown();
    }
    else {
      this.disableResendButton = false;
      alert(res);
    }
    // this.disableResendButton=false;
  }

  successVerify(res) {
    if (res) {
      this.showOtpVerifySection = false;
      this.showResetPasswordSection = true;
      this.disableSubmitButton = false;
      // OTP is verified! Please reset your password
    }
    else
      alert(res);
    this.disableSubmitButton = false;
  }

  successResetPassword(res) {
    if (res) {
      this.disableSubmitButton = false;
      this.router.navigate(['/provider/login']).then((navigated: boolean) => {
        if (navigated) {
          // Your new password is set successfully! Please login with your username and new password
          this.global.resetPassMsg = true;
          setTimeout(() => {
            this.global.resetPassMsg = false;
          }, 10000);
          this.disableResendButton = true;
        }
      });
    }
    else
      alert(res);
  }

  error(res) {
    if (res.error.Message)
      alert(res.error.Message);
  }

  get loginFormControls() {
    return this.form.controls;
  }
}
