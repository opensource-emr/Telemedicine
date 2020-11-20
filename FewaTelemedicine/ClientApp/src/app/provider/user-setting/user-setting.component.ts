import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Provider, Practice } from 'src/app/_helpers/models/domain-model';
import { Global } from 'src/app/_helpers/common/global.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  htmlContent = '';
  providerObj: Provider = new Provider();
  retrieveResponse: any;
  retrievedImage: any;
  receivedImageData: any;
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
  practiceObj: Practice = new Practice();
  hospitalLogo: string = "";
  htmlBody:string= "";


 
  constructor(private routing: Router,
    public global: Global,
    public httpClient: HttpClient,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.initUserForm();
    this.initPracticeForm();
  }

  ngOnInit() {
    var providerConfig = new HttpParams().set('username', this.global.providerObj.userName);
    this.httpClient.get<any>(this.global.practiceUrl + "GetUpdatedProvider", { params: providerConfig })
      .subscribe(res => {
        this.providerObj = res.User;
        if (this.providerObj.image) {
          this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
        }
        this.setUserFormValue(this.providerObj);
      });
    this.loadPracticeConfiguration();
  }

  loadPracticeConfiguration() {
    this.httpClient.get<any>(this.global.practiceUrl + "GetPracticeConfiguration")
      .subscribe(res => {
        if (res.Value.length > 0) {
          for (let temp of res.Value) {
            if (temp.url === this.global.practiceObj.url)
              this.practiceObj = temp;
          }
        }
        this.setPracticeFormValue(this.practiceObj);
        this.loadEmailTemplate();
      });
  }

  private initUserForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("^\\+?[0-9]{3}[0-9]{0,9}$")]],
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      medical_degree: ['', [Validators.required]],
      clinic: ['', [Validators.required]],
      name_title: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
    })
  }

  private initPracticeForm() {
    this.practiceConfigForm = this.fb.group({
      hospital_name: ['', [Validators.required]],
      //hospital_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      hospital_contact : ['', [Validators.required]],
      hospital_logo: new FormControl(" "),
      hospital_description: new FormControl(" "),
      sender_email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      email_api_key: ['', [Validators.required]],
      email_name: ['', [Validators.required]],
      calling_platform: ['',[Validators.required]],
      addContent:new FormControl(" "),
    })
  }

  setUserFormValue(provider: Provider) {
  this.userForm.patchValue({
    email: provider.email,
    phone: provider.mobileNumber,
    name: provider.name,
    designation: provider.designation,
    medical_degree: provider.medicalDegree,
    clinic:provider.clinic,
    name_title:provider.nameTitle,
    profile_image:provider.image,
    })  
  }

  setPracticeFormValue(practice: Practice) {
    this.practiceConfigForm.patchValue({
      hospital_name: practice.name,
      //hospital_email: practice.email,
      hospital_contact: practice.contactNumber,
      hospital_logo: practice.logoPath,
      hospital_description: practice.description,
      sender_email:practice.email,
      email_api_key:practice.emailApiKey,
      email_name:practice.emailApiName,
      calling_platform:practice.callingPlatform,
      addContent:practice.emailAdditionalContent,
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
  }


  getPracticeFormValue() {
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.name = v.hospital_name;
    //this.practiceObj.email = v.hospital_email;
    this.practiceObj.contactNumber = v.hospital_contact;
    this.practiceObj.description = v.hospital_description;
    this.practiceObj.logoPath = v.hospital_logo;
    this.practiceObj.email = v.sender_email;
    this.practiceObj.emailApiKey = v.email_api_key;
    this.practiceObj.emailApiName = v.email_name;
    this.practiceObj.callingPlatform = v.calling_platform;
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
      ["insertImage", "insertVideo","toggleEditorMode","link",
      "unlink"]
    ],
  };

  onFileChanged(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile.size > 2000000) {
      alert("Please upload file less than 2MB");
      this.fileLimitExceeded = true;
      return;
    }
    this.fileLimitExceeded = false;
    const fd: any = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.httpClient.post(this.global.practiceUrl + "UploadProfileImage", fd, { reportProgress: true, observe: 'events', responseType: 'json' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedImageData = event;
          this.message = 'Upload success.';
          this.providerObj.image = this.receivedImageData.body;
        }
      });
  }

  loadInvitationTemplate(){
    this.showInvitationTemplate=!this.showInvitationTemplate;
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
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

  updateProfile() {
    if (this.userForm.invalid) {
      return;
    }
    this.getUserFormValue();
    this.httpClient.
      post<any>(this.global.practiceUrl + "UpdateProfile", this.providerObj)
      .subscribe(res => {
        this.providerObj = res;
        this.getImage();
        alert("profile updated");
        this.providerObj = res;
      },
        err => { console.log(err); });
  }

  getImage() {
    //Make a call to backend to get the Image Bytes.
    this.httpClient.get(this.global.practiceUrl + "GetProfileImage")
      .subscribe(
        res => {
          this.retrieveResponse = res;
          if (this.retrieveResponse)
            this.retrievedImage = 'data:image/png;base64,' + this.retrieveResponse;
        }
      );
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
    const formData = new FormData();
    formData.append('image', this.logoToUpload, this.logoToUpload.name);
    //call to server
    this.httpClient.post(this.global.practiceUrl + "UploadPracticeLogo", formData, { reportProgress: true, observe: 'events', responseType: 'text' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.receivedImageData = event;
          this.message = 'Upload Success.';
          this.practiceObj.logoPath = this.receivedImageData.body;
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

  emailTemplateUrl() {
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlBody);
  }

  previewEmailTemplate() {
    this.showEditor = false;
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
    this.httpClient.
      post<any>(this.global.practiceUrl + "PreviewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.htmlBody=res.EmailHTMLBody;
        this.htmlBody=this.htmlBody.replace("border: 1px dashed #990000 !important;'>[<b> Note: Content In This Box Is Editable.</b>]<br>","' id='edit'");
        this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
      },
        err => { console.log(err); });
  }


  loadEmailTemplate() {
    this.showEditor = false;
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
    this.httpClient.
      post<any>(this.global.practiceUrl + "PreviewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.htmlBody=res.EmailHTMLBody;
        this.htmlBody=this.htmlBody.replace("' id='edit'>", "border: 1px dashed #990000 !important;'>[<b> Note: Content In This Box Is Editable.</b>]<br>");
        this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
      },
        err => { console.log(err); });
  }

  editTemplate() {
    this.showEditor = true;
  }

}
