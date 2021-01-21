import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Global } from 'src/app/_helpers/common/global.model';
import { HttpClient } from '@angular/common/http';
import { Practice } from 'src/app/_helpers/models/domain-model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  urlLink=this.getInvitationLink();


  constructor(public global: Global,
    private fb: FormBuilder,
    public _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    public cdr: ChangeDetectorRef) { this.initUserForm(); }

  ngOnInit(): void {

  }
  private initUserForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      otp: ['', [Validators.required]]
    })

  }
  countDown(): void {
    var countDown = setInterval(() => {
      this.countDownTime--;
      // if (document.getElementById('countdown')) {
      //   document.getElementById('countdown').innerHTML = this.countDownTime.toString();
        if (this.countDownTime === 0) {
          this.resendOtpButton = false;
          clearInterval(countDown);
        } 
      // } else {
      //   clearInterval(countDown);
      // }
    }, 1000);
  }
  onSubmit() {
    if (this.form.get("email").invalid && this.form.get("name").invalid) {
      return;
    }
    var key="73l3M3D"; //hardcoded
    this.practiceObj.name = this.form.value.name.replace(/\s/g, "").toLowerCase();
    this.practiceObj.email = this.form.value.email;
    this.clicked=true;
    var observable = this.httpClient.post("/Messenger/SendRegistrationOTP?key=" + key
      , this.practiceObj);
    observable.subscribe(res => this.successObserver(res),
      res => this.errorObserver(res));
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
  popUpSnackBar() {
    this._snackBar.open('You can resend otp after one minute', 'Dismiss', {
      duration: 10000,   
      verticalPosition: 'top'
     });
    }
  resendOTP() {
    var key="73l3M3D"; //hardcoded
    this.resendOtpButton = true;
    var observable = this.httpClient.get("/Messenger/ResendRegistrationOTP?key=" + key)
    observable.subscribe(res => this.successResendOTP(res),
      res => this.errorObserver(res));
  }
  successObserver(res) {
    this.clicked=false;
    if (res) {
      this.popUpSnackBar();
      this.sendOtpSection = false;
      this.verifyOtpSection = true;
      this.countDown();
    }else{
      alert("we already have this practice");
    }
  }
  successVerify(res) {
    if (res) {
      alert(res.message);
      window.location.assign(window.location.origin + "/" + res.practice.url + "/" + res.provider.url + "/");
    }
  }
  successResendOTP(res) {
    if (res) {
      this.popUpSnackBar();
      this.resendOtpButton = true;
      this.countDownTime = 60;
      this.countDown();
    }
  }
  errorObserver(res) {
    this.clicked=false;
  }
  get formControls() {
    return this.form.controls;
  }

  onInputChange(event){
   // this.cdr.markForCheck();
    this.inputPracticeName = event.target.value;
    if(this.inputPracticeName == ""){
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
}
