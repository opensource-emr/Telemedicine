import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/common/app.global';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  constructor(private http: HttpClient ,public global:Global) {}

  loadAppConfig() {
    return this.http
      .get('assets/appconfig.json')
      .toPromise()
      .then(data => {
        this.global.config = data;
      });
  }
  
 
}