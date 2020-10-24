import { Component, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { ProgressStatus } from 'src/models/progress-status.model';
import { Global } from 'src/Common/global.model';
import { Router } from '@angular/router';
import { Patient } from 'src/models/DomainModels';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './patient-upload-files.component.html',
    selector: "pat-upload-files"
})

export class PatientUploadFilesComponent {
    @Output("closeModal")
    closeModal:EventEmitter<boolean>=new EventEmitter<boolean>();
    public baseApiUrl: string;
    public progress: number;
    public message: string;
    public FileName: string;
    public fileInDownload: string;

    public percentage: number;
    public showProgress: boolean;
    public showUploadError: boolean;
    public uploadStatus = new EventEmitter<ProgressStatus>();
    patients: Array<Patient> = new Array<Patient>();
    public docArray: any[] = [];
    tokbox: string = 'tokbox';
    public state: Observable<object>;
    constructor(private http: HttpClient, public service: UploadDownloadService, public global: Global, private routing: Router) {
        this.uploadStatus = new EventEmitter<ProgressStatus>();
            this.state = history.state;
    }

    public uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }
        let filesToUpload: File[] = files;
        const formData = new FormData();
        Array.from(filesToUpload).map((file, index) => {
            var date = new Date();
            var seconds = date.getSeconds();
            var minutes = date.getMinutes();
            var hour = date.getHours();
            let PatientName = sessionStorage.getItem('PatientName');
            var fileExtension = '.' + filesToUpload[index].name.split('.').pop();
            let FileName = PatientName + hour + minutes + seconds + fileExtension;
            this.FileName = FileName;
            formData.append('name' + index, file, FileName);
            console.log(formData.get('name'));
        });
        this.http.post(this.service.apiUploadUrl, formData, { reportProgress: true, observe: 'events' })
            .subscribe(
                event => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    }
                    else if (event.type === HttpEventType.Response) {
                        for (var i = 0; i < Object.keys(event.body).length; i++) {
                            this.FileName = Object.values(event.body)[i].replace(/^.*[\\\/]/, '');
                            this.docArray[i] = {
                                filename: this.FileName,
                                filepath: Object.values(event.body)[i]
                            }
                        }
                        this.message = 'Upload success.';
                    }
                });
    }

    backToCall() {
        this.closeModal.emit(true);
        // if (this.global.patientObj.callingPlatform == this.tokbox) {
        //     this.routing.navigateByUrl('/PatientRoomTokbox', { state: this.global });
        // }
        // else {
        //     this.routing.navigateByUrl('/PatientRoom', { state: this.global });
        // }
    }    
}