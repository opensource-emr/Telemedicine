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

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.clinic.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.clinic.html ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.doctorroom.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.doctorroom.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"doctor-room\">         \r\n   \r\n    <iframe\r\n    src=\"https://tokbox.com/embed/embed/ot-embed.js?embedId=bebdaddc-562f-42bb-ad96-8a913b175188&room=DEFAULT_ROOM&iframe=true\"\r\n    width=800\r\n    height=640\r\n    scrolling=\"auto\"\r\n    allow=\"microphone; camera\"\r\n  ></iframe>\r\n\r\n    <div class=\"patient-info\">\r\n        <div class=\"info-heading\">\r\n            <img src=\"assets/img/logo-cap.png\" height=\"50px\"> \r\n            <!-- <input *ngIf=\"(this.global.IsDoctor)\" type=\"button\" (click)=\"RefreshPatients()\" name=\"name\" value=\"Refresh Patients\" /> -->\r\n             <button *ngIf=\"(this.global.IsDoctor)\" type=\"button\" (click)=\"RefreshPatients()\" name=\"name\"><span>&#9850;</span>&nbsp;Refresh Patients</button>\r\n        </div>\r\n        <div class=\"info-listing\" *ngIf=\"(this.global.IsDoctor)\">\r\n            <div *ngFor=\"let temp of patients\">\r\n                <label><span>Patient Name:</span>&nbsp;{{temp.PatientName}}</label><br>\r\n                <a (click)=\"CallPatient(temp)\" [routerLink]=\"['/DoctorRoom']\" class=\"text-link\" style=\"margin-left: 0\">Call Patient</a>\r\n                <a (click)=\"PatientAttended(temp)\" [routerLink]=\"['/DoctorRoom']\" class=\"text-link\">Patient Completed</a><br>\r\n                <span class=\"badge-no\">Status:{{temp.Status}}</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"p-all\">\r\n            <label for=\"\"> <span>&#10148;</span>&nbsp;&nbsp;Patient Name :- <span>{{global.patientObj?.PatientName}}</span></label>\r\n            <label for=\"\"> <span>&#10148;</span>&nbsp;&nbsp;Fever :- <span  [ngClass]=\"global.patientObj?.Fever == true ? 'badge-yes': 'badge-no'\">{{global.patientObj?.Fever | yesNoPipe}}</span></label>\r\n            <label for=\"\"> <span>&#10148;</span>&nbsp;&nbsp;Cough :- <span [ngClass]=\"global.patientObj?.Cough == true ? 'badge-yes': 'badge-no'\">{{global.patientObj?.Cough | yesNoPipe}}</span></label>\r\n            <label for=\"\"> <span>&#10148;</span>&nbsp;&nbsp;Tiredness :- <span [ngClass]=\"global.patientObj?.TiredNess == true ? 'badge-yes': 'badge-no'\">{{global.patientObj?.TiredNess | yesNoPipe}}</span></label>\r\n            <label for=\"\"> <span>&#10148;</span>&nbsp;&nbsp;Breathing issues :- <span [ngClass]=\"global.patientObj?.Breathing == true ? 'badge-yes': 'badge-no'\">{{global.patientObj?.Breathing| yesNoPipe}}</span></label>\r\n            <label for=\"\">  <span>&#10148;</span>&nbsp;&nbsp;Details :- <span>{{global.patientObj?.Problem}}</span></label>\r\n            <span *ngIf=\"(this.global.IsDoctor)\" style=\"margin-bottom: 15px; display: block\">Treatment Advice :</span> <textarea *ngIf=\"(this.global.IsDoctor)\" [(ngModel)]=\"global.patientObj.Medication\"></textarea>\r\n        </div>\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.finalreport.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.finalreport.html ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"wait-section\">\r\n    <div class=\"report-title\">\r\n    \t<img src=\"assets/img/logo-cap.png\" height=\"50\">\r\n    \t<h1>\r\n         This is Doctor Report for <span class=\"user-title\">{{global.patientObj?.PatientName}}</span>.\r\n        </h1>\r\n        <div class=\"waiting-icon\">\r\n\t\t\t<ul class=\"inline\">\r\n\t\t\t\t<li><span>&#10148;</span>&nbsp;&nbsp;Fever :- {{global.patientObj?.Fever| yesNoPipe}} </li>\r\n\t\t\t\t<li><span>&#10148;</span>&nbsp;&nbsp;Cough :- {{global.patientObj?.Cough| yesNoPipe}} </li>\r\n\t\t\t\t<li><span>&#10148;</span>&nbsp;&nbsp;Tiredness :- {{global.patientObj?.TiredNess| yesNoPipe}}</li>\r\n\t\t\t\t<li><span>&#10148;</span>&nbsp;&nbsp;Breathing issues :- {{global.patientObj?.Breathing| yesNoPipe}}</li>\r\n\t\t\t\t<li><span>&#10148;</span>&nbsp;&nbsp;Details<br>{{global.patientObj?.Problem}}</li>\r\n\t\t\t\t<li><span>&#10148;</span>&nbsp;&nbsp;Medication given by doctor<br>{{global.patientObj?.Medication}}</li>\r\n\t\t\t</ul>\r\n\t\t\t\r\n\t\t</div>\r\n        \r\n    </div>\r\n   \r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.login.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.login.html ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"full-section\">\r\n    <div class=\"brand-title\">\r\n        <img src=\"assets/img/logo-cap.png\" class=\"brand-img\">\r\n        <h1>\r\n          <!--  DANPHE TELEHEALTH -->\r\n          Connect with your doctor from  your home\r\n        <!-- <span>Connect with your doctor from  your home</span> -->\r\n        </h1>\r\n    </div>\r\n    <div class=\"patient-login\">\r\n        <h5 class=\"form-header\">Patients<span>Login from here.</span></h5>\r\n        <table>\r\n            <tr>\r\n               <!--  <td>\r\n                    User Name :-\r\n                </td> -->\r\n                <td>\r\n                    <label> User Name :</label>\r\n                    <input [(ngModel)]=\"patientObj.PatientName\" type=\"text\" name=\"UserName\" value=\"\" /> <input type=\"hidden\" name=\"UserType\" value=\"Patient\" />\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <!-- <td valign=\"top\">\r\n                   Covid signs :-\r\n                </td> -->\r\n                <td>\r\n                     <label>Covid signs :</label>\r\n                    <div class=\"form-group text-left\">                                    \r\n                                    <p class=\"fever-checkbox\">\r\n                                        <input [(ngModel)]=\"patientObj.Fever\" type=\"checkbox\" name=\"\" id=\"fever\">\r\n                                        <label for=\"fever\">Fever</label>\r\n                                    </p>\r\n                                     <p class=\"fever-checkbox\">\r\n                                       <input [(ngModel)]=\"patientObj.Cough\" type=\"checkbox\" name=\"\" id=\"cough\">\r\n                                        <label for=\"cough\">Cough</label>\r\n                                    </p>\r\n                                     <p class=\"fever-checkbox\">\r\n                                        <input [(ngModel)]=\"patientObj.Breathing\" type=\"checkbox\" name=\"\" id=\"breath\">\r\n                                        <label for=\"breath\">Breathing</label>\r\n                                    </p>\r\n                                     <p class=\"fever-checkbox\">\r\n                                        <input [(ngModel)]=\"patientObj.TiredNess\" type=\"checkbox\" name=\"\" id=\"tiredness\">\r\n                                        <label for=\"tiredness\">Tiredness</label>\r\n                                    </p>\r\n                                </div>\r\n                   <!--  Fever :- <input [(ngModel)]=\"patientObj.Fever\" type=\"checkbox\" name=\"\" id=\"\"><br>\r\n                    Cough:- <input [(ngModel)]=\"patientObj.Cough\" type=\"checkbox\" name=\"\" id=\"\"><br>\r\n                    Breathing:- <input [(ngModel)]=\"patientObj.Breathing\" type=\"checkbox\" name=\"\" id=\"\"><br>\r\n                   TiredNess <input [(ngModel)]=\"patientObj.TiredNess\" type=\"checkbox\" name=\"\" id=\"\"><br> -->\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n               <!--  <td valign=\"top\">\r\n                    Any specific problems :-\r\n                </td> -->\r\n                <td>\r\n                     <label>Any specific problems :</label>\r\n                    <textarea [(ngModel)]=\"patientObj.Problem\" cols=\"50\" rows=\"5\" name=\"Problem\"></textarea>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                \r\n                <td>\r\n                    <input type=\"button\" (click)=\"LoginPatient()\" name=\"name\" value=\"Login\" />\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <div class=\"doctor-login\">\r\n        <h5 class=\"form-header\">Doctor<span>Login from here.</span></h5>\r\n    <table>\r\n            <tr>\r\n                \r\n                <td>\r\n                    <label>User Name :</label>\r\n                    <input [(ngModel)]=\"doctorObj.DoctorName\" type=\"text\" name=\"UserName\" value=\"\" />\r\n                </td>\r\n            </tr>\r\n            <tr>                \r\n                <td valign=\"top\">\r\n                    <label>Password:</label>\r\n                    <input [(ngModel)]=\"doctorObj.Password\" type=\"text\" name=\"Password\" value=\"\" /><input type=\"hidden\" name=\"UserType\" value=\"Doctor\" />\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n               \r\n                <td colspan=\"2\">\r\n                    <input type=\"button\" (click)=\"LoginDoctor()\" name=\"name\" value=\"Login\" />\r\n                </td>\r\n            </tr>\r\n    </table> \r\n\r\n    </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.waitingroom.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.waitingroom.html ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"wait-section\">\r\n    <div class=\"brand-title\">\r\n        <div class=\"waiting-icon\">\r\n\t\t<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 328.01 294.15\"><defs><style>.cls-1{fill:#7dd7ff;}.cls-2{fill:#a6e8ff;}.cls-3{fill:#5eb5ea;}.cls-4{fill:#7dd4ff;}.cls-5{fill:#adb5c4;}.cls-6{fill:#838e9e;}.cls-7{fill:none;stroke:#17171d;stroke-linecap:round;stroke-linejoin:round;stroke-width:8px;}.cls-8{fill:#a9dbc6;}.cls-9{fill:#ceefe0;}.cls-10{fill:#606075;}.cls-11{fill:#7a7a91;}.cls-12{fill:#ffcca6;}.cls-13{fill:#17171d;}.cls-14{fill:#f4aa40;}.cls-15{fill:#ffca55;}.cls-16{fill:#c66f34;}.cls-17{fill:#e28647;}.cls-18{fill:#defcff;}.cls-19{fill:#fff;}</style></defs><title>waiting-room</title><path class=\"cls-1\" d=\"M94.06,216.43H20.6V143.08a15.86,15.86,0,0,1,15.86-15.86H78.21a15.86,15.86,0,0,1,15.85,15.86Z\" transform=\"translate(0 0)\"/><path class=\"cls-2\" d=\"M78.21,127.26H36.46A15.86,15.86,0,0,0,20.6,143.08v12.14a15.86,15.86,0,0,1,15.86-15.86H78.21a15.86,15.86,0,0,1,15.86,15.86h0V143.08A15.86,15.86,0,0,0,78.21,127.26Z\" transform=\"translate(0 0)\"/><path class=\"cls-3\" d=\"M102.71,245.29H12a8,8,0,0,1-8-8v-12.9a8,8,0,0,1,8-7.95h90.75a8,8,0,0,1,8,7.95v12.94a8,8,0,0,1-8,8Z\" transform=\"translate(0 0)\"/><path class=\"cls-4\" d=\"M102.71,216.43H12a8,8,0,0,0-8,8v10.45a8,8,0,0,1,8-7.95h90.75a8,8,0,0,1,8,7.95V224.39a8,8,0,0,0-8-8Z\" transform=\"translate(0 0)\"/><path class=\"cls-5\" d=\"M45.73,245.29h23.2v28.56H45.73Z\" transform=\"translate(0 0)\"/><path class=\"cls-6\" d=\"M45.73,245.29h23.2v8.84H45.73Z\" transform=\"translate(0 0)\"/><path class=\"cls-5\" d=\"M84,273.85H30.65a7,7,0,1,0,0,14.06H84a7,7,0,0,0,0-14.06Z\" transform=\"translate(0 0)\"/><path class=\"cls-2\" d=\"M184.88,127.26H143.13a15.86,15.86,0,0,0-15.86,15.82v12.14a15.86,15.86,0,0,1,15.86-15.86h41.75a15.86,15.86,0,0,1,15.85,15.86V143.08A15.85,15.85,0,0,0,184.88,127.26Z\" transform=\"translate(0 0)\"/><path class=\"cls-3\" d=\"M209.38,245.29H118.62a8,8,0,0,1-8-8v-12.9a8,8,0,0,1,8-7.95h90.76a8,8,0,0,1,8,7.95v12.94A8,8,0,0,1,209.38,245.29Z\" transform=\"translate(0 0)\"/><path class=\"cls-4\" d=\"M209.38,216.43H118.62a8,8,0,0,0-8,8v10.45a8,8,0,0,1,8-7.95h90.76a8,8,0,0,1,8,7.95V224.39A8,8,0,0,0,209.38,216.43Z\" transform=\"translate(0 0)\"/><path class=\"cls-5\" d=\"M152.4,245.29h23.2v28.56H152.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-6\" d=\"M152.4,245.29h23.2v8.84H152.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-7\" d=\"M152.4,245.29h23.2v28.56H152.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-1\" d=\"M307.4,216.43H233.94V143.08a15.85,15.85,0,0,1,15.85-15.86h41.75a15.86,15.86,0,0,1,15.86,15.86Z\" transform=\"translate(0 0)\"/><path class=\"cls-2\" d=\"M291.54,127.26H249.79a15.85,15.85,0,0,0-15.85,15.82v12.14a15.85,15.85,0,0,1,15.85-15.86h41.75a15.86,15.86,0,0,1,15.86,15.86V143.08A15.86,15.86,0,0,0,291.54,127.26Z\" transform=\"translate(0 0)\"/><path class=\"cls-3\" d=\"M316,245.29H225.29a8,8,0,0,1-8-8v-12.9a8,8,0,0,1,8-7.95H316a8,8,0,0,1,8,7.95v12.94A8,8,0,0,1,316,245.29Z\" transform=\"translate(0 0)\"/><path class=\"cls-4\" d=\"M316,216.43H225.29a8,8,0,0,0-8,8v10.45a8,8,0,0,1,8-7.95H316a8,8,0,0,1,8,7.95V224.39A8,8,0,0,0,316,216.43Z\" transform=\"translate(0 0)\"/><path class=\"cls-5\" d=\"M259.07,245.29h23.2v28.56h-23.2Z\" transform=\"translate(0 0)\"/><path class=\"cls-6\" d=\"M259.07,245.29h23.2v8.84h-23.2Z\" transform=\"translate(0 0)\"/><path class=\"cls-5\" d=\"M297.35,273.85H244a7,7,0,1,0,0,14.06h53.36a7,7,0,1,0,0-14.06Z\" transform=\"translate(0 0)\"/><path class=\"cls-8\" d=\"M210.52,197.35h-93V127.08a15.86,15.86,0,0,1,15.87-15.87h61.29a15.86,15.86,0,0,1,15.84,15.87v70.28Z\" transform=\"translate(0 0)\"/><path class=\"cls-9\" d=\"M194.64,111.19H133.36a15.88,15.88,0,0,0-15.88,15.88h0V138a15.87,15.87,0,0,1,15.88-15.87h61.28A15.88,15.88,0,0,1,210.52,138V127.08a15.88,15.88,0,0,0-15.87-15.89Z\" transform=\"translate(0 0)\"/><path class=\"cls-10\" d=\"M124.41,290.14H164V269.07H139.63a15.22,15.22,0,0,0-15.22,15.22h0Z\" transform=\"translate(0 0)\"/><path class=\"cls-11\" d=\"M139.63,269.07a15.22,15.22,0,0,0-15.22,15.22h0v5.83h.23a15.24,15.24,0,0,1,15-12.65H164v-8.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-10\" d=\"M203.59,290.14H164V269.07h24.37a15.23,15.23,0,0,1,15.22,15.22h0Z\" transform=\"translate(0 0)\"/><path class=\"cls-11\" d=\"M188.37,269.07a15.23,15.23,0,0,1,15.22,15.22h0v5.83h-.23a15.24,15.24,0,0,0-15-12.65H164v-8.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-12\" d=\"M190.86,216.2h9.56a10.1,10.1,0,0,0,10.1-10.09h0v-8.76H190.86Z\" transform=\"translate(0 0)\"/><path class=\"cls-12\" d=\"M137.14,216.2h-9.56a10.1,10.1,0,0,1-10.1-10.09h0v-8.76h19.66Z\" transform=\"translate(0 0)\"/><path class=\"cls-12\" d=\"M164,112.45a23.62,23.62,0,0,1-23.62-23.62h0V60h47.24V88.82A23.63,23.63,0,0,1,164,112.45Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M154.33,93.44A3.35,3.35,0,0,1,151,90.08V87.43a3.36,3.36,0,0,1,6.71-.37,2.28,2.28,0,0,1,0,.37v2.65a3.36,3.36,0,0,1-3.34,3.36Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M175.32,93.44A3.37,3.37,0,0,1,172,90.08V87.43a3.36,3.36,0,1,1,6.72,0v2.65a3.36,3.36,0,0,1-3.34,3.36Z\" transform=\"translate(0 0)\"/><path class=\"cls-14\" d=\"M172.34,68.79l-11.41,5.63a25.35,25.35,0,0,1-16.39,2.07l-4.16,2.59V59.54a16.42,16.42,0,0,1,15.29-15.7,86.54,86.54,0,0,1,17.18.35c9,1.08,14.77,7.77,14.77,15.65V79.77L183,76.49Z\" transform=\"translate(0 0)\"/><path class=\"cls-15\" d=\"M172.85,44.2a86.54,86.54,0,0,0-17.18-.36,16.42,16.42,0,0,0-15.29,15.7v9.07a16.42,16.42,0,0,1,15.29-15.7,86.54,86.54,0,0,1,17.18.35c9,1.08,14.77,7.77,14.77,15.65V59.84c0-7.88-5.73-14.57-14.77-15.64Z\" transform=\"translate(0 0)\"/><path class=\"cls-16\" d=\"M150.59,188.57a13.39,13.39,0,0,0-13.4,13.4v67.1H164V202a13.39,13.39,0,0,0-13.4-13.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-17\" d=\"M150.59,188.57a13.39,13.39,0,0,0-13.4,13.4v12.62a13.41,13.41,0,0,1,26.81-.73c0,.25,0,.49,0,.73V202a13.39,13.39,0,0,0-13.4-13.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-16\" d=\"M177.41,188.57A13.39,13.39,0,0,0,164,202h0v67.1h26.81V202a13.39,13.39,0,0,0-13.4-13.4Z\" transform=\"translate(0 0)\"/><path class=\"cls-17\" d=\"M177.41,188.57A13.39,13.39,0,0,0,164,202h0v12.62a13.41,13.41,0,1,1,26.81-.73V202a13.39,13.39,0,0,0-13.4-13.4Z\" transform=\"translate(0 0)\"/><circle class=\"cls-18\" cx=\"284.29\" cy=\"43.72\" r=\"39.7\"/><path class=\"cls-19\" d=\"M284.3,17.85a39.72,39.72,0,0,1,39.09,32.79,41.32,41.32,0,0,0,.61-6.93,39.71,39.71,0,1,0-79.42-.23,39.14,39.14,0,0,0,.63,7.16A39.69,39.69,0,0,1,284.3,17.85Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M316,212.43h-4.6V143.08a19.88,19.88,0,0,0-19.86-19.86H249.79a19.88,19.88,0,0,0-19.85,19.86v69.31h-4.65a12,12,0,0,0-8,3.06,11.93,11.93,0,0,0-4.58-2.56,14.06,14.06,0,0,0,1.77-6.82v-79a19.9,19.9,0,0,0-19.88-19.87h-10a27.52,27.52,0,0,0,7-18.38v-29c0-10.27-7.52-18.34-18.3-19.62a90.23,90.23,0,0,0-18-.36,20.39,20.39,0,0,0-19,19.5V88.81a27.52,27.52,0,0,0,7,18.38h-10a19.89,19.89,0,0,0-19.82,19.89v79a13.91,13.91,0,0,0,1.78,6.82,12,12,0,0,0-4.59,2.56,12,12,0,0,0-8-3.06H98V143.08a19.88,19.88,0,0,0-19.86-19.86H36.46A19.88,19.88,0,0,0,16.6,143.08v69.31H12a12,12,0,0,0-12,12v12.94a12,12,0,0,0,12,12H41.78v20.56H30.66a11,11,0,1,0,0,22.05H84a11,11,0,0,0,0-22.05H72.93v-20.6h29.78a11.9,11.9,0,0,0,8-3.06,11.86,11.86,0,0,0,8,3.06h14.57v16.94a19.23,19.23,0,0,0-12.78,18.08v5.83a4,4,0,0,0,4,4h79.18a4,4,0,0,0,4-4v-5.83a19.23,19.23,0,0,0-12.78-18.08V249.29h14.57a11.87,11.87,0,0,0,7.95-3.06,11.86,11.86,0,0,0,8,3.06H255.2v20.56H244a11,11,0,1,0,0,22h53.36a11,11,0,0,0,0-22H286.27V249.29H316a12,12,0,0,0,12-12v-12.9a12,12,0,0,0-12-12Zm-78.07-69.35a11.86,11.86,0,0,1,11.86-11.86h41.75a11.87,11.87,0,0,1,11.86,11.86v69.31H237.93ZM121.48,201.35h11.66V212.2h-5.56a6.1,6.1,0,0,1-6.1-6.1v-4.75Zm19.71,44h0V202A9.41,9.41,0,0,1,160,202v63.1H141.19ZM168,202a9.41,9.41,0,0,1,18.81,0v63.1H168Zm38.52,4.11a6.11,6.11,0,0,1-6.1,6.09h-5.56V201.35h11.66ZM144.38,88.82V81.27l1-.57A29.5,29.5,0,0,0,162.75,78L172,73.44l11.67,8.38v7a19.62,19.62,0,1,1-39.24,0Zm0-29.18A12.46,12.46,0,0,1,156,47.83a83,83,0,0,1,16.38.34c6.72.8,11.24,5.49,11.24,11.67V72l-8.94-6.45a4,4,0,0,0-4.11-.34l-11.41,5.63a21.49,21.49,0,0,1-13.8,1.75,3.81,3.81,0,0,0-.82-.09h-.16V59.64Zm-22.9,67.44a11.88,11.88,0,0,1,11.88-11.88h22.42a27.76,27.76,0,0,0,16.44,0h22.42a11.89,11.89,0,0,1,11.88,11.88v66.28H194.81V138.08a4,4,0,1,0-8,0v49.27a17.25,17.25,0,0,0-9.4-2.78h0A17.32,17.32,0,0,0,164,190.89a17.33,17.33,0,0,0-22.81-3.54V138.08a4,4,0,1,0-8,0v55.27H121.48Zm-96.88,16a11.87,11.87,0,0,1,11.86-11.86H78.21a11.85,11.85,0,0,1,11.85,11.86v69.31H24.6ZM87,280.88a3,3,0,0,1-3,3H30.66a3,3,0,1,1,0-6.06H84a3,3,0,0,1,3,3Zm-22.11-11H49.69V249.29h15.2Zm37.78-28.56H12a4,4,0,0,1-4-4V224.39a4,4,0,0,1,4-3.95h90.75a4,4,0,0,1,4,3.95v12.94a4,4,0,0,1-4,4h0Zm15.91,0a4,4,0,0,1-4-4V224.39a4,4,0,0,1,4-3.95h14.57v20.85Zm9.79,43a11.24,11.24,0,0,1,11.21-11.25H160v13.05H128.41Zm71.18,0v1.83H168V273.07h20.37a11.24,11.24,0,0,1,11.22,11.24h0Zm9.79-43H194.81V220.43h14.57a4,4,0,0,1,4,4v12.94a4,4,0,0,1-4,3.92Zm91,39.59a3,3,0,0,1-3,3H244a3,3,0,1,1,0-6.06h53.36a3,3,0,0,1,3,3v0Zm-22.1-11H263V249.29h15.2ZM320,237.33a4,4,0,0,1-4,4H225.29a4,4,0,0,1-4-4V224.39a4,4,0,0,1,4-3.95H316a4,4,0,0,1,4,3.95Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M154.33,84.08A3.35,3.35,0,0,0,151,87.44h0v2.64a3.36,3.36,0,0,0,6.71.36,2.16,2.16,0,0,0,0-.36V87.43A3.36,3.36,0,0,0,154.33,84.08Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M175.32,93.44a3.36,3.36,0,0,0,3.36-3.34V87.43a3.36,3.36,0,1,0-6.72,0v2.65a3.36,3.36,0,0,0,3.36,3.36Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M284.3,87.42a43.71,43.71,0,1,0-43.71-43.71h0A43.76,43.76,0,0,0,284.3,87.42ZM284.3,8a35.71,35.71,0,1,1-35.71,35.71h0A35.75,35.75,0,0,1,284.3,8Z\" transform=\"translate(0 0)\"/><path class=\"cls-13\" d=\"M284.3,47.71h21a4,4,0,0,0,0-8h-17V17.85a4,4,0,0,0-8,0V43.71A4,4,0,0,0,284.3,47.71Z\" transform=\"translate(0 0)\"/></svg>  \r\n\t\t</div>\r\n        <h1>\r\n          <!--  DANPHE TELEHEALTH -->\r\n         Hello <span class=\"user-title\">{{global.patientObj.PatientName}}</span>Hello ......., You are now in a queue. Your doctor will visit with you soon.\r\n        <!-- <span>Connect with your doctor from  your home</span> -->\r\n        </h1>\r\n    </div>\r\n   \r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/app/app.cliniccomponent.ts":
/*!****************************************!*\
  !*** ./src/app/app.cliniccomponent.ts ***!
  \****************************************/
