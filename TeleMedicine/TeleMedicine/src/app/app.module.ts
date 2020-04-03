import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginComponent } from './app.login';
import { Global } from './app.global';
import { DoctorRoomComponent } from './app.doctorroomcomponent';
import { WaitingRoom } from './app.waitingroomcomponent';
import {FormsModule} from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './app.routing';
import { ClinicComponent } from './app.cliniccomponent';
import { FinalReportComponent } from './app.finalreportcomponent';
import { YesNoPipe } from 'src/common/YesNo.pipe';
@NgModule({
  declarations: [
    LoginComponent , DoctorRoomComponent,
    WaitingRoom , ClinicComponent , FinalReportComponent,
    YesNoPipe
  ],
  imports: [
    BrowserModule , 
    FormsModule , 
    HttpClientModule,
    RouterModule.forRoot(HomeRoutes)
  ],
  providers: [Global],
  bootstrap: [ClinicComponent]
})
export class AppModule { }
