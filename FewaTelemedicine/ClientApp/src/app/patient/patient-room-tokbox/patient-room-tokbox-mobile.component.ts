import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { Global } from 'src/Common/global.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Provider } from 'src/models/DomainModels';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './patient-room-tokbox-mobile.component.html',
    selector: 'pat-room-tokbox'
})
export class PatientRoomTokboxMobileComponent {
    showChat: boolean = false;
    providers: Array<Provider> = new Array<Provider>();
    providerObj: Provider = new Provider();
    retrievedImage: any;
    ChatMessages: Array<any> = new Array<any>();
    ChatReceivedMessages: Array<any> = new Array<any>();
    ChatForm: FormGroup;
    AllUserChats: any = {};
    options: {};
    domain: string;
    api: any;
    public state: Observable<object>;

    @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
    constructor(private notificationService: NotificationService,
        public global: Global,
        public routing: Router,
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        public httpClient: HttpClient) {
        this.initForm();
        this.providerObj = this.global.providerObj;
        this.notificationService.EventCompletePatient
            .subscribe(_patient => {
                this.global.patientObj = _patient;
                this.SuccessTestDone(_patient);
            }
            );
        this.notificationService.EventChatMessage.subscribe(chatData => {
            if (this.ChatForm.controls['selUser'].value != chatData.name) {
                this.ChatForm.controls['selUser'].setValue(chatData.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: chatData.name, message: chatData.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            this.pushChatMsgUserwise(chatData.name, chatMsg);

            this.cdr.detectChanges();
            //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });

        this.notificationService.EventConnectionEstablished.subscribe(() => {
            this.notificationService.LoadActiveDoctors();
        });
        this.notificationService.EventGetAllProviders.subscribe(_providers => {
            this.providerObj = _providers.filter(a => a.url == this.global.currentProvider && a.practice == this.global.currentPractice);
            if (this.providerObj) {
                this.ChatForm.controls['selUser'].setValue(this.providerObj.userName);
            }
            if (this.global.providerObj.image) {
                this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
            }
            // console.log(this.doctors);
        });
        this.state = history.state;
        // gets doctor list
        // this.notificationService.LoadActiveDoctors();
    }

    Transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
    }

    ngOnInit() {
        this.state = history.state;
    }

    private initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, Validators.required],
            chatMessage: ['', Validators.required]
        });
    }
    hasError(typeofvalidator: string, controlname: string): boolean {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.touched;
    }
    SuccessTestDone(res) {
        this.global.patientObj = res;
        this.routing.navigate(['ReportSummary']);
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }

            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.notificationService.SendChatMessage(chatMsg);

                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
                this.cdr.detectChanges();

                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom

            }
        } catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
                //this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
            } else {
                this.ChatMessages = new Array<any>();
                //this.ChatReceivedMessages=new Array<any>();
            }
        } catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        } catch (e) { }
    }

    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
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
