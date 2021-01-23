import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Provider, Practice } from 'src/app/_helpers/models/domain-model';
import { Global } from 'src/app/_helpers/common/global.model';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from 'src/app/_helpers/common/notification.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {
  htmlContent = '';
  providerObj: Provider = new Provider();
  addProviderObj: Provider = new Provider();
  providerList: Array<Provider> = new Array<Provider>();
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
  adminForm: FormGroup = new FormGroup({});
  practiceConfigForm: FormGroup = new FormGroup({});
  addProviderForm: FormGroup = new FormGroup({});
  practiceObj: Practice = new Practice();
  hospitalLogo: string = "";
  htmlBody: string = "";
  PracticeEmailForm: FormGroup = new FormGroup({});
  constructor(private routing: Router,
    private notificationService: NotificationService,
    public global: Global,
    public httpClient: HttpClient,
    private fb: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private sanitizer: DomSanitizer) {
    this.initPracticeForm();
    this.initAddProviderForm();
    this.initPracticeEmailForm();
    this.displayProviderList();
  }

  ngOnInit() {
    this.practiceObj = this.global.practiceObj;
    this.setPracticeFormValue(this.practiceObj);
    this.setPracticeEmailFormValue(this.practiceObj);
    this.loadEmailTemplate();
    this.providerObj = this.global.providerObj;
  }

  private initPracticeForm() {
    this.practiceConfigForm = this.fb.group({
      hospital_name: ['', [Validators.required]],
      hospital_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      hospital_contact: ['', [Validators.required, Validators.pattern("^\\+?[0-9]{3}[0-9]{0,9}$")]],
      hospital_logo: [''],
      hospital_description: new FormControl(" "),
      //addContent: new FormControl(" "),
    })
  }

  private initPracticeEmailForm() {
    this.PracticeEmailForm = this.fb.group({
      addContent: new FormControl(" "),
    })
  }

  private initAddProviderForm() {
    this.addProviderForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      providerList: this.fb.array([]),
    });
  }

  addProvider() {
    this.getProviderFormvalue();
    this.httpClient.post<any>(this.global.apiUrl + "Security/AddProvider", this.addProviderObj)
      .subscribe
      (res => {
        if (res.message) { alert(res.message) }
        else {
          alert("Provider Added succesfully, Now login with email password")
          this.providerList = res
        }
      },
        err => { alert("There is a problem") });
    this.resetAddProviderForm();
  }

  displayProviderList() {
    this.httpClient.get<any>(this.global.practiceUrl + "GetAllProvider?practice=" + this.global.currentPractice)
      .subscribe(res => this.providerList = res, err => alert(err));
  }

  setPracticeFormValue(practice: Practice) {
    this.practiceConfigForm.patchValue({
      hospital_name: practice.name.toUpperCase(),
      hospital_email: practice.email,
      hospital_contact: practice.contactNumber,
      //hospital_logo: practice.logoPath,
      hospital_description: practice.description,
      //addContent: practice.emailAdditionalContent,
    })
  }

  setPracticeEmailFormValue(practice: Practice) {
    this.PracticeEmailForm.patchValue({
      addContent: practice.emailAdditionalContent,
    })
  }

  getPracticeFormValue() {
    var v = this.practiceConfigForm.getRawValue();
    this.practiceObj.name = v.hospital_name.replace(/\s/g, "").toLowerCase();
    this.practiceObj.email = v.hospital_email;
    this.practiceObj.contactNumber = v.hospital_contact;
    this.practiceObj.description = v.hospital_description;
    //this.practiceObj.logoPath = v.hospital_logo;
  }

  getPracticeEmailFormValue() {
    var v = this.PracticeEmailForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
  }

  getProviderFormvalue() {
    var v = this.addProviderForm.getRawValue();
    this.addProviderObj.userName = v.userName.replace(/\s/g, "").toLowerCase();
    this.addProviderObj.password = v.password;
    this.addProviderObj.url = this.addProviderObj.userName // url same as username
    this.addProviderObj.practice = this.global.currentPractice;
    this.addProviderObj.practiceId = this.global.providerObj.practiceId;
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
      this.adminForm.get('profile_image')?.reset();
      this.selectedFile = undefined;
      return;
    }
    if (this.selectedFile.size > 2000000) {
      alert("Please upload file less than 2MB");
      this.adminForm.get('profile_image').reset();
      this.selectedFile = undefined;
      return;
    }
  }

  loadInvitationTemplate() {
    this.showInvitationTemplate = !this.showInvitationTemplate;
  }

  resetPracticeForm() {
    this.logoProgress = 0;
    this.logoMessage = null;
    this.selectedFile = null;
    this.practiceConfigForm.reset();
  }

  resetPracticeEmailForm() {
    this.PracticeEmailForm.reset();
  }

  resetAddProviderForm() {
    this.addProviderForm.reset();
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
        err => {
          //  console.log(err);
        });
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
    formData.append('image', this.logoToUpload, this.logoToUpload.name.replace(/\s/g, ""));

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

  updatePracticeEmailConfiguration() {
    if (this.PracticeEmailForm.invalid) {
      return;
    }
    this.getPracticeEmailFormValue();
    this.httpClient.
      post<any>(this.global.practiceUrl + "UpdatePracticeConfiguration", this.practiceObj)
      .subscribe(res => {
        this.practiceObj = res;
        this.global.practiceObj = res;
        alert("Invitation email template updated");
      },
        err => {
          //  console.log(err); 
        });
  }

  get practiceFormControls() {
    return this.practiceConfigForm.controls;
  }

  get practiceEmailFormControls() {
    return this.PracticeEmailForm.controls;
  }

  get addProviderFormControls() {
    return this.addProviderForm.controls;
  }

  emailTemplateUrl() {
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlBody);
  }

  previewEmailTemplate() {
    this.showEditor = false;
    var v = this.PracticeEmailForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
    this.practiceObj.name = this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "PreviewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.htmlBody = res.EmailHTMLBody;
        this.htmlBody = this.htmlBody.replace("EmailAdditionalContent", res.PreviewEmailContent);
        this.htmlBody = this.htmlBody.replace("border: 1px dashed #990000 !important;'>[<b> Note: Content In This Box Is Editable.</b>]<br>", "' id='edit'");
        //this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
      },
        err => {
          //  console.log(err);
        });
  }

  loadEmailTemplate() {
    this.showEditor = false;
    var v = this.PracticeEmailForm.getRawValue();
    this.practiceObj.emailAdditionalContent = v.addContent;
    this.practiceObj.name = this.global.currentPractice;
    this.httpClient.
      post<any>(this.global.practiceUrl + "previewEmailTemplate", this.practiceObj)
      .subscribe(res => {
        this.htmlBody = res.EmailHTMLBody;
        this.htmlBody = this.htmlBody.replace("' id='edit'>", "border: 1px dashed #990000 !important;'>[<b> Note: Content In This Box Is Editable.</b>]<br>");
        //this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
      },
        err => {
          // console.log(err); 
        });
  }

  editTemplate() {
    this.showEditor = true;
  }
}
