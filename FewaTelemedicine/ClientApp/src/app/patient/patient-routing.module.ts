import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveVideoComponent } from './live-video/live-video.component';
import { IntroComponent } from './intro/intro.component';
import { SummaryComponent } from './summary/summary.component';
import { SecurityLogic } from '../_helpers/common/authguard';
import { MobileLiveVideoComponent } from './live-mobilevideo/mobilelive-video.component';
import { IntroMobileComponent } from './intro-mobile/intro-mobile.component';
import { SummaryMobileComponent } from './summary-mobile/summary-mobile.component';

const routes: Routes = [
  { path: '', redirectTo:'/intro', pathMatch:'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'live', component: LiveVideoComponent,canActivate:[SecurityLogic]},
  { path: 'summary', component: SummaryComponent,canActivate:[SecurityLogic]},
  { path: 'liveMobile', component: MobileLiveVideoComponent,canActivate:[SecurityLogic]},
  { path: 'introMobile', component: IntroMobileComponent },
  { path: 'summaryMobile', component: SummaryMobileComponent,canActivate:[SecurityLogic]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
