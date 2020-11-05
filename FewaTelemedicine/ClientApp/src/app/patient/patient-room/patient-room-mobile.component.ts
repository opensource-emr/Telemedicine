import { Component, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'src/vendor/jitsi/external_api.js';
import { Provider } from 'src/models/DomainModels';
import { Observable } from 'rxjs';
declare var JitsiMeetExternalAPI: any;

@Component({
    templateUrl: './patient-room-mobile.component.html',
    selector: 'pat-room'
})
export class PatientRoomMobileComponent implements AfterViewInit {
    providers: Array<Provider> = new Array<Provider>();
    retrievedImage: any;
    AllUserChats: any = {};
    options: {};
    domain: string;
    api: any;
    public state: Observable<object>;
    providerObj: Provider = new Provider();

    constructor(private notificationService: NotificationService,
        public global: Global,
        public routing: Router,
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        public httpClient: HttpClient) {
        this.providerObj = this.global.providerObj;
        this.notificationService.EventCompletePatient
            .subscribe(_patient => {
                this.global.patientObj = _patient;
                this.SuccessTestDone(_patient);
            });
        this.notificationService.EventConnectionEstablished.subscribe(() => {
            this.notificationService.LoadActiveDoctors();
        });
        this.notificationService.EventGetAllProviders.subscribe(_providers => {
            this.providers = _providers.filter(a => a.practice == global.practiceObj.url);;

            if (this.global.providerObj.image) {
                this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
            }
        });
        if (this.global.providerObj.image) {
            this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
        }
    }

    Transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
    }

    ngAfterViewInit() {
        this.state = history.state;
        this.domain = "meet.jit.si";
        this.options = {
            roomName: this.global.providerObj.roomName,
            width: '100%',
            height: '100%',
            parentNode: document.querySelector('#meet'),
            configOverwrite: {
                doNotStoreRoom: true,
                disableInviteFunctions: true,
                startWithVideoMuted: false,
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
                OPEN_IN_MOBILE_BROWSER: false,
                DEFAULT_REMOTE_DISPLAY_NAME: this.global.providerObj.nameTitle + " " + this.global.providerObj.name,
                // disable1On1Mode: false,
                MOBILE_APP_PROMO: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DEFAULT_LOGO_URL: '',
                JITSI_WATERMARK_LINK: '',
                SHOW_BRAND_WATERMARK: false,
                REMOTE_THUMBNAIL_RATIO: '',
                DISABLE_TRANSCRIPTION_SUBTITLES: true,
                // RECENT_LIST_ENABLED: false,
                TOOLBAR_BUTTONS: ['microphone', 'camera', , 'videoquality']
            }
        }
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    }

    SuccessTestDone(res) {
        this.global.patientObj = res;
        this.routing.navigate(['ReportSummary']);
    }

    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array<any>();
            }
            this.AllUserChats[user].push(messageObj);
        } catch (e) { }
    }
}