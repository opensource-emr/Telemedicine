import { Component} from '@angular/core';
import { timer} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from '../common/app.global';
import { NotificationService } from '../common/app.notification.service';
import { Doctor } from './model/app.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.waitingroom.html'
  })
export class WaitingRoom {

  showChat: boolean = false;
  doctors: Array<Doctor> = new Array<Doctor>();
  ChatMessages: Array<any> = new Array<any>();
  ChatForm: FormGroup;

  constructor(
    public httpClient: HttpClient, private notificationService: NotificationService,
    public routing: Router, private formBuilder: FormBuilder,
    public global: Global) {
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
      this.ChatMessages.push({Name: chatData.Name, Message: chatData.Message, Class: 'reveiver-msg' });
    });

    this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
      this.doctors = _doctors;
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });
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

  SendToken(res){

  }
  GotoDoctorRoom(res){
    if(res==false){return;}
    if(res.DoctorNameAttending.length>0 && res.Name == this.global.patientObj.Name) {

    this.global.patientObj.DoctorNameAttending=res.DoctorNameAttending;
    var url:string = this.global.config.videourl.replace("DOCTORNAME",this.global.patientObj.DoctorNameAttending);
    this.global.config.videourl = url;
    this.routing.navigate(['/DoctorRoom']);

  }
  }

  Error(res){
  console.log(res);
  }

  SendChatMsg() {
    try {
      const chatMsg = {
        IsDoctor: this.global.IsDoctor ? false : true,
        Name: this.ChatForm.controls['selUser'].value,
        Message: this.ChatForm.controls['chatMessage'].value
      };
      this.ChatMessages.push({Name: 'Me', Message: chatMsg.Message, Class: 'sender-msg'});
      this.notificationService.SendChatMessage(chatMsg);

      this.ChatForm.reset();
      this.ChatForm.controls['selUser'].setValue(chatMsg.Name);
    } catch (e) { }
  }

  OnChatUserChange() {
    try {
      this.ChatMessages = new Array<any>();
    } catch (e) { }
  }

  OnShowHideChat() {
    try {
      this.showChat = !this.showChat;
    } catch (e) {

    }
  }
}
