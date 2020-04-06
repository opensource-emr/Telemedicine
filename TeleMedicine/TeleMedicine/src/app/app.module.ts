import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './app.login';
import { Global } from './app.global';
import { DoctorRoomComponent } from './app.doctorroomcomponent';
import { WaitingRoom } from './app.waitingroomcomponent';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './app.routing';
import { ClinicComponent } from './app.cliniccomponent';
import { FinalReportComponent } from './app.finalreportcomponent';
import { YesNoPipe } from 'src/common/YesNo.pipe';
import { ConfigService } from 'src/common/common.appconfig';
import { SafePipe } from 'src/common/common.safe';
const initializerConfigFn = (config: ConfigService ) => {
  return () => {
    var ret:any =  config.loadAppConfig();
    return ret;
  };
};
@NgModule({
  declarations: [
    LoginComponent , DoctorRoomComponent,
    WaitingRoom , ClinicComponent , FinalReportComponent,
    YesNoPipe , SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(HomeRoutes)  
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/' + (window.location.pathname.split('/')[1] || '')
  },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [ConfigService],
    },Global],
  bootstrap: [ClinicComponent]
})
export class AppModule { 

  constructor(g:Global){
     // alert(g.config.videoUrl);
  }

}
