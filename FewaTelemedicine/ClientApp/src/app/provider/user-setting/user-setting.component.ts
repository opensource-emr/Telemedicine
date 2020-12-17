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
  addProviderObj : Provider = new Provider();
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
  practiceConfigForm: FormGroup = new FormGroup({});
  addProviderForm: FormGroup = new FormGroup({});
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
    this.initPracticeForm();
    this.initAdviceForm();
    this.initAddProviderForm();
  }

  ngOnInit() {
    this.practiceObj = this.global.practiceObj;
    this.setPracticeFormValue(this.practiceObj);
    this.loadEmailTemplate();
    this.providerObj = this.global.providerObj;
    this.setUserFormValue(this.providerObj);
  }

  loadAdvice() {
    this.httpClient.get<any>(this.global.practiceUrl + "GetAllAdvice")
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
        this.providerAdvice.push(advice);
      }
    }

    this.httpClient.
      post<any>(this.global.practiceUrl + "SaveAdvice", this.providerAdvice)
      .subscribe(res => {
        this.practiceObj = res;
        alert("Provider Advice is Saved Successfully.");
      },
        err => { console.log(err); });
  }

  private initUserForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("^\\+?[0-9]{3}[0-9]{0,9}$")]],
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      medical_degree: ['', [Validators.required]],
      clinic: ['', [Validators.nullValidator]],
      name_title: ['', [Validators.required]],
      profile_image: ['', [Validators.nullValidator]],
    })
  }

  private initPracticeForm() {
    this.practiceConfigForm = this.fb.group({
      hospital_name: ['', [Validators.required]],
      //hospital_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      hospital_contact: ['', [Validators.required]],
      // ,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      hospital_logo: [''],
      hospital_description: new FormControl(" "),
      sender_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      email_api_key: ['', [Validators.required]],
     //email_name: ['', [Validators.required]],
     //calling_platform: ['', [Validators.required]],
      addContent: new FormControl(" "),
    })
  }

  private initAddProviderForm() {
    this.addProviderForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  addProvider() {
    this.getProviderFormvalue();
    this.httpClient.post<any>(this.global.apiUrl + "Security/AddProvider" + "", this.addProviderObj)
      .subscribe(res => { alert("Provider Added succesfully, Now login with email password") },
        err => { alert("There is a problem") });
    this.resetAddProviderForm();
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
    })
  }

  setPracticeFormValue(practice: Practice) {
    this.practiceConfigForm.patchValue({
      hospital_name: practice.name,
      //hospital_email: practice.email,
      hospital_contact: practice.contactNumber,
      //hospital_logo: practice.logoPath,
      hospital_description: practice.description,
      sender_email: practice.email,
      email_api_key: practice.emailApiKey,
      //email_name: practice.emailApiName,
      //calling_platform: practice.callingPlatform,
      addContent: practice.emailAdditionalContent,
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
  }


  getPracticeFormValue() {
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.name = v.hospital_name;
    //this.practiceObj.email = v.hospital_email;
    this.practiceObj.contactNumber = v.hospital_contact;
    this.practiceObj.description = v.hospital_description;
    //this.practiceObj.logoPath = v.hospital_logo;
    this.practiceObj.email = v.sender_email;
    this.practiceObj.emailApiKey = v.email_api_key;
    //this.practiceObj.emailApiName = v.email_name;
    //this.practiceObj.callingPlatform = v.calling_platform;
  }

  getProviderFormvalue() {
    var v = this.addProviderForm.getRawValue();
    this.addProviderObj.userName = v.userName;
    this.addProviderObj.password = v.password;
    this.addProviderObj.url=this.addProviderObj.userName; // url same as username
    this.addProviderObj.practice=this.global.currentPractice;
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

  loadInvitationTemplate() {
    this.showInvitationTemplate = !this.showInvitationTemplate;
  }

  resetUserForm() {
    this.progress = 0;
    this.message = null;
    this.selectedFile = null;
    this.userForm.reset();
  }

  resetPracticeForm() {
    this.logoProgress = 0;
    this.logoMessage = null;
    this.selectedFile = null;
    this.practiceConfigForm.reset();
  }

  resetAddProviderForm() {
    this.addProviderForm.reset();
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
          this.global.providerObj = this.providerObj;
          alert("profile updated");
        }
      },
        err => { console.log(err); });
  }

  updatePracticeConfiguration() {
    if (this.practiceConfigForm.invalid) {
      return;
    }
    this.getPracticeFormValue();
    this.httpClient.
      post<any>(this.global.practiceUrl + "UpdatePracticeConfiguration", this.practiceObj)
      .subscribe(res => {
        this.practiceObj = res;
        this.global.practiceObj = res;
        alert("Practice Configuration updated");
      },
        err => { console.log(err); });
  }

  updatePracticeLogo(file: FileList) {
    this.logoToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.hospitalLogo = event.target.result;
    }
    reader.readAsDataURL(this.logoToUpload);
    //upload image
    let ext = this.logoToUpload.name.split('.').pop();
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
      alert("upload only logo, file format not allowed");
      this.practiceConfigForm.get('hospital_logo')?.reset();
      this.logoToUpload = undefined;
      return;
    }
    const formData = new FormData();
    formData.append('image', this.logoToUpload, this.logoToUpload.name);

    //call to server
    this.httpClient.post(this.global.practiceUrl + "UploadPracticeLogo", formData, { reportProgress: true, observe: 'events', responseType: 'text' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.logoProgress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedPracticeImageData = event;
          this.logoMessage = 'Upload Success.';
          this.practiceObj.logoPath = this.receivedPracticeImageData.body;
        }
        else {
          this.message = 'Upload Failed.';
        }

      });
  }

  get userFormControls() {
    return this.userForm.controls;
  }

  get practiceFormControls() {
    return this.practiceConfigForm.controls;
  }

  get addProviderFormControls(){
    return this.addProviderForm.controls;
  }

  emailTemplateUrl() {
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlBody);
  }

  previewEmailTemplate() {
    this.showEditor = false;
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
    this.practiceObj.name=this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "PreviewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.htmlBody = res.EmailHTMLBody;
        this.htmlBody = this.htmlBody.replace("EmailAdditionalContent", res.PreviewEmailContent);
        this.htmlBody = this.htmlBody.replace("border: 1px dashed #990000 !important;'>[<b> Note: Content In This Box Is Editable.</b>]<br>", "' id='edit'");
        //this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
      },
        err => { console.log(err); });
  }


  loadEmailTemplate() {
    this.showEditor = false;
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
    this.practiceObj.name=this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "previewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.htmlBody = res.EmailHTMLBody;
        this.htmlBody = this.htmlBody.replace("' id='edit'>", "border: 1px dashed #990000 !important;'>[<b> Note: Content In This Box Is Editable.</b>]<br>");
       // this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
      },
        err => { console.log(err); });
  }

  editTemplate() {
    this.showEditor = true;
  }

}
