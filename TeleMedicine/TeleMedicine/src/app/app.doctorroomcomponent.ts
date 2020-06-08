import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from '../common/app.global';
import { Patient } from './model/app.model';
import { NotificationService } from '../common/app.notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.doctorroom.html'
})
export class DoctorRoomComponent {
  public showPatDetail: boolean = false;
  patients: Array<Patient> = new Array<Patient>();
  showChat: boolean = false;
  ChatMessages: Array<any> = new Array<any>();
  ChatUserDropDowns: Array<any> = new Array<any>();
  ChatForm: FormGroup;

  constructor(
    public httpClient: HttpClient, public routing: Router, private formBuilder: FormBuilder,
    public notificationService: NotificationService, public global: Global) {
    this.initForm();
    if (this.global.IsPatient) {

      this.notificationService.EventCompletePatient
        .subscribe(_patient => {
          this.global.patientObj = _patient;
          this.PatientCompleted(_patient);
          this.ChatUserDropDowns = new Array<any>();
        }
        );

      this.notificationService.EventGetAllDoctors.subscribe(_doctors => {
        this.ChatUserDropDowns = _doctors;
      });

      this.notificationService.EventConnectionEstablished.subscribe(() => {
        this.notificationService.LoadActiveDoctors();
      });
    }
    else {
      this.notificationService.Connect();

      this.notificationService.EventGetAllPatients
        .subscribe(_patients => {
          this.patients = _patients;
          this.ChatUserDropDowns = _patients;
        });

      this.notificationService.EventCallPatient.subscribe(_patient => {
        this.global.patientObj = _patient;
      }
      );
    }

    this.notificationService.EventChatMessage.subscribe(data => {
      if (this.ChatForm.controls['selUser'].value != data.Name) {
        this.ChatForm.controls['selUser'].setValue(data.Name);
        this.OnChatUserChange();
      }
      if (!this.showChat) {
        this.showChat = true;
      }
      this.ChatMessages.push({ Name: data.Name, Message: data.Message, Class: 'reveiver-msg' });
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


  PatientAttended(attendedPatient: Patient) {
    this.showPatDetail = false;
    attendedPatient.Medication = this.global.patientObj.Medication;
    this.notificationService.PatientAttended(attendedPatient);
  }
  CallPatient(callPatient: Patient) {
    if (this.global.patientObj.Status == 1) {
      return;
    }
    this.showPatDetail = true;
    this.notificationService.CallPatient(callPatient);

  }

  PatientCompleted(res) {
    if (res.Name == this.global.patientObj.Name) {
      this.global.patientObj = res;
      this.routing.navigate(['/FinalReport']);
    }
  }

  Error(res) {
    alert(res.status);
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
