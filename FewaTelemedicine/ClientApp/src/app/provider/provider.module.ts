import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { ManageHistoryComponent } from './manage-history/manage-history.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { LiveVideoComponent } from './live-video/live-video.component';
//import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
//import { VideoConferenceComponent } from './video-conference/video-conference.component';
//import { ProviderReportComponent } from './provider-report/provider-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadDownloadService } from '../_helpers/common/upload-download.service';
import { SharedModule } from '../_helpers/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    ProviderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ChatComponent,
    ManageHistoryComponent,
    UserSettingComponent,
    LiveVideoComponent,
    //HeaderComponent,
    SidemenuComponent,
    //VideoConferenceComponent,
    //ProviderReportComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    MatSnackBarModule,
    ClipboardModule,
    MatTooltipModule
  ],
  providers: [
    UploadDownloadService
  ]
})
export class ProviderModule { }
