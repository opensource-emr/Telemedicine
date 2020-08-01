import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { NotificationService } from 'src/Common/notification.service';
import { GlobalModel } from 'src/Common/global.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { DoctorsModel } from 'src/models/doctors.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './patient-room.component.html'
})
export class PatientRoomComponent {
  showChat: boolean = false;
  doctors: Array<DoctorsModel> = new Array<DoctorsModel>();
  doctorObj: DoctorsModel = new DoctorsModel();
  retrievedImage:any;
  ChatMessages: Array<any> = new Array<any>();
  ChatReceivedMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;
  AllUserChats: any = {};
  @ViewChild('scrollBtm', { static: false }) private scrollBottom: ElementRef;
  constructor(private notificationService: NotificationService,
    public global: GlobalModel,
    public routing: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,private toastr: ToastrService) {
    this.initForm();
    this.notificationService.EventCompletePatient
      .subscribe(_patient => {
        this.global.patientObj = _patient;
        this.SuccessTestDone(_patient);
      }
      );
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
      this.toastr.success(chatMsg.Message, chatMsg.Name,
        {timeOut: 5000});
      //this.ChatReceivedMessages.push(chatMsg);
      this.pushChatMsgUserwise(chatData.Name, chatMsg);

      // this.cdr.detectChanges();
      //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
    });

    this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
      this.doctors = _doctors;
      this.doctorObj=_doctors[0];
      this.global.doctorObj=_doctors[0];
      if (this.global.doctorObj.Image) {
        this.retrievedImage = 'data:image/png;base64,' + this.global.doctorObj.Image;
      }
      console.log(this.doctors);
    });
    // gets doctor list
    this.notificationService.LoadActiveDoctors();
  }

  Transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
  }

  ngOnInit() {

   
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
          IsDoctor: this.global.IsDoctor ? false : true,
          Name: this.ChatForm.controls['selUser'].value,
          Message: this.ChatForm.controls['chatMessage'].value
        };
        const chatmsgObj = { Name: 'Me', Message: chatMsg.Message, Class: 'sender-msg' };
        this.ChatMessages.push(chatmsgObj);
        this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);


        this.notificationService.SendChatMessage(chatMsg);

        this.ChatForm.reset();
        this.ChatForm.controls['selUser'].setValue(chatMsg.Name);
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