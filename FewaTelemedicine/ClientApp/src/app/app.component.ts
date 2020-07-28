import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
   // this.router.navigate(['Login']);
   window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
    console.log("cond");
    e.returnValue = confirmationMessage;  
    return confirmationMessage;             
});
  
  }
}
