import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Provider, Patient } from '../../_helpers/models/domain-model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Global } from 'src/app/_helpers/common/global.model';
import { Observable, Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './live-video-mobile.component.html',
  styleUrls: ['./live-video-mobile.component.scss']
})
export class MobileLiveVideoComponent implements OnInit, AfterViewInit {
  isSubmitting: boolean = true;
  patientObj: Patient = new Patient();
  providerObj: Provider = new Provider();
  roomName = "FewaTelemedicine";
  remoteUserDisplayName = "Fewa User";
  isMeetStart = false;
  isWaiting: boolean = false;
  fileBinaryFromClient: any;
  fileHeaderFromClient: any;
  selectedFile: File;
  myFile: Observable<any>;
  fileFormatMsg : boolean = false; 
  fileSizeMsg : boolean = false;
  constructor(public httpClient: HttpClient,
    private notificationService: NotificationService,
    public global: Global,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public sanitizer: DomSanitizer ) {
    this.initialize();
    this.initForm();
  }

  ngOnInit(): void {
    var params = new HttpParams().set('username', this.global.currentProvider).set('practiceName',this.global.currentPractice);
    this.httpClient.
      get<any>(this.global.practiceUrl + "GetUpdatedProvider", { params: params })
      .subscribe(res => {
        this.global.providerObj = res.User;
        this.roomName = this.global.providerObj.roomName;
        this.remoteUserDisplayName = this.global.patientObj.name;
        this.global.practiceObj = res.Configuration;
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isWaiting = true;
      this.cdr.detectChanges();
    }, 1000);
    this.scrollToBottom();
  }
  private initForm() {

  }

  private initialize() {
    this.notificationService.Connect();
    this.patientObj = this.global.patientObj;
    this.notificationService.EventCallPatient.subscribe(patient => {
      this.isWaiting = false;
      this.isMeetStart = true;
    });

    this.notificationService.EventGetAllProviders.subscribe(_providers => {
      //get current provider
      this.providerObj = _providers.find(p => p.url == this.global.currentProvider && p.practice.toLowerCase() == this.global.currentPractice);
    });

    this.notificationService.EventConnectionEstablished.subscribe(() => {
      this.notificationService.LoadActiveDoctors();
    });

    this.notificationService.EventCallEnd
      .subscribe(_patient => {
        this.global.patientObj = _patient;
        this.endMeet();
      });
  }


  scrollToBottom() {
    var div = document.getElementById("scrollingContainer");
    if (div){
    this.cdr.detectChanges();
      div.scrollIntoView(false);
    }
  }

  endMeet() {
    this.isMeetStart = false;
    this.router.navigate(['patient/summary-mobile']);
  }
}
