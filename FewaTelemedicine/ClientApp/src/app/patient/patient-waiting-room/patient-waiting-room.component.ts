import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy, AfterViewInit } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import {GlobalModel} from 'src/Common/global.model';
import { Router } from '@angular/router';
import { DoctorsModel } from 'src/models/doctors.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import  'src/vendor/jitsi/external_api.js';
declare var JitsiMeetExternalAPI : any;

@Component({
    templateUrl:'./patient-waiting-room.component.html'
})
export class PatientWaitingRoomComponent implements AfterViewInit,OnDestroy {
  @ViewChild('pcam') video:any; 
  Video:any;
  showChat: boolean = true;
  doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
  ChatMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  AllUserChats: any = {};
  options: {};
  domain:string;
  api:any;
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;


  ngOnInit() {
    // this.httpClient.
    // get<DoctorsModel>(this.global.HospitalUrl + "GetUpdatedDoctor")
    // .subscribe(res => {
    //  this.global.doctorObj = res;
    //  this.domain = "meet.jit.si";
    //  this.options = {
    //    roomName: this.global.doctorObj.DoctorRoomName,
    //    width: 380,
    //    height: 280,
    //    parentNode: document.querySelector('#meet'),
    //    configOverwrite: {},
    //    interfaceConfigOverwrite: {
    //      filmStripOnly: false,
    //      SHOW_JITSI_WATERMARK: false,
    //      SHOW_WATERMARK_FOR_GUESTS: false,
    //      SHOW_BRAND_WATERMARK: false,
    //      TOOLBAR_BUTTONS: ['microphone', 'camera']
    //    }
    //  }               
    //  this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    //  this.api.executeCommand('displayName',this.global.patientObj.PatientName);        
    // });     
  }

