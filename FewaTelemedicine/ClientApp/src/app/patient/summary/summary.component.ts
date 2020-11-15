import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/_helpers/common/global.model';
import { NotificationService } from 'src/app/_helpers/common/notification.service';
import { Patient } from 'src/app/_helpers/models/domain-model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  patient: Patient;// = new Patient();

  constructor(
    private notificationService: NotificationService,
    public global: Global
  ){
    //this.patient = this.global.patientObj;
    this.initConn();
  }

  ngOnInit(): void {
  }
  private initConn() {
    this.notificationService.Connect();
    this.notificationService.EventCompletePatient.subscribe(_patient=>{
      this.patient = _patient;
      console.log(_patient);
    })
  }
}