/*! exports provided: ClinicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicComponent", function() { return ClinicComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ClinicComponent = class ClinicComponent {
};
ClinicComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.clinic.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.clinic.html")).default
        // styleUrls: ['./app.component.css']
    })
], ClinicComponent);

// e


/***/ }),

/***/ "./src/app/app.doctorroomcomponent.ts":
/*!********************************************!*\
  !*** ./src/app/app.doctorroomcomponent.ts ***!
  \********************************************/
/*! exports provided: DoctorRoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorRoomComponent", function() { return DoctorRoomComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.global */ "./src/app/app.global.ts");
/* harmony import */ var _app_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.model */ "./src/app/app.model.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");







let DoctorRoomComponent = class DoctorRoomComponent {
    constructor(httpClient, routing, global) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
        this.timer1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["timer"])(this.global.TimerValue, this.global.TimerValue);
        this.patients = new Array();
        this.RefreshPatients();
        if (this.global.IsDoctor == false) {
            this.timer1.subscribe(() => {
                this.httpClient.post(global.ApiUrl +
                    "TakeFinalReport", this.global.patientObj)
                    .subscribe(res => this.SuccessTestDone(res));
            });
        }
    }
    RefreshPatients() {
        this.httpClient.get(this.global.ApiUrl + "CurrentPatients")
            .subscribe(res => this.Success(res), res => this.Error(res));
    }
    PatientAttended(callPatient) {
        callPatient.Medication = this.global.patientObj.Medication;
        this.httpClient.post(this.global.ApiUrl + "PatientAttended", callPatient)
            .subscribe(res => this.PatientCompleted(res), res => this.Error(res));
    }
    CallPatient(callPatient) {
        this.httpClient.post(this.global.ApiUrl + "CallPatient", callPatient)
            .subscribe(res => this.NextPatient(res), res => this.Error(res));
    }
    PatientCompleted(res) {
        if (res) {
            if (this.global.IsDoctor) {
                this.global.patientObj = new _app_model__WEBPACK_IMPORTED_MODULE_5__["Patient"]();
                this.RefreshPatients();
            }
            else {
                this.global.patientObj = res;
            }
        }
    }
    NextPatient(res) {
        if (res) {
            this.global.patientObj = res;
        }
        this.RefreshPatients();
    }
    SuccessTestDone(res) {
        if (res) {
            this.global.patientObj = res;
            this.routing.navigate(['/FinalReport']);
        }
    }
    Success(res) {
        this.patients = res;
    }
    Error(res) {
        alert(res.status);
    }
};
DoctorRoomComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _app_global__WEBPACK_IMPORTED_MODULE_4__["Global"] }
];
DoctorRoomComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.doctorroom.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.doctorroom.html")).default
    })
], DoctorRoomComponent);



