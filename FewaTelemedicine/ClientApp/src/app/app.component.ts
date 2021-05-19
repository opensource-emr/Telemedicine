import { Component } from '@angular/core';
import { Global } from './_helpers/common/global.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fewa-web';
  constructor(private global: Global) {
    var p = location.pathname.split('/');
    if(p.length<=2){
      p.push('admin')
    }
    if(p[1].length>0 && p[2].length>0){
      this.global.currentPractice = p[1].replace(/\s/g, "").toLowerCase();
      this.global.currentProvider = p[2].replace(/\s/g, "").toLowerCase();
    }
    else{
      this.global.currentPractice=p[1];
      this.global.currentProvider=p[2];
    }
    this.global.providerObj.url = this.global.currentProvider;

      if(navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i) 
       || navigator.userAgent.match(/iPad/i) 
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i))
       {
        this.global.isMobile = true;
       }
       else{
        this.global.isMobile = false;
       }
  }

  selectTheme(type) {
    if (type == 'blue') {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("blueTheme");
      body.classList.remove("greenTheme");
    } else if (type == 'red') {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("greenTheme");
      body.classList.remove("blueTheme");
    }
  }
  mouseenter() {
    var d = document.getElementById('selectTheme') as HTMLUListElement;
    d.style.display = 'block';
  }
  mouseleave() {
    var d = document.getElementById('selectTheme') as HTMLUListElement;
    d.style.display = 'none';
  }
}
