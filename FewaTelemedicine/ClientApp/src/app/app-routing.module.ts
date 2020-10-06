import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { ProviderHomeComponent } from './provider/provider-home/provider-home.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { PatientWaitingRoomComponent } from './patient/patient-waiting-room/patient-waiting-room.component';
import { ProviderRoomComponent } from './provider/provider-room/provider-room.component';
import { PatientRoomComponent } from './patient/patient-room/patient-room.component';
import { PatientReportSummaryComponent } from './patient/patient-report-summary/patient-report-summary.component';
import { PatientRegistrationComponent } from './patient/patient-registation/patient-registration.component';
import { PatientUploadFilesComponent } from './patient/patient-upload-files/patient-upload-files.component';
import { ProviderRoomTokboxComponent } from './provider/provider-room-tokbox/provider-room-tokbox.component';
import { PatientRoomTokboxComponent } from './patient/patient-room-tokbox/patient-room-tokbox.component';


console.log(window.location);
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Login' },
  { path: 'Login', component: LoginComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Home', component: ProviderHomeComponent },
  {path:'Join',component:PatientRegistrationComponent},
  {path:'Waiting',component:PatientWaitingRoomComponent},
  {path:'ProviderRoom',component:ProviderRoomComponent},
  {path:'ReportSummary',component:PatientReportSummaryComponent},
  {path:'PatientRoom',component:PatientRoomComponent},
  {path:'Upload',component:PatientUploadFilesComponent},
  {path:'ProviderRoomTokbox',component:ProviderRoomTokboxComponent},
  {path:'PatientRoomTokbox',component:PatientRoomTokboxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
