import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;
//import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'jitsi-call',
  template: `<div class="meet" id="meet"></div>`,
  styles: [
    `.meet {
      width: 100%;
      height: 100%;
    }`
  ]
})
export class JitsiComponent implements OnInit, OnDestroy {
  @Input('roomName') roomName = "FewaTelemedicine";
  @Input('remoteUserDisplayName') remoteUserDisplayName = "Fewa User";
  @Input('localUserDisplayName') localUserDisplayName = "";

  constructor( )
  {
    //public _snackBar: MatSnackBar
  }

  private api: any;
  ngOnInit() {
    this.api = new JitsiMeetExternalAPI("meet.jit.si", this.callOptions);
    this.handleAPI();
}

  ngOnDestroy() {
    this.api.executeCommand('hangup');
    this.api.dispose();
  }

  private get callOptions() {
    return {
      roomName: this.roomName,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#meet'),
      configOverwrite: {
        doNotStoreRoom: true,
        disableInviteFunctions: true,
        startWithVideoMuted: false,
        startWithAudioMuted: false,
        enableWelcomePage: false,
        disableRemoteMute: true,
        prejoinPageEnabled: false,
        disableLocalVideoFlip: true,
        remoteVideoMenu: {
          // If set to true the 'Kick out' button will be disabled.
          disableKick: true
        },
      },
      interfaceConfigOverwrite: this.interfaceConfig
    }
  }

  private get interfaceConfig() {
    return {
      APP_NAME: 'Fewa Telemedicine',
      BRAND_WATERMARK_LINK: '',
      CLOSE_PAGE_GUEST_HINT: false, // A html text to be shown to guests on the close page, false disables it
      CONNECTION_INDICATOR_DISABLED: false,
      DEFAULT_BACKGROUND: '#474747',
      DEFAULT_LOCAL_DISPLAY_NAME: this.localUserDisplayName,
      DEFAULT_REMOTE_DISPLAY_NAME: this.remoteUserDisplayName,
      MOBILE_APP_PROMO: false,
      SHOW_CHROME_EXTENSION_BANNER: false,
      //DISABLE_VIDEO_BACKGROUND: true,
      SHOW_JITSI_WATERMARK: false,
      SHOW_BRAND_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
      JITSI_WATERMARK_LINK: '',
      DISPLAY_WELCOME_PAGE_CONTENT: false,
      DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
      disable1On1Mode: false,
      REMOTE_THUMBNAIL_RATIO: 0, // 1:1
      LOCAL_THUMBNAIL_RATIO:  3/3 ,
      VIDEO_QUALITY_LABEL_DISABLED: true,
      //filmStripOnly: false,
      TOOLBAR_BUTTONS: ['microphone', 'camera','videoquality', 'fullscreen']
    }
  }

  private handleAPI() {
    //this.api.executeCommand('toggleFilmStrip');
    this.api.executeCommand('displayName', this.remoteUserDisplayName);
    this.api.executeCommand('subject', 'Fewa Telemedicine');
    this.api.executeCommand('setVideoQuality', 720);

    //console.error('closing')
    this.api.addEventListener('readyToClose', function () {
      console.warn('readyToClose');
    });
    // this.api.addEventListener('cameraError', (e) => {
    //   this._snackBar.open('Camera was not found, Please allow access to your camera', 'Dismiss', {
    //      duration: 5000,
    //      verticalPosition: 'top'
    //     });
    // });

    // this.api.addEventListener('micError', (e) => {
    //    this._snackBar.open('Mic was not found, Please allow access to your mic', 'Dismiss', {
    //      duration: 5000,
    //     verticalPosition: 'top'
    //   });
    // });


    this.api.addEventListener('participantJoined', function (e) {
      console.warn('participantJoined');
      console.warn(e);
    });
    this.api.addEventListener('videoConferenceJoined', function (e) {
      console.warn('videoConferenceJoined');
      console.warn(e);
    });
    this.api.addEventListener('participantLeft', function (e) {
      console.warn('participantLeft');
      console.warn(e);
    });

    //console.log(this.api);
  }
}

