import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './_helpers/common/global-error-handler';
import { NotificationService } from './_helpers/common/notification.service';
import { Global } from './_helpers/common/global.model';
import { ConfigService } from './_helpers/common/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const initializerConfigFn = (config: ConfigService) => {
  return () => {
    var ret: any = config.loadAppConfig();
    return ret;
  };
};
@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: APP_INITIALIZER, useFactory: initializerConfigFn, multi: true, deps: [ConfigService], },
    //{ provide: APP_BASE_HREF, useValue: window['base-href'] },
    NotificationService,
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
