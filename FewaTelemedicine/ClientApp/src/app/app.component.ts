import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/Common/global.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private global: Global) {
    var p = location.pathname.split('/');
    this.global.currentPractice = p[1];
    this.global.currentProvider = p[2];
  }

  ngOnInit() {
     window.addEventListener("beforeunload", function (e) {
       var confirmationMessage = "\o/";
       e.returnValue = confirmationMessage;
       return confirmationMessage;
     });
  }
}
