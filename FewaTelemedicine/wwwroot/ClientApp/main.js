(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/Common/config.service.ts":
/*!**************************************!*\
  !*** ./src/Common/config.service.ts ***!
  \**************************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _global_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.model */ "./src/Common/global.model.ts");




class ConfigService {
    constructor(http, global) {
        this.http = http;
        this.global = global;
    }
    loadAppConfig() {
        return this.http
            .get('/appconfig.json')
            .toPromise()
            .then(data => {
            this.global.config = data;
        });
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_global_model__WEBPACK_IMPORTED_MODULE_2__["Global"])); };
ConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConfigService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _global_model__WEBPACK_IMPORTED_MODULE_2__["Global"] }]; }, null); })();


/***/ }),

/***/ "./src/Common/global.model.ts":
/*!************************************!*\
  !*** ./src/Common/global.model.ts ***!
  \************************************/
/*! exports provided: Global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Global", function() { return Global; });
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");

class Global {
    constructor() {
        this.providerObj = null;
        this.patientObj = null;
        this.practiceObj = null;
        this.isProvider = false;
        this.isPatient = false;
        this.isLogo = false;
        this.apiUrl = "/api/";
        this.practiceUrl = "/Practice/";
        this.config = null;
        this.providerObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_0__["Provider"]();
        this.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_0__["Patient"]();
        this.practiceObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_0__["Practice"]();
    }
}


/***/ }),

/***/ "./src/Common/http-interceptor.service.ts":
/*!************************************************!*\
  !*** ./src/Common/http-interceptor.service.ts ***!
  \************************************************/
/*! exports provided: HttpInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpInterceptorService", function() { return HttpInterceptorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _global_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.model */ "./src/Common/global.model.ts");



class HttpInterceptorService {
    constructor(global) {
        this.global = global;
    }
    intercept(req, next) {
        // All HTTP requests are going to go through this method
        // We retrieve the token, if any
        let newHeaders = req.headers;
        if (this.global.token) {
            // If we have a token, we append it to our new headers
            newHeaders = newHeaders.append('Authorization', 'Bearer ' + this.global.token);
        }
        // Finally we have to clone our request with our new headers
        // This is required because HttpRequests are immutable
        const authReq = req.clone({ headers: newHeaders });
        // Then we return an Observable that will run the request
        // or pass it to the next interceptor if any
        return next.handle(authReq);
    }
}
HttpInterceptorService.ɵfac = function HttpInterceptorService_Factory(t) { return new (t || HttpInterceptorService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_global_model__WEBPACK_IMPORTED_MODULE_1__["Global"])); };
HttpInterceptorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: HttpInterceptorService, factory: HttpInterceptorService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HttpInterceptorService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _global_model__WEBPACK_IMPORTED_MODULE_1__["Global"] }]; }, null); })();


/***/ }),

/***/ "./src/Common/notification.service.ts":
/*!********************************************!*\
  !*** ./src/Common/notification.service.ts ***!
  \********************************************/
/*! exports provided: NotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
/* harmony import */ var _global_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.model */ "./src/Common/global.model.ts");




class NotificationService {
    constructor(global) {
        this.global = global;
        this.EventConnectionEstablished = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.EventGetAllPatients = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.EventCallPatient = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.EventCompletePatient = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.EventChatMessage = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.EventGetAllProviders = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.connectionIsEstablished = false;
    }
    GetAllPatients() {
        this._hubConnection.invoke("GetPatientAll")
            .catch(function (err) {
            console.log(err);
        });
    }
    CallPatient(callPatient) {
        console.log(callPatient);
        this._hubConnection.invoke('PatientCall', callPatient)
            .catch(function (err) {
            console.log(err);
        });
    }
    PatientAttended(attendPatient) {
        console.log(attendPatient);
        this._hubConnection.invoke('PatientAttended', attendPatient)
            .catch(function (err) {
            console.log(err);
        });
    }
    SendChatMessage(chatMessage) {
        this._hubConnection.invoke('SendChatMessage', chatMessage)
            .catch(err => {
            console.log(err);
        });
    }
    LoadActiveDoctors() {
        this._hubConnection.invoke('GetActiveProviders').catch(err => {
            console.log(err);
        });
    }
    Connect() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }
    createConnection() {
        this._hubConnection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_1__["HubConnectionBuilder"]()
            .withUrl(window.location.origin + '/NotificationHub?token=' + this.global.token)
            .build();
        this._hubConnection.serverTimeoutInMilliseconds = 500000; // 100 second
    }
    startConnection() {
        this._hubConnection
            .start()
            .then(() => {
            this.connectionIsEstablished = true;
            console.log('Hub connection started');
            this.EventConnectionEstablished.emit(true);
        })
            .catch(err => {
            console.log('Error while establishing connection, retrying...');
            setTimeout(function () { this.startConnection(); }, 5000000);
        });
        this._hubConnection.onclose(function (e) {
            alert('Connection Closed');
        });
    }
    registerOnServerEvents() {
        this._hubConnection.on('GetAllPatients', (data) => {
            var obj = JSON.parse(data);
            this.EventGetAllPatients.emit(obj);
        });
        this._hubConnection.on('CallPatient', (data) => {
            var obj = JSON.parse(data);
            this.EventCallPatient.emit(obj);
        });
        this._hubConnection.on('CompletePatient', (data) => {
            console.log('Complete Patient' + data);
            var obj = JSON.parse(data);
            this.EventCompletePatient.emit(obj);
        });
        this._hubConnection.on('ChatMessage', (data) => {
            // console.log('Message' + data);
            const msg = JSON.parse(data);
            this.EventChatMessage.emit(msg);
        });
        this._hubConnection.on('GetAllProviders', (data) => {
            const jsonData = JSON.parse(data);
            this.EventGetAllProviders.emit(jsonData);
        });
    }
}
NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_global_model__WEBPACK_IMPORTED_MODULE_2__["Global"])); };
NotificationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _global_model__WEBPACK_IMPORTED_MODULE_2__["Global"] }]; }, null); })();


/***/ }),

/***/ "./src/Common/safe.pipe.ts":
/*!*********************************!*\
  !*** ./src/Common/safe.pipe.ts ***!
  \*********************************/
/*! exports provided: SafePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe", function() { return SafePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");



class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
SafePipe.ɵfac = function SafePipe_Factory(t) { return new (t || SafePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"])); };
SafePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "safe", type: SafePipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SafePipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'safe'
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"] }]; }, null); })();


/***/ }),

/***/ "./src/Common/upload-download.service.ts":
/*!***********************************************!*\
  !*** ./src/Common/upload-download.service.ts ***!
  \***********************************************/
/*! exports provided: UploadDownloadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadDownloadService", function() { return UploadDownloadService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _global_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.model */ "./src/Common/global.model.ts");




class UploadDownloadService {
    constructor(httpClient, global) {
        this.httpClient = httpClient;
        this.global = global;
        //this.baseApiUrl=window.location.origin+window.location.pathname+this.global.ApiUrl;
        this.global.serverUrl = window.location.origin;
        this.DownloadUrl = this.global.serverUrl + '/upload/';
        this.apiUploadUrl = this.global.serverUrl + "/" + this.global.apiUrl + 'upload';
        // this.apiFileUrl = this.baseApiUrl +this.global.UploadUrl+ 'files';
        this.apiFileUrl = this.apiUploadUrl + '/files';
    }
    getFiles() {
        return this.httpClient.get(this.apiFileUrl);
    }
}
UploadDownloadService.ɵfac = function UploadDownloadService_Factory(t) { return new (t || UploadDownloadService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_global_model__WEBPACK_IMPORTED_MODULE_2__["Global"])); };
UploadDownloadService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UploadDownloadService, factory: UploadDownloadService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadDownloadService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _global_model__WEBPACK_IMPORTED_MODULE_2__["Global"] }]; }, null); })();


/***/ }),

/***/ "./src/Common/yes-no.pipe.ts":
/*!***********************************!*\
  !*** ./src/Common/yes-no.pipe.ts ***!
  \***********************************/
/*! exports provided: YesNoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YesNoPipe", function() { return YesNoPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class YesNoPipe {
    transform(value, ...args) {
        return (value == true) ? "Yes" : "No";
    }
}
YesNoPipe.ɵfac = function YesNoPipe_Factory(t) { return new (t || YesNoPipe)(); };
YesNoPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "yesNoPipe", type: YesNoPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](YesNoPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: "yesNoPipe"
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _security_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./security/login/login.component */ "./src/app/security/login/login.component.ts");
/* harmony import */ var _provider_provider_home_provider_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./provider/provider-home/provider-home.component */ "./src/app/provider/provider-home/provider-home.component.ts");
/* harmony import */ var _security_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./security/forgot-password/forgot-password.component */ "./src/app/security/forgot-password/forgot-password.component.ts");
/* harmony import */ var _patient_patient_waiting_room_patient_waiting_room_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./patient/patient-waiting-room/patient-waiting-room.component */ "./src/app/patient/patient-waiting-room/patient-waiting-room.component.ts");
/* harmony import */ var _provider_provider_room_provider_room_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./provider/provider-room/provider-room.component */ "./src/app/provider/provider-room/provider-room.component.ts");
/* harmony import */ var _patient_patient_room_patient_room_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./patient/patient-room/patient-room.component */ "./src/app/patient/patient-room/patient-room.component.ts");
/* harmony import */ var _patient_patient_report_summary_patient_report_summary_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./patient/patient-report-summary/patient-report-summary.component */ "./src/app/patient/patient-report-summary/patient-report-summary.component.ts");
/* harmony import */ var _patient_patient_registation_patient_registration_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./patient/patient-registation/patient-registration.component */ "./src/app/patient/patient-registation/patient-registration.component.ts");
/* harmony import */ var _patient_patient_upload_files_patient_upload_files_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./patient/patient-upload-files/patient-upload-files.component */ "./src/app/patient/patient-upload-files/patient-upload-files.component.ts");
/* harmony import */ var _provider_provider_room_tokbox_provider_room_tokbox_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./provider/provider-room-tokbox/provider-room-tokbox.component */ "./src/app/provider/provider-room-tokbox/provider-room-tokbox.component.ts");
/* harmony import */ var _patient_patient_room_tokbox_patient_room_tokbox_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./patient/patient-room-tokbox/patient-room-tokbox.component */ "./src/app/patient/patient-room-tokbox/patient-room-tokbox.component.ts");















console.log(window.location);
const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Login' },
    { path: 'Login', component: _security_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'ForgotPassword', component: _security_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"] },
    { path: 'Home', component: _provider_provider_home_provider_home_component__WEBPACK_IMPORTED_MODULE_3__["ProviderHomeComponent"] },
    { path: 'Join', component: _patient_patient_registation_patient_registration_component__WEBPACK_IMPORTED_MODULE_9__["PatientRegistrationComponent"] },
    { path: 'Waiting', component: _patient_patient_waiting_room_patient_waiting_room_component__WEBPACK_IMPORTED_MODULE_5__["PatientWaitingRoomComponent"] },
    { path: 'ProviderRoom', component: _provider_provider_room_provider_room_component__WEBPACK_IMPORTED_MODULE_6__["ProviderRoomComponent"] },
    { path: 'ReportSummary', component: _patient_patient_report_summary_patient_report_summary_component__WEBPACK_IMPORTED_MODULE_8__["PatientReportSummaryComponent"] },
    { path: 'PatientRoom', component: _patient_patient_room_patient_room_component__WEBPACK_IMPORTED_MODULE_7__["PatientRoomComponent"] },
    { path: 'Upload', component: _patient_patient_upload_files_patient_upload_files_component__WEBPACK_IMPORTED_MODULE_10__["PatientUploadFilesComponent"] },
    { path: 'ProviderRoomTokbox', component: _provider_provider_room_tokbox_provider_room_tokbox_component__WEBPACK_IMPORTED_MODULE_11__["ProviderRoomTokboxComponent"] },
    { path: 'PatientRoomTokbox', component: _patient_patient_room_tokbox_patient_room_tokbox_component__WEBPACK_IMPORTED_MODULE_12__["PatientRoomTokboxComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
    constructor() {
    }
    ngOnInit() {
        window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = "\o/";
            console.log("cond");
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _security_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./security/login/login.component */ "./src/app/security/login/login.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var src_Common_config_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/Common/config.service */ "./src/Common/config.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var src_Common_http_interceptor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/Common/http-interceptor.service */ "./src/Common/http-interceptor.service.ts");
/* harmony import */ var _provider_provider_home_provider_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./provider/provider-home/provider-home.component */ "./src/app/provider/provider-home/provider-home.component.ts");
/* harmony import */ var _security_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./security/forgot-password/forgot-password.component */ "./src/app/security/forgot-password/forgot-password.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _provider_provider_room_provider_room_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./provider/provider-room/provider-room.component */ "./src/app/provider/provider-room/provider-room.component.ts");
/* harmony import */ var _patient_patient_room_patient_room_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./patient/patient-room/patient-room.component */ "./src/app/patient/patient-room/patient-room.component.ts");
/* harmony import */ var _patient_patient_registation_patient_registration_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./patient/patient-registation/patient-registration.component */ "./src/app/patient/patient-registation/patient-registration.component.ts");
/* harmony import */ var src_Common_yes_no_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/Common/yes-no.pipe */ "./src/Common/yes-no.pipe.ts");
/* harmony import */ var _patient_patient_report_summary_patient_report_summary_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./patient/patient-report-summary/patient-report-summary.component */ "./src/app/patient/patient-report-summary/patient-report-summary.component.ts");
/* harmony import */ var src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/Common/safe.pipe */ "./src/Common/safe.pipe.ts");
/* harmony import */ var _patient_patient_waiting_room_patient_waiting_room_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./patient/patient-waiting-room/patient-waiting-room.component */ "./src/app/patient/patient-waiting-room/patient-waiting-room.component.ts");
/* harmony import */ var _patient_patient_upload_files_patient_upload_files_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./patient/patient-upload-files/patient-upload-files.component */ "./src/app/patient/patient-upload-files/patient-upload-files.component.ts");
/* harmony import */ var src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! src/Common/upload-download.service */ "./src/Common/upload-download.service.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/__ivy_ngcc__/fesm2015/ngx-print.js");
/* harmony import */ var ckeditor4_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ckeditor4-angular */ "./node_modules/ckeditor4-angular/__ivy_ngcc__/fesm2015/ckeditor4-angular.js");
/* harmony import */ var _provider_provider_room_tokbox_provider_room_tokbox_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./provider/provider-room-tokbox/provider-room-tokbox.component */ "./src/app/provider/provider-room-tokbox/provider-room-tokbox.component.ts");
/* harmony import */ var _patient_patient_room_tokbox_patient_room_tokbox_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./patient/patient-room-tokbox/patient-room-tokbox.component */ "./src/app/patient/patient-room-tokbox/patient-room-tokbox.component.ts");




























