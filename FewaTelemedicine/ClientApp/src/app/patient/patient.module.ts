import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { LiveVideoComponent } from './live-video/live-video.component';
import { IntroComponent } from './intro/intro.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '../_helpers/shared.module';


@NgModule({
  declarations: [
    PatientComponent, 
    LiveVideoComponent, 
    IntroComponent, 
    SummaryComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PatientModule { }
