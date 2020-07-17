import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { PatientInvitationComponent } from './patient/patient-invitation/patient-invitation.component';
import { PatientWaitingRoomComponent } from './patient/patient-waiting-room/patient-waiting-room.component';
import { DoctorRoomComponent } from './doctor/doctor-room/doctor-room.component';
import { PatientRoomComponent } from './patient/patient-room/patient-room.component';
import { PatientReportSummaryComponent } from './patient/patient-report-summary/patient-report-summary.component';
import { PatientRegistrationComponent } from './patient/patient-registation/patient-registration.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Login' },
  { path: 'Login', component: LoginComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Home', component: DoctorHomeComponent },
  {path:'Invitation',component:PatientInvitationComponent},
  {path:'Join',component:PatientRegistrationComponent},
  {path:'Waiting',component:PatientWaitingRoomComponent},
  {path:'DoctorRoom',component:DoctorRoomComponent},
  {path:'ReportSummary',component:PatientReportSummaryComponent},
  {path:'PatientRoom',component:PatientRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
