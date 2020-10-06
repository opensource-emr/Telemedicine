import { Component, OnInit, Provider } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { FormBuilder } from '@angular/forms';
import { Patient } from 'src/models/DomainModels';
import { Observable } from 'rxjs';

@Component({
    templateUrl:'./patient-registration.component.html'
})
export class PatientRegistrationComponent implements OnInit
{

    patientObj: Patient = new Patient();
    providers: Array<Provider> = new Array<Provider>();
    public state: Observable<object>;
    constructor(public httpClient: HttpClient,
        public routing: Router,
        public global: Global,
        private formBuilder: FormBuilder, private notificationService: NotificationService,private route: ActivatedRoute)
    {
     
    }
    ngOnInit()
    {
      this.state = history.state;
    }
    LoginPatient() {
      var splitted=window.location.pathname.split("/",3);
      console.log(splitted);
      this.patientObj.url=splitted[2];
      this.global.practiceObj.url=splitted[1];
            this.httpClient.
      post<any>(this.global.practiceUrl + "LoginPatient", this.patientObj)
      .subscribe(res => {
      this.global.token = res.Value.Token;
      this.global.isProvider = false;
      this.global.isPatient = true;
      this.global.patientObj.name = res.Value.User.name;
      
      sessionStorage.setItem('PatientName', this.global.patientObj.name);
      this.global.patientObj = res.Value.User;
      this.global.patientObj.patientId=res.Value.patientId;
      this.global.patientObj.name=res.Value.name;
      // this.global.patientObj.url = res.Value.User.url;
        this.routing.navigateByUrl('/Waiting',{state:this.global});
      },
        res => {
          alert('User Already logged in');
        });
  }
}