  ngAfterViewInit() {
         //let _video=this.video.nativeElement;
         //this.Video=_video;
          // if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          //   navigator.mediaDevices.getUserMedia({ video: true })
          //                         .then(stream => {
          //                           _video.srcObject = stream;
          //                           _video.play();
          //                          })
          // }                      
        }
  constructor(
    public httpClient: HttpClient, private notificationService: NotificationService,
    public routing: Router, private formBuilder: FormBuilder,
    public global: GlobalModel, private cdr: ChangeDetectorRef) {
    this.initForm();
    this.notificationService.Connect();

    this.httpClient.
    get<DoctorsModel>(this.global.HospitalUrl + "GetUpdatedDoctor")
    .subscribe(res => {
     this.global.doctorObj = res;
     this.domain = "meet.jit.si";
     this.options = {
       roomName: this.global.doctorObj.DoctorRoomName,
       width: 380,
       height: 280,
       parentNode: document.querySelector('#meet'),
       configOverwrite: {},
       interfaceConfigOverwrite: {
         filmStripOnly: false,
         SHOW_JITSI_WATERMARK: false,
         SHOW_WATERMARK_FOR_GUESTS: false,
         SHOW_BRAND_WATERMARK: false,
         TOOLBAR_BUTTONS: ['microphone', 'camera']
       }
     }               
     this.api = new JitsiMeetExternalAPI(this.domain, this.options);
     this.api.executeCommand('displayName',this.global.patientObj.PatientName);        
    });  

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
      this.pushChatMsgUserwise(chatData.Name, chatMsg);
      
      this.cdr.detectChanges();
      this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
    });

    this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
      this.doctors = _doctors;
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });
  }

  ngOnDestroy() { 
    // const mediaStream = this.Video.srcObject;
    // if(mediaStream==null)
    // {
    //   return;
    // }
    // (<MediaStream>mediaStream).getTracks().forEach( stream => stream.stop());
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
          if (res.DoctorNameAttending.length > 0 && res.Name == this.global.patientObj.PatientName) {
      
            this.global.patientObj.DoctorNameAttending = res.DoctorNameAttending;
            this.httpClient.
            get<DoctorsModel>(this.global.HospitalUrl + "GetUpdatedDoctor")
            .subscribe(res => {
             this.global.doctorObj = res;
             var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.patientObj.DoctorNameAttending);
             this.global.config.videourl = url;     
             this.routing.navigate(['/PatientRoom']);
            });
            // var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.patientObj.DoctorNameAttending);
            // this.global.config.videourl = url;        
            // this.routing.navigate(['/PatientRoom']);      
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
// export class PatientWaitingRoomComponent {
//   @ViewChild('pcam') video:any; 

//     showChat: boolean = false;
//     chatButton:boolean=false;
//     doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
//     ChatMessages: Array<any> = new Array<any>();
//     ChatReceivedMessages: Array<any> = new Array<any>();
//     ChatForm: FormGroup;
//     AllUserChats: any = {};
//     @ViewChild('scrollBtm', { static: false }) 
//     private scrollBottom: ElementRef;
//     ngAfterViewInit() {
//       let _video=this.video.nativeElement;
//       if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true })
//                               .then(stream => {
//                                 _video.srcObject = stream;
//                                 _video.play();
//                               })
//       }
//     }
//     constructor(
//       public httpClient: HttpClient, private notificationService: NotificationService,
//       public routing: Router, private formBuilder: FormBuilder,
//       public global: GlobalModel, private cdr: ChangeDetectorRef) {
//       this.initForm();
//       this.notificationService.Connect();
  
//       this.notificationService.EventCallPatient.subscribe(patient => {
//         this.GotoDoctorRoom(patient);
//       });
  
//       this.notificationService.EventChatMessage.subscribe(chatData => {
//         if (this.ChatForm.controls['selUser'].value != chatData.Name) {
//           this.ChatForm.controls['selUser'].setValue(chatData.Name);
//           this.OnChatUserChange();
//         }
//         if (!this.showChat) {
//           this.showChat = true;
//         }
//         const chatMsg = { Name: chatData.Name, Message: chatData.Message, Class: 'receiver-msg' };
//         //this.ChatMessages.push(chatMsg);
//         this.ChatReceivedMessages.push(chatMsg);
//         this.pushChatMsgUserwise(chatData.Name, chatMsg);
  
//        // this.cdr.detectChanges();
//         this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
//       });
  
//         this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
//           this.doctors = _doctors;
//           console.log(this.doctors);
//         });
//      // gets doctor list
//      this.notificationService.LoadActiveDoctors();
//     }
  
//     private initForm() {
//       this.ChatForm = this.formBuilder.group({
//         selUser: [null, Validators.required],
//         chatMessage: ['', Validators.required]
//       });
//     }
  
//     hasError(typeofvalidator: string, controlname: string): boolean {
//       const control = this.ChatForm.controls[controlname];
//       return control.hasError(typeofvalidator) && control.dirty;
//     }
//     SendToken(res) {
  
//     }
//     GotoDoctorRoom(res) {
//       if (res == false) { return; }
//       if (res.DoctorNameAttending.length > 0 && res.Name == this.global.patientObj.PatientName) {
  
//         this.global.patientObj.DoctorNameAttending = res.DoctorNameAttending;
//         var url: string = this.global.config.videourl.replace("DOCTORNAME", this.global.patientObj.DoctorNameAttending);
//         this.global.config.videourl = url;
        
//         this.routing.navigate(['/PatientRoom']);
  
//       }
//     }
  
//     Error(res) {
//       console.log(res);
//     }
  
    
// SendChatMsg() {
//   try {
//     for (const i in this.ChatForm.controls) {
//       this.ChatForm.controls[i].markAsDirty();
//       this.ChatForm.controls[i].updateValueAndValidity();
//     }

//     if (this.ChatForm.valid) {
//       const chatMsg = {
//         IsDoctor: this.global.IsDoctor ? false : true,
//         Name: this.ChatForm.controls['selUser'].value,
//         Message: this.ChatForm.controls['chatMessage'].value
//       };
//       const chatmsgObj = { Name: 'Me', Message: chatMsg.Message, Class: 'sender-msg' };
//       this.ChatMessages.push(chatmsgObj);
//       this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);

//       this.cdr.detectChanges();
//       this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom

//       this.notificationService.SendChatMessage(chatMsg);

//       this.ChatForm.reset();
//       this.ChatForm.controls['selUser'].setValue(chatMsg.Name);
//     }
//   } catch (e) { }
// }

// OnChatUserChange() {
//   try {
//     const selUser = this.ChatForm.controls['selUser'].value;
//     if (this.AllUserChats.hasOwnProperty(selUser)) {
//       this.ChatMessages = this.AllUserChats[selUser].slice();
//       //this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
//     } else {
//       this.ChatMessages = new Array<any>();
//       //this.ChatReceivedMessages=new Array<any>();
//     }
//   } catch (e) { }
// }

// OnShowHideChat() {
//   try {
//     this.showChat = !this.showChat;
//   } catch (e) { }
// }

// onChatEnter(event) {
//   if (event.keyCode === 13) {
//     this.SendChatMsg();
//   }
// }

// pushChatMsgUserwise(user, messageObj) {
//   try {
//     if (!this.AllUserChats.hasOwnProperty(user)) {
//       this.AllUserChats[user] = new Array<any>();
//     }
//     this.AllUserChats[user].push(messageObj);
//   } catch (e) { }
// }
//   }
  