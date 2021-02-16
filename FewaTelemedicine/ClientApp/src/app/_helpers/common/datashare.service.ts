import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
 
 
@Injectable({
    providedIn: 'root',
  })
export class DataShareService {
 //loginData: string = '';
 loginMsg : boolean =  true;
}
