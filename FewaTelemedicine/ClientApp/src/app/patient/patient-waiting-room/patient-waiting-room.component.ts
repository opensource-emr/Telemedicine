import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model';
import { Router } from '@angular/router';
import { DoctorsModel } from 'src/models/doctors.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ParametersModel } from 'src/models/parameters.model';

@Component({
  templateUrl: './patient-waiting-room.component.html'
})
export class PatientWaitingRoomComponent implements OnDestroy {
  @ViewChild('pcam') video: any;
  Video: any;
  showChat: boolean = true;
  doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
  ChatMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  AllUserChats: any = {};
  tokbox: string = "Tokbox";
  parameterArray: Array<ParametersModel> = null;
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;

  ngAfterViewInit() {
    let _video = this.video.nativeElement;
    this.Video = _video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          _video.srcObject = stream;
          _video.play();
        })
    }
  }
  constructor(
    public httpClient: HttpClient, private notificationService: NotificationService,
    public routing: Router, private formBuilder: FormBuilder,
    public global: GlobalModel, private cdr: ChangeDetectorRef, private toastr: ToastrService) {
    this.initForm();
    this.notificationService.Connect();

    this.notificationService.EventCallPatient.subscribe(patient => {
      this.GotoDoctorRoom(patient);
    });

    this.notificationService.EventChatMessage.subscribe(chatData => {
      if (this.ChatForm.controls['selUser'].value != chatData.Name) {
        this.ChatForm.controls['selUser'].setValue(chatData.Name);
        this.OnChatUserChange();
      }
      if (!this.showChat) {
        this.showChat = true;
      }
      const chatMsg = { Name: chatData.Name, Message: chatData.Message, Class: 'receiver-msg' };
      this.ChatMessages.push(chatMsg);
      // this.toastr.success(chatMsg.Message, chatMsg.Name,
      //   {timeOut: 5000});
      this.pushChatMsgUserwise(chatData.Name, chatMsg);

      this.cdr.detectChanges();
      // this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
    });

    this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
      this.doctors = _doctors;
      this.global.doctorObj=_doctors[0];
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });
    this.routing.navigate([],
      { queryParams:{DoctorName:this.global.patientObj.DoctorId},
        queryParamsHandling:"merge"
    },
      );
  }
  ngOnDestroy() {
    const mediaStream = this.Video.srcObject;
    if (mediaStream == null) {
      return;
    }
    (<MediaStream>mediaStream).getTracks().forEach(stream => stream.stop());
  }

  private initForm() {
    this.ChatForm = this.formBuilder.group({
      selUser: [null, Validators.required],
      chatMessage: ['', Validators.required]
    });
  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    const control = this.ChatForm.controls[controlname];
    return control.hasError(typeofvalidator) && control.dirty;
  }

  SendToken(res) {

  }

  GotoDoctorRoom(res) {
    if (res == false) { return; }
        if (res.DoctorNameAttending.length > 0 && res.PatientName == sessionStorage.getItem('PatientName')) {
          this.global.patientObj.DoctorNameAttending = res.DoctorNameAttending;
          var params = new HttpParams().set('username', this.global.doctorObj.UserName);
          this.httpClient.
            get<any>(this.global.HospitalUrl + "GetUpdatedDoctor", { params: params })
            .subscribe(res => {
          this.global.doctorObj = res.User;
          console.log(this.global.doctorObj);
          this.global.patientObj.VideoCallPlatform = res.VideoCallPlatform;
          var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.patientObj.DoctorNameAttending);
          this.global.config.videourl = url;
          if (res.VideoCallPlatform == this.tokbox) {
            this.routing.navigateByUrl('/PatientRoomTokbox', { state: this.global.patientObj });
          }
          else {
            this.routing.navigateByUrl('/PatientRoom', { state: this.global.patientObj });
          }
        });
      }
 
  }

  Error(res) {
    console.log(res);
  }

  SendChatMsg() {
    try {
      for (const i in this.ChatForm.controls) {
        this.ChatForm.controls[i].markAsDirty();
        this.ChatForm.controls[i].updateValueAndValidity();
      }

      if (this.ChatForm.valid) {
        const chatMsg = {
          IsDoctor: this.global.IsDoctor ? false : true,
          Name: this.ChatForm.controls['selUser'].value,
          Message: this.ChatForm.controls['chatMessage'].value
        };
        const chatmsgObj = { Name: 'Me', Message: chatMsg.Message, Class: 'sender-msg' };
        this.ChatMessages.push(chatmsgObj);
        this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);

        this.cdr.detectChanges();
        this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom

        this.notificationService.SendChatMessage(chatMsg);

        this.ChatForm.reset();
        this.ChatForm.controls['selUser'].setValue(chatMsg.Name);
      }
    } catch (e) { }
  }

  OnChatUserChange() {
    try {
      const selUser = this.ChatForm.controls['selUser'].value;
      if (this.AllUserChats.hasOwnProperty(selUser)) {
        this.ChatMessages = this.AllUserChats[selUser].slice();
      } else {
        this.ChatMessages = new Array<any>();
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