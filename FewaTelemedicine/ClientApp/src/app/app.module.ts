import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //Added by Bhavana
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ConfigService } from 'src/Common/config.service';
import { Global } from 'src/Common/global.model';
import { HttpInterceptorService } from 'src/Common/http-interceptor.service';
import { ProviderHomeComponent } from './provider/provider-home/provider-home.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderRoomComponent } from './provider/provider-room/provider-room.component';
import { PatientRoomComponent } from './patient/patient-room/patient-room.component';
import { PatientSendEmailComponent } from './patient/patient-send-email/patient-send-email.component';
import { PatientRegistrationComponent } from './patient/patient-registation/patient-registration.component';
import { YesNoPipe } from 'src/Common/yes-no.pipe';
import { PatientReportSummaryComponent } from './patient/patient-report-summary/patient-report-summary.component';
import { SafePipe } from 'src/Common/safe.pipe';
import { PatientWaitingRoomComponent } from './patient/patient-waiting-room/patient-waiting-room.component';
import { PatientUploadFilesComponent } from './patient/patient-upload-files/patient-upload-files.component';
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPrintModule } from 'ngx-print';
import { CKEditorModule } from 'ckeditor4-angular';
import { ProviderRoomTokboxComponent } from './provider/provider-room-tokbox/provider-room-tokbox.component';
import { PatientRoomTokboxComponent } from './patient/patient-room-tokbox/patient-room-tokbox.component';
import { PatientRegistrationMobileComponent } from './patient/patient-registation/patient-registration-mobile.component';
import { PatientWaitingRoomMobileComponent } from './patient/patient-waiting-room/patient-waiting-room-mobile.component';
import { PatientRoomMobileComponent } from './patient/patient-room/patient-room-mobile.component';
import { PatientReportSummaryMobileComponent } from './patient/patient-report-summary/patient-report-summary-mobile.component';
import { PatientRoomTokboxMobileComponent } from './patient/patient-room-tokbox/patient-room-tokbox-mobile.component';


const initializerConfigFn = (config: ConfigService) => {
  return () => {
    var ret: any = config.loadAppConfig();
    return ret;
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProviderHomeComponent,
    ProviderRoomComponent,
    PatientRegistrationComponent,
    PatientRegistrationMobileComponent,
    PatientRoomComponent,
    PatientRoomMobileComponent,
    PatientSendEmailComponent,
    PatientReportSummaryComponent,
    PatientReportSummaryMobileComponent,
    PatientWaitingRoomComponent,
    PatientWaitingRoomMobileComponent,
    PatientUploadFilesComponent,
    ProviderRoomTokboxComponent,
    PatientRoomTokboxComponent,
    PatientRoomTokboxMobileComponent,
    YesNoPipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    NgxPrintModule,
    CKEditorModule
  ],
  providers: [
    Title,
    UploadDownloadService,
    {
      provide: APP_BASE_HREF,
      useValue: window['base-href'] // from base href we set it to app
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [ConfigService],
    },
    Global,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}


