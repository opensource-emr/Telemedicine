import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Global } from 'src/app/_helpers/common/global.model';
import { Provider } from 'src/app/_helpers/models/domain-model';
import { ChatModel, MessageModel } from 'src/app/_helpers/models/chat.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  chatForm: FormGroup
  providerObj: Provider = new Provider();
  userChat: Array<ChatModel> = [];
  currentChatUser: ChatModel = new ChatModel();
  container: HTMLElement;
  disableSendButton: boolean = true;
  filteredPatients: Array<ChatModel> = [];
  searchPatient: string = "";
  constructor(private notificationService: NotificationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public global: Global,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar) {
    this.initForm();
    this.initialize();

  }
  private initForm() {
    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required]
    });
  }
  private initialize() {
    this.notificationService.Connect();

    this.notificationService.EventGetAllPatients.subscribe(_patients => {
      _patients.forEach(p => {
        if (p.name) {
          var t = this.userChat.find(a => a.user == p.name);
          if (t == undefined || t == null) {
            var n = new ChatModel();
            n.user = p.name;
            this.userChat.push(n);
          }
        }
      });
      this.filteredPatients = [...this.userChat];
    });

    this.notificationService.EventChatMessage
      .subscribe(data => {
        if (data.sender) {
          var n = new MessageModel();
          var t = this.userChat.find(a => a.user == data.sender);
          if (t) {
            n.message = data.message;
            n.sender = data.sender;
            n.receiver = data.receiver;
            n.time = new Date();
            t.message.push(n);
          }
          if (this.currentChatUser) {
            if (this.currentChatUser.user) {
              var s = [...this.userChat].find(a => a.user == this.currentChatUser.user);
              this.currentChatUser = s;
              this.scrollToBottom();
            }
          }
        }
      });
  }
  ngOnInit() {
    this.providerObj = this.global.providerObj;
    this.userChat = JSON.parse(JSON.stringify(this.global.chatData));
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    var div = document.getElementById("scrollingContainer");
    if (div)
      div.scrollIntoView(false);
  }
  searchPatients() {
    this.filteredPatients = [...this.userChat]
      .filter(a => a.user.toLowerCase()
        .includes(this.searchPatient.toLowerCase()));
  }

  onChatUserChange(currentUser) {
    this.currentChatUser = currentUser;
    this.disableSendButton = false;
    this.scrollToBottom();
  }

  sendChatMsg() {
    try {
      if (this.chatForm.invalid) {
        return;
      }
      var sendingChatMsg = new MessageModel();
      sendingChatMsg.isProvider = true;
      sendingChatMsg.sender = this.global.providerObj.userName;
      sendingChatMsg.receiver = this.currentChatUser.user;
      sendingChatMsg.message = this.chatForm.value.chatMessage;
      var t = this.userChat.find(a => a.user == this.currentChatUser.user);
      if (t) {
        sendingChatMsg.time = new Date();
        t.message.push(sendingChatMsg);
      }
      if (this.currentChatUser) {
        if (this.currentChatUser.user) {
          var s = [...this.userChat].find(a => a.user == this.currentChatUser.user);
          this.currentChatUser = s;
          this.scrollToBottom();
        }
      }
      this.notificationService.SendChatMessage(sendingChatMsg);
      this.chatForm.reset();
    } catch (e) { }
  }

  onChatEnter(event) {
    if (this.currentChatUser == null || this.currentChatUser == undefined) {
      this._snackBar.open('Please select patient from list', '', {
        duration: 2000,
      });
    } else if (this.currentChatUser.user == null || this.currentChatUser.user == undefined || this.currentChatUser.user == "") {
      this._snackBar.open('Please select patient from list', '', {
        duration: 2000,
      });
    }
    if (event.keyCode === 13) {
      this.sendChatMsg();
    }
  }

  get chatFormControls() {
    return this.chatForm.controls;
  }
}
