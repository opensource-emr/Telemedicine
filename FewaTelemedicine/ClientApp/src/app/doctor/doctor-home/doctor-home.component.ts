import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, ActivatedRoute, Data } from '@angular/router';
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model'
import { PatientsAttendedModel } from 'src/models/patients-attended.model';
import { HttpClient } from '@angular/common/http';
import { DoctorCabinModel } from 'src/models/doctor-cabin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorsModel } from 'src/models/doctors.model';
import { Observable } from 'rxjs';
import { SMSModel } from 'src/models/SMS.model';

@Component({
    templateUrl: './doctor-home.component.html',
    template: `<pre>{{ state | async | json }}</pre>`
})
export class DoctorHomeComponent implements OnInit{
private state: Observable<object>;
 
public SendInvitation:boolean= true;
public CompletedAppointments:boolean= false;
public AccountSettings:boolean= false;
public CompletedPatients:Array<PatientsAttendedModel> = null;
doctorObj: DoctorsModel = new DoctorsModel();
  public invitationForm:FormGroup;
    constructor(private routing: Router,private notificationService:NotificationService,public global: GlobalModel,public httpClient: HttpClient,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) 
    { 
      this.patients.push(this.global.patientObj);
      if (this.global.IsPatient) {

        this.notificationService.EventCompletePatient
        .subscribe(_patient=>{
                    this.global.patientObj = _patient;
                    this.patients=_patient;
                   // this.PatientCompleted(_patient);
             }
         ); 
     }
     this.notificationService.Connect();
     this.notificationService.EventGetAllPatients
        .subscribe(_patients => {
          this.patients = _patients;

        });

      this.notificationService.EventCallPatient.subscribe(_patient => {
        this.global.patientObj = _patient;
      }
      );
      
      this.invitationForm=this.formBuilder.group({
        email:['',Validators.email],
        mobileno:['',Validators.required],
      })
      if(!this.global.doctorObj)
      {
        this.routing.navigate(['Login']);
      }else if(this.global.doctorObj.UserName=="")
      {
        this.routing.navigate(['Login']);
      }
      //this.RefreshPatients(); 
    }
    public showPatDetail: boolean = false;
    patients: Array<PatientsAttendedModel> = new Array<PatientsAttendedModel>();


    ngOnInit() {
      this.state = history.state;
    }
Difference(start:Date , end:Date):number{
  start = new Date(start);
  end = new Date(end);
  var startminutes = start.getMinutes();

  var endminutes = end.getMinutes();
  var diff=0;
  if(endminutes>startminutes){
  diff = endminutes-startminutes;}
  return diff;
}
Check(param)
{
  let data = param;
  
  if(data == 'sendInv'){
    this.SendInvitation=true;
    this.CompletedAppointments=false;
    this.AccountSettings=false;
  }
  else if(data == 'completedList'){
    this.SendInvitation=false;
    this.CompletedAppointments=true;
    this.AccountSettings=false;
    this.LoadPatientsAttended();
  }
  
  else if(data == 'accSett') {
    this.SendInvitation=false;
    this.CompletedAppointments=false;
    this.AccountSettings=true;
  }  
}
UpdateProfile()
{
  this.doctorObj.UserName=this.global.doctorObj.UserName;
  this.doctorObj.Password=this.global.doctorObj.Password;
 // this.global.doctorObj = this.doctorObj;
  this.httpClient.
      post<any>(this.global.ApiUrl + "Security/UpdateProfile", this.doctorObj)
      .subscribe(res => {
        //console.log(res);
        this.global.doctorObj=res;
        if(this.doctorObj.Password==this.doctorObj.ConfirmPassword)
        {
          alert("profile updated");
          this.doctorObj=new DoctorsModel();
        }
        else{alert("Password doesn't matched");}
      
      },
        err=>{console.log(err);});
}

Invitation() 
{
  
  //this.httpClient.post("Messenger/SendSMS",data).subscribe(res=>this.SMSInvitationSuccess(res),err=>this.Error(err));

  this.httpClient.post("Messenger/SendEmail",this.global.doctorObj).subscribe(res=>this.EmailInvitationSuccess(res),err=>this.Error(err));
 }

 CallPatient(callPatient: PatientsAttendedModel) {
   if(this.global.patientObj.Status==1)
   {
       return ;
   }
    this.showPatDetail = true;
    let dateTime = new Date();
    this.global.patientObj.AppointmentDate = dateTime;

    this.notificationService.CallPatient(callPatient);
    this.routing.navigate(['DoctorRoom']);
        
 }
 LoadPatientsAttended(){
  this.httpClient.get("Hospital/GetPatientsAttended")
  .subscribe(res=>this.LoadPatientSuccess(res),err=>this.Error(err));

 }
 LoadPatientSuccess(res){
  this.CompletedPatients = res;
 }

 NextPatient(res) {
   console.log(this.global.patientObj);
   if (res) {
    //console.log(this.patients);
     this.patients.forEach(p=>{
       if(p.Id==res.Id)
       {
         p.Status=res.Status;
       }
     })
     this.global.patientObj = res;
     this.routing.navigateByUrl('/DoctorRoom', { state: this.global.patientObj });
   }
 }
EmailInvitationSuccess(res)
{
  console.log(res);
  if(res)
   alert("Email Invitation Sent has been sent ");
   else
   alert("Incorrect email address");
 }
// SMSInvitationSuccess(res)
// {
//   if(res)
//    alert("Sms Invitation Sent has been sent ");
//    else
//    alert("Mobile number doesnot exists");
// }
 Success(res) {
  this.patients = res;
  
 }
 Error(err) {
 }
 
}