import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Practice, Provider } from 'src/app/_helpers/models/domain-model';
import { Global } from '../../_helpers/common/global.model';
import { NotificationService } from '../../_helpers/common/notification.service';

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
  practiceDetails = { description: '', contactNo: Number, email: '', logoPath: '' };
  paramCheck: any;
  public state: Observable<object>;
  constructor(private httpClient: HttpClient,
    private routing: Router,
    public global: Global,
    private formBuilder: FormBuilder) {
    this.initForm();
  }


  ngOnInit(): void {
    this.httpClient.get<any>(this.global.practiceUrl + 'GetPracticeConfiguration')
      .subscribe(res => {
        if (res && res.Value && res.Value.length > 0) {
          this.global.providerObj.url = this.global.currentProvider
          for (let temp of res.Value) {
            if (temp.url == this.global.currentPractice) {
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

  loginProvider() {
    if (this.providerForm.invalid) {
      this.clicked = false;
      return;
    }
    this.providerObj.userName = this.providerForm.value.providerUserName;
    this.providerObj.password = this.providerForm.value.providerPassword;
    this.providerObj.url = this.global.currentProvider;
    this.global.providerObj = this.providerObj;
    this.httpClient.
      post<any>(this.global.apiUrl + "Security/Login", this.providerObj)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.isProvider = true;
        this.global.providerObj = res.User;
        var url: string = this.global.config.videourl.replace("PROVIDERNAME", this.global.currentProvider);
        this.global.config.videourl = url;
        this.routing.navigateByUrl('/provider/dashboard', { state: this.global });
      },
        res => {
          this.global.providerObj = new Provider();
          this.clicked = false;
          alert('Can not connect please talk with admin.')
        });
  }
}