// gets the path of the currently type URL
// var p=window.location.hash.split('/',3);
// var s='/'+p[1]+'/'+p[2]+'/';
// console.log(p);
// window['base-href'] =s;
const initializerConfigFn = (config) => {
    return () => {
        var ret = config.loadAppConfig();
        return ret;
    };
};
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_21__["UploadDownloadService"],
        {
            provide: _angular_common__WEBPACK_IMPORTED_MODULE_5__["APP_BASE_HREF"],
            useValue: window['base-href'] // from base href we set it to app
        },
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
            useFactory: initializerConfigFn,
            multi: true,
            deps: [src_Common_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"]],
        },
        src_Common_global_model__WEBPACK_IMPORTED_MODULE_8__["Global"],
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: src_Common_http_interceptor_service__WEBPACK_IMPORTED_MODULE_9__["HttpInterceptorService"], multi: true }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ReactiveFormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
            ngx_print__WEBPACK_IMPORTED_MODULE_23__["NgxPrintModule"],
            ckeditor4_angular__WEBPACK_IMPORTED_MODULE_24__["CKEditorModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _security_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
        _security_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_11__["ForgotPasswordComponent"],
        _provider_provider_home_provider_home_component__WEBPACK_IMPORTED_MODULE_10__["ProviderHomeComponent"],
        _provider_provider_room_provider_room_component__WEBPACK_IMPORTED_MODULE_13__["ProviderRoomComponent"],
        _patient_patient_registation_patient_registration_component__WEBPACK_IMPORTED_MODULE_15__["PatientRegistrationComponent"],
        _patient_patient_room_patient_room_component__WEBPACK_IMPORTED_MODULE_14__["PatientRoomComponent"],
        _patient_patient_report_summary_patient_report_summary_component__WEBPACK_IMPORTED_MODULE_17__["PatientReportSummaryComponent"],
        _patient_patient_waiting_room_patient_waiting_room_component__WEBPACK_IMPORTED_MODULE_19__["PatientWaitingRoomComponent"],
        _patient_patient_upload_files_patient_upload_files_component__WEBPACK_IMPORTED_MODULE_20__["PatientUploadFilesComponent"],
        _provider_provider_room_tokbox_provider_room_tokbox_component__WEBPACK_IMPORTED_MODULE_25__["ProviderRoomTokboxComponent"],
        _patient_patient_room_tokbox_patient_room_tokbox_component__WEBPACK_IMPORTED_MODULE_26__["PatientRoomTokboxComponent"],
        src_Common_yes_no_pipe__WEBPACK_IMPORTED_MODULE_16__["YesNoPipe"],
        src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_18__["SafePipe"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ReactiveFormsModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
        ngx_print__WEBPACK_IMPORTED_MODULE_23__["NgxPrintModule"],
        ckeditor4_angular__WEBPACK_IMPORTED_MODULE_24__["CKEditorModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _security_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
                    _security_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_11__["ForgotPasswordComponent"],
                    _provider_provider_home_provider_home_component__WEBPACK_IMPORTED_MODULE_10__["ProviderHomeComponent"],
                    _provider_provider_room_provider_room_component__WEBPACK_IMPORTED_MODULE_13__["ProviderRoomComponent"],
                    _patient_patient_registation_patient_registration_component__WEBPACK_IMPORTED_MODULE_15__["PatientRegistrationComponent"],
                    _patient_patient_room_patient_room_component__WEBPACK_IMPORTED_MODULE_14__["PatientRoomComponent"],
                    _patient_patient_report_summary_patient_report_summary_component__WEBPACK_IMPORTED_MODULE_17__["PatientReportSummaryComponent"],
                    _patient_patient_waiting_room_patient_waiting_room_component__WEBPACK_IMPORTED_MODULE_19__["PatientWaitingRoomComponent"],
                    _patient_patient_upload_files_patient_upload_files_component__WEBPACK_IMPORTED_MODULE_20__["PatientUploadFilesComponent"],
                    _provider_provider_room_tokbox_provider_room_tokbox_component__WEBPACK_IMPORTED_MODULE_25__["ProviderRoomTokboxComponent"],
                    _patient_patient_room_tokbox_patient_room_tokbox_component__WEBPACK_IMPORTED_MODULE_26__["PatientRoomTokboxComponent"],
                    src_Common_yes_no_pipe__WEBPACK_IMPORTED_MODULE_16__["YesNoPipe"],
                    src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_18__["SafePipe"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ReactiveFormsModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
                    ngx_print__WEBPACK_IMPORTED_MODULE_23__["NgxPrintModule"],
                    ckeditor4_angular__WEBPACK_IMPORTED_MODULE_24__["CKEditorModule"]
                ],
                providers: [
                    src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_21__["UploadDownloadService"],
                    {
                        provide: _angular_common__WEBPACK_IMPORTED_MODULE_5__["APP_BASE_HREF"],
                        useValue: window['base-href'] // from base href we set it to app
                    },
                    {
                        provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
                        useFactory: initializerConfigFn,
                        multi: true,
                        deps: [src_Common_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"]],
                    },
                    src_Common_global_model__WEBPACK_IMPORTED_MODULE_8__["Global"],
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: src_Common_http_interceptor_service__WEBPACK_IMPORTED_MODULE_9__["HttpInterceptorService"], multi: true }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/patient/patient-registation/patient-registration.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/patient/patient-registation/patient-registration.component.ts ***!
  \*******************************************************************************/
/*! exports provided: PatientRegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientRegistrationComponent", function() { return PatientRegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");








class PatientRegistrationComponent {
    constructor(httpClient, routing, global, formBuilder, notificationService, route) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.route = route;
        this.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_1__["Patient"]();
        this.providers = new Array();
    }
    ngOnInit() {
        this.state = history.state;
    }
    LoginPatient() {
        var splitted = window.location.pathname.split("/", 3);
        console.log(splitted);
        this.patientObj.url = splitted[2];
        this.global.practiceObj.url = splitted[1];
        this.httpClient.
            post(this.global.practiceUrl + "LoginPatient", this.patientObj)
            .subscribe(res => {
            this.global.token = res.Value.Token;
            this.global.isProvider = false;
            this.global.isPatient = true;
            this.global.patientObj.name = res.Value.User.name;
            sessionStorage.setItem('PatientName', this.global.patientObj.name);
            this.global.patientObj = res.Value.User;
            this.global.patientObj.patientId = res.Value.patientId;
            this.global.patientObj.name = res.Value.name;
            // this.global.patientObj.url = res.Value.User.url;
            this.routing.navigateByUrl('/Waiting', { state: this.global });
        }, res => {
            alert('User Already logged in');
        });
    }
}
PatientRegistrationComponent.ɵfac = function PatientRegistrationComponent_Factory(t) { return new (t || PatientRegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_4__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"])); };
PatientRegistrationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientRegistrationComponent, selectors: [["ng-component"]], decls: 36, vars: 1, consts: [["id", "page-top"], ["id", "wrapper"], ["id", "content-wrapper", 1, "d-flex", "flex-column"], ["id", "content"], [1, "navbar", "navbar-expand", "navbar-light", "bg-white", "topbar", "mb-4", "static-top", "shadow"], ["id", "sidebarToggleTop", 1, "btn", "btn-link", "d-md-none", "rounded-circle", "mr-3"], [1, "fa", "fa-bars"], ["href", "index.html", 1, "sidebar-brand", "d-flex", "align-items-center", "justify-content-center"], [1, "sidebar-brand-text", "mx-3"], ["src", "/img/logo.png", "alt", ""], [1, "container-fluid"], [1, "row", "m-w100"], [1, "col-md-5", "col-sm-12", "col-xs-12", "m-auto", "text-center"], [1, "mt-4"], [1, "d-block", "mt-1", "mb-4", 2, "font-size", "13px"], [1, "fa", "fa-info-circle"], [1, "card"], [1, "card-body", "pt-5", "pb-5"], ["action", "", 1, "user"], ["type", "text", "placeholder", "Enter Your Name", "name", "name", 1, "form-control", "post-invitation", 3, "ngModel", "ngModelChange"], [1, "custom-control", "custom-checkbox", "mt-4"], ["type", "checkbox", "id", "customCheck", "checked", "", 1, "custom-control-input"], ["for", "customCheck", 1, "custom-control-label", "font-weight-normal"], ["href", ""], ["type", "submit", "href", "javascrpt:;", 1, "btn", "btn-primary", "d-inline", "mt-5", 2, "width", "150px", 3, "click"], [1, "sticky-footer", "bg-transparent"], [1, "container", "my-auto"], [1, "copyright", "text-center", "my-auto"], [1, "text-black"], ["src", "/img/logo-cap.png", 1, "powered-footer-logo", "d-block"]], template: function PatientRegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nav", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h3", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Welcome");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Please check in here to join your doctor if you consent for this secure video visit.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "form", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PatientRegistrationComponent_Template_input_ngModelChange_21_listener($event) { return ctx.patientObj.name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "By clicking you will accept our ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Terms and Conditions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PatientRegistrationComponent_Template_button_click_28_listener() { return ctx.LoginPatient(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Check In");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "footer", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "span", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Powered by \u00A9 Danphe Telehealth 2020 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.patientObj.name);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatientRegistrationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './patient-registration.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_4__["Global"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] }, { type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "./src/app/patient/patient-report-summary/patient-report-summary.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/patient/patient-report-summary/patient-report-summary.component.ts ***!
  \************************************************************************************/
/*! exports provided: PatientReportSummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientReportSummaryComponent", function() { return PatientReportSummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var ngx_print__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-print */ "./node_modules/ngx-print/__ivy_ngcc__/fesm2015/ngx-print.js");
/* harmony import */ var src_Common_yes_no_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Common/yes-no.pipe */ "./src/Common/yes-no.pipe.ts");







class PatientReportSummaryComponent {
    constructor(httpClient, routing, global) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
        this.patientObj = null;
        this.routing.navigate([], { queryParams: { ProviderId: this.global.patientObj.url },
            queryParamsHandling: "preserve"
        });
    }
    SuccessTestDone(res) {
        this.patientObj = res;
        alert(res);
    }
}
PatientReportSummaryComponent.ɵfac = function PatientReportSummaryComponent_Factory(t) { return new (t || PatientReportSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__["Global"])); };
PatientReportSummaryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientReportSummaryComponent, selectors: [["ng-component"]], decls: 79, vars: 13, consts: [["id", "page-top"], ["id", "wrapper"], ["id", "content-wrapper", 1, "d-flex", "flex-column"], ["id", "content"], [1, "navbar", "navbar-expand", "navbar-light", "bg-white", "topbar", "mb-4", "static-top", "shadow"], ["id", "sidebarToggleTop", 1, "btn", "btn-link", "d-md-none", "rounded-circle", "mr-3"], [1, "fa", "fa-bars"], ["href", "index.html", 1, "sidebar-brand", "d-flex", "align-items-center", "justify-content-center"], [1, "sidebar-brand-text", "mx-3"], ["src", "img/logo.png", "alt", ""], [1, "navbar-nav", "ml-auto"], [1, "topbar-divider", "d-none", "d-sm-block"], [1, "nav-item", "dropdown", "no-arrow"], [1, "container-fluid"], ["id", "print-section", 1, "row", "m-w100"], [1, "col-md-12", "col-sm-12", "col-xs-12"], [1, "card"], [1, "card-body"], [2, "width", "100%", "text-align", "center", "margin", "45px 0", "font-size", "13px", "font-family", "Verdana"], ["src", "/img/logo.png", 2, "height", "80px"], [2, "margin-top", "15px", "margin-bottom", "5px"], [2, "display", "block", "margin-top", "15px"], [2, "margin-top", "5px", "margin-bottom", "15px"], [2, "display", "block"], [2, "display", "block", "margin-top", "5px"], [2, "border", "1px solid #000", "font-family", "Verdana", "font-size", "13px", "width", "100%", "border-collapse", "inherit !important"], [2, "border", "1px solid #fff"], [2, "padding", "8px"], [2, "border", "1px solid #fff", "border-bottom", "none"], [2, "border", "1px solid #fff", "border-top", "none"], [2, "padding", "8px", "padding-top", "0"], [1, "row"], [1, "col-md-12", "text-center", "mt-4", "mb-4"], ["href", "javascript:;", 1, "btn", "btn-primary"], ["printSectionId", "print-section", "ngxPrint", "", 1, "btn", "btn-primary", 3, "useExistingCss"]], template: function PatientReportSummaryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nav", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ul", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "li", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "table", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "h3", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "span", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "John Doe International Hospital");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h5", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Hospital Address two");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Phone No. *********, Fax: **********");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "table", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "After Visit Summary Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "table", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "tr", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Lab Orders Sent:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](44, "yesNoPipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "tr", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "New prescriptions sent to your pharmacy:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](50, "yesNoPipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "tr", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "New prescriptions mailed to you:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](56, "yesNoPipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "tr", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Advice");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "tr", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "td", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "td", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Follow up in:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "a", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "\u00A0\u00A0\u00A0\u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "button", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](44, 7, ctx.patientObj == null ? null : ctx.patientObj.labOrdersSent));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](50, 9, ctx.patientObj == null ? null : ctx.patientObj.newPrescriptionsSentToYourPharmacy), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](56, 11, ctx.patientObj == null ? null : ctx.patientObj.newPrescriptionsMailedToYou));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.patientObj == null ? null : ctx.patientObj.medication);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.patientObj == null ? null : ctx.patientObj.followUpNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.patientObj == null ? null : ctx.patientObj.followUpMeasure, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("useExistingCss", true);
    } }, directives: [ngx_print__WEBPACK_IMPORTED_MODULE_4__["NgxPrintDirective"]], pipes: [src_Common_yes_no_pipe__WEBPACK_IMPORTED_MODULE_5__["YesNoPipe"]], styles: ["table[_ngcontent-%COMP%]{\n                        font-family: 'Verdana';\n                      }\n                      @media Print{\n                        table[_ngcontent-%COMP%]{\n                          font-family: 'Verdana';\n                        }\n                      }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatientReportSummaryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './patient-report-summary.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__["Global"] }]; }, null); })();


/***/ }),

/***/ "./src/app/patient/patient-room-tokbox/patient-room-tokbox.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/patient/patient-room-tokbox/patient-room-tokbox.component.ts ***!
  \******************************************************************************/
/*! exports provided: PatientRoomTokboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientRoomTokboxComponent", function() { return PatientRoomTokboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/Common/safe.pipe */ "./src/Common/safe.pipe.ts");












