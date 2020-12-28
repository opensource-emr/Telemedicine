import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/_helpers/common/global.model';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  adminFlag: boolean = false;
  constructor(public global: Global) { }

  ngOnInit(): void {
    if (this.global.providerObj.userName == "admin") {
      this.adminFlag = true;
    }
  }
}