/***/ }),

/***/ "./src/app/app.finalreportcomponent.ts":
/*!*********************************************!*\
  !*** ./src/app/app.finalreportcomponent.ts ***!
  \*********************************************/
/*! exports provided: FinalReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinalReportComponent", function() { return FinalReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.global */ "./src/app/app.global.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let FinalReportComponent = class FinalReportComponent {
    constructor(httpClient, routing, global) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
    }
    Success(res) {
        alert(res.PatientName);
    }
};
FinalReportComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _app_global__WEBPACK_IMPORTED_MODULE_3__["Global"] }
];
FinalReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.finalreport.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.finalreport.html")).default
    })
], FinalReportComponent);



/***/ }),

/***/ "./src/app/app.global.ts":
/*!*******************************!*\
  !*** ./src/app/app.global.ts ***!
  \*******************************/
/*! exports provided: Global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Global", function() { return Global; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _app_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.model */ "./src/app/app.model.ts");


class Global {
    constructor() {
        this.patientObj = null;
        this.doctorObj = null;
        this.IsDoctor = false;
        this.ApiUrl = "/Home/";
        this.TimerValue = 10000;
        this.patientObj = new _app_model__WEBPACK_IMPORTED_MODULE_1__["Patient"]();
        this.doctorObj = new _app_model__WEBPACK_IMPORTED_MODULE_1__["Doctor"]();
    }
}


