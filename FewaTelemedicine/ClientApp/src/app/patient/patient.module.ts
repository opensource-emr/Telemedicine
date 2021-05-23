import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { LiveVideoComponent } from './live-video/live-video.component';
import { IntroComponent } from './intro/intro.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '../_helpers/shared.module';
import { SecurityLogic } from '../_helpers/common/authguard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../_helpers/common/http-interceptor.service';
import { IntroMobileComponent } from './intro-mobile/intro-mobile.component';
import { SummaryMobileComponent } from './summary-mobile/summary-mobile.component';
import { MobileLiveVideoComponent } from './live-mobilevideo/live-video-mobile.component';

@NgModule({
  declarations: [
    PatientComponent, 
    LiveVideoComponent, 
    IntroComponent, 
    SummaryComponent,
    MobileLiveVideoComponent,
    IntroMobileComponent,
    SummaryMobileComponent

  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[SecurityLogic,
  {provide:HTTP_INTERCEPTORS,useClass:HttpInterceptorService,multi:true}]
})
export class PatientModule { }
