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

  constructor() {
  }

  ngOnInit() {
   window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
    console.log("cond");
    e.returnValue = confirmationMessage;  
    return confirmationMessage;             
});
  
  }
   
}
