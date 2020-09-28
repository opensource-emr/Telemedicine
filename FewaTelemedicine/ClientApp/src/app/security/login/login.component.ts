import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalModel } from 'src/Common/global.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorsModel } from 'src/models/doctors.model';
import { NotificationService } from 'src/Common/notification.service';
import { PatientsAttendedModel } from 'src/models/patients-attended.model';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  doctorObj: DoctorsModel = new DoctorsModel();
  doctorFrm: FormGroup;
  clicked: boolean = false;
  hospitalDetails = { description: '', contactNo: '', email: '', logoPath: '' };
  patients: Array<PatientsAttendedModel> = new Array<PatientsAttendedModel>();
  getAllPatients: any;
  meetingId:any;
  paramCheck:any;


  constructor(private httpClient: HttpClient,
    private routing: Router,
    public global: GlobalModel,
    private formBuilder: FormBuilder,
     private notificationService: NotificationService,
     private route: ActivatedRoute
  ) {
    // this.paramCheck=this.route.snapshot.queryParamMap.get('Practice');
    //             if(this.paramCheck==null)
    //             {
    //               this.routing.navigate([],
    //               { 
    //                   queryParamsHandling:"merge",
    //                   queryParams:{Practice:"DefaultPractice",Provider:"DefaultProvider"}
                     
    //               });
    //             }
    //             else
    //             {
    //               this.routing.navigate([],
    //               { 
    //                 queryParamsHandling:"preserve",
    //                 queryParams:{Practice:"DefaultPractice",Provider:"DefaultProvider"}
                
    //               });
    //             }
   this.paramCheck=this.route.snapshot.queryParamMap.get('DoctorName');
   if(this.paramCheck==null)
   {
    this.routing.navigate([],
  { queryParams:{DoctorName:"DefaultDoctor"},
    queryParamsHandling:"merge"
},
  );
 }
 else
 {
  this.routing.navigate([],
    { queryParams:{DoctorName:"DefaultDoctor"},
      queryParamsHandling:"preserve"
  },
    );
 }
   // this.notificationService.Connect();
    this.notificationService.EventGetAllPatients
    .subscribe(_patients => {
      this.patients = _patients;
      console.log(this.patients);
     
    });

  this.notificationService.EventCallPatient.subscribe(_patient => {
    this.global.patientObj = _patient;
    console.log(this.global.doctorObj);
  }
  );
    this.initForm();
  }

  ngOnInit(): void {
  
   this.global.doctorObj.DoctorId=this.route.snapshot.queryParamMap.get('DoctorName');
    this.httpClient.get<any>(this.global.HospitalUrl+"CurrentPatients").subscribe(res=>{
      if(res)
      {
      this.getAllPatients=res.filter(t=>t.DoctorId==this.global.doctorObj.DoctorId);;
      console.log(this.getAllPatients);
      }
      else
      alert('please wait until patient join');
     
    });
    
    this.LoadHospitalParams();
  }

  LoadHospitalParams() {
    this.httpClient.get<any>(this.global.HospitalUrl + 'GetHospitalParams').subscribe(res => {
      if (res && res.Value && res.Value.length > 0 ) {
        const params = res.Value;
        // const myName = params.filter(Url =>Url.includes(this.doctorObj.Url));
        // console.log(myName)
        this.hospitalDetails.description = params.find(a => a.ParameterName === 'Description') ? params.find(a => a.ParameterName === 'Description'&& a.DoctorId==this.global.doctorObj.DoctorId).ParameterValue : '';
        this.hospitalDetails.contactNo = params.find(a => a.ParameterName === 'ContactNumber') ? params.find(a => a.ParameterName === 'ContactNumber'&& a.DoctorId==this.global.doctorObj.DoctorId).ParameterValue : '';
        this.hospitalDetails.email = params.find(a => a.ParameterName === 'Email') ? params.find(a => a.ParameterName === 'Email'&& a.DoctorId==this.global.doctorObj.DoctorId).ParameterValue : '';
        this.hospitalDetails.logoPath = params.find(a => a.ParameterName === 'LogoPath') ? params.find(a => a.ParameterName === 'LogoPath'&& a.DoctorId==this.global.doctorObj.DoctorId).ParameterValue : '';
      }
    }, err => {
      alert('Can not connect please talk with admin.');
    });
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
    this.doctorObj.DoctorId=this.global.doctorObj.DoctorId;
    this.doctorObj.UserName = this.doctorFrm.value.docUsrName;
    this.doctorObj.Password = this.doctorFrm.value.docPassword;
    this.global.doctorObj = this.doctorObj;
    this.httpClient.
      post<any>(this.global.ApiUrl + "Security/Login", this.doctorObj)
      .subscribe(res => {
        this.global.token = res.Token;
        this.global.IsDoctor = true;
        this.global.doctorObj=res.User;
        var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.doctorObj.UserName);
        this.global.config.videourl = url;
        this.routing.navigate(['Home']);
      },
        res => {
          alert('Can not connect please talk with admin.')
        });
  }
}
