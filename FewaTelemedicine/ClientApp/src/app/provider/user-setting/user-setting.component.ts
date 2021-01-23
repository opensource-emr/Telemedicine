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
  addProviderObj: Provider = new Provider();
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
  userForm: FormGroup = new FormGroup({});
  practiceObj: Practice = new Practice();
  public providerAdvice: Array<ProviderAdvice> = [];
  hospitalLogo: string = "";
  htmlBody: string = "";
  adviceForm: FormGroup = new FormGroup({});

  constructor(private routing: Router,
    public global: Global,
    public httpClient: HttpClient,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.initUserForm();
    this.initAdviceForm();
  }

  ngOnInit() {
    this.practiceObj = this.global.practiceObj;
    this.providerObj = this.global.providerObj;
    this.setUserFormValue(this.providerObj);
  }

  loadAdvice() {
    this.httpClient.post<any>(this.global.practiceUrl + "GetAllAdvice", this.global.providerObj)
      .subscribe(res => {
        if (res) {
          this.providerAdvice = res;
          for (let temp of res) {
            var tempForm = this.fb.group({
              advice: new FormControl({ value: temp.advice, disabled: true }, [Validators.required]),
              id: new FormControl(temp.adviceId)
            });
            this.adviceArray.push(tempForm);
          }
        }
        else {
          this.adviceArray.push(this.addAdvice());
        }
      });
  }

  private initAdviceForm() {
    this.adviceForm = this.fb.group({
      adviceArray: this.fb.array([]),
    });
    this.loadAdvice();
  }

  private addAdvice() {
    const form = this.fb.group({
      advice: new FormControl({ value: '', disabled: true }, Validators.required),
    });
    return form;
  }

  addRow() {
    const control = this.adviceForm.get('adviceArray') as FormArray;
    control.push(this.addAdvice());
  }

  public removeRow(index: number): void {
    const control = this.adviceForm.get('adviceArray') as FormArray;
    if (confirm("Are you sure you want to delete this ?")) {
      if (this.adviceArray.getRawValue()[index].id) {
        var id = this.adviceArray.getRawValue()[index].id;
        control.removeAt(index);
        this.providerAdvice.splice(index, 1);
        this.httpClient.delete<number>(this.global.practiceUrl + "DeleteAdvice/" + id).subscribe(() => {
          console.info("Record Deleted Successfully");
        });
      }
      else {
        control.removeAt(index);
      }
    }
  }

  public editRow(index: number) {
    const control = this.adviceForm.get('adviceArray') as FormArray;
    control.at(index).enable();
  }

  get adviceArray(): FormArray {
    return this.adviceForm.get("adviceArray") as FormArray;
  }

  saveAdvice() {
    if (this.adviceForm.invalid) {
      return;
    }
    for (let i = 0; i < this.adviceArray.length; i++) {
      if (this.providerAdvice.length > 0 && this.providerAdvice[i]) {
        for (let temp of this.providerAdvice) {
          if (temp.adviceId === this.adviceArray.getRawValue()[i].id) {
            temp.advice = this.adviceArray.getRawValue()[i].advice;
          }
        }
      }
      else {
        var advice = new ProviderAdvice();
        advice.advice = this.adviceArray.getRawValue()[i].advice;
        if (this.global.providerObj.providerId > 0)
          advice.providerId = this.global.providerObj.providerId;
        advice.practiceId = this.global.practiceObj.practiceId;
        this.providerAdvice.push(advice);
      }
    }

    this.httpClient.
      post<any>(this.global.practiceUrl + "SaveAdvice", this.providerAdvice)
      .subscribe(res => {
        this.practiceObj = res;
        alert("Provider Advice is Saved Successfully.");
      },
        err => {
          //  console.log(err); 
        });
  }

  private initUserForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("^\\+?[0-9]{3}[0-9]{0,9}$")]],
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
      email: provider.email,
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
    this.providerObj.email = v.email;
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
      alert("upload only image, file format not allowed");
      this.userForm.get('profile_image')?.reset();
      this.selectedFile = undefined;
      return;
    }
    if (this.selectedFile.size > 2000000) {
      alert("Please upload file less than 2MB");
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
          alert("profile updated");
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
