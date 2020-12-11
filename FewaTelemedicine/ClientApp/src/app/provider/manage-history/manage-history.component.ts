import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Patient, Provider } from 'src/app/_helpers/models/domain-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/app/_helpers/common/global.model';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-history',
  templateUrl: './manage-history.component.html',
  styleUrls: ['./manage-history.component.scss']
})
export class ManageHistoryComponent implements OnInit {
  public completedPatients: Array<Patient> = null;
  public filteredCompletedPatients: Array<Patient> = [];
  searchText: string = "";
  selectedDate: NgbDateStruct;
  providerObj: Provider = new Provider();
  
  constructor(private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private routing: Router,
    public global: Global,
    private calendar: NgbCalendar,
    public httpClient: HttpClient,) { 
      this.selectedDate = calendar.getToday();
      this.loadPatientsAttended();
    }

  ngOnInit() {
    this.providerObj = this.global.providerObj;
  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let finalDate = year + "-" + month + "-" + day;
    this.searchText = finalDate;
    this.loadPatientsAttended();
  }
  loadPatientsAttended() {
    this.completedPatients = [];
    this.httpClient.post<any>(this.global.practiceUrl + "GetPatientsAttended?searchString="
      + this.searchText, this.global.providerObj)
      .subscribe(res => this.loadPatientSuccess(res), err => this.error(err));
  }

  loadPatientSuccess(res) {
    this.filteredCompletedPatients = res;
    //this.FilteredCompletedPatients = this.CompletedPatients;
    this.cdr.detectChanges();
  }

  error(err) {
    alert(err.status);
  }

  difference(start: Date, end: Date) {
    var endTime = end;
    var startTime = start;
    diff = moment.utc(moment(endTime, "YYYY-MM-DD HH:mm:ss").diff(moment(startTime, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");
    var ms = moment.utc(moment(endTime, "YYYY-MM-DD HH:mm:ss").diff(moment(startTime, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");
    var d = moment.duration(ms);
    var diff = d.get("minutes") + " min " + d.get("seconds") + " sec";
    return diff;
  }

}