/***/ }),

/***/ "./src/app/app.login.ts":
/*!******************************!*\
  !*** ./src/app/app.login.ts ***!
  \******************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.model */ "./src/app/app.model.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.global */ "./src/app/app.global.ts");






let LoginComponent = class LoginComponent {
    constructor(httpClient, routing, global) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
        this.title = 'telemedicine';
        this.doctorObj = new _app_model__WEBPACK_IMPORTED_MODULE_2__["Doctor"]();
        this.patientObj = new _app_model__WEBPACK_IMPORTED_MODULE_2__["Patient"]();
    }
    LoginDoctor() {
        this.global.doctorObj = this.doctorObj;
        this.httpClient.
            post(this.global.ApiUrl + "LoginDoctor", this.doctorObj)
            .subscribe(res => this.SuccessDoctor(res), res => this.Error(res));
    }
    SuccessDoctor(res) {
        this.global.IsDoctor = true;
        this.routing.navigate(['/DoctorRoom']);
    }
    SuccessPatient(res) {
        this.global.patientObj = this.patientObj;
        this.routing.navigate(['/WaitingRoom']);
    }
    Error(res) {
        alert("Can not connect please talk with admin");
    }
    LoginPatient() {
        this.httpClient.
            post(this.global.ApiUrl + "LoginPatient", this.patientObj)
            .subscribe(res => this.SuccessPatient(res), res => this.Error(res));
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _app_global__WEBPACK_IMPORTED_MODULE_5__["Global"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.login.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.login.html")).default
    })
], LoginComponent);



