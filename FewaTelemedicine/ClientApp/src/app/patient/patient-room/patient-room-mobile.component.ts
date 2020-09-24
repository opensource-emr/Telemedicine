import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { DoctorsModel } from 'src/models/doctors.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'src/vendor/jitsi/external_api.js';
declare var JitsiMeetExternalAPI: any;

@Component({
  templateUrl: './patient-room-mobile.component.html'
})
export class PatientRoomMobileComponent {
  doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
  doctorObj: DoctorsModel = new DoctorsModel();
  retrievedImage: any;
  options: {};
  domain: string;
  api: any;
  constructor(public httpClient: HttpClient,
    private notificationService: NotificationService,
    public global: GlobalModel,
    public routing: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService) {

    this.notificationService.EventCompletePatient.subscribe(_patient => {
      this.global.patientObj = _patient;
      this.SuccessTestDone(_patient);
    });

    this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
      this.doctors = _doctors;
      this.doctorObj = _doctors[0];
      this.global.doctorObj = _doctors[0];
      if (this.global.doctorObj.Image) {
        this.retrievedImage = 'data:image/png;base64,' + this.global.doctorObj.Image;
      }
      console.log(this.doctors);
    });
  }

  ngOnInit() {
    var params = new HttpParams().set('username', this.global.doctorObj.UserName);
    this.httpClient.
      get<any>(this.global.HospitalUrl + "GetUpdatedDoctor", { params: params })
      .subscribe(res => {
        this.doctorObj = res.User;
        this.domain = "meet.jit.si";
        this.options = {
          roomName: this.global.doctorObj.DoctorRoomName,
          width: '100%',
          height: '100%',
          parentNode: document.querySelector('#meet'),
          configOverwrite: {
            doNotStoreRoom: true,
            disableInviteFunctions: true,
            // startWithVideoMuted: true,
            startWithAudioMuted: true,
            disableRemoteMute: true,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            remoteVideoMenu: {
              // If set to true the 'Kick out' button will be disabled.
              disableKick: true
            }
          },
          interfaceConfigOverwrite: {
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            DEFAULT_REMOTE_DISPLAY_NAME: this.global.doctorObj.NameTitle + " " + this.global.doctorObj.DoctorName,
            disable1On1Mode: false,
            MOBILE_APP_PROMO: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_LOGO_URL: null,
            JITSI_WATERMARK_LINK: null,
            SHOW_BRAND_WATERMARK: false,
            REMOTE_THUMBNAIL_RATIO: null,
            DISABLE_TRANSCRIPTION_SUBTITLES: true,
            RECENT_LIST_ENABLED: false,
            TOOLBAR_BUTTONS: ['microphone', 'camera', , 'videoquality']
          }
        }
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);
      });
  }
  

  Transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
  }

  SuccessTestDone(res) {
    this.global.patientObj = res;
    this.routing.navigate(['ReportSummary-Mobile']);
  }
}

