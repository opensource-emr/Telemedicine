import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Global } from 'src/app/_helpers/common/global.model';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Practice, Provider } from 'src/app/_helpers/models/domain-model';
import { ConfirmedValidator, ValidateEmail, ValidateUserName } from 'src/app/_helpers/common/confirmed-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  form: FormGroup = new FormGroup({});
  practiceObj = new Practice();
  providerObj: Provider = new Provider();
  providerForm: FormGroup;
  sendOtpSection: boolean = true;
  verifyOtpSection: boolean = false;
  resendOtpButton: boolean = true;
  countDownTime: number = 60;
  clicked: boolean = false;
  inputPracticeName = 'practice';
  urlLink = this.getInvitationLink();
  disableSubmitButton: boolean = false;
  showSetPasswordSection = false;
  showCountDown = true;
  sendOtpMsg: boolean = false;
  praExistMsg: boolean = false;  
  wrongOtpMsg: boolean = false;
  resendOtpMsg: boolean = false;
  passwordErrorButton:boolean = false;
  public size: number;  
  public square: number; 
  constructor(public global: Global,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    public cdr: ChangeDetectorRef,
    public routing: Router,
    ) { 
    this.initUserForm();
  }

  ngOnInit(): void { this.getAllPractices() }
  private initUserForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_ ]+$"), ValidateUserName.bind(this),]],
      email: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$"), ValidateEmail.bind(this)]],
      otp: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      adminEmail: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$"), ValidateEmail.bind(this)]],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get loginFormControls() {
    return this.form.controls;
  }

  countDown(): void {
    this.showCountDown=true;
    var countDown = setInterval(() => {
      this.countDownTime--;
      if (document.getElementById('countdown')) {
        document.getElementById('countdown').innerHTML = "Resend OTP in " + this.countDownTime.toString() + "s";
        if (this.countDownTime === 0) {
          this.resendOtpButton = false;
          clearInterval(countDown);
          this.showCountDown=false;
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
    this.practiceObj.email = this.form.value.email.trim();
    this.clicked = true;
    var observable = this.httpClient.post("/Messenger/SendRegistrationOTP?key=" + key
      , this.practiceObj);
    observable.subscribe(res => this.successObserver(res),
      res => this.errorObserver(res));
  }

  successObserver(res) {
    this.clicked = false;
    if (res) {
      // "Your OTP is sent to your email address. It may take few minutes for the email delivery. Please check your promotions/spam folder as well. You may request another OTP after a minute by clicking Resend OTP."
      this.sendOtpMsg = true;
        setTimeout(() => {
          this.sendOtpMsg = false;
        }, 10000);
      this.sendOtpSection = false;
      this.verifyOtpSection = true;
      this.countDown();
    } else {
     // Can not load configuration please talk with admin
     this.praExistMsg = true;
     setTimeout(() => {
       this.praExistMsg = false;
     }, 5000);
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
    err => {
      //"OTP entered is wrong! Please check again"
      this.wrongOtpMsg = true;
      setTimeout(() => {
        this.wrongOtpMsg = false;
      }, 5000);
    });
  }

  successVerify(res) {
    if (res) {
      this.sendOtpSection = false;
      this.verifyOtpSection = false;
      this.global.currentPractice = res.practice.url;
      this.global.currentProvider = res.provider.url;
      this.showSetPasswordSection = true;
    }
  }

  adminSetPassword() {
    if (this.form.get("password").invalid || this.form.get("confirm_password").invalid || this.form.get("adminEmail").invalid) {
      return;
    }
    this.disableSubmitButton = true;
    this.providerObj.email = this.form.value.adminEmail.trim();
    this.providerObj.newPassword = this.form.value.password;
    this.providerObj.confirmedPassword = this.form.value.confirm_password;
    this.providerObj.userName = this.global.currentProvider; //admin
    this.providerObj.practice = this.global.currentPractice;
    this.httpClient.post(this.global.apiUrl + "Security/AdminSetPassword", this.providerObj)
      .subscribe(res => this.successSetPassword(res),
        res => this.error(res));
  }
  successSetPassword(res) {
    if (res) {
      this.disableSubmitButton = false;
     var msg= "Your personalized website for your practice is - https://www.fewatele.com/"+ this.global.currentPractice+". Administrators please use your username as admin"
      alert(msg);
      //this.dataShareService.loginMsg =true;
      //this.dataShareService.loginData = 'Your personalized website for your practice is - https://www.fewatele.com/ this.global.currentPractice.Administrators please use your username as admin';
       window.location.assign(window.location.origin + "/" +  this.global.currentPractice + "/" + this.global.currentProvider + "/#/provider/login");
    }
  }

  error(res) {
    if (res.error.Message)
      alert(res.error.Message);
  }

  resendOTP() {
    var key = "73l3M3D"; //hardcoded
    this.resendOtpButton = true;
    var observable = this.httpClient.get("/Messenger/ResendRegistrationOTP?key=" + key)
    observable.subscribe(res => this.successResendOTP(res),
      err => {
        //"OTP entered is wrong! Please check again"
        this.wrongOtpMsg = true;
        setTimeout(() => {
          this.wrongOtpMsg = false;
        }, 5000);
      });
  }

  successResendOTP(res) {
    if (res) {
      //"Your OTP is sent to your email address again. It may take few minutes for the email delivery. Please check your promotions/spam folder as well. You may request another OTP after a minute by clicking Resend OTP."
      this.resendOtpMsg = true;
      setTimeout(() => {
        this.resendOtpMsg = false;
      }, 10000);
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
