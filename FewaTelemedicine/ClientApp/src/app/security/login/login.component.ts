import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalModel } from 'src/Common/global.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorsModel } from 'src/models/doctors.model';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  doctorObj: DoctorsModel = new DoctorsModel();
  doctorFrm: FormGroup;

  constructor(private httpClient: HttpClient,
    private routing: Router,
    public global: GlobalModel,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  private initForm() {
    this.doctorFrm = this.formBuilder.group({
      docUsrName: ['', Validators.required],
      docPassword: ['', Validators.required]
    });
  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    var control = this.doctorFrm.controls[controlname];
    if (!control) {
      return false;
    }
    return control.hasError(typeofvalidator) && control.touched;
  }

  LoginDoctor() {
    if (this.doctorFrm.invalid) {
      return;
    }
    this.doctorObj.UserName = this.doctorFrm.value.docUsrName;
    this.doctorObj.Password = this.doctorFrm.value.docPassword;
    this.global.doctorObj = this.doctorObj;
    this.httpClient.
      post<any>(this.global.ApiUrl + "Security/Login", this.doctorObj)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.IsDoctor = true;
        //this.global.doctorObj=res.User;
        var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.doctorObj.UserName);
        this.global.config.videourl = url;
        this.routing.navigate(['Home']);
      },
        res => {
          alert('Can not connect please talk with admin.')
        });
  }
}