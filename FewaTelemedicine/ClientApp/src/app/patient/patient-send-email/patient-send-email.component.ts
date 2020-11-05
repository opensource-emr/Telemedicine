import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http'
import { UploadDownloadService } from 'src/Common/upload-download.service';
import { ProgressStatus } from 'src/models/progress-status.model';
import { Global } from 'src/Common/global.model';
import { Router } from '@angular/router';
import { Patient } from 'src/models/DomainModels';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: './patient-send-email.component.html',
    selector: "pat-send-email"
})

export class PatientSendEmailComponent {
    @Output("closeModal")
    closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
    patientObj: Patient = null;
    public sendEmailForm: FormGroup;

    public state: Observable<object>;
    constructor(private http: HttpClient,
        public global: Global,
        private formBuilder: FormBuilder,
        private routing: Router) {
        this.state = history.state;
        this.initForm();
    }

    private initForm() {
        this.sendEmailForm = this.formBuilder.group({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
        });
    }

    CloseModal() {
        this.closeModal.emit(true);
    }

    hasError(typeofvalidator: string, controlname: string): boolean {
        const control = this.sendEmailForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.dirty;
    }

    SendEmail() {
        if (this.sendEmailForm.invalid) {
            return;
        }
        this.global.patientObj.email = this.sendEmailForm.controls['email'].value;
        this.global.patientObj.url = this.global.currentProvider;
        this.patientObj = this.global.patientObj;
        this.http.post("/Messenger/EmailPatientReport", this.global.patientObj).subscribe(res => {
            if (res) {
                alert("Patient Report has been Mailed Successfully !");
            }
        },
            err => { alert("Sending Failed.Please Try Again !"); console.log(err); });
        this.sendEmailForm.reset();
        this.closeModal.emit(true);
    }
}