/***/ }),

/***/ "./src/app/app.model.ts":
/*!******************************!*\
  !*** ./src/app/app.model.ts ***!
  \******************************/
/*! exports provided: Patient, Doctor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patient", function() { return Patient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Doctor", function() { return Doctor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

class Patient {
    constructor() {
        this.PatientName = "";
        this.Status = 0;
        this.Fever = false;
        this.Cough = false;
        this.Breathing = false;
        this.TiredNess = false;
        this.Problem = "";
        this.Medication = "";
    }
}
class Doctor {
    constructor() {
        this.DoctorName = "";
        this.Password = "test123";
    }
}


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.login */ "./src/app/app.login.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.global */ "./src/app/app.global.ts");
/* harmony import */ var _app_doctorroomcomponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.doctorroomcomponent */ "./src/app/app.doctorroomcomponent.ts");
/* harmony import */ var _app_waitingroomcomponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.waitingroomcomponent */ "./src/app/app.waitingroomcomponent.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_cliniccomponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.cliniccomponent */ "./src/app/app.cliniccomponent.ts");
/* harmony import */ var _app_finalreportcomponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.finalreportcomponent */ "./src/app/app.finalreportcomponent.ts");
/* harmony import */ var src_common_YesNo_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/common/YesNo.pipe */ "./src/common/YesNo.pipe.ts");














