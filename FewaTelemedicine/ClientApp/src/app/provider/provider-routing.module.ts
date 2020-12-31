import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { ManageHistoryComponent } from './manage-history/manage-history.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { LiveVideoComponent } from './live-video/live-video.component';
import { SecurityLogic } from '../_helpers/common/authguard';
import { AdminSettingComponent} from './admin-setting/admin-setting.component'
//import { VideoConferenceComponent } from './video-conference/video-conference.component';
//import { ProviderReportComponent } from './provider-report/provider-report.component';
//import { ProviderComponent } from './provider.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[SecurityLogic] },
  { path: 'chat', component: ChatComponent,canActivate:[SecurityLogic] },
  { path: 'manage_history', component: ManageHistoryComponent,canActivate:[SecurityLogic] },
  { path: 'user_setting', component: UserSettingComponent,canActivate:[SecurityLogic] },
  { path: 'live', component: LiveVideoComponent,canActivate:[SecurityLogic] },
  { path: 'admin_setting', component:AdminSettingComponent,canActivate:[SecurityLogic]}
  //{ path: 'live-old', component: VideoConferenceComponent },
  //{ path: 'report', component: ProviderReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
