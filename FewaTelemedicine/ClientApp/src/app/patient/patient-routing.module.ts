import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveVideoComponent } from './live-video/live-video.component';
import { IntroComponent } from './intro/intro.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo:'/intro', pathMatch:'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'live', component: LiveVideoComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
