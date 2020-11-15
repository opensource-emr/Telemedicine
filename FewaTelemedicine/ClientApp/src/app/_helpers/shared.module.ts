import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestAudioVideoComponent } from './test-audio-video/test-audio-video.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { YesNoPipe } from './common/yes-no.pipe';

@NgModule({
  declarations: [
      TestAudioVideoComponent,
      JitsiComponent,
      YesNoPipe
  ],
  exports: [
    TestAudioVideoComponent,
    JitsiComponent,
    YesNoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
      
  ],
})
export class SharedModule { }
