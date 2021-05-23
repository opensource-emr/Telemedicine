import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(public routing: Router,) {
    if(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i) 
    || navigator.userAgent.match(/iPad/i) 
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || navigator.userAgent.match(/mobile/i)
    || navigator.userAgent.match(/CriOS/i)
    || navigator.userAgent.match(/Mobile/i)
    || navigator.userAgent.match(/'Android' + 'Chromee/i)
    || navigator.userAgent.match(/Opera Mini/i))
    {
      console.log(navigator.userAgent);
      this.routing.navigateByUrl('/patient/mobile')
     }
    else{
      this.routing.navigateByUrl('/patient/web')
    }
  }

  ngOnInit(): void {
    
  }

}
