import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Provider, Practice, ProviderAdvice } from 'src/app/_helpers/models/domain-model';
import { Global } from 'src/app/_helpers/common/global.model';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  htmlContent = '';
  providerObj: Provider = new Provider();
  adviceObj :ProviderAdvice = new ProviderAdvice();
  retrieveResponse: any;
  receivedImageData: any;
  receivedPracticeImageData: any;
  public logoToUpload: File = null;
  public selectedFile: File;
  public progress: number;
  public message: string;
  public logoProgress: number;
  public logoMessage: string;
  public fileLimitExceeded: boolean = false;
  public showEditor: boolean = false;
  public showInvitationTemplate: boolean = false;
  public adviceId: number;
  userForm: FormGroup = new FormGroup({});
  practiceObj: Practice = new Practice();
  providerAdvice: Array<ProviderAdvice> = new Array<ProviderAdvice>();
  hospitalLogo: string = "";
  htmlBody: string = "";
  adviceForm: FormGroup = new FormGroup({});
  updateMsg: boolean = false;
  removeRecordMsg: boolean = false;
  addAdviceMsg: boolean = false;
  adviceLimitMsg: boolean = false;
  fileFormatMsg: boolean = false;
  fileSizeMsg: boolean = false;
  updateRecordMsg: boolean = false;
  updateButton : boolean = false;
  constructor(private routing: Router,
    public global: Global,
    public httpClient: HttpClient,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.initUserForm();
    this.initAdviceForm();
    this.displayAdviceList();
  }

  ngOnInit() {
    this.practiceObj = this.global.practiceObj;
    this.providerObj = this.global.providerObj;
    this.setUserFormValue(this.providerObj);
  }

 displayAdviceList() {
  this.httpClient.post<any>(this.global.practiceUrl + "GetAllAdvice", this.global.providerObj)
      .subscribe(res => {
        this.providerAdvice = res;
      });
  }

  private initAdviceForm() {
    this.adviceForm = this.fb.group({
      advice: ['', Validators.required],  
    });
    this.displayAdviceList();
  }

  addAdvice() {
    if ((this.providerAdvice.length) >= 10) {
      // You can add only 10 advices
      this.adviceLimitMsg = true;
      setTimeout(() => {
        this.adviceLimitMsg = false;
      }, 5000);
      this.resetAdviceForm();
    }
    else{
      this.getadviceFormValue();
    this.httpClient.post<any>(this.global.practiceUrl + "AddAdvice", this.adviceObj)
      .subscribe
      (res => {
        if (res) {
          this.addAdviceMsg = true;
          setTimeout(() => {
            this.addAdviceMsg = false;
          }, 10000);
          this.displayAdviceList();
        }
      });
     this.resetAdviceForm();
    }  
  }

  editAdvice() {
    this.getadviceFormValue();
    this.adviceObj.adviceId = this.adviceId;
    this.updateButton = true;
    this.httpClient.post<any>(this.global.practiceUrl + "EditAdvice", this.adviceObj)
      .subscribe
      (res => {
        if (res.message) { alert(res.message) }
        else {
          // "Successfully updated a advice. 
          this.updateRecordMsg = true;
          setTimeout(() => {
            this.updateRecordMsg = false;
          }, 10000);
          this.displayAdviceList();
        }
      },
        err => { 
          //There is a problem 
        });
        this.updateButton = false;
    this.resetAdviceForm();
  }

  public removeAdvice(adviceId: number): void {
    this.httpClient.get<any>(this.global.practiceUrl + 'DeleteAdvice?id=' + adviceId)
      .subscribe
      (res => {
        if (res) {
        //Successfully deleted a advice
        this.removeRecordMsg = true;
      setTimeout(() => {
        this.removeRecordMsg = false;
      }, 10000);
          this.displayAdviceList();
        }
      });
  }

  public edit(providerAdvice: ProviderAdvice) {
    this.adviceId = providerAdvice.adviceId;
    this.updateButton = true;
    this.adviceForm.patchValue({
      advice: providerAdvice.advice,
      adviceId: providerAdvice.adviceId,
      practiceId: providerAdvice.practiceId,
      providerId: providerAdvice.providerId,
    })
  }

  get adviceFormControls() {
    return this.adviceForm.controls;
  }
  
  getadviceFormValue() {
    var v = this.adviceForm.getRawValue();
    this.adviceObj.advice = v.advice;
    this.adviceObj.providerId =this.global.providerObj.providerId
    this.adviceObj.practiceId =this.global.providerObj.practiceId; 
  }

  private initUserForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^([\\s]+|[^\\s]+)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}([\\s]+|[^\\s]+)$")]],
      phone: ['', [Validators.required, Validators.pattern("^\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}$")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      designation: ['', [Validators.required, Validators.pattern("^[a-zA-Z.]+$")]],
      medical_degree: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      clinic: ['', [Validators.nullValidator]],
      name_title: ['', [Validators.required]],
      profile_image: ['', [Validators.nullValidator]],
      new_password: ['', [Validators.nullValidator]],
    })
  }

  setUserFormValue(provider: Provider) {
    this.userForm.patchValue({
      email: provider.email.trim(),
      phone: provider.mobileNumber,
      name: provider.name,
      designation: provider.designation,
      medical_degree: provider.medicalDegree,
      clinic: provider.clinic,
      name_title: provider.nameTitle,
      //profile_image:provider.image,
      new_password: provider.newPassword,
    })
  }

  getUserFormValue() {
    var v = this.userForm.getRawValue();
    this.providerObj.email = v.email.trim();
    this.providerObj.mobileNumber = v.phone;
    this.providerObj.name = v.name;
    this.providerObj.designation = v.designation;
    this.providerObj.medicalDegree = v.medical_degree;
    this.providerObj.clinic = v.clinic;
    this.providerObj.nameTitle = v.name_title;
    this.providerObj.profilePhoto = this.selectedFile;
    this.providerObj.newPassword = v.new_password;
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    //height: '10rem',
    //minWidth:'720px',
    minHeight: '200px',
    translate: 'no',
    placeholder: 'Enter Text here..',
    customClasses: [],
    defaultParagraphSeparator: "p",
    width: '760px',
    height: '500px',
    sanitize: true,
    toolbarHiddenButtons: [
      ["insertImage", "insertVideo", "toggleEditorMode", "link",
        "unlink"]
    ],
  };

  onFileChanged(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = <File>event.target.files[0];
    let ext = this.selectedFile.name.split('.').pop();
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
     //upload only image, file format not allowed"
     this.fileFormatMsg = true;
     setTimeout(() => {
       this.fileFormatMsg = false;
     }, 5000);
      this.userForm.get('profile_image')?.reset();
      this.selectedFile = undefined;
      return;
    }
    if (this.selectedFile.size > 2000000) {
      //"Please upload file less than 2MB"
      this.fileSizeMsg = true;
      setTimeout(() => {
        this.fileSizeMsg = false;
      }, 5000);
      this.userForm.get('profile_image').reset();
      this.selectedFile = undefined;
      return;
    }
  }

  resetUserForm() {
    this.progress = 0;
    this.message = null;
    this.selectedFile = null;
    this.userForm.reset();
  }

  resetAdviceForm() {
    this.adviceForm.reset();
  }

  updateProfile() {
    if (this.userForm.invalid) {
      return;
    }
    this.getUserFormValue();
    const formData: any = new FormData();
    Object.keys(this.providerObj).forEach(k => {
      if (k == "profilePhoto" && this.selectedFile) {
        formData.append(k, this.selectedFile, this.selectedFile.name)
      } else {
        formData.append(k, this.providerObj[k]);
      }
    })
    this.httpClient.
      post(this.global.practiceUrl + "UpdateProfile", formData, { reportProgress: true, observe: 'events', responseType: 'text' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.providerObj = JSON.parse(event.body);
          var roomname = this.providerObj.roomName.replace("name", this.providerObj.userName);
          this.providerObj.roomName = roomname;
          this.global.providerObj = this.providerObj;
         // profile updated
         this.updateMsg = true;
         setTimeout(() => {
           this.updateMsg = false;
         }, 10000);
        }
      },
        err => {
          // console.log(err);
        });
  }

  get userFormControls() {
    return this.userForm.controls;
  }
}