const _c0 = ["scrollBtm"];
function PatientRoomTokboxComponent_img_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 46);
} if (rf & 2) {
    const ctx_r4548 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r4548.Transform(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function PatientRoomTokboxComponent_img_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 47);
} }
function PatientRoomTokboxComponent_option_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const provider_r4554 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", provider_r4554.userName, " ");
} }
function PatientRoomTokboxComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4551 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4551.global.isProvider ? "Patient" : "Provider", " is required ");
} }
function PatientRoomTokboxComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 49, 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const msg_r4555 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r4555.name, " :-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r4555.message, " ");
} }
function PatientRoomTokboxComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Chat message is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c1 = function () { return ["/Upload"]; };
class PatientRoomTokboxComponent {
    constructor(notificationService, global, routing, formBuilder, cdr, sanitizer, httpClient) {
        this.notificationService = notificationService;
        this.global = global;
        this.routing = routing;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.httpClient = httpClient;
        this.showChat = false;
        this.providers = new Array();
        this.providerObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__["Provider"]();
        this.ChatMessages = new Array();
        this.ChatReceivedMessages = new Array();
        this.AllUserChats = {};
        this.initForm();
        this.providerObj = this.global.providerObj;
        this.notificationService.EventCompletePatient
            .subscribe(_patient => {
            this.global.patientObj = _patient;
            this.SuccessTestDone(_patient);
        });
        this.notificationService.EventChatMessage.subscribe(chatData => {
            if (this.ChatForm.controls['selUser'].value != chatData.name) {
                this.ChatForm.controls['selUser'].setValue(chatData.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: chatData.name, message: chatData.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            this.pushChatMsgUserwise(chatData.name, chatMsg);
            this.cdr.detectChanges();
            //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });
        this.notificationService.EventConnectionEstablished.subscribe(() => {
            this.notificationService.LoadActiveDoctors();
        });
        this.notificationService.EventGetAllProviders.subscribe(_providers => {
            this.providers = _providers;
            if (this.global.providerObj.image) {
                this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
            }
            // console.log(this.doctors);
        });
        this.state = history.state;
        // gets doctor list
        // this.notificationService.LoadActiveDoctors();
    }
    Transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
    }
    ngOnInit() {
        this.state = history.state;
    }
    initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            chatMessage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.touched;
    }
    SuccessTestDone(res) {
        this.global.patientObj = res;
        this.routing.navigate(['ReportSummary']);
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }
            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.notificationService.SendChatMessage(chatMsg);
                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
                this.cdr.detectChanges();
                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
            }
        }
        catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
                //this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
            }
            else {
                this.ChatMessages = new Array();
                //this.ChatReceivedMessages=new Array<any>();
            }
        }
        catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        }
        catch (e) { }
    }
    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
    }
    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array();
            }
            this.AllUserChats[user].push(messageObj);
        }
        catch (e) { }
    }
}
PatientRoomTokboxComponent.ɵfac = function PatientRoomTokboxComponent_Factory(t) { return new (t || PatientRoomTokboxComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_4__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"])); };
PatientRoomTokboxComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientRoomTokboxComponent, selectors: [["ng-component"]], viewQuery: function PatientRoomTokboxComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.scrollBottom = _t.first);
    } }, decls: 62, vars: 16, consts: [["id", "page-top"], [1, "row", "m-w100"], [1, "col-md-9", "col-sm-12", "col-xs-12", "p-0"], [1, "video-frame"], ["width", "560", "height", "315", "frameborder", "0", "allow", "microphone; camera", "allowfullscreen", "", 3, "src"], [1, "col-md-3", "col-sm-12", "col-xs-12", "p-0", "right-panel"], [1, "my-doc"], ["class", "img-profile rounded-circle", "width", "25%", 3, "src", 4, "ngIf"], ["src", "/img/doc.svg", "alt", "", "class", "doc-img-p", 4, "ngIf"], [1, "mt-4"], [1, "d-block", "mt-2"], [1, "fa", "fa-user-md"], [1, ""], [1, "fa", "fa-hospital-o"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "open"], [1, "card-header", "accordionItemHeading", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between", "br-0"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-comments"], [1, "card-body", "p-0", "accordionItemContent"], [1, "chatbox-holder"], [1, "chatbox"], [3, "formGroup"], [1, "chat-messages"], ["for", "selPatient", 2, "float", "left"], ["id", "selPatient", "formControlName", "selUser", 2, "float", "left", 3, "change"], ["disabled", "", "value", "null"], [4, "ngFor", "ngForOf"], ["style", "color: red;display: inline;", 4, "ngIf"], ["class", "message-box-holder", 4, "ngFor", "ngForOf"], [1, "chat-input-holder"], ["placeholder", "Type your message here..", "formControlName", "chatMessage", 1, "chat-input", 3, "keyup"], ["style", "color: red;", 4, "ngIf"], ["type", "button", "value", "Send", 1, "message-send", "btn-primary", 3, "click"], ["id", "myModalpdf", "role", "dialog", 1, "modal", "fade", "uploads"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["type", "button", "data-dismiss", "modal", 1, "close"], [1, "modal-body"], ["src", "/img/Telemedicine.pdf", "target", "_blank"], ["id", "myModalimg", "role", "dialog", 1, "modal", "fade", "uploads"], ["src", "/img/1.jpg", "alt", ""], [1, "drop"], [1, "cont"], [1, "desc"], [1, "btn", "btn-sm", "btn-primary", 3, "routerLink"], ["width", "25%", 1, "img-profile", "rounded-circle", 3, "src"], ["src", "/img/doc.svg", "alt", "", 1, "doc-img-p"], [2, "color", "red", "display", "inline"], [1, "message-box-holder"], ["scrollBtm", ""], [1, "message-sender"], [2, "color", "red"]], template: function PatientRoomTokboxComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "iframe", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "safe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, PatientRoomTokboxComponent_img_8_Template, 1, 1, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, PatientRoomTokboxComponent_img_9_Template, 1, 0, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h5", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "form", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Provider: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "select", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PatientRoomTokboxComponent_Template_select_change_30_listener() { return ctx.OnChatUserChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Select Provider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, PatientRoomTokboxComponent_option_33_Template, 2, 1, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, PatientRoomTokboxComponent_div_34_Template, 2, 1, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, PatientRoomTokboxComponent_div_35_Template, 6, 2, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "textarea", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function PatientRoomTokboxComponent_Template_textarea_keyup_37_listener($event) { return ctx.onChatEnter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, PatientRoomTokboxComponent_div_38_Template, 2, 0, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PatientRoomTokboxComponent_Template_input_click_39_listener() { return ctx.SendChatMsg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "embed", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "button", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "img", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, " your files to Assets, or ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " click here to browse ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 13, ctx.global.config.videourl), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeResourceUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.retrievedImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.retrievedImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.providerObj.nameTitle, " \u00A0\u00A0", ctx.providerObj.name, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.providerObj.designation, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.providerObj.clinic, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.ChatForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.providers);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "selUser") && ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ChatMessages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "chatMessage"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c1));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"]], pipes: [src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_9__["SafePipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatientRoomTokboxComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './patient-room-tokbox.component.html'
            }]
    }], function () { return [{ type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_4__["Global"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"] }]; }, { scrollBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['scrollBtm', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/patient/patient-room/patient-room.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/patient/patient-room/patient-room.component.ts ***!
  \****************************************************************/
/*! exports provided: PatientRoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientRoomComponent", function() { return PatientRoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_vendor_jitsi_external_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/vendor/jitsi/external_api.js */ "./src/vendor/jitsi/external_api.js");
/* harmony import */ var src_vendor_jitsi_external_api_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(src_vendor_jitsi_external_api_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");












const _c0 = ["scrollBtm"];
function PatientRoomComponent_img_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 46);
} if (rf & 2) {
    const ctx_r5953 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r5953.Transform(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function PatientRoomComponent_img_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 47);
} }
function PatientRoomComponent_option_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const provider_r5959 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", provider_r5959.userName, " ");
} }
function PatientRoomComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5956 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5956.global.isProvider ? "Patient" : "Provider", " is required ");
} }
function PatientRoomComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 49, 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const msg_r5960 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5960.name, " :-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5960.message, " ");
} }
function PatientRoomComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Chat message is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c1 = function () { return ["/Upload"]; };
class PatientRoomComponent {
    constructor(notificationService, global, routing, formBuilder, cdr, sanitizer, httpClient) {
        this.notificationService = notificationService;
        this.global = global;
        this.routing = routing;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.httpClient = httpClient;
        this.showChat = false;
        this.providers = new Array();
        this.ChatMessages = new Array();
        this.ChatReceivedMessages = new Array();
        this.AllUserChats = {};
        this.providerObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Provider"]();
        this.initForm();
        this.providerObj = this.global.providerObj;
        this.notificationService.EventCompletePatient
            .subscribe(_patient => {
            this.global.patientObj = _patient;
            this.SuccessTestDone(_patient);
        });
        this.notificationService.EventChatMessage.subscribe(chatData => {
            if (this.ChatForm.controls['selUser'].value != chatData.name) {
                this.ChatForm.controls['selUser'].setValue(chatData.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: chatData.name, message: chatData.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            this.pushChatMsgUserwise(chatData.name, chatMsg);
            this.cdr.detectChanges();
            //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });
        this.notificationService.EventConnectionEstablished.subscribe(() => {
            this.notificationService.LoadActiveDoctors();
        });
        this.notificationService.EventGetAllProviders.subscribe(_providers => {
            this.providers = _providers;
            // this.doctorObj=_doctors[0];
            // this.global.providerObj=_providers[0];
            if (this.global.providerObj.image) {
                this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
            }
            // console.log(this.doctors);
        });
        if (this.global.providerObj.image) {
            this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
        }
        // gets doctor list
        // this.notificationService.LoadActiveDoctors();
    }
    Transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
    }
    ngOnInit() {
        this.state = history.state;
        this.domain = "meet.jit.si";
        this.options = {
            roomName: this.global.providerObj.roomName,
            width: 950,
            height: 570,
            parentNode: document.querySelector('#meet'),
            configOverwrite: {
                doNotStoreRoom: true,
                disableInviteFunctions: true,
                startWithVideoMuted: true,
                startWithAudioMuted: true,
                disableRemoteMute: true,
                enableWelcomePage: false,
                prejoinPageEnabled: false,
                remoteVideoMenu: {
                    // If set to true the 'Kick out' button will be disabled.
                    disableKick: true
                }
            },
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
                DEFAULT_REMOTE_DISPLAY_NAME: this.global.providerObj.nameTitle + " " + this.global.providerObj.name,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview']
            }
        };
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    }
    initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            chatMessage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.touched;
    }
    SuccessTestDone(res) {
        this.global.patientObj = res;
        this.routing.navigate(['ReportSummary']);
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }
            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.notificationService.SendChatMessage(chatMsg);
                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
                this.cdr.detectChanges();
                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
            }
        }
        catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
                //this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
            }
            else {
                this.ChatMessages = new Array();
                //this.ChatReceivedMessages=new Array<any>();
            }
        }
        catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        }
        catch (e) { }
    }
    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
    }
    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array();
            }
            this.AllUserChats[user].push(messageObj);
        }
        catch (e) { }
    }
}
PatientRoomComponent.ɵfac = function PatientRoomComponent_Factory(t) { return new (t || PatientRoomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_5__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"])); };
PatientRoomComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientRoomComponent, selectors: [["ng-component"]], viewQuery: function PatientRoomComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.scrollBottom = _t.first);
    } }, decls: 61, vars: 13, consts: [["id", "page-top"], [1, "row", "m-w100"], [1, "col-md-9", "col-sm-12", "col-xs-12", "p-0"], [1, "video-frame", 2, "padding", "3%"], ["id", "meet"], [1, "col-md-3", "col-sm-12", "col-xs-12", "p-0", "right-panel"], [1, "my-doc"], ["class", "img-profile rounded-circle", "width", "25%;", 3, "src", 4, "ngIf"], ["src", "/img/doc.svg", "alt", "", "class", "doc-img-p", 4, "ngIf"], [1, "mt-4"], [1, "d-block", "mt-2"], [1, "fa", "fa-user-md"], [1, ""], [1, "fa", "fa-hospital-o"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "open"], [1, "card-header", "accordionItemHeading", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between", "br-0"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-comments"], [1, "card-body", "p-0", "accordionItemContent"], [1, "chatbox-holder"], [1, "chatbox"], [3, "formGroup"], [1, "chat-messages"], ["for", "selPatient", 2, "float", "left"], ["id", "selPatient", "formControlName", "selUser", 2, "float", "left", 3, "change"], ["disabled", "", "value", "null"], [4, "ngFor", "ngForOf"], ["style", "color: red;display: inline;", 4, "ngIf"], ["class", "message-box-holder", 4, "ngFor", "ngForOf"], [1, "chat-input-holder"], ["placeholder", "Type your message here..", "formControlName", "chatMessage", 1, "chat-input", 3, "keyup"], ["style", "color: red;", 4, "ngIf"], ["type", "button", "value", "Send", 1, "message-send", "btn-primary", 3, "click"], ["id", "myModalpdf", "role", "dialog", 1, "modal", "fade", "uploads"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["type", "button", "data-dismiss", "modal", 1, "close"], [1, "modal-body"], ["src", "/img/Telemedicine.pdf", "target", "_blank"], ["id", "myModalimg", "role", "dialog", 1, "modal", "fade", "uploads"], ["src", "/img/1.jpg", "alt", ""], [1, "drop"], [1, "cont"], [1, "desc"], [1, "btn", "btn-sm", "btn-primary", 3, "routerLink"], ["width", "25%;", 1, "img-profile", "rounded-circle", 3, "src"], ["src", "/img/doc.svg", "alt", "", 1, "doc-img-p"], [2, "color", "red", "display", "inline"], [1, "message-box-holder"], ["scrollBtm", ""], [1, "message-sender"], [2, "color", "red"]], template: function PatientRoomComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, PatientRoomComponent_img_7_Template, 1, 1, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, PatientRoomComponent_img_8_Template, 1, 0, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h5", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h6", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "form", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Provider: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "select", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PatientRoomComponent_Template_select_change_29_listener() { return ctx.OnChatUserChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Select Provider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, PatientRoomComponent_option_32_Template, 2, 1, "option", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, PatientRoomComponent_div_33_Template, 2, 1, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, PatientRoomComponent_div_34_Template, 6, 2, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "textarea", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function PatientRoomComponent_Template_textarea_keyup_36_listener($event) { return ctx.onChatEnter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, PatientRoomComponent_div_37_Template, 2, 0, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PatientRoomComponent_Template_input_click_38_listener() { return ctx.SendChatMsg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "embed", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "button", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "img", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, " your files to Assets, or ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, " click here to browse ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.retrievedImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.retrievedImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.providerObj.nameTitle, " \u00A0\u00A0", ctx.providerObj.name, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.providerObj.designation, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.providerObj.clinic, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.ChatForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.providers);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "selUser") && ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ChatMessages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "chatMessage"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c1));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatientRoomComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './patient-room.component.html'
            }]
    }], function () { return [{ type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_5__["Global"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }]; }, { scrollBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['scrollBtm', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/patient/patient-upload-files/patient-upload-files.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/patient/patient-upload-files/patient-upload-files.component.ts ***!
  \********************************************************************************/
/*! exports provided: PatientUploadFilesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientUploadFilesComponent", function() { return PatientUploadFilesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/Common/upload-download.service */ "./src/Common/upload-download.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");









function PatientUploadFilesComponent_span_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r139 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r139.progress, "% ");
} }
function PatientUploadFilesComponent_span_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r140 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r140.message, " ");
} }
function PatientUploadFilesComponent_tr_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const temp_r142 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](temp_r142.filename);
} }
class PatientUploadFilesComponent {
    constructor(http, service, global, routing) {
        this.http = http;
        this.service = service;
        this.global = global;
        this.routing = routing;
        this.uploadStatus = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.patients = new Array();
        this.docArray = [];
        this.tokbox = 'tokbox';
        this.uploadFile = (files) => {
            if (files.length === 0) {
                return;
            }
            let filesToUpload = files;
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
                .subscribe(event => {
                if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress) {
                    this.progress = Math.round(100 * event.loaded / event.total);
                }
                else if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response) {
                    for (var i = 0; i < Object.keys(event.body).length; i++) {
                        this.FileName = Object.values(event.body)[i].replace(/^.*[\\\/]/, '');
                        this.docArray[i] = {
                            filename: this.FileName,
                            filepath: Object.values(event.body)[i]
                        };
                    }
                    this.message = 'Upload success.';
                }
            });
        };
        this.uploadStatus = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.routing.navigate([], { queryParams: { Practice: this.global.practiceObj.url },
            queryParamsHandling: "merge"
        });
        this.state = history.state;
    }
    backToCall() {
        if (this.global.patientObj.callingPlatform == this.tokbox) {
            this.routing.navigateByUrl('/PatientRoomTokbox', { state: this.global });
        }
        else {
            this.routing.navigateByUrl('/PatientRoom', { state: this.global });
        }
    }
}
PatientUploadFilesComponent.ɵfac = function PatientUploadFilesComponent_Factory(t) { return new (t || PatientUploadFilesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_2__["UploadDownloadService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
PatientUploadFilesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientUploadFilesComponent, selectors: [["ng-component"]], decls: 47, vars: 3, consts: [[1, "container"], [1, "row", "justify-content-center"], [1, "col-xl-10", "col-lg-12", "col-md-9"], [1, "card", "o-hidden", "border-0", "shadow-lg", "my-5"], [1, "card-body", "p-0"], [1, "row"], [1, "d-flex", "col-lg-6", "d-none", "d-lg-block", "bg-light"], [1, "align-self-stretch", "login-left"], [1, "my-3"], [1, "p-5"], [1, "text-center"], [1, "h3", "text-gray-700", "mb-4", "heading-text"], [1, "h6", "d-block", "mt-2"], [1, "user"], ["name", "inputfile", "type", "file", "placeholder", "Choose file", "multiple", "", 2, "display", "none", 3, "change"], ["file", ""], ["type", "button", 1, "btn", "btn-primary", "btn-user", "btn-block", 3, "click"], [1, "col-md-4"], ["style", "color: red;", 4, "ngIf"], ["style", "color: green;", 4, "ngIf"], ["href", "javascript:;", "id", "nav-home-tab", "data-toggle", "tab", "role", "tab", "aria-controls", "nav-home", "aria-selected", "true", 1, "nav-item", "nav-link", "btn", "btn-success", "btn-sm", "active", 3, "click"], [1, "fa", "fa-share"], [1, "col-lg-6"], [1, "card-header", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-calendar"], [1, "card-body"], ["id", "dataTable", 1, "table", "table-striped"], [4, "ngFor", "ngForOf"], [1, "sticky-footer", "bg-transparent"], [1, "container", "my-auto"], [1, "copyright", "text-center", "my-auto"], [1, "text-white"], ["src", "/img/logo-cap.png", 1, "powered-footer-logo", "d-block"], [2, "color", "red"], [2, "color", "green"], ["href", "javascript:;"]], template: function PatientUploadFilesComponent_Template(rf, ctx) { if (rf & 1) {
        const _r143 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "h1", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "File Upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "your files to Assets, or");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "form", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "input", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PatientUploadFilesComponent_Template_input_change_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r143); const _r138 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18); return ctx.uploadFile(_r138.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PatientUploadFilesComponent_Template_button_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r143); const _r138 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18); return _r138.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Upload File");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, PatientUploadFilesComponent_span_23_Template, 2, 1, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, PatientUploadFilesComponent_span_24_Template, 2, 1, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PatientUploadFilesComponent_Template_a_click_25_listener() { return ctx.backToCall(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "i", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Back to Call");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "h6", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "i", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Uploaded files");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "table", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "File name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](40, PatientUploadFilesComponent_tr_40_Template, 4, 1, "tr", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "footer", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "img", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Powered by \u00A9 Danphe Telehealth 2020 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.progress > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.message);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.docArray);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatientUploadFilesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './patient-upload-files.component.html',
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_2__["UploadDownloadService"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__["Global"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/patient/patient-waiting-room/patient-waiting-room.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/patient/patient-waiting-room/patient-waiting-room.component.ts ***!
  \********************************************************************************/
/*! exports provided: PatientWaitingRoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientWaitingRoomComponent", function() { return PatientWaitingRoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");











const _c0 = ["pcam"];
const _c1 = ["scrollBtm"];
function PatientWaitingRoomComponent_label_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Provider: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PatientWaitingRoomComponent_option_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const provider_r6103 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", provider_r6103.userName, " ");
} }
function PatientWaitingRoomComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 31, 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const msg_r6104 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r6104.name, " :-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r6104.message, " ");
} }
function PatientWaitingRoomComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Chat message is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class PatientWaitingRoomComponent {
    constructor(httpClient, notificationService, routing, formBuilder, global, cdr) {
        this.httpClient = httpClient;
        this.notificationService = notificationService;
        this.routing = routing;
        this.formBuilder = formBuilder;
        this.global = global;
        this.cdr = cdr;
        this.showChat = true;
        this.providers = new Array();
        this.ChatMessages = new Array();
        this.AllUserChats = {};
        this.tokbox = "Tokbox";
        this.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Patient"]();
        this.providerObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Provider"]();
        this.initForm();
        this.notificationService.Connect();
        this.patientObj = this.global.patientObj;
        this.notificationService.EventCallPatient.subscribe(patient => {
            this.GotoDoctorRoom(patient);
        });
        this.notificationService.EventChatMessage.subscribe(chatData => {
            if (this.ChatForm.controls['selUser'].value != chatData.name) {
                this.ChatForm.controls['selUser'].setValue(chatData.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: chatData.name, message: chatData.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            // this.toastr.success(chatMsg.Message, chatMsg.Name,
            //   {timeOut: 5000});
            this.pushChatMsgUserwise(chatData.name, chatMsg);
            this.cdr.detectChanges();
            // this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });
        this.notificationService.EventGetAllProviders.subscribe(_providers => {
            this.providers = _providers;
            //this.global.doctorObj=_doctors[0];
        });
        this.notificationService.EventConnectionEstablished.subscribe(() => {
            this.notificationService.LoadActiveDoctors();
        });
        this.state = history.state;
    }
    ngAfterViewInit() {
        let _video = this.video.nativeElement;
        this.Video = _video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                _video.srcObject = stream;
                _video.play();
            });
        }
    }
    ngOnDestroy() {
        const mediaStream = this.Video.srcObject;
        if (mediaStream == null) {
            return;
        }
        mediaStream.getTracks().forEach(stream => stream.stop());
    }
    initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            chatMessage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.dirty;
    }
    SendToken(res) {
    }
    GotoDoctorRoom(res) {
        if (res == false) {
            return;
        }
        if (res.providerNameAttending.length > 0 && res.name == sessionStorage.getItem('PatientName')) {
            this.patientObj.providerNameAttending = res.providerNameAttending;
            var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]().set('username', this.patientObj.providerNameAttending);
            this.httpClient.
                get(this.global.practiceUrl + "GetUpdatedProvider", { params: params })
                .subscribe(res => {
                this.global.providerObj = res.User;
                for (let temp of res.Configuration) {
                    if (temp.url == this.global.providerObj.practice) {
                        this.global.practiceObj = temp;
                    }
                }
                console.log(this.providerObj);
                var url = this.global.config.videourl.replace("DOCTORNAME", this.patientObj.providerNameAttending);
                this.global.config.videourl = url;
                if (this.global.practiceObj.callingPlatform == this.tokbox) {
                    this.routing.navigateByUrl('/PatientRoomTokbox', { state: this.global });
                }
                else {
                    this.routing.navigateByUrl('/PatientRoom', { state: this.global });
                }
            });
        }
    }
    Error(res) {
        console.log(res);
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }
            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.cdr.detectChanges();
                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
                this.notificationService.SendChatMessage(chatMsg);
                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
            }
        }
        catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
            }
            else {
                this.ChatMessages = new Array();
            }
        }
        catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        }
        catch (e) { }
    }
    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
    }
    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array();
            }
            this.AllUserChats[user].push(messageObj);
        }
        catch (e) { }
    }
}
PatientWaitingRoomComponent.ɵfac = function PatientWaitingRoomComponent_Factory(t) { return new (t || PatientWaitingRoomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
PatientWaitingRoomComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientWaitingRoomComponent, selectors: [["ng-component"]], viewQuery: function PatientWaitingRoomComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.video = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.scrollBottom = _t.first);
    } }, decls: 43, vars: 5, consts: [["id", "page-top"], [1, "row", "m-w100"], [1, "col-md-12", "col-sm-12", "col-xs-12"], [1, "loading-container"], [1, "animated-item"], [1, "patient-camera"], ["autoplay", "", "autoplay", "true"], ["pcam", ""], [1, "waiting-info"], [1, "for-info", "mb-4"], [1, "fa", "fa-info-circle"], [1, "for-info", "mb-4", 2, "text-align", "left"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "open"], [1, "card-header", "accordionItemHeading", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between", "br-0"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-comments"], [1, "card-body", "p-0", "accordionItemContent"], [1, "chatbox-holder"], [1, "chatbox"], [3, "formGroup"], ["width", "500px", 1, "chat-messages"], ["for", "selPatient", 4, "ngIf"], ["id", "selPatient", "formControlName", "selUser", 3, "change"], ["disabled", "", "value", "null"], [4, "ngFor", "ngForOf"], ["class", "message-box-holder", 4, "ngFor", "ngForOf"], [1, "chat-input-holder"], ["placeholder", "Type your message here..", "formControlName", "chatMessage", 1, "chat-input", 3, "keyup"], ["style", "color: red;", 4, "ngIf"], ["type", "button", "value", "Send", 1, "message-send", "btn-primary", 3, "click"], ["for", "selPatient"], [1, "message-box-holder"], ["scrollBtm", ""], [1, "message-sender"], [2, "color", "red"]], template: function PatientWaitingRoomComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "video", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Please wait! Your Doctor will join you soon. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Till then you can check your video for smooth communication when you talk with doctor. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " 1) Open Chrome and select the Chrome menu,");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " 2)represented by three vertical dots in the top-right corner. 3) Select Settings. ...Scroll down and select Advanced. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " 4) Under the Privacy and security section, select Site settings.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " 5) Select either Camera or Microphone to access either setting.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "h6", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "form", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, PatientWaitingRoomComponent_label_33_Template, 2, 0, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "select", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PatientWaitingRoomComponent_Template_select_change_34_listener() { return ctx.OnChatUserChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "option", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Select Provider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, PatientWaitingRoomComponent_option_37_Template, 2, 1, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, PatientWaitingRoomComponent_div_38_Template, 6, 2, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "textarea", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function PatientWaitingRoomComponent_Template_textarea_keyup_40_listener($event) { return ctx.onChatEnter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, PatientWaitingRoomComponent_div_41_Template, 2, 0, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PatientWaitingRoomComponent_Template_input_click_42_listener() { return ctx.SendChatMsg(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.ChatForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.providers);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ChatMessages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "chatMessage"));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PatientWaitingRoomComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './patient-waiting-room.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__["Global"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, { video: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['pcam']
        }], scrollBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['scrollBtm', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/provider/provider-home/provider-home.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/provider/provider-home/provider-home.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProviderHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderHomeComponent", function() { return ProviderHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");












const _c0 = ["scrollBtm"];
const _c1 = ["pcam"];
function ProviderHomeComponent_strong_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Upload profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_img_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 74);
} if (rf & 2) {
    const ctx_r5105 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r5105.Transform(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function ProviderHomeComponent_img_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 75);
} }
function ProviderHomeComponent_span_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5108 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5108.count);
} }
function ProviderHomeComponent_div_57_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Sending Invitation... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_57_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Email Invitation has been Sent. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_57_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Sending Failed. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    const _r5118 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Send Invitation Link");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "form", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "input", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_57_Template_input_ngModelChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5118); const ctx_r5117 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5117.patientObj.email = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_57_Template_input_ngModelChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5118); const ctx_r5119 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5119.patientObj.mobileNumber = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_57_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5118); const ctx_r5120 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5120.Invitation(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Send ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ProviderHomeComponent_div_57_div_13_Template, 2, 0, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ProviderHomeComponent_div_57_div_14_Template, 2, 0, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ProviderHomeComponent_div_57_div_15_Template, 2, 0, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5109 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r5109.invitationForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5109.patientObj.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5109.patientObj.mobileNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r5109.InvitationButton);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r5109.InvitationButton);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5109.InvitationSuccess);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5109.InvitationFailure);
} }
function ProviderHomeComponent_div_58_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Completed Appointments");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_58_tr_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const temp_r5123 = ctx.$implicit;
    const ctx_r5122 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](3, 4, temp_r5123.appointmentDate, "LLLL dd, yyyy"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r5122.Difference(temp_r5123.startTime, temp_r5123.endTime), "mins ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](8, 7, temp_r5123.startTime, "hh:mm:ss a"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](11, 10, temp_r5123.endTime, "hh:mm:ss a"));
} }
function ProviderHomeComponent_div_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProviderHomeComponent_div_58_div_1_Template, 4, 0, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Call Duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Call Start Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Call End Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ProviderHomeComponent_div_58_tr_14_Template, 12, 13, "tr", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5110.SendInvitation);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5110.CompletedPatients);
} }
function ProviderHomeComponent_div_59_div_12_label_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5128 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5128.selectedFile.name, "");
} }
function ProviderHomeComponent_div_59_div_12_span_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5129.progress, "% ");
} }
function ProviderHomeComponent_div_59_div_12_span_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5130 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5130.message, " ");
} }
function ProviderHomeComponent_div_59_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r5132 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "i", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Update Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "select", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_select_ngModelChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5131 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5131.providerObj.nameTitle = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "option", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "--Choose--");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Dr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "option", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Prof");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "option", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Mr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "option", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Mrs");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_input_ngModelChange_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5133 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5133.providerObj.name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "input", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_input_ngModelChange_29_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5134 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5134.providerObj.email = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "input", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_input_ngModelChange_34_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5135 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5135.providerObj.mobileNumber = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Designation");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "input", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_input_ngModelChange_39_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5136 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5136.providerObj.designation = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Medical degree");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "input", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_input_ngModelChange_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5137 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5137.providerObj.medicalDegree = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Affiliated Hospital or Clinic");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "input", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_12_Template_input_ngModelChange_49_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5138 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5138.providerObj.clinic = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Upload Image");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "input", 113, 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProviderHomeComponent_div_59_div_12_Template_input_change_54_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5139 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5139.onFileChanged($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "button", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_div_12_Template_button_click_56_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const _r5127 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](55); return _r5127.click(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Upload File");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](58, ProviderHomeComponent_div_59_div_12_label_58_Template, 2, 1, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, ProviderHomeComponent_div_59_div_12_span_60_Template, 2, 1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](61, ProviderHomeComponent_div_59_div_12_span_61_Template, 2, 1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "div", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "input", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_div_12_Template_input_click_65_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5132); const ctx_r5141 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5141.UpdateProfile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5124 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.nameTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.mobileNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.designation);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.medicalDegree);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5124.providerObj.clinic);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5124.selectedFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5124.progress > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5124.message);
} }
function ProviderHomeComponent_div_59_div_13_label_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5143 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5143.LogoToUpload.name, "");
} }
function ProviderHomeComponent_div_59_div_13_span_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5144 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5144.progress, "% ");
} }
function ProviderHomeComponent_div_59_div_13_span_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5145 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5145.message, " ");
} }
function ProviderHomeComponent_div_59_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r5147 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Update Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Practice configuration :");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Practice Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_13_Template_input_ngModelChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5146 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5146.practiceObj.name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Practice Contact No.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "input", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_13_Template_input_ngModelChange_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5148 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5148.practiceObj.contactNumber = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Practice Email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_13_Template_input_ngModelChange_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5149 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5149.practiceObj.email = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Practice Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "textarea", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_13_Template_textarea_ngModelChange_29_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5150 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5150.practiceObj.description = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Practice Logo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "i", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_div_13_Template_i_click_38_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const _r5142 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](40); return _r5142.click(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "input", 130, 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProviderHomeComponent_div_59_div_13_Template_input_change_39_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5152 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5152.updatePracticeLogo($event.target.files); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, ProviderHomeComponent_div_59_div_13_label_42_Template, 2, 1, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](43, ProviderHomeComponent_div_59_div_13_span_43_Template, 2, 1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, ProviderHomeComponent_div_59_div_13_span_44_Template, 2, 1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "video call platform");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "input", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_13_Template_input_ngModelChange_49_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5153 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5153.practiceObj.callingPlatform = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Jitsi ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_13_Template_input_ngModelChange_51_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5154 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5154.practiceObj.callingPlatform = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Tokbox ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "div", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "input", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_div_13_Template_input_click_56_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5147); const ctx_r5155 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5155.UpdatePracticeConfiguration(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5125 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5125.practiceObj.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5125.practiceObj.contactNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5125.practiceObj.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5125.practiceObj.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx_r5125.practiceObj.logoPath, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5125.LogoToUpload);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5125.progress > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5125.message);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5125.practiceObj.callingPlatform);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5125.practiceObj.callingPlatform);
} }
function ProviderHomeComponent_div_59_div_14_div_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Preview Template");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "p", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5156 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r5156.EmailTemplateUrl(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function ProviderHomeComponent_div_59_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r5158 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Update Email Configuration : ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Email Parameters :");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Email Subject");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_14_Template_input_ngModelChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5158); const ctx_r5157 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5157.practiceObj.emailSubject = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Email Plain Body");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_14_Template_input_ngModelChange_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5158); const ctx_r5159 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5159.practiceObj.emailPlainBody = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Email Additional Content");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "textarea", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderHomeComponent_div_59_div_14_Template_textarea_ngModelChange_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5158); const ctx_r5160 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5160.practiceObj.emailAdditionalContent = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ProviderHomeComponent_div_59_div_14_div_25_Template, 5, 1, "div", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "div", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "input", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_div_14_Template_input_click_29_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5158); const ctx_r5161 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5161.UpdateEmailTemplate(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_div_14_Template_input_click_31_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5158); const ctx_r5162 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5162.PreviewEmailTemplate(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5126 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5126.practiceObj.emailSubject);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5126.practiceObj.emailPlainBody);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5126.practiceObj.emailAdditionalContent);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5126.showPreview);
} }
const _c2 = function (a0) { return { "active": a0 }; };
function ProviderHomeComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    const _r5164 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_Template_a_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5164); const ctx_r5163 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5163.Check("updateProfile"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Update Profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_Template_a_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5164); const ctx_r5165 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5165.Check("updateParams"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Update Practice Configuration ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_59_Template_a_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5164); const ctx_r5166 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5166.Check("updateEmailTemplate"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Update Email Template ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ProviderHomeComponent_div_59_div_12_Template, 66, 10, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ProviderHomeComponent_div_59_div_13_Template, 57, 10, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ProviderHomeComponent_div_59_div_14_Template, 32, 4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5111 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c2, ctx_r5111.activeTab === "updateProfile"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c2, ctx_r5111.activeTab === "updateParams"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c2, ctx_r5111.activeTab === "updateEmailTemplate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5111.ProfileUpdate);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5111.ParamsUpdate);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5111.EmailTemplateUpdate);
} }
function ProviderHomeComponent_div_60_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h6", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Chat Messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_60_label_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5168 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r5168.global.isProvider ? "Patient" : "Provider", ": ");
} }
function ProviderHomeComponent_div_60_select_9_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r5174 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r5174.name, " ");
} }
function ProviderHomeComponent_div_60_select_9_Template(rf, ctx) { if (rf & 1) {
    const _r5176 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "select", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProviderHomeComponent_div_60_select_9_Template_select_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5176); const ctx_r5175 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5175.OnChatUserChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "option", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProviderHomeComponent_div_60_select_9_option_3_Template, 2, 1, "option", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5169 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Select ", ctx_r5169.global.isProvider ? "Patient" : "Provider", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5169.ChatUserDropDowns);
} }
function ProviderHomeComponent_div_60_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5170 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5170.global.isProvider ? "Patient" : "Provider", " is required ");
} }
function ProviderHomeComponent_div_60_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 61, 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const msg_r5177 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5177.name, " :-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5177.message, " ");
} }
function ProviderHomeComponent_div_60_div_13_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Chat message is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_60_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r5181 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "textarea", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function ProviderHomeComponent_div_60_div_13_Template_textarea_keyup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5181); const ctx_r5180 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5180.onChatEnter($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProviderHomeComponent_div_60_div_13_div_2_Template, 2, 0, "div", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_60_div_13_Template_input_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5181); const ctx_r5182 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5182.SendChatMsg(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5172 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5172.hasError("required", "chatMessage"));
} }
function ProviderHomeComponent_div_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProviderHomeComponent_div_60_div_1_Template, 4, 0, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ProviderHomeComponent_div_60_label_8_Template, 2, 1, "label", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ProviderHomeComponent_div_60_select_9_Template, 4, 2, "select", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ProviderHomeComponent_div_60_div_10_Template, 2, 1, "div", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ProviderHomeComponent_div_60_div_12_Template, 6, 2, "div", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ProviderHomeComponent_div_60_div_13_Template, 4, 1, "div", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5112 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5112.ChatSection);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r5112.ChatForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5112.showChat);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5112.showChat);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5112.hasError("required", "selUser") && ctx_r5112.showChat);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5112.ChatMessages);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5112.showChat);
} }
function ProviderHomeComponent_div_67_tr_3_td_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const temp_r5184 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("\u00A0", temp_r5184.patientId + 1, ")\u00A0\u00A0", temp_r5184.name, "");
} }
function ProviderHomeComponent_div_67_tr_3_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r5192 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_div_67_tr_3_a_3_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5192); const temp_r5184 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r5190 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5190.CallPatient(temp_r5184); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Call");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_67_tr_3_td_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_67_tr_3_td_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "In Call");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderHomeComponent_div_67_tr_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProviderHomeComponent_div_67_tr_3_td_1_Template, 2, 2, "td", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "td", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProviderHomeComponent_div_67_tr_3_a_3_Template, 3, 0, "a", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProviderHomeComponent_div_67_tr_3_td_4_Template, 4, 0, "td", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ProviderHomeComponent_div_67_tr_3_td_5_Template, 2, 0, "td", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const temp_r5184 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", temp_r5184.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", temp_r5184.status == 0 && temp_r5184.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", temp_r5184.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", temp_r5184.status == 1 && temp_r5184.name);
} }
function ProviderHomeComponent_div_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "table", 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProviderHomeComponent_div_67_tr_3_Template, 6, 4, "tr", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5113 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5113.patients);
} }
class ProviderHomeComponent {
    constructor(routing, notificationService, global, httpClient, formBuilder, activatedRoute, cdr, sanitizer) {
        this.routing = routing;
        this.notificationService = notificationService;
        this.global = global;
        this.httpClient = httpClient;
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.LogoToUpload = null;
        this.count = 0;
        this.activeTab = 'updateProfile';
        this.HospitalName = "";
        this.HospitalContact = "";
        this.HospitalEmail = "";
        this.HospitalLogo = "";
        this.EmailSubject = "";
        this.EmailPlainBody = "";
        this.EmailHTMLBody = "";
        this.HospitalDesc = "";
        this.showChat = true;
        this.AllUserChats = {};
        this.ChatMessages = new Array();
        this.ChatReceivedMessages = new Array();
        this.ChatUserDropDowns = new Array();
        this.InvitationButton = true;
        this.InvitationSuccess = false;
        this.InvitationFailure = false;
        this.SendInvitation = true;
        this.AdminScreen = false;
        this.CompletedAppointments = false;
        this.AccountSettings = false;
        this.ProfileUpdate = true;
        this.ParamsUpdate = false;
        this.EmailTemplateUpdate = false;
        this.ChatSection = false;
        this.CompletedPatients = null;
        this.CompPatients = null;
        this.AddedDoctors = null;
        this.providerObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Provider"]();
        this.practiceObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Practice"]();
        this.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Patient"]();
        this.showPatDetail = false;
        this.patients = new Array();
        this.tokbox = 'Tokbox';
        this.showPreview = false;
        this.initForm();
        this.LoadPatientsAttended();
        this.practiceObj = this.global.practiceObj;
        this.providerObj = this.global.providerObj;
        if (this.global.isPatient) {
            this.notificationService.EventCompletePatient
                .subscribe(_patient => {
                // this.global.patientObj = _patient;
                this.patients = _patient;
                // this.patients = _patient;
                // this.PatientCompleted(_patient);
                this.ChatUserDropDowns = new Array();
            });
        }
        this.notificationService.Connect();
        this.notificationService.EventGetAllPatients
            .subscribe(_patients => {
            this.patients = _patients;
            // this.patients = _patients;
            this.ChatUserDropDowns = _patients;
        });
        this.notificationService.EventCallPatient
            .subscribe(_patient => {
            this.global.patientObj = _patient;
        });
        this.notificationService.EventChatMessage
            .subscribe(data => {
            if (this.ChatForm.controls['selUser'].value != data.name) {
                this.ChatForm.controls['selUser'].setValue(data.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: data.name, message: data.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            this.count = this.count + 1;
            this.pushChatMsgUserwise(data.Name, chatMsg);
            this.cdr.detectChanges();
            // this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });
        this.invitationForm = this.formBuilder.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email],
            mobileno: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
        if (!this.providerObj) {
            this.routing.navigate(['Login']);
        }
        else if (this.providerObj.userName == "") {
            this.routing.navigate(['Login']);
        }
    }
    ngAfterViewInit() {
        let _video = this.video.nativeElement;
        this.Video = _video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                _video.srcObject = stream;
                _video.play();
            });
        }
    }
    ngOnInit() {
        var config = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('username', this.global.providerObj.userName);
        this.httpClient.get(this.global.practiceUrl + "GetUpdatedProvider", { params: config })
            .subscribe(res => {
            this.providerObj = res.User;
            if (this.providerObj.image) {
                this.retrievedImage = 'data:image/png;base64,' + this.providerObj.image;
            }
        });
    }
    ngOnDestroy() {
        const mediaStream = this.Video.srcObject;
        if (mediaStream == null) {
            return;
        }
        mediaStream.getTracks().forEach(stream => stream.stop());
    }
    Transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.retrievedImage);
    }
    initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            chatMessage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.dirty;
    }
    Difference(start, end) {
        start = new Date(start);
        end = new Date(end);
        var startminutes = start.getMinutes();
        var endminutes = end.getMinutes();
        var diff = 0;
        if (endminutes > startminutes) {
            diff = endminutes - startminutes;
        }
        return diff;
    }
    Check(param) {
        let data = param;
        if (data == 'sendInv') {
            this.SendInvitation = true;
            this.CompletedAppointments = false;
            this.AccountSettings = false;
            this.ChatSection = false;
            this.LoadPatientsAttended();
        }
        else if (data == 'Admin') {
            this.SendInvitation = false;
            this.CompletedAppointments = false;
            this.AccountSettings = false;
            this.ChatSection = false;
        }
        else if (data == 'completedList') {
            this.SendInvitation = false;
            this.CompletedAppointments = true;
            this.AccountSettings = false;
            this.ChatSection = false;
            this.LoadPatientsAttended();
        }
        else if (data == 'accSett') {
            this.SendInvitation = false;
            this.CompletedAppointments = false;
            this.AccountSettings = true;
            this.ChatSection = false;
        }
        else if (data == 'chatSection') {
            this.SendInvitation = false;
            this.CompletedAppointments = false;
            this.AccountSettings = false;
            this.ChatSection = true;
        }
        else if (data == 'updateProfile') {
            this.SendInvitation = false;
            this.CompletedAppointments = false;
            this.AccountSettings = true;
            this.ProfileUpdate = true;
            this.activeTab = data;
            this.ParamsUpdate = false;
            this.EmailTemplateUpdate = false;
            this.ChatSection = false;
        }
        else if (data == 'updateParams') {
            this.SendInvitation = false;
            this.CompletedAppointments = false;
            this.AccountSettings = true;
            this.ProfileUpdate = false;
            this.ParamsUpdate = true;
            this.EmailTemplateUpdate = false;
            this.activeTab = data;
            this.ChatSection = false;
        }
        else if (data == 'updateEmailTemplate') {
            this.SendInvitation = false;
            this.CompletedAppointments = false;
            this.AccountSettings = true;
            this.ProfileUpdate = false;
            this.ParamsUpdate = false;
            this.activeTab = data;
            this.ChatSection = false;
            this.EmailTemplateUpdate = true;
        }
    }
    updatePracticeLogo(file) {
        this.LogoToUpload = file.item(0);
        //show image preview
        var reader = new FileReader();
        reader.onload = (event) => {
            this.HospitalLogo = event.target.result;
        };
        reader.readAsDataURL(this.LogoToUpload);
        //upload image
        const formData = new FormData();
        // To Rename File name 
        //var fileExtension = '.' + this.LogoToUpload.name.split('.').pop();
        //var filename = "hospitallogo" + new Date().getTime() + fileExtension;
        formData.append('image', this.LogoToUpload, this.LogoToUpload.name);
        //call to server
        this.httpClient.post(this.global.practiceUrl + "UploadPracticeLogo", formData, { reportProgress: true, observe: 'events', responseType: 'text' })
            .subscribe(event => {
            if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response) {
                this.receivedImageData = event;
                this.message = 'Upload Success.';
                this.practiceObj.logoPath = this.receivedImageData.body;
            }
            else {
                this.message = 'Upload Failed.';
            }
        });
    }
    onFileChanged(event) {
        if (event.target.files.length === 0) {
            return;
        }
        this.selectedFile = event.target.files[0];
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        // this.providerObj.userName = this.providerObj.userName;
        //this.doctorObj.Password = this.global.doctorObj.Password;
        //fd.append('user', JSON.stringify(this.doctorObj));
        this.httpClient.post(this.global.practiceUrl + "UploadProfileImage", fd, { reportProgress: true, observe: 'events', responseType: 'json' })
            .subscribe(event => {
            if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpEventType"].Response) {
                this.receivedImageData = event;
                this.message = 'Upload success.';
                this.providerObj.image = this.receivedImageData.body;
                //this.onUploadFinished.emit(event.body);
            }
        });
    }
    getImage() {
        //Make a call to backend to get the Image Bytes.
        this.httpClient.get(this.global.practiceUrl + "GetProfileImage")
            .subscribe(res => {
            this.retrieveResponse = res;
            if (this.retrieveResponse)
                this.retrievedImage = 'data:image/png;base64,' + this.retrieveResponse;
        });
    }
    UpdatePracticeConfiguration() {
        this.httpClient.
            post(this.global.practiceUrl + "UpdatePracticeConfiguration", this.global.practiceObj)
            .subscribe(res => {
            this.practiceObj = res;
            alert("Practice Configuration updated");
        }, err => { console.log(err); });
    }
    UpdateProfile() {
        console.log(this.providerObj);
        this.httpClient.
            post(this.global.practiceUrl + "UpdateProfile", this.providerObj)
            .subscribe(res => {
            this.providerObj = res;
            //this.global.doctorObj = res;
            this.getImage();
            alert("profile updated");
            this.providerObj = res;
        }, err => { console.log(err); });
    }
    EmailTemplateUrl() {
        return this.sanitizer.bypassSecurityTrustHtml(this.practiceObj.emailHtmlBody);
    }
    PreviewEmailTemplate() {
        this.httpClient.
            post(this.global.practiceUrl + "PreviewEmailTemplate", this.practiceObj)
            .subscribe(res => {
            this.practiceObj.emailHtmlBody = res.EmailHTMLBody;
            // this.PreviewEmailContent = res.PreviewEmailContent;
            this.showPreview = true;
        }, err => { console.log(err); });
    }
    UpdateEmailTemplate() {
        this.httpClient.
            post(this.global.practiceUrl + "UpdatePracticeConfiguration", this.practiceObj.emailHtmlBody)
            .subscribe(res => {
            this.practiceObj = res;
            alert("Email Template Updated");
        }, err => { console.log(err); });
    }
    Invitation() {
        this.InvitationButton = false;
        // this.httpClient.post("Messenger/SendEmail", this.global.parameterObj).subscribe(res => this.EmailInvitationSuccess(res), err => this.Error(err));
        this.invitationForm.reset();
    }
    CallPatient(callPatient) {
        if (this.patientObj.status == 1) {
            this.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Patient"];
        }
        console.log(this.providerObj);
        this.showPatDetail = true;
        let dateTime = new Date();
        this.patientObj.appointmentDate = dateTime;
        this.patientObj.name = callPatient.name;
        this.notificationService.CallPatient(callPatient);
        if (this.practiceObj.callingPlatform == this.tokbox) {
            this.routing.navigateByUrl('/ProviderRoomTokbox', { state: this.global });
        }
        else
            this.routing.navigateByUrl('/ProviderRoom', { state: this.global });
    }
    LoadPatientsAttended() {
        this.httpClient.get(this.global.practiceUrl + "GetPatientsAttended")
            .subscribe(res => this.LoadPatientSuccess(res), err => this.Error(err));
    }
    LoadPatientSuccess(res) {
        this.CompletedPatients = res.filter(t => t.url == this.global.providerObj.url);
        // this.CompletedPatients=res;
    }
    NextPatient(res) {
        console.log(this.patientObj);
        if (res) {
            //console.log(this.patients);
            this.patients.forEach(p => {
                if (p.patientId == res.Id) {
                    p.status = res.status;
                }
            });
            this.patientObj = res;
        }
    }
    EmailInvitationSuccess(res) {
        console.log(res);
        if (res) {
            this.InvitationButton = true;
            this.InvitationSuccess = true;
            //alert("Email Invitation Sent has been sent ");
        }
        else {
            this.InvitationButton = true;
            this.InvitationFailure = true;
            //alert("Sending failed!");
        }
    }
    // SMSInvitationSuccess(res)
    // {
    //   if(res)
    //    alert("Sms Invitation Sent has been sent ");
    //    else
    //    alert("Mobile number doesnot exists");
    // }
    Success(res) {
        this.patients = res;
    }
    Error(err) {
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }
            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.cdr.detectChanges();
                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
                this.notificationService.SendChatMessage(chatMsg);
                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
            }
        }
        catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
                // this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
            }
            else {
                this.ChatMessages = new Array();
                // this.ChatReceivedMessages=new Array<any>();
            }
        }
        catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        }
        catch (e) {
        }
    }
    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
    }
    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array();
            }
            this.AllUserChats[user].push(messageObj);
        }
        catch (e) { }
    }
}
ProviderHomeComponent.ɵfac = function ProviderHomeComponent_Factory(t) { return new (t || ProviderHomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"])); };
ProviderHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProviderHomeComponent, selectors: [["ng-component"]], viewQuery: function ProviderHomeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.scrollBottom = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.video = _t.first);
    } }, decls: 125, vars: 13, consts: [["href", "//cdn.syncfusion.com/ej2/ej2-notifications/styles/material.css", "rel", "stylesheet"], ["id", "page-top"], ["id", "wrapper"], ["id", "content-wrapper", 1, "d-flex", "flex-column"], ["id", "content"], [1, "navbar", "navbar-expand", "navbar-light", "bg-white", "topbar", "mb-4", "static-top", "shadow"], ["id", "sidebarToggleTop", 1, "btn", "btn-link", "d-md-none", "rounded-circle", "mr-3"], [1, "fa", "fa-bars"], [1, "sidebar-brand", "d-flex", "align-items-center", "justify-content-center"], [1, "sidebar-brand-text", "mx-3"], ["src", "/img/logo.png", "alt", ""], [1, "navbar-nav", "ml-auto"], [1, "topbar-divider", "d-none", "d-sm-block"], [1, "nav-item", "dropdown", "no-arrow"], ["href", "javascript:;", "id", "userDropdown", "role", "button", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", 3, "click"], [4, "ngIf"], [1, "mr-2", "d-none", "d-lg-inline", "text-gray-600", "small"], ["class", "img-profile rounded-circle", 3, "src", 4, "ngIf"], ["class", "img-profile rounded-circle", "src", "https://source.unsplash.com/QAB-WJcbgJk/60x60", 4, "ngIf"], ["aria-labelledby", "userDropdown", 1, "dropdown-menu", "dropdown-menu-right", "shadow", "animated--grow-in"], ["href", "#", 1, "dropdown-item"], [1, "fas", "fa-user", "fa-sm", "fa-fw", "mr-2", "text-gray-400"], [1, "fas", "fa-cogs", "fa-sm", "fa-fw", "mr-2", "text-gray-400"], [1, "fas", "fa-list", "fa-sm", "fa-fw", "mr-2", "text-gray-400"], [1, "dropdown-divider"], ["href", "#", "data-toggle", "modal", "data-target", "#logoutModal", 1, "dropdown-item"], [1, "fas", "fa-sign-out-alt", "fa-sm", "fa-fw", "mr-2", "text-gray-400"], [1, "container-fluid"], [1, "d-sm-flex", "align-items-center", "justify-content-between", "mb-3"], [1, "h4", "mb-0", "text-gray-800", "font-weight-light"], [1, ""], [1, "font-weight-normal", "d-block", "text-sm", "mt-1"], [1, "patient-camera", 2, "float", "right"], ["autoplay", "", "autoplay", "true"], ["pcam", ""], [1, "row", "mb-3"], [1, "col-xs-12"], [1, "doc-tabs"], ["id", "nav-tab", "role", "tablist", 1, "nav", "nav-tabs", "nav-fill"], ["id", "nav-home-tab", "data-toggle", "tab", "href", "javascript:;", "role", "tab", "aria-controls", "nav-home", "aria-selected", "true", 1, "nav-item", "nav-link", "btn", "btn-success", "btn-sm", 3, "click"], ["id", "nav-contact-tab", "data-toggle", "tab", "href", "javascript:;", "role", "tab", "aria-controls", "nav-contact", "aria-selected", "false", 1, "nav-item", "nav-link", "btn", "btn-success", "btn-sm", 3, "click"], ["class", "e-badge e-badge-info e-badge-overlap e-badge-notification e-badge-circle", "style", "position:inherit;display:inline-block;margin: -9px 0px 0px -6px;", 4, "ngIf"], [1, "row"], [1, "col-xl-8", "col-lg-7"], [1, "tab-content", "card", "shadow"], [1, "col-xl-4", "col-lg-5"], [1, "card", "shadow", "mb-4"], [1, "card-header", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-users"], ["class", "card-body", 4, "ngIf"], ["id", "send-message", "role", "dialog", 1, "modal", "fade"], [1, "modal-dialog", "modal-sm"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", "data-dismiss", "modal", 1, "close"], [1, "modal-body"], [1, "chatbox-holder", "send-message"], [1, "chatbox"], [1, "chat-messages"], [1, "message-box-holder"], [1, "message-box"], [1, "message-sender"], [1, "message-box", "message-partner"], [1, "chat-input-holder"], ["placeholder", "Type your message here..", 1, "chat-input"], ["type", "submit", "value", "Send", 1, "message-send", "btn-primary"], [1, "sticky-footer", "bg-transparent"], [1, "container", "my-auto"], [1, "copyright", "text-center", "my-auto"], [1, "text-black"], ["src", "/img/logo-cap.png", 1, "powered-footer-logo", "d-block"], ["rel", "stylesheet", "href", "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"], [1, "img-profile", "rounded-circle", 3, "src"], ["src", "https://source.unsplash.com/QAB-WJcbgJk/60x60", 1, "img-profile", "rounded-circle"], [1, "e-badge", "e-badge-info", "e-badge-overlap", "e-badge-notification", "e-badge-circle", 2, "position", "inherit", "display", "inline-block", "margin", "-9px 0px 0px -6px"], [1, "user", "p-3", 3, "formGroup"], [1, "col-md-4"], ["type", "email", "placeholder", "Email", "formControlName", "email", 1, "form-control", "form-control-user", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Mobile number", "formControlName", "mobileno", 1, "form-control", "form-control-user", 3, "ngModel", "ngModelChange"], [1, "col-md-2"], ["href", "javascript:;", 1, "btn", "btn-primary", "btn-user", "btn-block", 3, "disabled", "click"], ["class", "col-md-2", 4, "ngIf"], ["class", "card-header py-3 d-flex flex-row align-items-center justify-content-between", 4, "ngIf"], [1, "card-body"], ["id", "dataTable", 1, "table", "table-striped"], [4, "ngFor", "ngForOf"], [1, "fa", "fa-calendar"], ["role", "tablist", 1, "nav", "nav-tabs"], [1, "nav-item"], ["data-toggle", "tab", "href", "javascript:;", 1, "nav-item", "nav-link", "active", 3, "ngClass", "click"], ["data-toggle", "tab", "href", "javascript:;", 1, "nav-item", "nav-link", 3, "ngClass", "click"], [1, "tab-content"], [1, "fa", "fa-user"], ["action", "", 1, "user"], [1, "row", "form-group"], ["for", "", 1, "col-md-3", "control-label"], ["name", "nameTitle", 1, "form-control", 3, "ngModel", "ngModelChange"], ["value", "", "disabled", ""], ["value", "Dr"], ["value", "Proof"], ["value", "Mr"], ["value", "Mrs"], [1, "col-md-7"], ["type", "text", "placeholder", "Full Name", "name", "name", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-md-9"], ["type", "email", "placeholder", "Email", "name", "email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "placeholder", "Mobile Number", "name", "mobileNumber", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Designation", "name", "designation", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Medical degree", "name", "medicalDegree", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Affiliated Hospital or Clinic", "name", "Clinic", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-md-5"], ["type", "file", "placeholder", "Choose File", 2, "display", "none", 3, "change"], ["fileInput", ""], [3, "click"], ["class", "upload", 4, "ngIf"], [1, "row", "mt-4"], [1, "col-md-3"], ["type", "button", "name", "Submit", "value", "Submit", 1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "upload"], ["type", "text", "placeholder", "HospitalName", "name", "ame", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "number", "placeholder", "Contact Number", "name", "ContactNumber", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "email", "placeholder", "Hospital Email", "name", "email", 1, "form-control", 3, "ngModel", "ngModelChange"], ["placeholder", "Description", "name", "description", 1, "form-control", 2, "overflow", "hidden", "min-height", "80px", 3, "ngModel", "ngModelChange"], [1, "profile-pic"], ["id", "logo", "width", "210", "height", "80", 1, "img-thumbnail", "img-circle", "img-responsive", 3, "src"], [1, "edit"], ["href", "javascript:;", "title", "Edit", 1, "icon"], [1, "fa", "fa-pencil", "fa-lg", 3, "click"], ["type", "file", "placeholder", "Choose File", "accept", "images/*", 2, "display", "none", 3, "change"], [1, "col-md-6"], ["type", "radio", "name", "VideoCallPlatform", "value", "Jitsi", "checked", "", 3, "ngModel", "ngModelChange"], ["type", "radio", "name", "VideoCallPlatform", "value", "Tokbox", 3, "ngModel", "ngModelChange"], ["type", "email", "placeholder", "Email Subject", "name", "EmailSubject", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "EmailPlainBody", "placeholder", "Email Plain Body", 1, "form-control", 3, "ngModel", "ngModelChange"], ["name", "EmailAdditionalContent", "placeholder", "Email Additional Content", 1, "form-control", 2, "overflow", "hidden", "min-height", "80px", 3, "ngModel", "ngModelChange"], ["class", "row form-group", 4, "ngIf"], ["type", "button", "name", "Preview", "value", "Preview", 1, "btn", "btn-sm", "btn-primary", 3, "click"], ["id", "content", 2, "height", "600px", "pointer-events", "none", 3, "innerHTML"], [1, "card-body", "p-0", "accordionItemContent"], [1, "chatbox-holder"], [3, "formGroup"], ["for", "selPatient", 4, "ngIf"], ["id", "selPatient", "formControlName", "selUser", 3, "change", 4, "ngIf"], ["style", "color: red;display: inline;", 4, "ngIf"], ["class", "message-box-holder", 4, "ngFor", "ngForOf"], ["class", "chat-input-holder", 4, "ngIf"], ["for", "selPatient"], ["id", "selPatient", "formControlName", "selUser", 3, "change"], ["disabled", "", "value", "null"], [2, "color", "red", "display", "inline"], ["scrollBtm", ""], ["placeholder", "Type your message here..", "formControlName", "chatMessage", 1, "chat-input", 3, "keyup"], ["style", "color: red;", 4, "ngIf"], ["type", "button", "value", "Send", 1, "message-send", "btn-primary", 3, "click"], [2, "color", "red"], [1, "table", "table-striped"], ["cellpadding", "0", "cellspacing", "0", 4, "ngIf"], ["cellpadding", "0", "cellspacing", "0"], ["href", "javascript:;", "class", "btn-call", 3, "click", 4, "ngIf"], ["href", "javascript:;", 1, "btn-call", 3, "click"], [1, "fa", "fa-video-camera"], [1, "btn-call"]], template: function ProviderHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "body", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "nav", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_Template_a_click_15_listener() { return ctx.Check("accSett"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ProviderHomeComponent_strong_16_Template, 2, 0, "strong", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, ProviderHomeComponent_img_19_Template, 1, 1, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, ProviderHomeComponent_img_20_Template, 1, 0, "img", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "i", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Profile ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "i", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Settings ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Activity Log ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "i", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " Logout ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h5", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "strong", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "span", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Choose following actions to proceed.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "video", 33, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "nav", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "a", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_Template_a_click_49_listener() { return ctx.Check("sendInv"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Send Invitation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "a", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderHomeComponent_Template_a_click_51_listener() { return ctx.Check("chatSection"); })("click", function ProviderHomeComponent_Template_a_click_51_listener() { return ctx.count = 0; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Chat Section");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](53, ProviderHomeComponent_span_53_Template, 2, 1, "span", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](57, ProviderHomeComponent_div_57_Template, 16, 7, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](58, ProviderHomeComponent_div_58_Template, 15, 2, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, ProviderHomeComponent_div_59_Template, 15, 12, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, ProviderHomeComponent_div_60_Template, 14, 7, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "h6", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "i", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "My Patients");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](67, ProviderHomeComponent_div_67_Template, 4, 1, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "h5", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "button", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, " Hello ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, " Mamun Khandaker ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, " Hi. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, " How are you doing? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " Mamun Khandaker ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, " I'm doing fine. How about you? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, " I am fine. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, " Do you know why I knocked you today? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, " There's something important I would like to share with you. Do you have some time? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "div", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, " Mamun Khandaker ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, " Yeah sure. Let's meet in the Einstein cafe this evening and discuss the matter. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, " Mamun Khandaker ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "div", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, " I thought of coming to your place and discuss about it but I had to finish my projects and I didn't have enough time to go out of the house. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](116, "textarea", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "input", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "footer", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "div", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "span", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "img", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, "Powered by \u00A9 Danphe Telehealth 2020 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](124, "link", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.global.providerObj.name == null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.providerObj.nameTitle, "\u00A0", ctx.providerObj.name, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.retrievedImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.retrievedImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("Hello!\u00A0\u00A0", ctx.providerObj.nameTitle, "\u00A0", ctx.providerObj.name, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.count > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.SendInvitation);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.SendInvitation);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.AccountSettings);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.ChatSection);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.global.isProvider);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgClass"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RadioControlValueAccessor"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"]], styles: [".row[_ngcontent-%COMP%]   .col-md-5[_ngcontent-%COMP%]   .profile-pic[_ngcontent-%COMP%] {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n\twidth: 100%;\r\n\toverflow: hidden;\r\n}\r\n.profile-pic[_ngcontent-%COMP%]:hover   .edit[_ngcontent-%COMP%] {\r\n\tdisplay: block;\r\n}\r\n.profile-pic[_ngcontent-%COMP%]   .edit[_ngcontent-%COMP%] {\r\n\tpadding-top: 5px;\t\r\n\tpadding-right: 15px;\r\n\tposition: absolute;\r\n\tright: 0;\r\n\ttop: 0;\r\n\tdisplay: none;\r\n}\r\n.profile-pic[_ngcontent-%COMP%]   .edit[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n\tcolor: #000;\r\n}\r\n\r\n.banner-color[_ngcontent-%COMP%] {  \r\n    background-color: #eb681f;  \r\n}\r\n.title-color[_ngcontent-%COMP%] {  \r\n    color: #0066cc;  \r\n}\r\n.button-color[_ngcontent-%COMP%] { \r\n    background-color: #0066cc;  \r\n}\r\n@media screen and (min-width: 500px) {  \r\n.banner-color[_ngcontent-%COMP%] {  \r\n    background-color: #009688;  \r\n}  \r\n\r\n.title-color[_ngcontent-%COMP%] {  \r\n    color: black;  \r\n}  \r\n\r\n.button-color[_ngcontent-%COMP%] {  \r\nbackground-color: #009688;  \r\n} \r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hc3NldHMvY3NzL2RvY3Rvci1ob21lLWNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0VBQXNFO0FBQ3RFO0NBQ0Msa0JBQWtCO0NBQ2xCLHFCQUFxQjtDQUNyQixXQUFXO0NBQ1gsZ0JBQWdCO0FBQ2pCO0FBRUE7Q0FDQyxjQUFjO0FBQ2Y7QUFFQTtDQUNDLGdCQUFnQjtDQUNoQixtQkFBbUI7Q0FDbkIsa0JBQWtCO0NBQ2xCLFFBQVE7Q0FDUixNQUFNO0NBQ04sYUFBYTtBQUNkO0FBRUE7Q0FDQyxXQUFXO0FBQ1o7QUFFQSxnRUFBZ0U7QUFFaEU7SUFDSSx5QkFBeUI7QUFDN0I7QUFFQTtJQUNJLGNBQWM7QUFDbEI7QUFFQTtJQUNJLHlCQUF5QjtBQUM3QjtBQUVBO0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EiLCJmaWxlIjoic3JjL2Fzc2V0cy9jc3MvZG9jdG9yLWhvbWUtY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIDMvMDkvMjAyMCAtIFVwbG9hZCBIb3NwaXRhbCBMb2dvIENTUyA9PiBBZGRlZCBieSBCaGF2YW5hICBWYW5qYW5pICovXHJcbi5yb3cgLmNvbC1tZC01IC5wcm9maWxlLXBpYyB7XHJcblx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuXHR3aWR0aDogMTAwJTtcclxuXHRvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4ucHJvZmlsZS1waWM6aG92ZXIgLmVkaXQge1xyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4ucHJvZmlsZS1waWMgLmVkaXQge1xyXG5cdHBhZGRpbmctdG9wOiA1cHg7XHRcclxuXHRwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRyaWdodDogMDtcclxuXHR0b3A6IDA7XHJcblx0ZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljIC5lZGl0IGEge1xyXG5cdGNvbG9yOiAjMDAwO1xyXG59XHJcblxyXG4vKiA0LzA5LzIwMjAgLSBFbWFpbCBUZW1wbGF0ZSBDU1MgPT4gQWRkZWQgYnkgQmhhdmFuYSAgVmFuamFuaSAqL1xyXG5cclxuLmJhbm5lci1jb2xvciB7ICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYjY4MWY7ICBcclxufSAgXHJcblxyXG4udGl0bGUtY29sb3IgeyAgXHJcbiAgICBjb2xvcjogIzAwNjZjYzsgIFxyXG59ICBcclxuXHJcbi5idXR0b24tY29sb3IgeyBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDY2Y2M7ICBcclxufSAgXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA1MDBweCkgeyAgXHJcbi5iYW5uZXItY29sb3IgeyAgXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5Njg4OyAgXHJcbn0gIFxyXG5cclxuLnRpdGxlLWNvbG9yIHsgIFxyXG4gICAgY29sb3I6IGJsYWNrOyAgXHJcbn0gIFxyXG5cclxuLmJ1dHRvbi1jb2xvciB7ICBcclxuYmFja2dyb3VuZC1jb2xvcjogIzAwOTY4ODsgIFxyXG59IFxyXG59IFxyXG5cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProviderHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './provider-home.component.html',
                template: `<pre>{{ state | async | json }}</pre>`,
                styleUrls: ['../../../assets/css/doctor-home-component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__["Global"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"] }]; }, { scrollBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['scrollBtm', { static: false }]
        }], video: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['pcam']
        }] }); })();


/***/ }),

/***/ "./src/app/provider/provider-room-tokbox/provider-room-tokbox.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/provider/provider-room-tokbox/provider-room-tokbox.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ProviderRoomTokboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderRoomTokboxComponent", function() { return ProviderRoomTokboxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/Common/upload-download.service */ "./src/Common/upload-download.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/Common/safe.pipe */ "./src/Common/safe.pipe.ts");












const _c0 = ["scrollBtm"];
function ProviderRoomTokboxComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h6", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const temp_r5794 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", temp_r5794.fileAdr, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](temp_r5794.filename);
} }
function ProviderRoomTokboxComponent_label_82_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5788 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r5788.global.isProvider ? "Patient" : "Provider", ": ");
} }
function ProviderRoomTokboxComponent_select_83_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r5796 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r5796.name, " ");
} }
function ProviderRoomTokboxComponent_select_83_Template(rf, ctx) { if (rf & 1) {
    const _r5798 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "select", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProviderRoomTokboxComponent_select_83_Template_select_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5798); const ctx_r5797 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5797.OnChatUserChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "option", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProviderRoomTokboxComponent_select_83_option_3_Template, 2, 1, "option", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5789 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Select ", ctx_r5789.global.isProvider ? "Patient" : "Provider", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5789.ChatUserDropDowns);
} }
function ProviderRoomTokboxComponent_div_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5790 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5790.global.isProvider ? "Patient" : "Provider", " is required ");
} }
function ProviderRoomTokboxComponent_div_85_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 53, 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const msg_r5799 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5799.name, " :-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5799.message, " ");
} }
function ProviderRoomTokboxComponent_div_86_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Chat message is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderRoomTokboxComponent_div_86_Template(rf, ctx) { if (rf & 1) {
    const _r5803 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "textarea", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function ProviderRoomTokboxComponent_div_86_Template_textarea_keyup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5803); const ctx_r5802 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5802.onChatEnter($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProviderRoomTokboxComponent_div_86_div_2_Template, 2, 0, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderRoomTokboxComponent_div_86_Template_input_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5803); const ctx_r5804 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5804.SendChatMsg(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5792 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5792.hasError("required", "chatMessage"));
} }
function ProviderRoomTokboxComponent_div_103_input_47_Template(rf, ctx) { if (rf & 1) {
    const _r5807 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderRoomTokboxComponent_div_103_input_47_Template_input_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5807); const ctx_r5806 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5806.PatientAttended(ctx_r5806.global.patientObj); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5805 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("state", ctx_r5805.global.patientObj);
} }
function ProviderRoomTokboxComponent_div_103_Template(rf, ctx) { if (rf & 1) {
    const _r5809 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h6", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "After visit summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "What we did today?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomTokboxComponent_div_103_Template_input_ngModelChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5809); const ctx_r5808 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5808.global.patientObj.labOrdersSent = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "label", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " \u00A0Lab Orders Sent ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomTokboxComponent_div_103_Template_input_ngModelChange_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5809); const ctx_r5810 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5810.global.patientObj.newPrescriptionsSentToYourPharmacy = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "label", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " \u00A0New prescriptions sent to your pharmacy ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomTokboxComponent_div_103_Template_input_ngModelChange_25_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5809); const ctx_r5811 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5811.global.patientObj.newPrescriptionsMailedToYou = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "label", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " \u00A0New prescriptions mailed to you ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Advice");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "textarea", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomTokboxComponent_div_103_Template_textarea_ngModelChange_31_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5809); const ctx_r5812 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5812.global.patientObj.medication = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Follow Up in");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "input", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomTokboxComponent_div_103_Template_input_ngModelChange_36_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5809); const ctx_r5813 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5813.global.patientObj.followUpNumber = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "select", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomTokboxComponent_div_103_Template_select_ngModelChange_38_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5809); const ctx_r5814 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5814.global.patientObj.followUpMeasure = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Weeks");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "option", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Days");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "option", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Months");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, ProviderRoomTokboxComponent_div_103_input_47_Template, 1, 1, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5793 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5793.global.patientObj.labOrdersSent);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5793.global.patientObj.newPrescriptionsSentToYourPharmacy);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5793.global.patientObj.newPrescriptionsMailedToYou);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5793.global.patientObj.medication);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5793.global.patientObj.followUpNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5793.global.patientObj.followUpMeasure);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5793.global.isProvider);
} }
// import 'src/vendor/jitsi/external_api.js';
// declare var JitsiMeetExternalAPI : any;
class ProviderRoomTokboxComponent {
    constructor(httpClient, routing, formBuilder, notificationService, global, cdr, service) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.global = global;
        this.cdr = cdr;
        this.service = service;
        this.documentArray = [];
        this.CompletedPatients = null;
        this.showPatDetail = false;
        this.patients = new Array();
        this.showChat = true;
        this.AllUserChats = {};
        this.ChatMessages = new Array();
        this.ChatReceivedMessages = new Array();
        this.ChatUserDropDowns = new Array();
        this.patientObj = null;
        this.initForm();
        this.state = history.state;
        if (this.global.isPatient) {
            this.notificationService.EventCompletePatient
                .subscribe(_patient => {
                this.patientObj = _patient;
                this.PatientCompleted(_patient);
                this.ChatUserDropDowns = new Array();
            });
            this.notificationService.EventGetAllProviders.subscribe(_providers => {
                this.ChatUserDropDowns = _providers;
            });
            // gets doctor list
            this.notificationService.LoadActiveDoctors();
        }
        else {
            this.notificationService.Connect();
            this.notificationService.EventGetAllPatients
                .subscribe(_patients => {
                this.patients = _patients;
                this.ChatUserDropDowns = _patients;
                console.log(this.ChatUserDropDowns);
            });
            this.notificationService.EventCallPatient.subscribe(_patient => {
                this.patientObj = _patient;
            });
        }
        this.notificationService.EventChatMessage.subscribe(data => {
            if (this.ChatForm.controls['selUser'].value != data.name) {
                this.ChatForm.controls['selUser'].setValue(data.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: data.name, message: data.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            // this.toastr.success(chatMsg.Message, chatMsg.Name,
            //   {timeOut: 5000});
            //this.ChatReceivedMessages.push(chatMsg);
            this.pushChatMsgUserwise(data.name, chatMsg);
            this.cdr.detectChanges();
            //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });
    }
    ngOnInit() {
        this.state = history.state;
    }
    initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            chatMessage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.dirty;
    }
    getFiles() {
        this.httpClient.get(this.service.apiFileUrl).subscribe(data => {
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    this.FileName = data[i].replace(/^.*[\\\/]/, '');
                    this.documentArray[i] =
                        {
                            filename: this.FileName,
                            filepath: data[i],
                            fileAdr: this.service.DownloadUrl + this.FileName
                        };
                }
            }
            else {
                alert("files are not uploaded yet");
            }
        });
    }
    PatientAttended(attendedPatient) {
        this.showPatDetail = false;
        attendedPatient.medication = this.patientObj.medication;
        attendedPatient.url = this.global.providerObj.url;
        this.notificationService.PatientAttended(attendedPatient);
        this.patientObj = attendedPatient;
        this.routing.navigateByUrl('/Home', { state: this.global });
    }
    LoadPatientSuccess(res) {
        this.CompletedPatients = res.filter(t => t.url == this.global.practiceObj.url);
        ;
    }
    CallPatient(callPatient) {
        if (this.patientObj.status == 1) {
            this.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__["Patient"];
        }
        this.showPatDetail = true;
        this.notificationService.CallPatient(callPatient);
    }
    PatientCompleted(res) {
        if (res.name == this.patientObj.name) {
            this.global.patientObj = res;
            this.routing.navigate(['/ReportSummary']);
        }
    }
    Error(res) {
        alert(res.status);
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }
            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.cdr.detectChanges();
                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
                this.notificationService.SendChatMessage(chatMsg);
                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
            }
        }
        catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
                // this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
            }
            else {
                this.ChatMessages = new Array();
                // this.ChatReceivedMessages=new Array<any>();
            }
        }
        catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        }
        catch (e) {
        }
    }
    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
    }
    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array();
            }
            this.AllUserChats[user].push(messageObj);
        }
        catch (e) { }
    }
}
ProviderRoomTokboxComponent.ɵfac = function ProviderRoomTokboxComponent_Factory(t) { return new (t || ProviderRoomTokboxComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_7__["UploadDownloadService"])); };
ProviderRoomTokboxComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProviderRoomTokboxComponent, selectors: [["ng-component"]], viewQuery: function ProviderRoomTokboxComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.scrollBottom = _t.first);
    } }, outputs: { downloadStatus: "downloadStatus" }, decls: 104, vars: 12, consts: [["id", "page-top"], [1, "row", "m-w100"], [1, "col-9", "col-md-9", "col-sm-12", "col-xs-12", "p-0"], [1, "video-frame"], ["width", "560", "height", "315", "frameborder", "0", "allow", "microphone; camera", "allowfullscreen", "", 3, "src"], [1, "col-md-3", "col-sm-12", "col-xs-12", "p-0", "right-panel"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "close"], [1, "card-header", "accordionItemHeading", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between", "br-0"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-users"], ["href", "javascript:;", "routerLink", "/Home", 1, "btn", "btn-primary", "btn-sm", "p-rm10", 3, "state"], [1, "fa", "fa-home"], ["href", "javascript:;", 1, "btn", "btn-primary", "btn-sm", "p-rm10", 3, "click"], [1, "tab-content", "card", "shadow"], ["class", "card-header accordionItemHeading py-3 d-flex flex-row align-items-center justify-content-between br-0", 4, "ngFor", "ngForOf"], [1, "card-body", "p-0", "accordionItemContent"], [1, "table"], ["align", "right", 2, "padding-right", "0"], [1, "online"], [1, "d-block", "joined-time"], [1, "fa", "fa-clock-o"], ["align", "right"], ["href", "#", 1, "btn", "btn-success", "btn-sm"], [1, "fa", "fa-video-camera"], [1, "fa", "fa-comments"], [1, "btn", "btn-success", "btn-sm"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "open"], [1, "chatbox-holder"], [1, "chatbox"], [3, "formGroup"], [1, "chat-messages"], ["for", "selPatient", 4, "ngIf"], ["id", "selPatient", "formControlName", "selUser", 3, "change", 4, "ngIf"], ["style", "color: red;display: inline;", 4, "ngIf"], ["class", "message-box-holder", 4, "ngFor", "ngForOf"], ["class", "chat-input-holder", 4, "ngIf"], ["id", "myModalpdf", "role", "dialog", 1, "modal", "fade", "uploads"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["type", "button", "data-dismiss", "modal", 1, "close"], [1, "modal-body"], ["src", "img/Telemedicine.pdf", "target", "_blank"], ["id", "myModalimg", "role", "dialog", 1, "modal", "fade", "uploads"], ["src", "img/1.jpg", "alt", ""], ["class", "card mb-4 br-0 b-0 accordionItem open", 4, "ngIf"], [1, "fa", "fa-calendar"], ["download", "", 3, "href"], ["for", "selPatient"], ["id", "selPatient", "formControlName", "selUser", 3, "change"], ["disabled", "", "value", "null"], [4, "ngFor", "ngForOf"], [2, "color", "red", "display", "inline"], [1, "message-box-holder"], ["scrollBtm", ""], [1, "message-sender"], [1, "chat-input-holder"], ["placeholder", "Type your message here..", "formControlName", "chatMessage", 1, "chat-input", 3, "keyup"], ["style", "color: red;", 4, "ngIf"], ["type", "button", "value", "Send", 1, "message-send", "btn-primary", 3, "click"], [2, "color", "red"], [1, "fa", "fa-list"], [1, "after-visit-summary", "card-body", "p-0", "accordionItemContent"], ["action", ""], [1, "form-group", "row"], ["for", "", 1, "col-md-12", "control-label"], [1, "custom-control", "custom-checkbox", "small", "d-inline"], ["type", "checkbox", "id", "customChecklo", "name", "labOrdersSent", 1, "custom-control-input", 3, "ngModel", "ngModelChange"], ["for", "customChecklo", 1, "custom-control-label"], ["type", "checkbox", "id", "customChecknp", "name", "newPrescriptionsSentToYourPharmacy", 1, "custom-control-input", 3, "ngModel", "ngModelChange"], ["for", "customChecknp", 1, "custom-control-label"], ["type", "checkbox", "id", "customChecknm", "name", "newPrescriptionsMailedToYou", 1, "custom-control-input", 3, "ngModel", "ngModelChange"], ["for", "customChecknm", 1, "custom-control-label"], ["name", "Advice", "id", "", "cols", "30", "rows", "10", 1, "form-control", 2, "height", "100px !important", 3, "ngModel", "ngModelChange"], ["for", "", 1, "col-md-4", "control-label", 2, "position", "relative", "top", "5px"], [1, "col-md-3", "p-0"], ["type", "text", "name", "followUpNumber", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-md-4"], ["name", "followUpMeasure", 1, "form-control", 3, "ngModel", "ngModelChange"], ["value", "Weeks"], ["value", "Days"], ["value", "Months"], [1, "row", "mt-4"], [1, "col-md-12", "p-0"], ["value", "Complete visit", "type", "button", "name", "", "class", "btn btn-lg btn-primary btn-block", "style", "font-size: 14px;", "href", "javascript:;", "routerLink", "/Home", 3, "state", "click", 4, "ngIf"], ["value", "Complete visit", "type", "button", "name", "", "href", "javascript:;", "routerLink", "/Home", 1, "btn", "btn-lg", "btn-primary", "btn-block", 2, "font-size", "14px", 3, "state", "click"]], template: function ProviderRoomTokboxComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "iframe", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "safe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Other Patients ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Dashboard ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Uploaded Documents ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderRoomTokboxComponent_Template_a_click_19_listener() { return ctx.getFiles(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Documents ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, ProviderRoomTokboxComponent_div_24_Template, 5, 2, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "table", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Adam Smith");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "15 mins ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Call ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Chat ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Nethan");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "15 mins ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Call ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Chat ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Wes Brown");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "15 mins ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Call ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Chat ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "form", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](82, ProviderRoomTokboxComponent_label_82_Template, 2, 1, "label", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](83, ProviderRoomTokboxComponent_select_83_Template, 4, 2, "select", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](84, ProviderRoomTokboxComponent_div_84_Template, 2, 1, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](85, ProviderRoomTokboxComponent_div_85_Template, 6, 2, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](86, ProviderRoomTokboxComponent_div_86_Template, 4, 1, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "button", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "embed", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "button", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "img", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](103, ProviderRoomTokboxComponent_div_103_Template, 48, 7, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 10, ctx.global.config.videourl), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeResourceUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("state", ctx.global.patientObj);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.documentArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.ChatForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "selUser") && ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ChatMessages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.global.isProvider);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"]], pipes: [src_Common_safe_pipe__WEBPACK_IMPORTED_MODULE_9__["SafePipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProviderRoomTokboxComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './provider-room-tokbox.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_6__["Global"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_7__["UploadDownloadService"] }]; }, { downloadStatus: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], scrollBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['scrollBtm', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/provider/provider-room/provider-room.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/provider/provider-room/provider-room.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProviderRoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderRoomComponent", function() { return ProviderRoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_vendor_jitsi_external_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/vendor/jitsi/external_api.js */ "./src/vendor/jitsi/external_api.js");
/* harmony import */ var src_vendor_jitsi_external_api_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(src_vendor_jitsi_external_api_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/Common/upload-download.service */ "./src/Common/upload-download.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");












const _c0 = ["scrollBtm"];
function ProviderRoomComponent_div_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h6", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const temp_r5389 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", temp_r5389.fileAdr, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](temp_r5389.filename);
} }
function ProviderRoomComponent_label_81_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5383 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r5383.global.isProvider ? "Patient" : "Provider", ": ");
} }
function ProviderRoomComponent_select_82_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r5391 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r5391.name, " ");
} }
function ProviderRoomComponent_select_82_Template(rf, ctx) { if (rf & 1) {
    const _r5393 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "select", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProviderRoomComponent_select_82_Template_select_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5393); const ctx_r5392 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5392.OnChatUserChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "option", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProviderRoomComponent_select_82_option_3_Template, 2, 1, "option", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5384 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Select ", ctx_r5384.global.isProvider ? "Patient" : "Provider", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5384.ChatUserDropDowns);
} }
function ProviderRoomComponent_div_83_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5385 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r5385.global.isProvider ? "Patient" : "Provider", " is required ");
} }
function ProviderRoomComponent_div_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 53, 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const msg_r5394 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5394.name, " :-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", msg_r5394.message, " ");
} }
function ProviderRoomComponent_div_85_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Chat message is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProviderRoomComponent_div_85_Template(rf, ctx) { if (rf & 1) {
    const _r5398 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "textarea", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function ProviderRoomComponent_div_85_Template_textarea_keyup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5398); const ctx_r5397 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5397.onChatEnter($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProviderRoomComponent_div_85_div_2_Template, 2, 0, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderRoomComponent_div_85_Template_input_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5398); const ctx_r5399 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5399.SendChatMsg(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5387 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5387.hasError("required", "chatMessage"));
} }
function ProviderRoomComponent_div_102_input_47_Template(rf, ctx) { if (rf & 1) {
    const _r5402 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderRoomComponent_div_102_input_47_Template_input_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5402); const ctx_r5401 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5401.PatientAttended(ctx_r5401.global.patientObj); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5400 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("state", ctx_r5400.global.patientObj);
} }
function ProviderRoomComponent_div_102_Template(rf, ctx) { if (rf & 1) {
    const _r5404 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h6", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "After visit summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "What we did today?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomComponent_div_102_Template_input_ngModelChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5404); const ctx_r5403 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5403.global.patientObj.labOrdersSent = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "label", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " \u00A0Lab Orders Sent ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomComponent_div_102_Template_input_ngModelChange_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5404); const ctx_r5405 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5405.global.patientObj.newPrescriptionsSentToYourPharmacy = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "label", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " \u00A0New prescriptions sent to your pharmacy ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomComponent_div_102_Template_input_ngModelChange_25_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5404); const ctx_r5406 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5406.global.patientObj.newPrescriptionsMailedToYou = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "label", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " \u00A0New prescriptions mailed to you ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "label", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Advice");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "textarea", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomComponent_div_102_Template_textarea_ngModelChange_31_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5404); const ctx_r5407 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5407.global.patientObj.medication = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Follow Up in");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "input", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomComponent_div_102_Template_input_ngModelChange_36_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5404); const ctx_r5408 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5408.global.patientObj.followUpNumber = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "select", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProviderRoomComponent_div_102_Template_select_ngModelChange_38_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5404); const ctx_r5409 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5409.global.patientObj.followUpMeasure = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Weeks");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "option", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Days");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "option", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Months");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, ProviderRoomComponent_div_102_input_47_Template, 1, 1, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5388 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5388.global.patientObj.labOrdersSent);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5388.global.patientObj.newPrescriptionsSentToYourPharmacy);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5388.global.patientObj.newPrescriptionsMailedToYou);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5388.global.patientObj.medication);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5388.global.patientObj.followUpNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5388.global.patientObj.followUpMeasure);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5388.global.isProvider);
} }
class ProviderRoomComponent {
    constructor(httpClient, routing, formBuilder, notificationService, global, cdr, service) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.global = global;
        this.cdr = cdr;
        this.service = service;
        this.documentArray = [];
        this.CompletedPatients = null;
        this.showPatDetail = false;
        this.patients = new Array();
        this.showChat = true;
        this.AllUserChats = {};
        this.ChatMessages = new Array();
        this.ChatReceivedMessages = new Array();
        this.ChatUserDropDowns = new Array();
        this.patientObj = null;
        this.providerObj = null;
        this.initForm();
        this.state = history.state;
        if (this.global.isPatient) {
            this.notificationService.EventCompletePatient
                .subscribe(_patient => {
                this.patientObj = _patient;
                this.PatientCompleted(_patient);
                this.ChatUserDropDowns = new Array();
            });
            this.notificationService.EventGetAllProviders.subscribe(_providers => {
                this.ChatUserDropDowns = _providers;
            });
            // gets doctor list
            this.notificationService.LoadActiveDoctors();
        }
        else {
            this.notificationService.Connect();
            this.notificationService.EventGetAllPatients
                .subscribe(_patients => {
                this.patients = _patients;
                this.ChatUserDropDowns = _patients;
                console.log(this.ChatUserDropDowns);
            });
            this.notificationService.EventCallPatient.subscribe(_patient => {
                this.patientObj = _patient;
            });
        }
        this.notificationService.EventChatMessage.subscribe(data => {
            if (this.ChatForm.controls['selUser'].value != data.name) {
                this.ChatForm.controls['selUser'].setValue(data.name);
                this.OnChatUserChange();
            }
            if (!this.showChat) {
                this.showChat = true;
            }
            const chatMsg = { name: data.name, message: data.message, Class: 'receiver-msg' };
            this.ChatMessages.push(chatMsg);
            // this.toastr.success(chatMsg.Message, chatMsg.Name,
            //   {timeOut: 5000});
            //this.ChatReceivedMessages.push(chatMsg);
            this.pushChatMsgUserwise(data.name, chatMsg);
            this.cdr.detectChanges();
            //this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(false); // scroll to bottom
        });
    }
    ngOnInit() {
        this.state = history.state;
        /*8/9/2020 => Updated by Bhavana Vanjani*/
        this.domain = "meet.jit.si";
        this.options = {
            roomName: this.global.providerObj.roomName,
            width: 950,
            height: 570,
            parentNode: document.querySelector('#meet'),
            configOverwrite: {
                doNotStoreRoom: true,
                disableInviteFunctions: true,
                startWithVideoMuted: true,
                startWithAudioMuted: true,
                enableWelcomePage: false,
                disableRemoteMute: true,
                prejoinPageEnabled: false,
                remoteVideoMenu: {
                    // If set to true the 'Kick out' button will be disabled.
                    disableKick: true
                },
            },
            interfaceConfigOverwrite: {
                //DISABLE_VIDEO_BACKGROUND: true,
                SHOW_JITSI_WATERMARK: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
                JITSI_WATERMARK_LINK: '',
                BRAND_WATERMARK_LINK: '',
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
                DEFAULT_REMOTE_DISPLAY_NAME: this.global.patientObj.name,
                disable1On1Mode: false,
                REMOTE_THUMBNAIL_RATIO: 0,
                filmStripOnly: false,
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'videoquality']
            }
        };
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    }
    initForm() {
        this.ChatForm = this.formBuilder.group({
            selUser: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            chatMessage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        const control = this.ChatForm.controls[controlname];
        return control.hasError(typeofvalidator) && control.dirty;
    }
    getFiles() {
        this.httpClient.get(this.service.apiFileUrl).subscribe(data => {
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    this.FileName = data[i].replace(/^.*[\\\/]/, '');
                    this.documentArray[i] =
                        {
                            filename: this.FileName,
                            filepath: data[i],
                            fileAdr: this.service.DownloadUrl + this.FileName
                        };
                }
            }
            else {
                alert("files are not uploaded yet");
            }
        });
    }
    PatientAttended(attendedPatient) {
        this.showPatDetail = false;
        attendedPatient.medication = this.patientObj.medication;
        attendedPatient.url = this.global.providerObj.url;
        this.notificationService.PatientAttended(attendedPatient);
        this.patientObj = attendedPatient;
        this.routing.navigateByUrl('/Home', { state: this.global });
    }
    LoadPatientSuccess(res) {
        this.CompletedPatients = res;
    }
    CallPatient(callPatient) {
        if (this.global.patientObj.status == 1) {
            this.global.patientObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_3__["Patient"];
        }
        this.showPatDetail = true;
        this.notificationService.CallPatient(callPatient);
    }
    PatientCompleted(res) {
        if (res.name == this.global.patientObj.name) {
            this.global.patientObj = res;
            this.routing.navigate(['/ReportSummary']);
        }
    }
    Error(res) {
        alert(res.status);
    }
    SendChatMsg() {
        try {
            for (const i in this.ChatForm.controls) {
                this.ChatForm.controls[i].markAsDirty();
                this.ChatForm.controls[i].updateValueAndValidity();
            }
            if (this.ChatForm.valid) {
                const chatMsg = {
                    isProvider: this.global.isProvider ? false : true,
                    name: this.ChatForm.controls['selUser'].value,
                    message: this.ChatForm.controls['chatMessage'].value
                };
                const chatmsgObj = { name: 'Me', message: chatMsg.message, Class: 'sender-msg' };
                this.ChatMessages.push(chatmsgObj);
                this.pushChatMsgUserwise(this.ChatForm.controls['selUser'].value, chatmsgObj);
                this.cdr.detectChanges();
                this.scrollBottom.nativeElement.lastElementChild.scrollIntoView(); // scroll to bottom
                this.notificationService.SendChatMessage(chatMsg);
                this.ChatForm.reset();
                this.ChatForm.controls['selUser'].setValue(chatMsg.name);
            }
        }
        catch (e) { }
    }
    OnChatUserChange() {
        try {
            const selUser = this.ChatForm.controls['selUser'].value;
            if (this.AllUserChats.hasOwnProperty(selUser)) {
                this.ChatMessages = this.AllUserChats[selUser].slice();
                // this.ChatReceivedMessages=this.AllUserChats[selUser].slice();
            }
            else {
                this.ChatMessages = new Array();
                // this.ChatReceivedMessages=new Array<any>();
            }
        }
        catch (e) { }
    }
    OnShowHideChat() {
        try {
            this.showChat = !this.showChat;
        }
        catch (e) {
        }
    }
    onChatEnter(event) {
        if (event.keyCode === 13) {
            this.SendChatMsg();
        }
    }
    pushChatMsgUserwise(user, messageObj) {
        try {
            if (!this.AllUserChats.hasOwnProperty(user)) {
                this.AllUserChats[user] = new Array();
            }
            this.AllUserChats[user].push(messageObj);
        }
        catch (e) { }
    }
}
ProviderRoomComponent.ɵfac = function ProviderRoomComponent_Factory(t) { return new (t || ProviderRoomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_7__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_8__["UploadDownloadService"])); };
ProviderRoomComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProviderRoomComponent, selectors: [["ng-component"]], viewQuery: function ProviderRoomComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.scrollBottom = _t.first);
    } }, outputs: { downloadStatus: "downloadStatus" }, decls: 103, vars: 9, consts: [["id", "page-top"], [1, "row", "m-w100"], [1, "col-9", "col-md-9", "col-sm-12", "col-xs-12", "p-0"], [1, "video-frame", 2, "padding", "3%"], ["id", "meet"], [1, "col-md-3", "col-sm-12", "col-xs-12", "p-0", "right-panel"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "close"], [1, "card-header", "accordionItemHeading", "py-3", "d-flex", "flex-row", "align-items-center", "justify-content-between", "br-0"], [1, "m-0", "font-weight-bold"], [1, "fa", "fa-users"], ["href", "javascript:;", "routerLink", "/Home", 1, "btn", "btn-primary", "btn-sm", "p-rm10", 3, "state"], [1, "fa", "fa-home"], ["href", "javascript:;", 1, "btn", "btn-primary", "btn-sm", "p-rm10", 3, "click"], [1, "tab-content", "card", "shadow"], ["class", "card-header accordionItemHeading py-3 d-flex flex-row align-items-center justify-content-between br-0", 4, "ngFor", "ngForOf"], [1, "card-body", "p-0", "accordionItemContent"], [1, "table"], ["align", "right", 2, "padding-right", "0"], [1, "online"], [1, "d-block", "joined-time"], [1, "fa", "fa-clock-o"], ["align", "right"], ["href", "#", 1, "btn", "btn-success", "btn-sm"], [1, "fa", "fa-video-camera"], [1, "fa", "fa-comments"], [1, "btn", "btn-success", "btn-sm"], [1, "card", "mb-4", "br-0", "b-0", "accordionItem", "open"], [1, "chatbox-holder"], [1, "chatbox"], [3, "formGroup"], [1, "chat-messages"], ["for", "selPatient", 4, "ngIf"], ["id", "selPatient", "formControlName", "selUser", 3, "change", 4, "ngIf"], ["style", "color: red;display: inline;", 4, "ngIf"], ["class", "message-box-holder", 4, "ngFor", "ngForOf"], ["class", "chat-input-holder", 4, "ngIf"], ["id", "myModalpdf", "role", "dialog", 1, "modal", "fade", "uploads"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["type", "button", "data-dismiss", "modal", 1, "close"], [1, "modal-body"], ["src", "img/Telemedicine.pdf", "target", "_blank"], ["id", "myModalimg", "role", "dialog", 1, "modal", "fade", "uploads"], ["src", "img/1.jpg", "alt", ""], ["class", "card mb-4 br-0 b-0 accordionItem open", 4, "ngIf"], [1, "fa", "fa-calendar"], ["download", "", 3, "href"], ["for", "selPatient"], ["id", "selPatient", "formControlName", "selUser", 3, "change"], ["disabled", "", "value", "null"], [4, "ngFor", "ngForOf"], [2, "color", "red", "display", "inline"], [1, "message-box-holder"], ["scrollBtm", ""], [1, "message-sender"], [1, "chat-input-holder"], ["placeholder", "Type your message here..", "formControlName", "chatMessage", 1, "chat-input", 3, "keyup"], ["style", "color: red;", 4, "ngIf"], ["type", "button", "value", "Send", 1, "message-send", "btn-primary", 3, "click"], [2, "color", "red"], [1, "fa", "fa-list"], [1, "after-visit-summary", "card-body", "p-0", "accordionItemContent"], ["action", ""], [1, "form-group", "row"], ["for", "", 1, "col-md-12", "control-label"], [1, "custom-control", "custom-checkbox", "small", "d-inline"], ["type", "checkbox", "id", "customChecklo", "name", "labOrdersSent", 1, "custom-control-input", 3, "ngModel", "ngModelChange"], ["for", "customChecklo", 1, "custom-control-label"], ["type", "checkbox", "id", "customChecknp", "name", "newPrescriptionsSentToYourPharmacy", 1, "custom-control-input", 3, "ngModel", "ngModelChange"], ["for", "customChecknp", 1, "custom-control-label"], ["type", "checkbox", "id", "customChecknm", "name", "newPrescriptionsMailedToYou", 1, "custom-control-input", 3, "ngModel", "ngModelChange"], ["for", "customChecknm", 1, "custom-control-label"], ["name", "Advice", "id", "", "cols", "30", "rows", "10", 1, "form-control", 2, "height", "100px !important", 3, "ngModel", "ngModelChange"], ["for", "", 1, "col-md-4", "control-label", 2, "position", "relative", "top", "5px"], [1, "col-md-3", "p-0"], ["type", "text", "name", "followUpNumber", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "col-md-4"], ["name", "followUpMeasure", 1, "form-control", 3, "ngModel", "ngModelChange"], ["value", "Weeks"], ["value", "Days"], ["value", "Months"], [1, "row", "mt-4"], [1, "col-md-12", "p-0"], ["value", "Complete visit", "type", "button", "name", "", "class", "btn btn-lg btn-primary btn-block", "style", "font-size: 14px;", "href", "javascript:;", "routerLink", "/Home", 3, "state", "click", 4, "ngIf"], ["value", "Complete visit", "type", "button", "name", "", "href", "javascript:;", "routerLink", "/Home", 1, "btn", "btn-lg", "btn-primary", "btn-block", 2, "font-size", "14px", 3, "state", "click"]], template: function ProviderRoomComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Other Patients ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Dashboard ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Uploaded Documents ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProviderRoomComponent_Template_a_click_18_listener() { return ctx.getFiles(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Documents ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, ProviderRoomComponent_div_23_Template, 5, 2, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "table", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Adam Smith");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "15 mins ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Call ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Chat ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Nethan");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "15 mins ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Call ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Chat ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Wes Brown");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "15 mins ago");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Call ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Chat ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "form", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](81, ProviderRoomComponent_label_81_Template, 2, 1, "label", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](82, ProviderRoomComponent_select_82_Template, 4, 2, "select", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](83, ProviderRoomComponent_div_83_Template, 2, 1, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](84, ProviderRoomComponent_div_84_Template, 6, 2, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](85, ProviderRoomComponent_div_85_Template, 4, 1, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "button", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "embed", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "button", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "img", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](102, ProviderRoomComponent_div_102_Template, 48, 7, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("state", ctx.global.patientObj);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.documentArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.ChatForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "selUser") && ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.ChatMessages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showChat);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.global.isProvider);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProviderRoomComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './provider-room.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_7__["Global"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: src_Common_upload_download_service__WEBPACK_IMPORTED_MODULE_8__["UploadDownloadService"] }]; }, { downloadStatus: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], scrollBottom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['scrollBtm', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/security/forgot-password/forgot-password.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/security/forgot-password/forgot-password.component.ts ***!
  \***********************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");






class ForgotPasswordComponent {
    constructor(httpClient, routing, global) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
    }
    GenerateOTP() {
        this.httpClient.
            get("/api/Clinical/?MobileNumber=" + this.mobno)
            .subscribe(res => this.Success(res), res => this.Error(res));
    }
    VerifyOTP() {
        var obj = {
            MobileNumber: this.mobno,
        };
        this.httpClient.post("/api/Clinical/VerifyOTP", obj).subscribe(res => this.SuccessVerify(res), res => this.Error(res));
    }
    Success(res) {
        this.global.providerObj = res;
        var otp = res.Otp;
        alert(otp);
    }
    SuccessVerify(res) {
        localStorage.setItem("MobileOTP", this.verifyotp);
        //localStorage.setItem("MobileNumber",this.mobno);
        this.routing.navigate(['/Login']);
    }
    Error(res) {
        // if(res.error.Message)
        //alert(res.error.Message);
    }
}
ForgotPasswordComponent.ɵfac = function ForgotPasswordComponent_Factory(t) { return new (t || ForgotPasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__["Global"])); };
ForgotPasswordComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ForgotPasswordComponent, selectors: [["ng-component"]], decls: 47, vars: 1, consts: [[1, "bg-gradient-primary"], [1, "container"], [1, "row", "justify-content-center"], [1, "col-xl-10", "col-lg-12", "col-md-9"], [1, "card", "o-hidden", "border-0", "shadow-lg", "my-5"], [1, "card-body", "p-0"], [1, "row"], [1, "d-flex", "col-lg-6", "d-none", "d-lg-block", "bg-light"], [1, "align-self-stretch", "login-left"], ["src", "img/logo.png"], [1, "my-3"], [1, "fa", "fa-phone"], [1, "text-primary"], [1, "fa", "fa-envelope"], ["href", ""], [1, "col-lg-6"], [1, "p-5"], [1, "text-center"], [1, "h3", "text-gray-700", "mb-4", "heading-text"], [1, "h6", "d-block", "mt-2"], [1, "user"], [1, "form-group"], ["name", "mobno", "type", "email", "id", "exampleInputEmail", "aria-describedby", "emailHelp", "placeholder", "Your Email or mobile number", 1, "form-control", "form-control-user", 3, "ngModel", "ngModelChange"], ["href", "javascript:;", 1, "btn", "btn-primary", "btn-user", "d-block", 3, "click"], ["href", "javascript:;", 1, "d-block", "mt-4", "text-center", 2, "color", "#999"], [1, "sticky-footer", "bg-transparent"], [1, "container", "my-auto"], [1, "copyright", "text-center", "my-auto"], [1, "text-white"], ["src", "img/logo-cap.png", 1, "powered-footer-logo", "d-block"]], template: function ForgotPasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem facilis aliquam veritatis, quam debitis beatae quaerat id totam dolor, ipsa dolorum, at iusto. Explicabo numquam, nostrum iste voluptatem maiores.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Phone Number: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "9876543210");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Email ID: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "dummy@email.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h1", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Forgot Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Confirm your Email or Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "form", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ForgotPasswordComponent_Template_input_ngModelChange_33_listener($event) { return ctx.mobno = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ForgotPasswordComponent_Template_a_click_35_listener() { return ctx.GenerateOTP(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Search ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ForgotPasswordComponent_Template_a_click_37_listener() { return ctx.VerifyOTP(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, " Cancel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "footer", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Powered by \u00A9 Fewa Telehealth 2020 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.mobno);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ForgotPasswordComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './forgot-password.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_3__["Global"] }]; }, null); })();


/***/ }),

/***/ "./src/app/security/login/login.component.ts":
/*!***************************************************!*\
  !*** ./src/app/security/login/login.component.ts ***!
  \***************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/models/DomainModels */ "./src/models/DomainModels.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_Common_global_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Common/global.model */ "./src/Common/global.model.ts");
/* harmony import */ var src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/Common/notification.service */ "./src/Common/notification.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");










function LoginComponent_img_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 31);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx_r0.practiceObj.logoPath, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function LoginComponent_img_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 32);
} }
function LoginComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " User Name is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Password is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class LoginComponent {
    constructor(httpClient, routing, global, formBuilder, notificationService, route, location) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.route = route;
        this.location = location;
        this.providerObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__["Provider"]();
        this.practiceObj = new src_models_DomainModels__WEBPACK_IMPORTED_MODULE_2__["Practice"]();
        this.clicked = false;
        this.practiceDetails = { description: '', contactNo: Number, email: '', logoPath: '' };
        this.patients = new Array();
        this.initForm();
    }
    ngOnInit() {
        this.httpClient.get(this.global.practiceUrl + 'GetPracticeConfiguration')
            .subscribe(res => {
            if (res && res.Value && res.Value.length > 0) {
                var splitted = window.location.pathname.split("/", 3);
                this.global.providerObj.url = splitted[2];
                for (let temp of res.Value) {
                    if (temp.url == splitted[1]) {
                        this.global.practiceObj = temp;
                        this.practiceObj = temp;
                        this.global.isLogo = true;
                    }
                }
            }
        }, err => {
            alert('Can not load configuration please talk with admin.');
        });
        this.state = history.state;
    }
    initForm() {
        this.providerForm = this.formBuilder.group({
            providerUserName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            providerPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    hasError(typeofvalidator, controlname) {
        var control = this.providerForm.controls[controlname];
        if (!control) {
            return false;
        }
        return control.hasError(typeofvalidator) && control.touched;
    }
    LoginProvider() {
        if (this.providerForm.invalid) {
            return;
        }
        this.providerObj.userName = this.providerForm.value.providerUserName;
        this.providerObj.password = this.providerForm.value.providerPassword;
        this.global.providerObj = this.providerObj;
        this.httpClient.
            post(this.global.apiUrl + "Security/Login", this.providerObj)
            .subscribe(res => {
            this.global.token = res.Token;
            this.global.isProvider = true;
            this.global.providerObj = res.User;
            var url = this.global.config.videourl.replace("DOCTORNAME", this.global.providerObj.userName);
            this.global.config.videourl = url;
            this.routing.navigateByUrl('/Home', { state: this.global });
        }, res => {
            alert('Can not connect please talk with admin.');
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_global_model__WEBPACK_IMPORTED_MODULE_5__["Global"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["ng-component"]], decls: 46, vars: 9, consts: [[1, "container"], [1, "row", "justify-content-center"], [1, "col-xl-10", "col-lg-12", "col-md-9"], [1, "card", "o-hidden", "border-0", "shadow-lg", "my-5"], [1, "card-body", "p-0"], [1, "row"], [1, "d-flex", "col-lg-6", "d-none", "d-lg-block", "bg-light"], [1, "align-self-stretch", "login-left"], [3, "src", 4, "ngIf"], ["src", "/img/logo.png", 4, "ngIf"], [1, "my-3"], [1, "fa", "fa-phone"], [1, "text-primary"], [1, "fa", "fa-envelope"], ["href", ""], [1, "col-lg-6"], [1, "p-5"], [1, "text-center"], [1, "h3", "text-gray-700", "mb-4", "heading-text"], [1, "h6", "d-block", "mt-2"], [1, "user", 3, "formGroup"], [1, "form-group"], ["type", "email", "formControlName", "providerUserName", "name", "UserName", "id", "exampleInputEmail", "aria-describedby", "emailHelp", "placeholder", "Username", 1, "form-control", "form-control-user"], ["style", "color: red;", 4, "ngIf"], ["type", "password", "formControlName", "providerPassword", "name", "Password", "id", "exampleInputPassword", "placeholder", "Password", 1, "form-control", "form-control-user"], ["type", "submit", "href", "javascript:;", 1, "btn", "btn-primary", "btn-user", "btn-block", 3, "disabled", "click"], [1, "sticky-footer", "bg-transparent"], [1, "container", "my-auto"], [1, "copyright", "text-center", "my-auto"], [1, "text-white"], ["src", "/img/logo-cap.png", 1, "powered-footer-logo", "d-block"], [3, "src"], ["src", "/img/logo.png"], [2, "color", "red"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, LoginComponent_img_8_Template, 1, 1, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, LoginComponent_img_9_Template, 1, 0, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Phone Number: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Email ID: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h1", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Fewa Telemedicine");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "form", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, LoginComponent_div_34_Template, 2, 0, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, LoginComponent_div_37_Template, 2, 0, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_38_listener() { ctx.LoginProvider(); return ctx.clicked = true; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "footer", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "img", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Powered by \u00A9 Danphe Telehealth 2020 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.global.isLogo);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.global.isLogo);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.practiceObj.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.practiceObj.contactNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.practiceObj.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.providerForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "providerUserName"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasError("required", "providerPassword"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.clicked);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './login.component.html'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: src_Common_global_model__WEBPACK_IMPORTED_MODULE_5__["Global"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: src_Common_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }]; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/models/DomainModels.ts":
/*!************************************!*\
  !*** ./src/models/DomainModels.ts ***!
  \************************************/
/*! exports provided: Practice, Provider, Patient, ProviderCabin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Practice", function() { return Practice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patient", function() { return Patient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProviderCabin", function() { return ProviderCabin; });
class Practice {
    constructor() {
        this.name = "";
        this.address = "";
        this.description = "";
        this.url = "";
        this.email = "";
        // email configration 
        this.emailApiKey = "";
        this.emailApiName = "";
        this.emailPlainBody = "";
        this.emailSubject = "";
        this.emailHtmlBody = "";
        this.emailAdditionalContent = "";
        this.emailMessage = "";
        // sms configration
        this.smsApiAccountSID = "";
        this.smsApiAuthToken = "";
        this.serverName = "";
    }
}
class Provider {
    constructor() {
        this.userName = "";
        this.password = "";
        this.nameTitle = "";
        this.email = "";
        this.designation = "";
        this.medicalDegree = "";
        this.clinic = "";
        this.roomName = "";
        this.callingPlatform = "";
        this.practice = "";
        this.url = "";
    }
}
class Patient {
    constructor() {
        this.name = "";
        this.email = "";
        this.labOrdersSent = false;
        this.newPrescriptionsSentToYourPharmacy = false;
        this.newPrescriptionsMailedToYou = false;
        this.followUpMeasure = "";
        this.message = "";
        this.medication = "";
        this.callingPlatform = "";
        this.practice = "";
        this.url = "";
    }
}
class ProviderCabin {
}


/***/ }),

/***/ "./src/vendor/jitsi/external_api.js":
/*!******************************************!*\
  !*** ./src/vendor/jitsi/external_api.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/libs/",n(n.s=6)}([function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"f",(function(){return u})),n.d(t,"g",(function(){return d})),n.d(t,"h",(function(){return p}));var r=n(5);const i=n.n(r).a.getLogger(e);function s(e){return e.sendRequest({type:"devices",name:"getAvailableDevices"}).catch(e=>(i.error(e),{}))}function o(e){return e.sendRequest({type:"devices",name:"getCurrentDevices"}).catch(e=>(i.error(e),{}))}function a(e,t){return e.sendRequest({deviceType:t,type:"devices",name:"isDeviceChangeAvailable"})}function c(e){return e.sendRequest({type:"devices",name:"isDeviceListAvailable"})}function l(e){return e.sendRequest({type:"devices",name:"isMultipleAudioInputSupported"})}function u(e,t,n){return h(e,{id:n,kind:"audioinput",label:t})}function d(e,t,n){return h(e,{id:n,kind:"audiooutput",label:t})}function h(e,t){return e.sendRequest({type:"devices",name:"setDevice",device:t})}function p(e,t,n){return h(e,{id:n,kind:"videoinput",label:t})}}).call(this,"modules/API/external/functions.js")},function(e,t){var n={trace:0,debug:1,info:2,log:3,warn:4,error:5};a.consoleTransport=console;var r=[a.consoleTransport];a.addGlobalTransport=function(e){-1===r.indexOf(e)&&r.push(e)},a.removeGlobalTransport=function(e){var t=r.indexOf(e);-1!==t&&r.splice(t,1)};var i={};function s(){var e={methodName:"",fileLocation:"",line:null,column:null},t=new Error,n=t.stack?t.stack.split("\n"):[];if(!n||n.length<1)return e;var r=null;return n[3]&&(r=n[3].match(/\s*at\s*(.+?)\s*\((\S*)\s*:(\d*)\s*:(\d*)\)/)),!r||r.length<=4?(0===n[2].indexOf("log@")?e.methodName=n[3].substr(0,n[3].indexOf("@")):e.methodName=n[2].substr(0,n[2].indexOf("@")),e):(e.methodName=r[1],e.fileLocation=r[2],e.line=r[3],e.column=r[4],e)}function o(){var e=arguments[0],t=arguments[1],o=Array.prototype.slice.call(arguments,2);if(!(n[t]<e.level))for(var a=!(e.options.disableCallerInfo||i.disableCallerInfo)&&s(),c=r.concat(e.transports),l=0;l<c.length;l++){var u=c[l],d=u[t];if(d&&"function"==typeof d){var h=[];h.push((new Date).toISOString()),e.id&&h.push("["+e.id+"]"),a&&a.methodName.length>1&&h.push("<"+a.methodName+">: ");var p=h.concat(o);d.bind(u).apply(u,p)}}}function a(e,t,r,i){this.id=t,this.options=i||{},this.transports=r,this.transports||(this.transports=[]),this.level=n[e];for(var s=Object.keys(n),a=0;a<s.length;a++)this[s[a]]=o.bind(null,this,s[a])}a.setGlobalOptions=function(e){i=e||{}},a.prototype.setLevel=function(e){this.level=n[e]},e.exports=a,a.levels={TRACE:"trace",DEBUG:"debug",INFO:"info",LOG:"log",WARN:"warn",ERROR:"error"}},function(e,t,n){"use strict";var r,i="object"==typeof Reflect?Reflect:null,s=i&&"function"==typeof i.apply?i.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var c=10;function l(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function d(e,t,n,r){var i,s,o,a;if(l(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),o=s[t]),void 0===o)o=s[t]=n,++e._eventsCount;else if("function"==typeof o?o=s[t]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n),(i=u(e))>0&&o.length>i&&!o.warned){o.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=o.length,a=c,console&&console.warn&&console.warn(a)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=h.bind(r);return i.listener=n,r.wrapFn=i,i}function f(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):v(i,i.length)}function m(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return u(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var c=i[e];if(void 0===c)return!1;if("function"==typeof c)s(c,this,t);else{var l=c.length,u=v(c,l);for(n=0;n<l;++n)s(u[n],this,t)}return!0},a.prototype.addListener=function(e,t){return d(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return d(this,e,t,!0)},a.prototype.once=function(e,t){return l(t),this.on(e,p(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return l(t),this.prependListener(e,p(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,r,i,s,o;if(l(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){o=n[s].listener,i=s;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,o||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,s=Object.keys(n);for(r=0;r<s.length;++r)"removeListener"!==(i=s[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},a.prototype.listeners=function(e){return f(this,e,!0)},a.prototype.rawListeners=function(e){return f(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):m.call(e,t)},a.prototype.listenerCount=m,a.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},function(e,t){e.exports=function(e){var t,n=e.scope,r=e.window,i=e.windowForEventListening||window,s={},o=[],a={},c=!1,l=function(e){var t;try{t=JSON.parse(e.data)}catch(e){return}if(t.postis&&t.scope===n){var r=s[t.method];if(r)for(var i=0;i<r.length;i++)r[i].call(null,t.params);else a[t.method]=a[t.method]||[],a[t.method].push(t.params)}};i.addEventListener("message",l,!1);var u={listen:function(e,t){s[e]=s[e]||[],s[e].push(t);var n=a[e];if(n)for(var r=s[e],i=0;i<r.length;i++)for(var o=0;o<n.length;o++)r[i].call(null,n[o]);delete a[e]},send:function(e){var t=e.method;(c||"__ready__"===e.method)&&r&&"function"==typeof r.postMessage?r.postMessage(JSON.stringify({postis:!0,scope:n,method:t,params:e.params}),"*"):o.push(e)},ready:function(e){c?e():setTimeout((function(){u.ready(e)}),50)},destroy:function(e){clearInterval(t),c=!1,i&&"function"==typeof i.removeEventListener&&i.removeEventListener("message",l),e&&e()}},d=+new Date+Math.random()+"";return t=setInterval((function(){u.send({method:"__ready__",params:d})}),50),u.listen("__ready__",(function(e){if(e===d){clearInterval(t),c=!0;for(var n=0;n<o.length;n++)u.send(o[n]);o=[]}else u.send({method:"__ready__",params:e})})),u}},function(e){e.exports=JSON.parse('{"google-auth":{"matchPatterns":{"url":"accounts.google.com"},"target":"electron"},"dropbox-auth":{"matchPatterns":{"url":"dropbox.com/oauth2/authorize"},"target":"electron"}}')},function(e,t,n){var r=n(1),i=n(7),s={},o=[],a=r.levels.TRACE;e.exports={addGlobalTransport:function(e){r.addGlobalTransport(e)},removeGlobalTransport:function(e){r.removeGlobalTransport(e)},setGlobalOptions:function(e){r.setGlobalOptions(e)},getLogger:function(e,t,n){var i=new r(a,e,t,n);return e?(s[e]=s[e]||[],s[e].push(i)):o.push(i),i},setLogLevelById:function(e,t){for(var n=t?s[t]||[]:o,r=0;r<n.length;r++)n[r].setLevel(e)},setLogLevel:function(e){a=e;for(var t=0;t<o.length;t++)o[t].setLevel(e);for(var n in s){var r=s[n]||[];for(t=0;t<r.length;t++)r[t].setLevel(e)}},levels:r.levels,LogCollector:i}},function(e,t,n){e.exports=n(8).default},function(e,t,n){var r=n(1);function i(e,t){this.logStorage=e,this.stringifyObjects=!(!t||!t.stringifyObjects)&&t.stringifyObjects,this.storeInterval=t&&t.storeInterval?t.storeInterval:3e4,this.maxEntryLength=t&&t.maxEntryLength?t.maxEntryLength:1e4,Object.keys(r.levels).forEach(function(e){this[r.levels[e]]=function(){this._log.apply(this,arguments)}.bind(this,e)}.bind(this)),this.storeLogsIntervalID=null,this.queue=[],this.totalLen=0,this.outputCache=[]}i.prototype.stringify=function(e){try{return JSON.stringify(e)}catch(e){return"[object with circular refs?]"}},i.prototype.formatLogMessage=function(e){for(var t="",n=1,i=arguments.length;n<i;n++){var s=arguments[n];!this.stringifyObjects&&e!==r.levels.ERROR||"object"!=typeof s||(s=this.stringify(s)),t+=s,n!==i-1&&(t+=" ")}return t.length?t:null},i.prototype._log=function(){var e=arguments[1],t=this.formatLogMessage.apply(this,arguments);if(t){var n=this.queue[this.queue.length-1],r=n&&n.text;r===t?n.count+=1:(this.queue.push({text:t,timestamp:e,count:1}),this.totalLen+=t.length)}this.totalLen>=this.maxEntryLength&&this._flush(!0,!0)},i.prototype.start=function(){this._reschedulePublishInterval()},i.prototype._reschedulePublishInterval=function(){this.storeLogsIntervalID&&(window.clearTimeout(this.storeLogsIntervalID),this.storeLogsIntervalID=null),this.storeLogsIntervalID=window.setTimeout(this._flush.bind(this,!1,!0),this.storeInterval)},i.prototype.flush=function(){this._flush(!1,!0)},i.prototype._flush=function(e,t){this.totalLen>0&&(this.logStorage.isReady()||e)&&(this.logStorage.isReady()?(this.outputCache.length&&(this.outputCache.forEach(function(e){this.logStorage.storeLogs(e)}.bind(this)),this.outputCache=[]),this.logStorage.storeLogs(this.queue)):this.outputCache.push(this.queue),this.queue=[],this.totalLen=0),t&&this._reschedulePublishInterval()},i.prototype.stop=function(){this._flush(!1,!1)},e.exports=i},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return k}));var r=n(2),i=n.n(r);function s(e,t=!1,n="hash"){const r="search"===n?e.search:e.hash,i={},s=r&&r.substr(1).split("&")||[];if("hash"===n&&1===s.length){const e=s[0];if(e.startsWith("/")&&1===e.split("&").length)return i}return s.forEach(e=>{const n=e.split("="),r=n[0];if(!r)return;let s;try{if(s=n[1],!t){const e=decodeURIComponent(s).replace(/\\&/,"&");s="undefined"===e?void 0:JSON.parse(e)}}catch(e){return void function(e,t=""){console.error(t,e),window.onerror&&window.onerror(t,null,null,null,e)}(e,"Failed to parse URL parameter value: "+String(s))}i[r]=s}),i}function o(e){const t=new RegExp("^([a-z][a-z0-9\\.\\+-]*:)+","gi"),n=t.exec(e);if(n){let r=n[n.length-1].toLowerCase();"http:"!==r&&"https:"!==r&&(r="https:"),(e=e.substring(t.lastIndex)).startsWith("//")&&(e=r+e)}return e}function a(e={}){const t=[];for(const n in e)try{t.push(`${n}=${encodeURIComponent(JSON.stringify(e[n]))}`)}catch(e){console.warn(`Error encoding ${n}: ${e}`)}return t}function c(e){const t={toString:l};let n,r,i;if(e=e.replace(/\s/g,""),n=new RegExp("^([a-z][a-z0-9\\.\\+-]*:)","gi"),r=n.exec(e),r&&(t.protocol=r[1].toLowerCase(),e=e.substring(n.lastIndex)),n=new RegExp("^(//[^/?#]+)","gi"),r=n.exec(e),r){let i=r[1].substring(2);e=e.substring(n.lastIndex);const s=i.indexOf("@");-1!==s&&(i=i.substring(s+1)),t.host=i;const o=i.lastIndexOf(":");-1!==o&&(t.port=i.substring(o+1),i=i.substring(0,o)),t.hostname=i}if(n=new RegExp("^([^?#]*)","gi"),r=n.exec(e),r&&(i=r[1],e=e.substring(n.lastIndex)),i?i.startsWith("/")||(i="/"+i):i="/",t.pathname=i,e.startsWith("?")){let n=e.indexOf("#",1);-1===n&&(n=e.length),t.search=e.substring(0,n),e=e.substring(n)}else t.search="";return t.hash=e.startsWith("#")?e:"",t}function l(e){const{hash:t,host:n,pathname:r,protocol:i,search:s}=e||this;let o="";return i&&(o+=i),n&&(o+="//"+n),o+=r||"/",s&&(o+=s),t&&(o+=t),o}function u(e){let t;t=e.serverURL&&e.room?new URL(e.room,e.serverURL).toString():e.room?e.room:e.url||"";const n=c(o(t));if(!n.protocol){let t=e.protocol||e.scheme;t&&(t.endsWith(":")||(t+=":"),n.protocol=t)}let{pathname:r}=n;if(!n.host){const t=e.domain||e.host||e.hostname;if(t){const{host:e,hostname:i,pathname:s,port:a}=c(o("org.jitsi.meet://"+t));e&&(n.host=e,n.hostname=i,n.port=a),"/"===r&&"/"!==s&&(r=s)}}const i=e.roomName||e.room;!i||!n.pathname.endsWith("/")&&n.pathname.endsWith("/"+i)||(r.endsWith("/")||(r+="/"),r+=i),n.pathname=r;const{jwt:s}=e;if(s){let{search:e}=n;-1===e.indexOf("?jwt=")&&-1===e.indexOf("&jwt=")&&(e.startsWith("?")||(e="?"+e),1===e.length||(e+="&"),e+="jwt="+s,n.search=e)}let{hash:l}=n;for(const t of["config","interfaceConfig","devices","userInfo"]){const n=a(e[t+"Overwrite"]||e[t]||e[t+"Override"]);if(n.length){let e=`${t}.${n.join(`&${t}.`)}`;l.length?e="&"+e:l="#",l+=e}}return n.hash=l,n.toString()||void 0}var d=n(3),h=n.n(d);function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const f={window:window.opener||window.parent};class m{constructor({postisOptions:e}={}){this.postis=h()(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){p(e,t,n[t])}))}return e}({},f,e)),this._receiveCallback=()=>{},this.postis.listen("message",e=>this._receiveCallback(e))}dispose(){this.postis.destroy()}send(e){this.postis.send({method:"message",params:e})}setReceiveCallback(e){this._receiveCallback=e}}class v{constructor({backend:e}={}){this._listeners=new Map,this._requestID=0,this._responseHandlers=new Map,this._unprocessedMessages=new Set,this.addListener=this.on,e&&this.setBackend(e)}_disposeBackend(){this._backend&&(this._backend.dispose(),this._backend=null)}_onMessageReceived(e){if("response"===e.type){const t=this._responseHandlers.get(e.id);t&&(t(e),this._responseHandlers.delete(e.id))}else"request"===e.type?this.emit("request",e.data,(t,n)=>{this._backend.send({type:"response",error:n,id:e.id,result:t})}):this.emit("event",e.data)}dispose(){this._responseHandlers.clear(),this._unprocessedMessages.clear(),this.removeAllListeners(),this._disposeBackend()}emit(e,...t){const n=this._listeners.get(e);let r=!1;return n&&n.size&&n.forEach(e=>{r=e(...t)||r}),r||this._unprocessedMessages.add(t),r}on(e,t){let n=this._listeners.get(e);return n||(n=new Set,this._listeners.set(e,n)),n.add(t),this._unprocessedMessages.forEach(e=>{t(...e)&&this._unprocessedMessages.delete(e)}),this}removeAllListeners(e){return e?this._listeners.delete(e):this._listeners.clear(),this}removeListener(e,t){const n=this._listeners.get(e);return n&&n.delete(t),this}sendEvent(e={}){this._backend&&this._backend.send({type:"event",data:e})}sendRequest(e){if(!this._backend)return Promise.reject(new Error("No transport backend defined!"));this._requestID++;const t=this._requestID;return new Promise((n,r)=>{this._responseHandlers.set(t,({error:e,result:t})=>{void 0!==t?n(t):r(void 0!==e?e:new Error("Unexpected response format!"))}),this._backend.send({type:"request",data:e,id:t})})}setBackend(e){this._disposeBackend(),this._backend=e,this._backend.setReceiveCallback(this._onMessageReceived.bind(this))}}const g=s(window.location).jitsi_meet_external_api_id,y={};let _;"number"==typeof g&&(y.scope="jitsi_meet_external_api_"+g),(window.JitsiMeetJS||(window.JitsiMeetJS={}),window.JitsiMeetJS.app||(window.JitsiMeetJS.app={}),window.JitsiMeetJS.app).setExternalTransportBackend=e=>_.setBackend(e);var b=n(4),w=n(0);function L(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const x=["css/all.css","libs/alwaysontop.min.js"],j={avatarUrl:"avatar-url",displayName:"display-name",e2eeKey:"e2ee-key",email:"email",hangup:"video-hangup",muteEveryone:"mute-everyone",password:"password",sendEndpointTextMessage:"send-endpoint-text-message",sendTones:"send-tones",setVideoQuality:"set-video-quality",startRecording:"start-recording",stopRecording:"stop-recording",subject:"subject",submitFeedback:"submit-feedback",toggleAudio:"toggle-audio",toggleChat:"toggle-chat",toggleFilmStrip:"toggle-film-strip",toggleShareScreen:"toggle-share-screen",toggleTileView:"toggle-tile-view",toggleVideo:"toggle-video"},E={"avatar-changed":"avatarChanged","audio-availability-changed":"audioAvailabilityChanged","audio-mute-status-changed":"audioMuteStatusChanged","camera-error":"cameraError","device-list-changed":"deviceListChanged","display-name-change":"displayNameChange","email-change":"emailChange","endpoint-text-message-received":"endpointTextMessageReceived","feedback-submitted":"feedbackSubmitted","feedback-prompt-displayed":"feedbackPromptDisplayed","filmstrip-display-changed":"filmstripDisplayChanged","incoming-message":"incomingMessage","mic-error":"micError","outgoing-message":"outgoingMessage","participant-joined":"participantJoined","participant-kicked-out":"participantKickedOut","participant-left":"participantLeft","participant-role-changed":"participantRoleChanged","password-required":"passwordRequired","proxy-connection-event":"proxyConnectionEvent","video-ready-to-close":"readyToClose","video-conference-joined":"videoConferenceJoined","video-conference-left":"videoConferenceLeft","video-availability-changed":"videoAvailabilityChanged","video-mute-status-changed":"videoMuteStatusChanged","screen-sharing-status-changed":"screenSharingStatusChanged","dominant-speaker-changed":"dominantSpeakerChanged","subject-change":"subjectChange","suspend-detected":"suspendDetected","tile-view-changed":"tileViewChanged"};let C=0;function S(e,t){e._numberOfParticipants+=t}function I(e,t={}){return u(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){O(e,t,n[t])}))}return e}({},t,{url:`${t.noSSL?"http":"https"}://${e}/#jitsi_meet_external_api_id=${C}`}))}function R(e){let t;return"string"==typeof e&&null!==String(e).match(/([0-9]*\.?[0-9]+)(em|pt|px|%)$/)?t=e:"number"==typeof e&&(t=e+"px"),t}class k extends i.a{constructor(e,...t){super();const{roomName:n="",width:r="100%",height:i="100%",parentNode:s=document.body,configOverwrite:o={},interfaceConfigOverwrite:a={},noSSL:c=!1,jwt:l,onload:u,invitees:d,devices:h,userInfo:p,e2eeKey:f}=function(e){if(!e.length)return{};switch(typeof e[0]){case"string":case void 0:{const[t,n,r,i,s,o,a,c,l]=e;return{roomName:t,width:n,height:r,parentNode:i,configOverwrite:s,interfaceConfigOverwrite:o,noSSL:a,jwt:c,onload:l}}case"object":return e[0];default:throw new Error("Can't parse the arguments!")}}(t);this._parentNode=s,this._url=I(e,{configOverwrite:o,interfaceConfigOverwrite:a,jwt:l,noSSL:c,roomName:n,devices:h,userInfo:p}),this._createIFrame(i,r,u),this._transport=new v({backend:new m({postisOptions:{scope:"jitsi_meet_external_api_"+C,window:this._frame.contentWindow}})}),Array.isArray(d)&&d.length>0&&this.invite(d),this._tmpE2EEKey=f,this._isLargeVideoVisible=!0,this._numberOfParticipants=0,this._participants={},this._myUserID=void 0,this._onStageParticipant=void 0,this._setupListeners(),C++}_createIFrame(e,t,n){const r="jitsiConferenceFrame"+C;this._frame=document.createElement("iframe"),this._frame.allow="camera; microphone; display-capture",this._frame.src=this._url,this._frame.name=r,this._frame.id=r,this._setSize(e,t),this._frame.setAttribute("allowFullScreen","true"),this._frame.style.border=0,n&&(this._frame.onload=n),this._frame=this._parentNode.appendChild(this._frame)}_getAlwaysOnTopResources(){const e=this._frame.contentWindow,t=e.document;let n="";const r=t.querySelector("base");if(r&&r.href)n=r.href;else{const{protocol:t,host:r}=e.location;n=`${t}//${r}`}return x.map(e=>new URL(e,n).href)}_getOnStageParticipant(){return this._onStageParticipant}_getLargeVideo(){const e=this.getIFrame();if(this._isLargeVideoVisible&&e&&e.contentWindow&&e.contentWindow.document)return e.contentWindow.document.getElementById("largeVideo")}_getParticipantVideo(e){const t=this.getIFrame();if(t&&t.contentWindow&&t.contentWindow.document)return void 0===e||e===this._myUserID?t.contentWindow.document.getElementById("localVideo_container"):t.contentWindow.document.querySelector(`#participant_${e} video`)}_setSize(e,t){const n=R(e),r=R(t);void 0!==n&&(this._frame.style.height=n),void 0!==r&&(this._frame.style.width=r)}_setupListeners(){this._transport.on("event",e=>{let{name:t}=e,n=L(e,["name"]);const r=n.id;switch(t){case"video-conference-joined":void 0!==this._tmpE2EEKey&&(this.executeCommand(j.e2eeKey,this._tmpE2EEKey),this._tmpE2EEKey=void 0),this._myUserID=r,this._participants[r]={avatarURL:n.avatarURL};case"participant-joined":this._participants[r]=this._participants[r]||{},this._participants[r].displayName=n.displayName,this._participants[r].formattedDisplayName=n.formattedDisplayName,S(this,1);break;case"participant-left":S(this,-1),delete this._participants[r];break;case"display-name-change":{const e=this._participants[r];e&&(e.displayName=n.displayname,e.formattedDisplayName=n.formattedDisplayName);break}case"email-change":{const e=this._participants[r];e&&(e.email=n.email);break}case"avatar-changed":{const e=this._participants[r];e&&(e.avatarURL=n.avatarURL);break}case"on-stage-participant-changed":this._onStageParticipant=r,this.emit("largeVideoChanged");break;case"large-video-visibility-changed":this._isLargeVideoVisible=n.isVisible,this.emit("largeVideoChanged");break;case"video-conference-left":S(this,-1),delete this._participants[this._myUserID]}const i=E[t];return!!i&&(this.emit(i,n),!0)})}addEventListener(e,t){this.on(e,t)}addEventListeners(e){for(const t in e)this.addEventListener(t,e[t])}dispose(){this.emit("_willDispose"),this._transport.dispose(),this.removeAllListeners(),this._frame&&this._frame.parentNode&&this._frame.parentNode.removeChild(this._frame)}executeCommand(e,...t){e in j?this._transport.sendEvent({data:t,name:j[e]}):console.error("Not supported command name.")}executeCommands(e){for(const t in e)this.executeCommand(t,e[t])}getAvailableDevices(){return Object(w.a)(this._transport)}getCurrentDevices(){return Object(w.b)(this._transport)}isAudioAvailable(){return this._transport.sendRequest({name:"is-audio-available"})}isDeviceChangeAvailable(e){return Object(w.c)(this._transport,e)}isDeviceListAvailable(){return Object(w.d)(this._transport)}isMultipleAudioInputSupported(){return Object(w.e)(this._transport)}invite(e){return Array.isArray(e)&&0!==e.length?this._transport.sendRequest({name:"invite",invitees:e}):Promise.reject(new TypeError("Invalid Argument"))}isAudioMuted(){return this._transport.sendRequest({name:"is-audio-muted"})}isSharingScreen(){return this._transport.sendRequest({name:"is-sharing-screen"})}getAvatarURL(e){const{avatarURL:t}=this._participants[e]||{};return t}getDisplayName(e){const{displayName:t}=this._participants[e]||{};return t}getEmail(e){const{email:t}=this._participants[e]||{};return t}_getFormattedDisplayName(e){const{formattedDisplayName:t}=this._participants[e]||{};return t}getIFrame(){return this._frame}getNumberOfParticipants(){return this._numberOfParticipants}isVideoAvailable(){return this._transport.sendRequest({name:"is-video-available"})}isVideoMuted(){return this._transport.sendRequest({name:"is-video-muted"})}removeEventListener(e){this.removeAllListeners(e)}removeEventListeners(e){e.forEach(e=>this.removeEventListener(e))}sendProxyConnectionEvent(e){this._transport.sendEvent({data:[e],name:"proxy-connection-event"})}setAudioInputDevice(e,t){return Object(w.f)(this._transport,e,t)}setAudioOutputDevice(e,t){return Object(w.g)(this._transport,e,t)}setVideoInputDevice(e,t){return Object(w.h)(this._transport,e,t)}_getElectronPopupsConfig(){return Promise.resolve(b)}}}])}));
//# sourceMappingURL=external_api.min.map

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\QuestIT\10thSept\Telemedicine\FewaTelemedicine\ClientApp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map