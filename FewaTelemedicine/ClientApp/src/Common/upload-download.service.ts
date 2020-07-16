import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, Observable,Subject } from 'rxjs';

@Injectable()
export class UploadDownloadService {
  private baseApiUrl: string;
  private apiDownloadUrl: string;
  private apiUploadUrl: string;
  private apiFileUrl: string;
  public FileName: string;
  
  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = 'https://localhost:44304/api/Upload/';
    this.apiDownloadUrl = this.baseApiUrl + 'download';
    this.apiUploadUrl = this.baseApiUrl + 'upload';
    this.apiFileUrl = this.baseApiUrl + 'files';
  }
  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'GET',
      `${this.apiDownloadUrl}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  // public uploadFile(files: any): Observable<HttpEvent<void>> {
  //   const formData = new FormData();
  //  // formData.append('file', file);
  // //   if (files.length=== 0) {
  // //     return;
  // // }
  // let filesToUpload: File[] = files;
  // Array.from(filesToUpload).map((file, index) => {
  //     var date = new Date();
  //     var seconds = date.getSeconds();
  //     var minutes = date.getMinutes();
  //     var hour = date.getHours();
  //     let PatientName = sessionStorage.getItem('PatientName');
  //     var fileExtension = '.' + filesToUpload[index].name.split('.').pop();
  //     let FileName = PatientName + hour + minutes + seconds + fileExtension;
  //     this.FileName = FileName;
  //     formData.append('name' + index, file, FileName);
  //     console.log(formData.get('name'));
  // });

  //   return this.httpClient.request(new HttpRequest(
  //     'POST',
  //     this.apiUploadUrl,
  //     formData,
  //     {
  //       reportProgress: true
  //     }));
  // }

  public getFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl);
  }
}
