import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { PatientWaitingRoomComponent } from './patient/patient-waiting-room/patient-waiting-room.component';
import { PatientWaitingRoomMobileComponent } from './patient/patient-waiting-room/patient-waiting-room-mobile.component';
import { DoctorRoomComponent } from './doctor/doctor-room/doctor-room.component';
import { PatientRoomComponent } from './patient/patient-room/patient-room.component';
import { PatientRoomMobileComponent } from './patient/patient-room/patient-room-mobile.component';
import { PatientReportSummaryComponent } from './patient/patient-report-summary/patient-report-summary.component';
import { PatientReportSummaryMobileComponent } from './patient/patient-report-summary/patient-report-summary-mobile.component';
import { PatientRegistrationComponent } from './patient/patient-registation/patient-registration.component';
import { PatientRegistrationMobileComponent } from './patient/patient-registation/patient-registration-mobile.component';
import { PatientUploadFilesComponent } from './patient/patient-upload-files/patient-upload-files.component';
import { PatientUploadFilesMobileComponent } from './patient/patient-upload-files/patient-upload-files-mobile.component';
import { DoctorRoomTokboxComponent } from './doctor/doctor-room-tokbox/doctor-room-tokbox.component';
import { PatientRoomTokboxComponent } from './patient/patient-room-tokbox/patient-room-tokbox.component';
import { PatientRoomTokboxMobileComponent } from './patient/patient-room-tokbox/patient-room-tokbox-mobile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Login' },
  { path: 'Login', component: LoginComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Home', component: DoctorHomeComponent },
  {path:'Join',component:PatientRegistrationComponent},
   // #43 Added by Bhavana : Smart phone compatibility - Patient Room for Mobile.
  {path:'Join-Mobile',component:PatientRegistrationMobileComponent},
  {path:'Waiting',component:PatientWaitingRoomComponent},
  // #43 Added by Bhavana : Smart phone compatibility - Waiting Room for Mobile.
  {path:'Waiting-Mobile',component:PatientWaitingRoomMobileComponent},
  {path:'DoctorRoom',component:DoctorRoomComponent},
  {path:'ReportSummary',component:PatientReportSummaryComponent},
   // #43 Added by Bhavana : Smart phone compatibility - Patient Report Summary for Mobile.
  {path:'ReportSummary-Mobile',component:PatientReportSummaryMobileComponent},
  {path:'PatientRoom',component:PatientRoomComponent},
  // #43 Added by Bhavana : Smart phone compatibility - Patient Room for Mobile.
  {path:'PatientRoom-Mobile',component:PatientRoomMobileComponent},
  {path:'Upload',component:PatientUploadFilesComponent},
   // #43 Added by Bhavana : Smart phone compatibility - Patient File Upload for Mobile.
  {path:'Upload-Mobile',component:PatientUploadFilesMobileComponent},
  {path:'DoctorRoomTokbox',component:DoctorRoomTokboxComponent},
  {path:'PatientRoomTokbox',component:PatientRoomTokboxComponent},
  {path:'PatientRoomTokbox-Mobile',component:PatientRoomTokboxMobileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
