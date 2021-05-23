import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveVideoComponent } from './live-video/live-video.component';
import { IntroComponent } from './intro/intro.component';
import { SummaryComponent } from './summary/summary.component';
import { SecurityLogic } from '../_helpers/common/authguard';
import { IntroMobileComponent } from './intro-mobile/intro-mobile.component';
import { SummaryMobileComponent } from './summary-mobile/summary-mobile.component';
import { PatientComponent } from './patient.component';
import { MobileLiveVideoComponent } from './live-mobilevideo/live-video-mobile.component';

const routes: Routes = [
  //{ path: '', redirectTo:'/web', pathMatch:'full' },
  { path: '', component:PatientComponent},
  { path: 'web', component: IntroComponent },
  { path: 'live', component: LiveVideoComponent,canActivate:[SecurityLogic]},
  { path: 'summary', component: SummaryComponent,canActivate:[SecurityLogic]},
  { path: 'mobile', component: IntroMobileComponent },
  { path: 'live-mobile', component: MobileLiveVideoComponent,canActivate:[SecurityLogic]},
  { path: 'summary-mobile', component: SummaryMobileComponent,canActivate:[SecurityLogic]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