let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_login__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _app_doctorroomcomponent__WEBPACK_IMPORTED_MODULE_5__["DoctorRoomComponent"],
            _app_waitingroomcomponent__WEBPACK_IMPORTED_MODULE_6__["WaitingRoom"], _app_cliniccomponent__WEBPACK_IMPORTED_MODULE_11__["ClinicComponent"], _app_finalreportcomponent__WEBPACK_IMPORTED_MODULE_12__["FinalReportComponent"],
            src_common_YesNo_pipe__WEBPACK_IMPORTED_MODULE_13__["YesNoPipe"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"].forRoot(_app_routing__WEBPACK_IMPORTED_MODULE_10__["HomeRoutes"])
        ],
        providers: [_app_global__WEBPACK_IMPORTED_MODULE_4__["Global"]],
        bootstrap: [_app_cliniccomponent__WEBPACK_IMPORTED_MODULE_11__["ClinicComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: HomeRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutes", function() { return HomeRoutes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _app_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.login */ "./src/app/app.login.ts");
/* harmony import */ var _app_waitingroomcomponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.waitingroomcomponent */ "./src/app/app.waitingroomcomponent.ts");
/* harmony import */ var _app_doctorroomcomponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.doctorroomcomponent */ "./src/app/app.doctorroomcomponent.ts");
/* harmony import */ var _app_finalreportcomponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.finalreportcomponent */ "./src/app/app.finalreportcomponent.ts");





