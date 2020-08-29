import { Component,EventEmitter} from '@angular/core';
import { HttpClient, HttpEventType} from '@angular/common/http'
import { PatientsAttendedModel } from 'src/models/patients-attended.model';
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { ProgressStatus} from 'src/models/progress-status.model';
import { GlobalModel } from 'src/Common/global.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: './patient-upload-files.component.html',
})

export class PatientUploadFilesComponent {
    public baseApiUrl: string;
    public progress: number;
    public message: string;
    public FileName: string;
    public fileInDownload: string;
    public percentage: number;
    public showProgress: boolean;
    public showUploadError: boolean;
    public uploadStatus = new EventEmitter<ProgressStatus>();
    patients: Array<PatientsAttendedModel> = new Array<PatientsAttendedModel>();
    public docArray: any[] = [];
    tokbox:string='tokbox';
    constructor(private http: HttpClient, public service: UploadDownloadService,public global:GlobalModel,private routing:Router) {
        this.uploadStatus = new EventEmitter<ProgressStatus>();
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
                }
            );
    }
backToCall()
{
    if(this.global.patientObj.VideoCallPlatform=this.tokbox)
    { this.routing.navigateByUrl('/PatientRoomTokbox', { state: this.global.patientObj });
}
else{
this.routing.navigateByUrl('/PatientRoom', { state: this.global.patientObj });
}
    
}
    
}