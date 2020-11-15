import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.scss']
})
export class LiveVideoComponent implements OnInit {
  isDisplayed = false;

  toggleDisplay(){
    this.isDisplayed = !this.isDisplayed
  }

  constructor() { }

  ngOnInit(): void {
  }

}