const HomeRoutes = [
    { path: '', component: _app_login__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"] },
    { path: 'WaitingRoom', component: _app_waitingroomcomponent__WEBPACK_IMPORTED_MODULE_2__["WaitingRoom"] },
    { path: 'DoctorRoom', component: _app_doctorroomcomponent__WEBPACK_IMPORTED_MODULE_3__["DoctorRoomComponent"] },
    { path: 'FinalReport', component: _app_finalreportcomponent__WEBPACK_IMPORTED_MODULE_4__["FinalReportComponent"] }
];


/***/ }),

/***/ "./src/app/app.waitingroomcomponent.ts":
/*!*********************************************!*\
  !*** ./src/app/app.waitingroomcomponent.ts ***!
  \*********************************************/
/*! exports provided: WaitingRoom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaitingRoom", function() { return WaitingRoom; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.global */ "./src/app/app.global.ts");






let WaitingRoom = class WaitingRoom {
    constructor(httpClient, routing, global) {
        this.httpClient = httpClient;
        this.routing = routing;
        this.global = global;
        this.timer1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(5000, 8000);
        this.timer1.subscribe(() => {
            this.httpClient.post(global.ApiUrl +
                "CanIComeIn", this.global.patientObj)
                .subscribe(res => this.Success(res));
        });
    }
    Success(res) {
        if (res) {
            this.routing.navigate(['/DoctorRoom']);
        }
    }
    Error(res) {
        console.log(res);
    }
};
WaitingRoom.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _app_global__WEBPACK_IMPORTED_MODULE_5__["Global"] }
];
WaitingRoom = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.waitingroom.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.waitingroom.html")).default
    })
], WaitingRoom);



/***/ }),

/***/ "./src/common/YesNo.pipe.ts":
/*!**********************************!*\
  !*** ./src/common/YesNo.pipe.ts ***!
  \**********************************/
/*! exports provided: YesNoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YesNoPipe", function() { return YesNoPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let YesNoPipe = class YesNoPipe {
    transform(value, ...args) {
        return (value == true) ? "Yes" : "No";
    }
};
YesNoPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: "yesNoPipe"
    })
], YesNoPipe);



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Dell\source\repos\testazuredevops\TeleMedicine\TeleMedicine\TeleMedicine\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map