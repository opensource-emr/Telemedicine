import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model';
import { FormBuilder } from '@angular/forms';
import { PatientsAttendedModel } from 'src/models/patients-attended.model';
import { DoctorsModel } from 'src/models/doctors.model';

@Component({
    templateUrl:'./patient-registration.component.html'
})
export class PatientRegistrationComponent implements OnInit
{
  meetingId:any;
    patientObj: PatientsAttendedModel = new PatientsAttendedModel();
    doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
    getAlldoctors:any;
    constructor(public httpClient: HttpClient,
        public routing: Router,
        public global: GlobalModel,
        private formBuilder: FormBuilder, private notificationService: NotificationService,private route: ActivatedRoute)
    {
      this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
        this.doctors = _doctors;
      });
  
      this.notificationService.EventConnectionEstablished.subscribe(() => {
        this.notificationService.LoadActiveDoctors();
      });
     
    }
    ngOnInit()
    {
    }
    LoginPatient() {

      this.patientObj.DoctorId=this.route.snapshot.queryParamMap.get('DoctorName');
        this.patientObj.MeetingId=this.meetingId;
            this.httpClient.
      post<any>(this.global.HospitalUrl + "LoginPatient", this.patientObj)
      .subscribe(res => {
         this.global.token = res.Value.Token;
      this.global.IsDoctor = false;
      this.global.IsPatient = true;
      this.global.patientObj.PatientName = res.Value.User.PatientName;
      
      sessionStorage.setItem('PatientName', this.global.patientObj.PatientName);
      this.global.patientObj = res.Value.User;
      this.global.patientObj = res.Value;
      this.global.patientObj.Id=res.Value.Id;
      this.global.patientObj.PatientName=res.Value.PatientName;
      this.global.patientObj.DoctorId = res.Value.User.DoctorId;
     
        this.routing.navigateByUrl('/Waiting',{state:this.global.patientObj});
      },
        res => {
          alert('User Already logged in');
        });
  }
}