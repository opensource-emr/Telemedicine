import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, Observable, Subject } from 'rxjs';
import { Global } from './global.model';

@Injectable()
export class UploadDownloadService {
  private baseApiUrl: string;
  public apiUploadUrl: string;
  public DownloadUrl: string;
  public apiFileUrl: string;
  public FileName: string;

  constructor(private httpClient: HttpClient, private global: Global) {
    //this.baseApiUrl=window.location.origin+window.location.pathname+this.global.ApiUrl;
    let serverUrl = window.location.origin;
    this.DownloadUrl = serverUrl + '/upload/';
    this.apiUploadUrl = serverUrl + this.global.apiUrl + 'upload';
    // this.apiFileUrl = this.baseApiUrl +this.global.UploadUrl+ 'files';
    this.apiFileUrl = this.apiUploadUrl + '/files';
  }
  public getFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl);
  }
}
