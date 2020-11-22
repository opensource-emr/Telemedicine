import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Global } from 'src/app/_helpers/common/global.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(public global: Global) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    alert("NOT ALLOWED! Talk with Admin.");
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }
}
