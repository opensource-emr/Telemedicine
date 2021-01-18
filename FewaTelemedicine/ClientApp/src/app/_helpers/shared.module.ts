import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestAudioVideoComponent } from './test-audio-video/test-audio-video.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { YesNoPipe } from './common/yes-no.pipe';
import { SafePipe } from './common/safe.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
      TestAudioVideoComponent,
      JitsiComponent,
      YesNoPipe,
      SafePipe
  ],
  exports: [
    TestAudioVideoComponent,
    JitsiComponent,
    YesNoPipe,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
      
  ],
})
export class SharedModule { }
