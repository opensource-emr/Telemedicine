import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from 'src/app/_helpers/common/global.model';
import { ContactUs } from 'src/app/_helpers/models/domain-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
showSignIn:boolean;
showSignUp:boolean;
form: FormGroup;
contactUsObj:ContactUs;
contactUsflag:boolean;
buttonflag:boolean;
sendingFailed:boolean;
showViewMoreInfo = false;
buttonName:string;
contactMsg : boolean;
  constructor(private global: Global,
              private fb: FormBuilder,
              private httpClient:HttpClient) {
    this.showSignIn=true,
    this.showSignUp=true;
    this.contactUsflag=false;
    this.buttonflag=false;
    this.sendingFailed=false;
    this.contactMsg = false;
    this.buttonName="View more"
    this.form= new FormGroup({});
    this.contactUsObj=new ContactUs();
    this.initContactUsForm()
   }

  ngOnInit(): void {
    this.initContactUsForm;
    this.global.isProvider = true;
    this.global.isPatient = false;
    if(!this.global.currentPractice){
      this.showSignIn=false;
    }
    if(this.global.currentPractice){
      this.showSignUp=false;
    }
  }
  showViewMoreText(){
    this.showViewMoreInfo = !this.showViewMoreInfo;
    if(this.showViewMoreInfo)this.buttonName='View less'; else this.buttonName='View more'
    }
  //=>^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$
  //=>^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$
  private initContactUsForm() {
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.nullValidator]],
      email: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$")]],
      phone_number: ['', [Validators.required,Validators.pattern("^\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}$")]],
      message: ['', [Validators.required]]
    })
  }
  get contactUsFormControls() {
    return this.form.controls;
  }
  loadFormValues(){
    this.contactUsObj.firstName=this.form.value.first_name;
    this.contactUsObj.lastName=this.form.value.last_name;
    this.contactUsObj.email=this.form.value.email.trim();
    this.contactUsObj.phoneNumber=this.form.value.phone_number;
    this.contactUsObj.message=this.form.value.message;
  }
  contactUs(){
    if(this.form.invalid){
      this.contactMsg = true;
      setTimeout(() => {
        this.contactMsg=false
      }, 10000);
      return;
    }
    this.loadFormValues();
    this.buttonflag=true;
    var key="73l3M3D"; //hardcoded
    this.httpClient.post("/Messenger/ContactUs?key=" + key, this.contactUsObj)
    .subscribe(res => this.contactSuccess(res), err => this.error(err));
  }
  contactSuccess(res){
    this.buttonflag=false
   if(res){
     this.contactUsflag=true
     this.form.reset();
     setTimeout(() => {
       this.contactUsflag=false
     }, 10000);
    }
    else{
      this.sendingFailed=true
      setTimeout(() => {
        this.sendingFailed=false
      }, 10000);
    }
  }
  
  error(res){
    this.buttonflag=false
    console.log(res);
  }
  // getNumber(event1){
  //   console.log(event1);
  // }
  // telInputObject(event2){
  //   console.log(event2)
  // }
  // onCountryChange(event){
  //    console.log(event);
  // }
}
