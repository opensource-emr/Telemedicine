import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/_helpers/common/global.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
showSignIn:boolean=true;
showSignUp:boolean=true;
  constructor(private global: Global) { }

  ngOnInit(): void {
    this.global.isProvider = true;
    this.global.isPatient = false;
    if(!this.global.currentPractice){
      this.showSignIn=false;
    }
    if(this.global.currentPractice){
      this.showSignUp=false;
    }
  }
}
