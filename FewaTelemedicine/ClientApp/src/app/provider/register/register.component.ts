import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Global } from 'src/app/_helpers/common/global.model';
import { HttpClient } from '@angular/common/http';
import { Practice } from 'src/app/_helpers/models/domain-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidateEmail, ValidateUserName } from 'src/app/_helpers/common/confirmed-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  form: FormGroup = new FormGroup({});
  practiceObj = new Practice();
  sendOtpSection: boolean = true;
  verifyOtpSection: boolean = false;
  resendOtpButton: boolean = true;
  countDownTime: number = 60;
  clicked: boolean = false;
  inputPracticeName = 'practice';
  urlLink = this.getInvitationLink();
  constructor(public global: Global,
    private fb: FormBuilder,
    public _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    public cdr: ChangeDetectorRef) { this.initUserForm(); }

  ngOnInit(): void {this.getAllPractices()}
  private initUserForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9_ ]+$"),ValidateUserName.bind(this),]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), ValidateEmail.bind(this)]],
      otp: ['', [Validators.required]]
    })
  }

  countDown(): void {
    var countDown = setInterval(() => {
      this.countDownTime--;
      document.getElementById('countdown').style.cssText = "display:block"
      if (document.getElementById('countdown')) {
        document.getElementById('countdown').innerHTML = "Resend OTP in " + this.countDownTime.toString() + "s";
        if (this.countDownTime === 0) {
          this.resendOtpButton = false;
          clearInterval(countDown);
          document.getElementById('countdown').style.cssText = "display:none";
        }
      } else {
        clearInterval(countDown);
      }
    }, 1000);
  }

  onSubmit() {
    if (this.form.get("email").invalid || this.form.get("name").invalid) {
      return;
    }
    var key = "73l3M3D"; //hardcoded
    this.practiceObj.name = this.form.value.name.replace(/\s/g, "").toLowerCase();
    this.practiceObj.email = this.form.value.email;
    this.clicked = true;
    var observable = this.httpClient.post("/Messenger/SendRegistrationOTP?key=" + key
      , this.practiceObj);
    observable.subscribe(res => this.successObserver(res),
      res => this.errorObserver(res));
  }

  successObserver(res) {
    this.clicked = false;
    if (res) {
      let message = "Your OTP is sent to your email address. It may take few minutes for the email delivery. Please check your promotions/spam folder as well. You may request another OTP after a minute by clicking Resend OTP."
      this.popUpSnackBar(message,25000);
      this.sendOtpSection = false;
      this.verifyOtpSection = true;
      this.countDown();
    } else {
      alert("We already have this practice")
    }
  }

  verifyOTP() {
    if (this.form.get("otp").invalid) {
      return;
    }
    this.practiceObj.otp = this.form.value.otp;
    var observable = this.httpClient.post(this.global.apiUrl + "Security/VerifyRegistrationOTP"
      , this.practiceObj)
    observable.subscribe(res => this.successVerify(res),
      res => this.errorObserver(res));
    //alert("OTP Verified"); 
  }

  successVerify(res) {
    if (res) {
      alert(res.message);
      window.location.assign(window.location.origin + "/" + res.practice.url + "/" + res.provider.url + "/");
    }
  }

  popUpSnackBar(message: string,duration:number) {
    this._snackBar.open(message, 'Dismiss', {
      duration: duration,
      verticalPosition: 'top'
    });
  }

  resendOTP() {
    var key = "73l3M3D"; //hardcoded
    this.resendOtpButton = true;
    var observable = this.httpClient.get("/Messenger/ResendRegistrationOTP?key=" + key)
    observable.subscribe(res => this.successResendOTP(res),
      res => this.errorObserver(res));
  }

  successResendOTP(res) {
    if (res) {
      let message = "Your OTP is sent to your email address again. It may take few minutes for the email delivery. Please check your promotions/spam folder as well. You may request another OTP after a minute by clicking Resend OTP."
      this.popUpSnackBar(message,25000);
      this.resendOtpButton = true;
      this.countDownTime = 60;
      this.countDown();
    }
  }

  errorObserver(res) {
    this.clicked = false;
  }

  get formControls() {
    return this.form.controls;
  }

  onInputChange(event) {
    // this.cdr.markForCheck();
    this.inputPracticeName = event.target.value;
    if (this.inputPracticeName == "") {
      this.inputPracticeName = 'practice';
    }
    this.urlLink = this.getInvitationLink();
  }

  getInvitationLink() {
    // https://host/practicename
    let host = window.location.host;
    let protocol = window.location.protocol;
    return protocol + "//" + host + "/" + this.inputPracticeName;
  }

  getAllPractices() {
    var key = "73l3M3D"; //hardcoded
    this.httpClient.get<any>(this.global.practiceUrl + 'GetAllPractices?key=' + key)
      .subscribe(res => {
        this.global.practiceArray = res;
      }, err => {
        // alert('Can not load configuration please talk with admin.');
      });
  }
  
}
