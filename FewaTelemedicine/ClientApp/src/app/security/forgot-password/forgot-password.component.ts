import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/Common/global.model';

@Component({
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
    mobno;
    verifyotp;
    constructor(public httpClient:HttpClient ,public routing: Router,
      public global: Global)
    {
    }
    GenerateOTP()
    {
      this.httpClient.
      get("/api/Clinical/?MobileNumber="+this.mobno)
      .subscribe(res => this.Success(res),
        res => this.Error(res));
    }
    VerifyOTP()
    {
      var obj= {
        MobileNumber: this.mobno,
       // Otp: this.verifyotp
      }
      this.httpClient.post("/api/Clinical/VerifyOTP",obj).subscribe(res => this.SuccessVerify(res),
      res => this.Error(res));
    }
    Success(res)
    {
      this.global.providerObj=res;
        var otp=res.Otp;
        alert(otp);
    }
    SuccessVerify(res)
    {
      localStorage.setItem("MobileOTP",this.verifyotp);
      //localStorage.setItem("MobileNumber",this.mobno);
        this.routing.navigate(['/Login']);
    }
    Error(res)
    {
     // if(res.error.Message)
      //alert(res.error.Message);

    }
}