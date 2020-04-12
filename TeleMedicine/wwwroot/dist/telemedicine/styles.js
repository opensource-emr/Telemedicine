(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "@import url('https://fonts.googleapis.com/css2?family=Exo:wght@600&display=swap|Poppins:wght@500;600&display=swap');\r\n\r\nhtml, body {\r\n  height: 100%;\r\n  width: 100%;\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  background: #fff;\r\n  font-family: 'Poppins', sans-serif;\r\n  font-weight: 500;\r\n  margin: auto;\r\n  font-size: 12px;\r\n  width: 100%;\r\n}\r\n\r\ntable td {\r\n  font-size: 12px;\r\n  padding: 7px;\r\n}\r\n\r\n.doctor-room table {\r\n  width: 100%;\r\n}\r\n\r\n.doctor-room {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  flex-wrap: nowrap;\r\n  width: 100%;\r\n  margin: auto;\r\n  position: relative;\r\n  -webkit-box-align: center;\r\n          align-items: center;\r\n  height: 100%;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: row;\r\n  position: fixed;\r\n}\r\n\r\n.doctor-room .patient-info, .doctor-room .screen {\r\n    background-color: #fff;\r\n    -webkit-box-flex: 30%;\r\n            flex: 30%;\r\n    min-width: 25%;\r\n    margin: auto;\r\n    text-align: left;\r\n    line-height: 75px;\r\n    font-size: 12px;\r\n    padding: 0px;\r\n    border-radius: 5px;\r\n    height: 100%;\r\n    z-index: 999;\r\n  }\r\n\r\n.doctor-room .screen {\r\n    -webkit-box-flex: 75%;\r\n            flex: 75%;\r\n    max-width: 75%;\r\n    padding: 0px;\r\n  }\r\n\r\n.doctor-room iframe {\r\n    height: 100%;\r\n    width: 100%;\r\n    border: none;\r\n  }\r\n\r\ninput[type=\"text\"], input[type=\"password\"], input[type=\"email\"] {\r\n  height: 30px;\r\n  width: 100%;\r\n  border-radius: 5px;\r\n  border: 1px solid #bbb;\r\n  background: #fff;\r\n  font-family: 'Poppins', sans-serif;\r\n  margin-bottom: 7px;\r\n  display: block;\r\n  max-width: 100%;\r\n  padding: 0 2px;\r\n}\r\n\r\ntextarea {\r\n  min-height: 40px;\r\n  width: 100%;\r\n  border-radius: 5px;\r\n  border: 1px solid #bbb;\r\n  background: #fff;\r\n  font-family: 'Poppins', sans-serif;\r\n  padding: 0 2px;\r\n  margin-bottom: 7px;\r\n}\r\n\r\ninput[type=\"button\"], button {\r\n  background: #009688;\r\n  padding: 5px 25px;\r\n  font-family: 'Poppins';\r\n  color: #fff;\r\n  text-transform: uppercase;\r\n  font-weight: 500;\r\n  border: 1px solid;\r\n  margin-top: 5px;\r\n  cursor: pointer;\r\n  border-radius: 5px;\r\n}\r\n\r\n.info-heading button {\r\n  padding: 4px 10px;\r\n  text-transform: capitalize;\r\n  font-weight: 500;\r\n  margin: 10px 0;\r\n  height: 35px;\r\n  border: none;\r\n}\r\n\r\n.patient-info .info-heading {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  flex-wrap: nowrap;\r\n  width: auto;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: row;\r\n  background: #fff;\r\n  margin: auto;\r\n  padding: 10px;\r\n  -webkit-box-pack: justify;\r\n          justify-content: space-between;\r\n  border-bottom: 5px solid #f8f8f8;\r\n}\r\n\r\n.patient-info .info-heading input[type=\"button\"] {\r\n    margin-top: auto\r\n  }\r\n\r\n.patient-info .info-listing, .patient-info .p-all {\r\n  line-height: initial;\r\n  font-size: 12px;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  display: block;\r\n  width: 95%;\r\n}\r\n\r\n.btn-call {\r\n  background: #009688;\r\n  padding: 3px 10px;\r\n  color: #fff;\r\n  text-decoration: none;\r\n  border-radius: 23px;\r\n  font-size: 12px;\r\n  opacity: 0.8;\r\n  margin: 5px 0;\r\n  text-align: center;\r\n}\r\n\r\n.btn-call:hover {\r\n    opacity: 1;\r\n  }\r\n\r\n.patient-info {\r\n  overflow: auto;\r\n}\r\n\r\n.patient-info .p-all {\r\n    background: #f3f5f8;\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n    margin: auto 10px;\r\n    width: 90%;\r\n    overflow: auto;\r\n    height: 550px;\r\n    font-weight: 300;\r\n    color: #444;\r\n    font-size: 12px;\r\n  }\r\n\r\n.patient-info .p-all label {\r\n      display: block;\r\n      margin: auto;\r\n      padding: 10px;\r\n      border-radius: 5px;\r\n    }\r\n\r\n.patient-info .p-all label:nth-of-type(even) {\r\n        background: #fff\r\n      }\r\n\r\n.patient-info .p-all label span {\r\n        font-weight: 400;\r\n      }\r\n\r\n.badge-yes {\r\n  background: #ef5b5b;\r\n  color: #fff;\r\n  padding: 3px 10px;\r\n  border-radius: 40px;\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  font-size: 10px;\r\n}\r\n\r\n.badge-no {\r\n  background: #009688;\r\n  color: #fff;\r\n  padding: 3px 10px;\r\n  border-radius: 40px;\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  font-size: 10px;\r\n}\r\n\r\n.p-all {\r\n  max-height: 100%;\r\n  overflow: auto;\r\n}\r\n\r\na {\r\n  color: #009688;\r\n  text-decoration: underline;\r\n  cursor: pointer;\r\n  margin: auto;\r\n  display: inline-block;\r\n}\r\n\r\na.text-link {\r\n    margin: 10px;\r\n  }\r\n\r\n.badge-status {\r\n  float: right;\r\n  padding: 5px 10px;\r\n  display: inline-block;\r\n  font-size: 9px;\r\n}\r\n\r\n.m-7-a {\r\n  margin: 7px auto;\r\n}\r\n\r\n.wait-section {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  flex-wrap: nowrap;\r\n  width: 100%;\r\n  margin: auto;\r\n  position: relative;\r\n  -webkit-box-align: center;\r\n          align-items: center;\r\n  height: 100%;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: row;\r\n}\r\n\r\n.wait-section .brand-title {\r\n    display: block;\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n\r\n.wait-section .brand-title .waiting-icon svg {\r\n      height: 150px;\r\n      width: auto;\r\n    }\r\n\r\n.wait-section .brand-title .waiting-icon {\r\n      text-align: center;\r\n    }\r\n\r\n.wait-section .brand-title h1 {\r\n      font-weight: 400;\r\n      font-size: 20px;\r\n      margin-top: 25px;\r\n      color: #333;\r\n    }\r\n\r\n.user-title {\r\n  color: #009688 !important;\r\n  font-size: 1.5rem !important;\r\n  display: inline !important;\r\n}\r\n\r\nimg.brand-img {\r\n  height: 80px;\r\n}\r\n\r\n/* Base for label styling */\r\n\r\n/* Base for label styling */\r\n\r\n[type=\"checkbox\"]:not(:checked),\r\n[type=\"checkbox\"]:checked {\r\n  position: absolute;\r\n  left: -9999px;\r\n}\r\n\r\n[type=\"checkbox\"]:not(:checked) + label,\r\n  [type=\"checkbox\"]:checked + label {\r\n    position: relative;\r\n    padding-left: 1.9em;\r\n    cursor: pointer;\r\n    margin-bottom: auto;\r\n  }\r\n\r\n/* checkbox aspect */\r\n\r\n[type=\"checkbox\"]:not(:checked) + label:before,\r\n    [type=\"checkbox\"]:checked + label:before {\r\n      content: '';\r\n      position: absolute;\r\n      left: 0;\r\n      top: 0;\r\n      width: 1.25em;\r\n      height: 1.25em;\r\n      border: 1px solid #aaa;\r\n      background: #fff;\r\n      border-radius: 2px;\r\n      box-shadow: inset 0 1px 3px rgba(0,0,0,.1);\r\n    }\r\n\r\n/* checked mark aspect */\r\n\r\n[type=\"checkbox\"]:not(:checked) + label:after,\r\n    [type=\"checkbox\"]:checked + label:after {\r\n      content: '\\2713\\0020';\r\n      position: absolute;\r\n      top: .15em;\r\n      left: .15em;\r\n      font-size: 1.5em;\r\n      line-height: 0.8;\r\n      color: #09ad7e;\r\n      -webkit-transition: all .2s;\r\n      transition: all .2s;\r\n      font-family: 'Lucida Sans Unicode', 'Arial Unicode MS', Arial;\r\n    }\r\n\r\n/* checked mark aspect changes */\r\n\r\n[type=\"checkbox\"]:not(:checked) + label:after {\r\n      opacity: 0;\r\n      -webkit-transform: scale(0);\r\n              transform: scale(0);\r\n    }\r\n\r\n[type=\"checkbox\"]:checked + label:after {\r\n      opacity: 1;\r\n      -webkit-transform: scale(1);\r\n              transform: scale(1);\r\n    }\r\n\r\n/* disabled checkbox */\r\n\r\n[type=\"checkbox\"]:disabled:not(:checked) + label:before,\r\n[type=\"checkbox\"]:disabled:checked + label:before {\r\n  box-shadow: none;\r\n  border-color: #bbb;\r\n  background-color: #ddd;\r\n}\r\n\r\n[type=\"checkbox\"]:disabled:checked + label:after {\r\n  color: #999;\r\n}\r\n\r\n[type=\"checkbox\"]:disabled + label {\r\n  color: #aaa;\r\n}\r\n\r\n/* accessibility */\r\n\r\n[type=\"checkbox\"]:checked:focus + label:before,\r\n[type=\"checkbox\"]:not(:checked):focus + label:before {\r\n  border: 1px solid #09ad7e;\r\n  ;\r\n}\r\n\r\n/* hover style just for information */\r\n\r\nlabel:hover:before {\r\n  border: 2px solid #4778d9 !important;\r\n}\r\n\r\np.fever-checkbox {\r\n  display: inline-block;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  margin-right: 7px;\r\n  text-transform: capitalize;\r\n  margin-bottom: 5px;\r\n  color: #333;\r\n  margin-top: auto;\r\n  min-width: 130px;\r\n}\r\n\r\n.full-section table {\r\n  width: 100%;\r\n}\r\n\r\n.full-section {\r\n  margin: 0;\r\n  padding: 0;\r\n  display: -webkit-box;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-flow: row;\r\n  height: 100%;\r\n  -webkit-box-align: top;\r\n          align-items: top;\r\n  position: relative;\r\n}\r\n\r\n.full-section .patient-login {\r\n    -webkit-box-flex: 2;\r\n            flex: 2 1 0;\r\n    -webkit-box-ordinal-group: 3;\r\n            order: 2;\r\n  }\r\n\r\n.full-section .brand-title, .full-section .doctor-login {\r\n    -webkit-box-flex: 1;\r\n            flex: 1 6 0;\r\n  }\r\n\r\n.full-section .patient-login, .full-section .doctor-login, .full-section .brand-title {\r\n    margin: 15px;\r\n    z-index: 999;\r\n    min-height: 550px;\r\n    padding-left: 31px;\r\n  }\r\n\r\n.full-section .patient-login form, .full-section .doctor-login form {\r\n      background: #fff;\r\n      padding: 10px;\r\n      border-radius: 5px;\r\n    }\r\n\r\n.brand-title {\r\n  background-color: transparent !important;\r\n  box-shadow: none !important;\r\n  height: auto !important;\r\n  position: -webkit-sticky;\r\n  position: sticky;\r\n  top: 0\r\n}\r\n\r\n.full-section .doctor-login {\r\n  box-shadow: none;\r\n  -webkit-box-ordinal-group: 3;\r\n          order: 2;\r\n  align-self: flex-start;\r\n  min-height: auto;\r\n  position: -webkit-sticky;\r\n  position: sticky;\r\n  top: 0\r\n}\r\n\r\ntable td label {\r\n  font-size: 12px;\r\n  margin: 7px auto;\r\n  display: block;\r\n  font-weight: 500;\r\n}\r\n\r\n.brand-title h1 {\r\n  line-height: normal;\r\n  color: #009688;\r\n  font-size: 1.5rem;\r\n  font-weight: 500;\r\n  margin: auto;\r\n  margin-top: 5rem;\r\n  font-family: 'Exo';\r\n}\r\n\r\n.brand-title h1 span {\r\n    font-size: 25px;\r\n    margin-top: 5px;\r\n    display: block;\r\n    color: #333;\r\n    margin-bottom: 10px;\r\n  }\r\n\r\nh5.form-header {\r\n  color: #fff;\r\n  line-height: initial;\r\n  font-size: 25px;\r\n  margin-top: auto;\r\n  margin-bottom: 5px;\r\n}\r\n\r\nh5.form-header span {\r\n    display: inline-block;\r\n    color: #fff;\r\n    font-size: 13px;\r\n    font-weight: 300;\r\n    margin-left: 10px;\r\n    padding-left: 10px;\r\n    border-left: 1px solid;\r\n    line-height: 12px;\r\n  }\r\n\r\n.full-section:before {\r\n  content: '';\r\n  position: fixed;\r\n  top: 0px;\r\n  right: 0px;\r\n  width: 73%;\r\n  background: #3f51b5;\r\n  height: 100%;\r\n}\r\n\r\nimg.brand-img {\r\n  height: 50px;\r\n}\r\n\r\nimg.hos-img {\r\n  height: 50px;\r\n}\r\n\r\n.waiting-icon ul {\r\n  text-align: left;\r\n}\r\n\r\n.waiting-icon ul.inline {\r\n    margin: 30px;\r\n    text-align: left;\r\n    padding-left: 0px;\r\n  }\r\n\r\n.waiting-icon ul li:nth-of-type(even) {\r\n    background: #f3f6f8;\r\n  }\r\n\r\n.waiting-icon ul li {\r\n    display: block;\r\n    padding: 15px 5px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    box-shadow: none;\r\n    text-align: left;\r\n    margin: auto;\r\n    font-size: 12px;\r\n    position: relative;\r\n  }\r\n\r\n.waiting-icon ul li span {\r\n      position: absolute;\r\n      background: #009688;\r\n      height: 20px;\r\n      width: 20px;\r\n      text-align: center;\r\n      left: -20px;\r\n      border-radius: 100%;\r\n      color: #fff;\r\n      padding: 2px;\r\n    }\r\n\r\n.wait-section .report-title {\r\n  width: 70%;\r\n  text-align: center;\r\n  background: #fff;\r\n  margin: 25px auto;\r\n  padding-top: 50px;\r\n  display: inline-block;\r\n  padding-bottom: 50px;\r\n}\r\n\r\n.wait-section .report-title h1 {\r\n    font-size: 20px;\r\n    font-weight: 400;\r\n  }\r\n\r\n.powered-section {\r\n  bottom: 10px;\r\n  padding: 7px 20px;\r\n  position: fixed;\r\n  text-align: left;\r\n  width: auto;\r\n}\r\n\r\n.powered-section img {\r\n    height: 55px;\r\n    left: 0px;\r\n    position: relative;\r\n  }\r\n\r\n.powered-section span {\r\n    display: none;\r\n  }\r\n\r\n@media (max-width:900px) {\r\n  body {\r\n    background: #eeedf6;\r\n  }\r\n\r\n  .doctor-room {\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: column;\r\n    position: relative;\r\n  }\r\n\r\n    .doctor-room .patient-info, .doctor-room .screen {\r\n      margin: 0;\r\n      width: 100%\r\n    }\r\n\r\n  .full-section:before {\r\n    background: transparent;\r\n  }\r\n\r\n  .full-section {\r\n    -webkit-box-orient: vertical !important;\r\n    -webkit-box-direction: normal !important;\r\n            flex-direction: column !important;\r\n    height: auto;\r\n    -webkit-box-align: start;\r\n            align-items: flex-start;\r\n    width: 100%;\r\n    margin: auto;\r\n    margin-bottom: 35px;\r\n  }\r\n\r\n    .full-section .patient-login, .full-section .doctor-login, .full-section .brand-title {\r\n      max-width: 90%;\r\n      height: auto;\r\n      -webkit-box-flex: 100%;\r\n              flex: 100%;\r\n      width: 100%;\r\n      min-height: auto;\r\n      position: relative;\r\n      margin: 10px auto;\r\n    }\r\n\r\n  .brand-title h1 {\r\n    font-size: 1.5rem;\r\n    margin: auto;\r\n    margin-top: 3rem;\r\n  }\r\n\r\n    .brand-title h1 span {\r\n      font-size: 1.5rem;\r\n    }\r\n\r\n  img.brand-img {\r\n    height: 50px;\r\n  }\r\n\r\n  .patient-info .p-all {\r\n    width: 100%;\r\n  }\r\n\r\n  .powered-section {\r\n    position: relative;\r\n    bottom: 20px;\r\n    text-align: right;\r\n    width: 100%;\r\n    z-index: 999;\r\n    opacity: 0.5;\r\n    padding: 0px !important;\r\n  }\r\n\r\n    .powered-section span {\r\n      right: 0;\r\n      position: absolute;\r\n      top: -10px;\r\n      display: block;\r\n    }\r\n\r\n    .powered-section img {\r\n      left: 0px;\r\n    }\r\n}\r\n\r\n@media (max-width:480px) {\r\n  body {\r\n    overflow: auto;\r\n  }\r\n\r\n  h5.form-header, h5.form-header span {\r\n    color: #333;\r\n  }\r\n\r\n  .brand-title {\r\n    text-align: center;\r\n  }\r\n\r\n  .animated-item .waiting-info h1 {\r\n    font-size: 14px !important;\r\n  }\r\n\r\n  .doctor-room .patient-info, .doctor-room .screen {\r\n    margin: 0;\r\n    width: 100%\r\n  }\r\n\r\n  .doctor-room {\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: column;\r\n    position: relative;\r\n  }\r\n\r\n  .full-section:before {\r\n    background: transparent;\r\n    display: none;\r\n  }\r\n\r\n  .full-section {\r\n    -webkit-box-orient: vertical !important;\r\n    -webkit-box-direction: normal !important;\r\n            flex-direction: column !important;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n  }\r\n\r\n    .full-section .patient-login, .full-section .doctor-login, .full-section .brand-title {\r\n      max-width: 100%;\r\n      height: auto;\r\n      -webkit-box-flex: 100%;\r\n              flex: 100%;\r\n      width: 100%;\r\n    }\r\n\r\n  .patient-login table tr td {\r\n    display: block;\r\n  }\r\n\r\n  .brand-title h1 {\r\n    font-size: 1.5rem;\r\n    margin: auto;\r\n    margin-top: 2rem;\r\n  }\r\n\r\n    .brand-title h1 span {\r\n      font-size: 1.5rem;\r\n    }\r\n\r\n  img.brand-img {\r\n    height: 50px;\r\n  }\r\n\r\n  .pi-counter span.counter {\r\n    margin-top: 25px;\r\n  }\r\n}\r\n\r\n.p-que {\r\n  color: #009688;\r\n  font-size: 14px;\r\n  background: #f9f9f9;\r\n  padding: 9px 15px;\r\n  font-family: 'Exo';\r\n  font-weight: bold;\r\n}\r\n\r\n.p-que i {\r\n    font-size: 12px;\r\n    margin-right: 7px;\r\n  }\r\n\r\n/*Loader*/\r\n\r\n.loading-container {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n          align-items: center;\r\n  min-height: 100%;\r\n}\r\n\r\n.loading-container img {\r\n    -webkit-animation: play 2s ease infinite;\r\n            animation: play 2s ease infinite;\r\n    height: 150px;\r\n    width: 150px;\r\n    border-radius: 100%;\r\n  }\r\n\r\n.animated-item {\r\n  text-align: center;\r\n  min-width: 100%;\r\n}\r\n\r\n.animated-item .waiting-info {\r\n    margin-top: 70px;\r\n  }\r\n\r\n.animated-item .waiting-info h1 {\r\n      padding: 11px 3px;\r\n      border: 2px solid #009688;\r\n      font-size: 16px;\r\n      border-radius: 40px;\r\n      color: #009688;\r\n      position: relative;\r\n      z-index: 9;\r\n      font-weight: 500;\r\n      display: inline-block;\r\n      font-family: 'Exo';\r\n    }\r\n\r\n.animated-item .waiting-info .for-info {\r\n      margin-top: 5px;\r\n      color: #5d5d5d;\r\n      font-size: 12px;\r\n      font-weight: 600;\r\n      width: 90%;\r\n      text-align: center;\r\n      margin: auto;\r\n    }\r\n\r\n.pi-counter span.name {\r\n  background: #009688;\r\n  padding: 9px 20px;\r\n  margin-right: 15px;\r\n  border-radius: 40px;\r\n  color: #fff;\r\n}\r\n\r\n.pi-counter span.counter {\r\n  margin-right: 15px;\r\n}\r\n\r\n.animated-item i {\r\n  margin-right: 7px;\r\n  font-size: 15px;\r\n}\r\n\r\n.p-all label i {\r\n  color: #009688;\r\n}\r\n\r\n.p-all label span.label {\r\n  min-width: 40%;\r\n  display: inline-block;\r\n}\r\n\r\ni.fa {\r\n  margin-right: 7px;\r\n}\r\n\r\n@-webkit-keyframes play {\r\n  0% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n\r\n  15% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  25% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: scale(1.2);\r\n            transform: scale(1.2);\r\n  }\r\n  /* 80% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n    }*/\r\n  80% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n}\r\n\r\n@keyframes play {\r\n  0% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n\r\n  15% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  25% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: scale(1.2);\r\n            transform: scale(1.2);\r\n  }\r\n  /* 80% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n    }*/\r\n  80% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n}\r\n\r\n@media all and (max-width: 768px) {\r\n  h5.form-header span, h5.form-header {\r\n    display: inline-block;\r\n    color: #333;\r\n  }\r\n\r\n  .brand-title h1 span {\r\n    margin-bottom: 2px;\r\n  }\r\n\r\n  .doctor-room iframe {\r\n    height: auto;\r\n    border: none;\r\n    display: block;\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n@media all and (max-width: 640px) {\r\n  h5.form-header span, h5.form-header {\r\n    display: inline-block;\r\n    color: #333;\r\n  }\r\n\r\n  p.fever-checkbox {\r\n    min-width: 150px;\r\n  }\r\n\r\n  .hide-sm {\r\n    /* display: none */\r\n  }\r\n\r\n  .full-section {\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n            flex-flow: column;\r\n  }\r\n}\r\n\r\n.login-body {\r\n  width: 95%;\r\n  margin: auto;\r\n}\r\n\r\n.head-sm {\r\n  font-weight: 600;\r\n  margin: 5px auto;\r\n  display: block;\r\n  font-size: 12px;\r\n}\r\n\r\n.patient-login table {\r\n  table-layout: fixed;\r\n  width: 100%;\r\n}\r\n\r\n.patient-login table tr.3-cols td {\r\n    width: 33.33%\r\n  }\r\n\r\n.patient-login table tr.2-cols td {\r\n    width: 50%\r\n  }\r\n\r\n.patient-login table tr td {\r\n    padding-top: 0px;\r\n    padding-bottom: 0px;\r\n  }\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1IQUFtSDs7QUFFbkg7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWiw4QkFBbUI7RUFBbkIsNkJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVFO0lBQ0Usc0JBQXNCO0lBQ3RCLHFCQUFTO1lBQVQsU0FBUztJQUNULGNBQWM7SUFDZCxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osWUFBWTtFQUNkOztBQUVBO0lBQ0UscUJBQVM7WUFBVCxTQUFTO0lBQ1QsY0FBYztJQUNkLFlBQVk7RUFDZDs7QUFFQTtJQUNFLFlBQVk7SUFDWixXQUFXO0lBQ1gsWUFBWTtFQUNkOztBQUVGO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQixrQ0FBa0M7RUFDbEMsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsa0NBQWtDO0VBQ2xDLGNBQWM7RUFDZCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsMEJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsOEJBQW1CO0VBQW5CLDZCQUFtQjtVQUFuQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixhQUFhO0VBQ2IseUJBQThCO1VBQTlCLDhCQUE4QjtFQUM5QixnQ0FBZ0M7QUFDbEM7O0FBRUU7SUFDRTtFQUNGOztBQUVGO0VBQ0Usb0JBQW9CO0VBQ3BCLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFRTtJQUNFLFVBQVU7RUFDWjs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUU7SUFDRSxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLGNBQWM7SUFDZCxhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxlQUFlO0VBQ2pCOztBQUVFO01BQ0UsY0FBYztNQUNkLFlBQVk7TUFDWixhQUFhO01BQ2Isa0JBQWtCO0lBQ3BCOztBQUVFO1FBQ0U7TUFDRjs7QUFFQTtRQUNFLGdCQUFnQjtNQUNsQjs7QUFFTjtFQUNFLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsMEJBQTBCO0VBQzFCLGVBQWU7RUFDZixZQUFZO0VBQ1oscUJBQXFCO0FBQ3ZCOztBQUVFO0lBQ0UsWUFBWTtFQUNkOztBQUVGO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWiw4QkFBbUI7RUFBbkIsNkJBQW1CO1VBQW5CLG1CQUFtQjtBQUNyQjs7QUFFRTtJQUNFLGNBQWM7SUFDZCxXQUFXO0lBQ1gsa0JBQWtCO0VBQ3BCOztBQUVFO01BQ0UsYUFBYTtNQUNiLFdBQVc7SUFDYjs7QUFFQTtNQUNFLGtCQUFrQjtJQUNwQjs7QUFFQTtNQUNFLGdCQUFnQjtNQUNoQixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLFdBQVc7SUFDYjs7QUFFSjtFQUNFLHlCQUF5QjtFQUN6Qiw0QkFBNEI7RUFDNUIsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUNBLDJCQUEyQjs7QUFDM0IsMkJBQTJCOztBQUMzQjs7RUFFRSxrQkFBa0I7RUFDbEIsYUFBYTtBQUNmOztBQUVFOztJQUVFLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLG1CQUFtQjtFQUNyQjs7QUFFRSxvQkFBb0I7O0FBQ3BCOztNQUVFLFdBQVc7TUFDWCxrQkFBa0I7TUFDbEIsT0FBTztNQUNQLE1BQU07TUFDTixhQUFhO01BQ2IsY0FBYztNQUNkLHNCQUFzQjtNQUN0QixnQkFBZ0I7TUFDaEIsa0JBQWtCO01BQ2xCLDBDQUEwQztJQUM1Qzs7QUFDQSx3QkFBd0I7O0FBQ3hCOztNQUVFLHFCQUFxQjtNQUNyQixrQkFBa0I7TUFDbEIsVUFBVTtNQUNWLFdBQVc7TUFDWCxnQkFBZ0I7TUFDaEIsZ0JBQWdCO01BQ2hCLGNBQWM7TUFDZCwyQkFBbUI7TUFBbkIsbUJBQW1CO01BQ25CLDZEQUE2RDtJQUMvRDs7QUFDQSxnQ0FBZ0M7O0FBQ2hDO01BQ0UsVUFBVTtNQUNWLDJCQUFtQjtjQUFuQixtQkFBbUI7SUFDckI7O0FBRUE7TUFDRSxVQUFVO01BQ1YsMkJBQW1CO2NBQW5CLG1CQUFtQjtJQUNyQjs7QUFDSixzQkFBc0I7O0FBQ3RCOztFQUVFLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUNBLGtCQUFrQjs7QUFDbEI7O0VBRUUseUJBQXlCOztBQUUzQjs7QUFFQSxxQ0FBcUM7O0FBQ3JDO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLDBCQUEwQjtFQUMxQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUVWLG9CQUFhO0VBQWIsYUFBYTtFQUViLDhCQUFjO0VBQWQsNkJBQWM7VUFBZCxjQUFjO0VBQ2QsWUFBWTtFQUNaLHNCQUFnQjtVQUFoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVFO0lBRUUsbUJBQVc7WUFBWCxXQUFXO0lBRVgsNEJBQVE7WUFBUixRQUFRO0VBQ1Y7O0FBRUE7SUFFRSxtQkFBVztZQUFYLFdBQVc7RUFDYjs7QUFFQTtJQUNFLFlBQVk7SUFDWixZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGtCQUFrQjtFQUNwQjs7QUFFRTtNQUNFLGdCQUFnQjtNQUNoQixhQUFhO01BQ2Isa0JBQWtCO0lBQ3BCOztBQUVKO0VBQ0Usd0NBQXdDO0VBQ3hDLDJCQUEyQjtFQUMzQix1QkFBdUI7RUFDdkIsd0JBQWdCO0VBQWhCLGdCQUFnQjtFQUNoQjtBQUNGOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLDRCQUFRO1VBQVIsUUFBUTtFQUNSLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsd0JBQWdCO0VBQWhCLGdCQUFnQjtFQUNoQjtBQUNGOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVFO0lBQ0UsZUFBZTtJQUNmLGVBQWU7SUFDZixjQUFjO0lBQ2QsV0FBVztJQUNYLG1CQUFtQjtFQUNyQjs7QUFFRjtFQUNFLFdBQVc7RUFDWCxvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUU7SUFDRSxxQkFBcUI7SUFDckIsV0FBVztJQUNYLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsaUJBQWlCO0VBQ25COztBQUVGO0VBQ0UsV0FBVztFQUNYLGVBQWU7RUFDZixRQUFRO0VBQ1IsVUFBVTtFQUNWLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVFO0lBQ0UsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixpQkFBaUI7RUFDbkI7O0FBRUE7SUFDRSxtQkFBbUI7RUFDckI7O0FBRUE7SUFDRSxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osZUFBZTtJQUNmLGtCQUFrQjtFQUNwQjs7QUFFRTtNQUNFLGtCQUFrQjtNQUNsQixtQkFBbUI7TUFDbkIsWUFBWTtNQUNaLFdBQVc7TUFDWCxrQkFBa0I7TUFDbEIsV0FBVztNQUNYLG1CQUFtQjtNQUNuQixXQUFXO01BQ1gsWUFBWTtJQUNkOztBQUVKO0VBQ0UsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsb0JBQW9CO0FBQ3RCOztBQUVFO0lBQ0UsZUFBZTtJQUNmLGdCQUFnQjtFQUNsQjs7QUFFRjtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUU7SUFDRSxZQUFZO0lBQ1osU0FBUztJQUNULGtCQUFrQjtFQUNwQjs7QUFFQTtJQUNFLGFBQWE7RUFDZjs7QUFFRjtFQUNFO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsNEJBQXNCO0lBQXRCLDZCQUFzQjtZQUF0QixzQkFBc0I7SUFDdEIsa0JBQWtCO0VBQ3BCOztJQUVFO01BQ0UsU0FBUztNQUNUO0lBQ0Y7O0VBRUY7SUFDRSx1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSx1Q0FBaUM7SUFBakMsd0NBQWlDO1lBQWpDLGlDQUFpQztJQUNqQyxZQUFZO0lBQ1osd0JBQXVCO1lBQXZCLHVCQUF1QjtJQUN2QixXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtFQUNyQjs7SUFFRTtNQUNFLGNBQWM7TUFDZCxZQUFZO01BQ1osc0JBQVU7Y0FBVixVQUFVO01BQ1YsV0FBVztNQUNYLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsaUJBQWlCO0lBQ25COztFQUVGO0lBQ0UsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWixnQkFBZ0I7RUFDbEI7O0lBRUU7TUFDRSxpQkFBaUI7SUFDbkI7O0VBRUY7SUFDRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7SUFDWix1QkFBdUI7RUFDekI7O0lBRUU7TUFDRSxRQUFRO01BQ1Isa0JBQWtCO01BQ2xCLFVBQVU7TUFDVixjQUFjO0lBQ2hCOztJQUVBO01BQ0UsU0FBUztJQUNYO0FBQ0o7O0FBRUE7RUFDRTtJQUNFLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSwwQkFBMEI7RUFDNUI7O0VBRUE7SUFDRSxTQUFTO0lBQ1Q7RUFDRjs7RUFFQTtJQUNFLDRCQUFzQjtJQUF0Qiw2QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLHVCQUF1QjtJQUN2QixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSx1Q0FBaUM7SUFBakMsd0NBQWlDO1lBQWpDLGlDQUFpQztJQUNqQyx5QkFBbUI7WUFBbkIsbUJBQW1CO0VBQ3JCOztJQUVFO01BQ0UsZUFBZTtNQUNmLFlBQVk7TUFDWixzQkFBVTtjQUFWLFVBQVU7TUFDVixXQUFXO0lBQ2I7O0VBRUY7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWixnQkFBZ0I7RUFDbEI7O0lBRUU7TUFDRSxpQkFBaUI7SUFDbkI7O0VBRUY7SUFDRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7QUFDRjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVFO0lBQ0UsZUFBZTtJQUNmLGlCQUFpQjtFQUNuQjs7QUFDRixTQUFTOztBQUVUO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2Isd0JBQXVCO1VBQXZCLHVCQUF1QjtFQUN2Qix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFRTtJQUNFLHdDQUFnQztZQUFoQyxnQ0FBZ0M7SUFDaEMsYUFBYTtJQUNiLFlBQVk7SUFDWixtQkFBbUI7RUFDckI7O0FBRUY7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFRTtJQUNFLGdCQUFnQjtFQUNsQjs7QUFFRTtNQUNFLGlCQUFpQjtNQUNqQix5QkFBeUI7TUFDekIsZUFBZTtNQUNmLG1CQUFtQjtNQUNuQixjQUFjO01BQ2Qsa0JBQWtCO01BQ2xCLFVBQVU7TUFDVixnQkFBZ0I7TUFDaEIscUJBQXFCO01BQ3JCLGtCQUFrQjtJQUNwQjs7QUFFQTtNQUNFLGVBQWU7TUFDZixjQUFjO01BQ2QsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixVQUFVO01BQ1Ysa0JBQWtCO01BQ2xCLFlBQVk7SUFDZDs7QUFFSjtFQUNFLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0U7SUFDRSwyQkFBbUI7WUFBbkIsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsK0NBQStDO0VBQ2pEOztFQUVBO0lBQ0Usb0ZBQW9GO0VBQ3RGOztFQUVBO0lBQ0UsNkJBQXFCO1lBQXJCLHFCQUFxQjtFQUN2QjtFQUNBOztNQUVJO0VBQ0o7SUFDRSwyQkFBbUI7WUFBbkIsbUJBQW1CO0VBQ3JCO0FBQ0Y7O0FBdEJBO0VBQ0U7SUFDRSwyQkFBbUI7WUFBbkIsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsK0NBQStDO0VBQ2pEOztFQUVBO0lBQ0Usb0ZBQW9GO0VBQ3RGOztFQUVBO0lBQ0UsNkJBQXFCO1lBQXJCLHFCQUFxQjtFQUN2QjtFQUNBOztNQUVJO0VBQ0o7SUFDRSwyQkFBbUI7WUFBbkIsbUJBQW1CO0VBQ3JCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osWUFBWTtJQUNaLGNBQWM7SUFDZCxXQUFXO0VBQ2I7QUFDRjs7QUFFQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLFdBQVc7RUFDYjs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUVFLDRCQUFpQjtJQUFqQiw2QkFBaUI7WUFBakIsaUJBQWlCO0VBQ25CO0FBQ0Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixXQUFXO0FBQ2I7O0FBRUU7SUFDRTtFQUNGOztBQUVBO0lBQ0U7RUFDRjs7QUFFQTtJQUNFLGdCQUFnQjtJQUNoQixtQkFBbUI7RUFDckIiLCJmaWxlIjoic3JjL3N0eWxlcy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1FeG86d2dodEA2MDAmZGlzcGxheT1zd2FwfFBvcHBpbnM6d2dodEA1MDA7NjAwJmRpc3BsYXk9c3dhcCcpO1xyXG5cclxuaHRtbCwgYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRhYmxlIHRkIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgcGFkZGluZzogN3B4O1xyXG59XHJcblxyXG4uZG9jdG9yLXJvb20gdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZG9jdG9yLXJvb20ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxufVxyXG5cclxuICAuZG9jdG9yLXJvb20gLnBhdGllbnQtaW5mbywgLmRvY3Rvci1yb29tIC5zY3JlZW4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGZsZXg6IDMwJTtcclxuICAgIG1pbi13aWR0aDogMjUlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGxpbmUtaGVpZ2h0OiA3NXB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgcGFkZGluZzogMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gIH1cclxuXHJcbiAgLmRvY3Rvci1yb29tIC5zY3JlZW4ge1xyXG4gICAgZmxleDogNzUlO1xyXG4gICAgbWF4LXdpZHRoOiA3NSU7XHJcbiAgICBwYWRkaW5nOiAwcHg7XHJcbiAgfVxyXG5cclxuICAuZG9jdG9yLXJvb20gaWZyYW1lIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gIH1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSB7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuICBtYXJnaW4tYm90dG9tOiA3cHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDAgMnB4O1xyXG59XHJcblxyXG50ZXh0YXJlYSB7XHJcbiAgbWluLWhlaWdodDogNDBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbiAgcGFkZGluZzogMCAycHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiYnV0dG9uXCJdLCBidXR0b24ge1xyXG4gIGJhY2tncm91bmQ6ICMwMDk2ODg7XHJcbiAgcGFkZGluZzogNXB4IDI1cHg7XHJcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJztcclxuICBjb2xvcjogI2ZmZjtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgYm9yZGVyOiAxcHggc29saWQ7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5pbmZvLWhlYWRpbmcgYnV0dG9uIHtcclxuICBwYWRkaW5nOiA0cHggMTBweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbjogMTBweCAwO1xyXG4gIGhlaWdodDogMzVweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi5wYXRpZW50LWluZm8gLmluZm8taGVhZGluZyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICB3aWR0aDogYXV0bztcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjZjhmOGY4O1xyXG59XHJcblxyXG4gIC5wYXRpZW50LWluZm8gLmluZm8taGVhZGluZyBpbnB1dFt0eXBlPVwiYnV0dG9uXCJdIHtcclxuICAgIG1hcmdpbi10b3A6IGF1dG9cclxuICB9XHJcblxyXG4ucGF0aWVudC1pbmZvIC5pbmZvLWxpc3RpbmcsIC5wYXRpZW50LWluZm8gLnAtYWxsIHtcclxuICBsaW5lLWhlaWdodDogaW5pdGlhbDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDk1JTtcclxufVxyXG5cclxuLmJ0bi1jYWxsIHtcclxuICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gIHBhZGRpbmc6IDNweCAxMHB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAyM3B4O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBvcGFjaXR5OiAwLjg7XHJcbiAgbWFyZ2luOiA1cHggMDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbiAgLmJ0bi1jYWxsOmhvdmVyIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG5cclxuLnBhdGllbnQtaW5mbyB7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbn1cclxuXHJcbiAgLnBhdGllbnQtaW5mbyAucC1hbGwge1xyXG4gICAgYmFja2dyb3VuZDogI2YzZjVmODtcclxuICAgIHBhZGRpbmctdG9wOiAwO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDA7XHJcbiAgICBtYXJnaW46IGF1dG8gMTBweDtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIGhlaWdodDogNTUwcHg7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgY29sb3I6ICM0NDQ7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG5cclxuICAgIC5wYXRpZW50LWluZm8gLnAtYWxsIGxhYmVsIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgfVxyXG5cclxuICAgICAgLnBhdGllbnQtaW5mbyAucC1hbGwgbGFiZWw6bnRoLW9mLXR5cGUoZXZlbikge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmZcclxuICAgICAgfVxyXG5cclxuICAgICAgLnBhdGllbnQtaW5mbyAucC1hbGwgbGFiZWwgc3BhbiB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgfVxyXG5cclxuLmJhZGdlLXllcyB7XHJcbiAgYmFja2dyb3VuZDogI2VmNWI1YjtcclxuICBjb2xvcjogI2ZmZjtcclxuICBwYWRkaW5nOiAzcHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5iYWRnZS1ubyB7XHJcbiAgYmFja2dyb3VuZDogIzAwOTY4ODtcclxuICBjb2xvcjogI2ZmZjtcclxuICBwYWRkaW5nOiAzcHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5wLWFsbCB7XHJcbiAgbWF4LWhlaWdodDogMTAwJTtcclxuICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICMwMDk2ODg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbiAgYS50ZXh0LWxpbmsge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gIH1cclxuXHJcbi5iYWRnZS1zdGF0dXMge1xyXG4gIGZsb2F0OiByaWdodDtcclxuICBwYWRkaW5nOiA1cHggMTBweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgZm9udC1zaXplOiA5cHg7XHJcbn1cclxuXHJcbi5tLTctYSB7XHJcbiAgbWFyZ2luOiA3cHggYXV0bztcclxufVxyXG5cclxuLndhaXQtc2VjdGlvbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbn1cclxuXHJcbiAgLndhaXQtc2VjdGlvbiAuYnJhbmQtdGl0bGUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gICAgLndhaXQtc2VjdGlvbiAuYnJhbmQtdGl0bGUgLndhaXRpbmctaWNvbiBzdmcge1xyXG4gICAgICBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgICB3aWR0aDogYXV0bztcclxuICAgIH1cclxuXHJcbiAgICAud2FpdC1zZWN0aW9uIC5icmFuZC10aXRsZSAud2FpdGluZy1pY29uIHtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC53YWl0LXNlY3Rpb24gLmJyYW5kLXRpdGxlIGgxIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICBtYXJnaW4tdG9wOiAyNXB4O1xyXG4gICAgICBjb2xvcjogIzMzMztcclxuICAgIH1cclxuXHJcbi51c2VyLXRpdGxlIHtcclxuICBjb2xvcjogIzAwOTY4OCAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtICFpbXBvcnRhbnQ7XHJcbiAgZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbmltZy5icmFuZC1pbWcge1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG4vKiBCYXNlIGZvciBsYWJlbCBzdHlsaW5nICovXHJcbi8qIEJhc2UgZm9yIGxhYmVsIHN0eWxpbmcgKi9cclxuW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAtOTk5OXB4O1xyXG59XHJcblxyXG4gIFt0eXBlPVwiY2hlY2tib3hcIl06bm90KDpjaGVja2VkKSArIGxhYmVsLFxyXG4gIFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCArIGxhYmVsIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHBhZGRpbmctbGVmdDogMS45ZW07XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgICAvKiBjaGVja2JveCBhc3BlY3QgKi9cclxuICAgIFt0eXBlPVwiY2hlY2tib3hcIl06bm90KDpjaGVja2VkKSArIGxhYmVsOmJlZm9yZSxcclxuICAgIFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSB7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgd2lkdGg6IDEuMjVlbTtcclxuICAgICAgaGVpZ2h0OiAxLjI1ZW07XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggM3B4IHJnYmEoMCwwLDAsLjEpO1xyXG4gICAgfVxyXG4gICAgLyogY2hlY2tlZCBtYXJrIGFzcGVjdCAqL1xyXG4gICAgW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YWZ0ZXIsXHJcbiAgICBbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQgKyBsYWJlbDphZnRlciB7XHJcbiAgICAgIGNvbnRlbnQ6ICdcXDI3MTNcXDAwMjAnO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogLjE1ZW07XHJcbiAgICAgIGxlZnQ6IC4xNWVtO1xyXG4gICAgICBmb250LXNpemU6IDEuNWVtO1xyXG4gICAgICBsaW5lLWhlaWdodDogMC44O1xyXG4gICAgICBjb2xvcjogIzA5YWQ3ZTtcclxuICAgICAgdHJhbnNpdGlvbjogYWxsIC4ycztcclxuICAgICAgZm9udC1mYW1pbHk6ICdMdWNpZGEgU2FucyBVbmljb2RlJywgJ0FyaWFsIFVuaWNvZGUgTVMnLCBBcmlhbDtcclxuICAgIH1cclxuICAgIC8qIGNoZWNrZWQgbWFyayBhc3BlY3QgY2hhbmdlcyAqL1xyXG4gICAgW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YWZ0ZXIge1xyXG4gICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCArIGxhYmVsOmFmdGVyIHtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIH1cclxuLyogZGlzYWJsZWQgY2hlY2tib3ggKi9cclxuW3R5cGU9XCJjaGVja2JveFwiXTpkaXNhYmxlZDpub3QoOmNoZWNrZWQpICsgbGFiZWw6YmVmb3JlLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmRpc2FibGVkOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgYm9yZGVyLWNvbG9yOiAjYmJiO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XHJcbn1cclxuXHJcblt0eXBlPVwiY2hlY2tib3hcIl06ZGlzYWJsZWQ6Y2hlY2tlZCArIGxhYmVsOmFmdGVyIHtcclxuICBjb2xvcjogIzk5OTtcclxufVxyXG5cclxuW3R5cGU9XCJjaGVja2JveFwiXTpkaXNhYmxlZCArIGxhYmVsIHtcclxuICBjb2xvcjogI2FhYTtcclxufVxyXG4vKiBhY2Nlc3NpYmlsaXR5ICovXHJcblt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZDpmb2N1cyArIGxhYmVsOmJlZm9yZSxcclxuW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpOmZvY3VzICsgbGFiZWw6YmVmb3JlIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjMDlhZDdlO1xyXG4gIDtcclxufVxyXG5cclxuLyogaG92ZXIgc3R5bGUganVzdCBmb3IgaW5mb3JtYXRpb24gKi9cclxubGFiZWw6aG92ZXI6YmVmb3JlIHtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjNDc3OGQ5ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbnAuZmV2ZXItY2hlY2tib3gge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tcmlnaHQ6IDdweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgbWFyZ2luLXRvcDogYXV0bztcclxuICBtaW4td2lkdGg6IDEzMHB4O1xyXG59XHJcblxyXG4uZnVsbC1zZWN0aW9uIHRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmZ1bGwtc2VjdGlvbiB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgLXdlYmtpdC1mbGV4LWZsb3c6IHJvdztcclxuICBmbGV4LWZsb3c6IHJvdztcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYWxpZ24taXRlbXM6IHRvcDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbiAgLmZ1bGwtc2VjdGlvbiAucGF0aWVudC1sb2dpbiB7XHJcbiAgICAtd2Via2l0LWZsZXg6IDIgMSAwO1xyXG4gICAgZmxleDogMiAxIDA7XHJcbiAgICAtd2Via2l0LW9yZGVyOiAyO1xyXG4gICAgb3JkZXI6IDI7XHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uIC5icmFuZC10aXRsZSwgLmZ1bGwtc2VjdGlvbiAuZG9jdG9yLWxvZ2luIHtcclxuICAgIC13ZWJraXQtZmxleDogMSA2IDA7XHJcbiAgICBmbGV4OiAxIDYgMDtcclxuICB9XHJcblxyXG4gIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4sIC5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuYnJhbmQtdGl0bGUge1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gICAgbWluLWhlaWdodDogNTUwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMxcHg7XHJcbiAgfVxyXG5cclxuICAgIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4gZm9ybSwgLmZ1bGwtc2VjdGlvbiAuZG9jdG9yLWxvZ2luIGZvcm0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICB9XHJcblxyXG4uYnJhbmQtdGl0bGUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xyXG4gIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgdG9wOiAwXHJcbn1cclxuXHJcbi5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiB7XHJcbiAgYm94LXNoYWRvdzogbm9uZTtcclxuICBvcmRlcjogMjtcclxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xyXG4gIG1pbi1oZWlnaHQ6IGF1dG87XHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICB0b3A6IDBcclxufVxyXG5cclxudGFibGUgdGQgbGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBtYXJnaW46IDdweCBhdXRvO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi5icmFuZC10aXRsZSBoMSB7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICBjb2xvcjogIzAwOTY4ODtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBtYXJnaW4tdG9wOiA1cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAnRXhvJztcclxufVxyXG5cclxuICAuYnJhbmQtdGl0bGUgaDEgc3BhbiB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICB9XHJcblxyXG5oNS5mb3JtLWhlYWRlciB7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgbGluZS1oZWlnaHQ6IGluaXRpYWw7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG4gIG1hcmdpbi10b3A6IGF1dG87XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4gIGg1LmZvcm0taGVhZGVyIHNwYW4ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XHJcbiAgfVxyXG5cclxuLmZ1bGwtc2VjdGlvbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDBweDtcclxuICByaWdodDogMHB4O1xyXG4gIHdpZHRoOiA3MyU7XHJcbiAgYmFja2dyb3VuZDogIzNmNTFiNTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmltZy5icmFuZC1pbWcge1xyXG4gIGhlaWdodDogNTBweDtcclxufVxyXG5cclxuaW1nLmhvcy1pbWcge1xyXG4gIGhlaWdodDogNTBweDtcclxufVxyXG5cclxuLndhaXRpbmctaWNvbiB1bCB7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuICAud2FpdGluZy1pY29uIHVsLmlubGluZSB7XHJcbiAgICBtYXJnaW46IDMwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgfVxyXG5cclxuICAud2FpdGluZy1pY29uIHVsIGxpOm50aC1vZi10eXBlKGV2ZW4pIHtcclxuICAgIGJhY2tncm91bmQ6ICNmM2Y2Zjg7XHJcbiAgfVxyXG5cclxuICAud2FpdGluZy1pY29uIHVsIGxpIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcGFkZGluZzogMTVweCA1cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gICAgLndhaXRpbmctaWNvbiB1bCBsaSBzcGFuIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gICAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGxlZnQ6IC0yMHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMnB4O1xyXG4gICAgfVxyXG5cclxuLndhaXQtc2VjdGlvbiAucmVwb3J0LXRpdGxlIHtcclxuICB3aWR0aDogNzAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG5cclxuICAud2FpdC1zZWN0aW9uIC5yZXBvcnQtdGl0bGUgaDEge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICB9XHJcblxyXG4ucG93ZXJlZC1zZWN0aW9uIHtcclxuICBib3R0b206IDEwcHg7XHJcbiAgcGFkZGluZzogN3B4IDIwcHg7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgd2lkdGg6IGF1dG87XHJcbn1cclxuXHJcbiAgLnBvd2VyZWQtc2VjdGlvbiBpbWcge1xyXG4gICAgaGVpZ2h0OiA1NXB4O1xyXG4gICAgbGVmdDogMHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuXHJcbiAgLnBvd2VyZWQtc2VjdGlvbiBzcGFuIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6OTAwcHgpIHtcclxuICBib2R5IHtcclxuICAgIGJhY2tncm91bmQ6ICNlZWVkZjY7XHJcbiAgfVxyXG5cclxuICAuZG9jdG9yLXJvb20ge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gICAgLmRvY3Rvci1yb29tIC5wYXRpZW50LWluZm8sIC5kb2N0b3Itcm9vbSAuc2NyZWVuIHtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICB3aWR0aDogMTAwJVxyXG4gICAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uOmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICB9XHJcblxyXG4gIC5mdWxsLXNlY3Rpb24ge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbiAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IDM1cHg7XHJcbiAgfVxyXG5cclxuICAgIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4sIC5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuYnJhbmQtdGl0bGUge1xyXG4gICAgICBtYXgtd2lkdGg6IDkwJTtcclxuICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICBmbGV4OiAxMDAlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgbWluLWhlaWdodDogYXV0bztcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW46IDEwcHggYXV0bztcclxuICAgIH1cclxuXHJcbiAgLmJyYW5kLXRpdGxlIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgbWFyZ2luLXRvcDogM3JlbTtcclxuICB9XHJcblxyXG4gICAgLmJyYW5kLXRpdGxlIGgxIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIH1cclxuXHJcbiAgaW1nLmJyYW5kLWltZyB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgfVxyXG5cclxuICAucGF0aWVudC1pbmZvIC5wLWFsbCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gIC5wb3dlcmVkLXNlY3Rpb24ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm90dG9tOiAyMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHotaW5kZXg6IDk5OTtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgICAucG93ZXJlZC1zZWN0aW9uIHNwYW4ge1xyXG4gICAgICByaWdodDogMDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IC0xMHB4O1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuXHJcbiAgICAucG93ZXJlZC1zZWN0aW9uIGltZyB7XHJcbiAgICAgIGxlZnQ6IDBweDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6NDgwcHgpIHtcclxuICBib2R5IHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgaDUuZm9ybS1oZWFkZXIsIGg1LmZvcm0taGVhZGVyIHNwYW4ge1xyXG4gICAgY29sb3I6ICMzMzM7XHJcbiAgfVxyXG5cclxuICAuYnJhbmQtdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLmFuaW1hdGVkLWl0ZW0gLndhaXRpbmctaW5mbyBoMSB7XHJcbiAgICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5kb2N0b3Itcm9vbSAucGF0aWVudC1pbmZvLCAuZG9jdG9yLXJvb20gLnNjcmVlbiB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICB3aWR0aDogMTAwJVxyXG4gIH1cclxuXHJcbiAgLmRvY3Rvci1yb29tIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uOmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAgIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4sIC5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuYnJhbmQtdGl0bGUge1xyXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgZmxleDogMTAwJTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gIC5wYXRpZW50LWxvZ2luIHRhYmxlIHRyIHRkIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuXHJcbiAgLmJyYW5kLXRpdGxlIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgbWFyZ2luLXRvcDogMnJlbTtcclxuICB9XHJcblxyXG4gICAgLmJyYW5kLXRpdGxlIGgxIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIH1cclxuXHJcbiAgaW1nLmJyYW5kLWltZyB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgfVxyXG5cclxuICAucGktY291bnRlciBzcGFuLmNvdW50ZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMjVweDtcclxuICB9XHJcbn1cclxuXHJcbi5wLXF1ZSB7XHJcbiAgY29sb3I6ICMwMDk2ODg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGJhY2tncm91bmQ6ICNmOWY5Zjk7XHJcbiAgcGFkZGluZzogOXB4IDE1cHg7XHJcbiAgZm9udC1mYW1pbHk6ICdFeG8nO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4gIC5wLXF1ZSBpIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIG1hcmdpbi1yaWdodDogN3B4O1xyXG4gIH1cclxuLypMb2FkZXIqL1xyXG5cclxuLmxvYWRpbmctY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWluLWhlaWdodDogMTAwJTtcclxufVxyXG5cclxuICAubG9hZGluZy1jb250YWluZXIgaW1nIHtcclxuICAgIGFuaW1hdGlvbjogcGxheSAycyBlYXNlIGluZmluaXRlO1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxuICAgIHdpZHRoOiAxNTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgfVxyXG5cclxuLmFuaW1hdGVkLWl0ZW0ge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtaW4td2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiAgLmFuaW1hdGVkLWl0ZW0gLndhaXRpbmctaW5mbyB7XHJcbiAgICBtYXJnaW4tdG9wOiA3MHB4O1xyXG4gIH1cclxuXHJcbiAgICAuYW5pbWF0ZWQtaXRlbSAud2FpdGluZy1pbmZvIGgxIHtcclxuICAgICAgcGFkZGluZzogMTFweCAzcHg7XHJcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDk2ODg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNDBweDtcclxuICAgICAgY29sb3I6ICMwMDk2ODg7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgei1pbmRleDogOTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBmb250LWZhbWlseTogJ0V4byc7XHJcbiAgICB9XHJcblxyXG4gICAgLmFuaW1hdGVkLWl0ZW0gLndhaXRpbmctaW5mbyAuZm9yLWluZm8ge1xyXG4gICAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICAgIGNvbG9yOiAjNWQ1ZDVkO1xyXG4gICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgfVxyXG5cclxuLnBpLWNvdW50ZXIgc3Bhbi5uYW1lIHtcclxuICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gIHBhZGRpbmc6IDlweCAyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4ucGktY291bnRlciBzcGFuLmNvdW50ZXIge1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxufVxyXG5cclxuLmFuaW1hdGVkLWl0ZW0gaSB7XHJcbiAgbWFyZ2luLXJpZ2h0OiA3cHg7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcblxyXG4ucC1hbGwgbGFiZWwgaSB7XHJcbiAgY29sb3I6ICMwMDk2ODg7XHJcbn1cclxuXHJcbi5wLWFsbCBsYWJlbCBzcGFuLmxhYmVsIHtcclxuICBtaW4td2lkdGg6IDQwJTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbmkuZmEge1xyXG4gIG1hcmdpbi1yaWdodDogN3B4O1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHBsYXkge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgfVxyXG5cclxuICAxNSUge1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMjBweCByZ2JhKDI3LCAxNjQsIDE1NSwgMC4wNSk7XHJcbiAgfVxyXG5cclxuICAyNSUge1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMjBweCByZ2JhKDI3LCAxNjQsIDE1NSwgMC4wNSksIDAgMCAwIDQwcHggcmdiYSgyNywgMTY0LCAxNTUsIDAuMDUpO1xyXG4gIH1cclxuXHJcbiAgMzAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICB9XHJcbiAgLyogODAlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDIwcHggcmdiYSgyNywgMTY0LCAxNTUsIDAuMDUpLCAwIDAgMCA0MHB4IHJnYmEoMjcsIDE2NCwgMTU1LCAwLjA1KTtcclxuICAgIH0qL1xyXG4gIDgwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICBoNS5mb3JtLWhlYWRlciBzcGFuLCBoNS5mb3JtLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBjb2xvcjogIzMzMztcclxuICB9XHJcblxyXG4gIC5icmFuZC10aXRsZSBoMSBzcGFuIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICB9XHJcblxyXG4gIC5kb2N0b3Itcm9vbSBpZnJhbWUge1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XHJcbiAgaDUuZm9ybS1oZWFkZXIgc3BhbiwgaDUuZm9ybS1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6ICMzMzM7XHJcbiAgfVxyXG5cclxuICBwLmZldmVyLWNoZWNrYm94IHtcclxuICAgIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgfVxyXG5cclxuICAuaGlkZS1zbSB7XHJcbiAgICAvKiBkaXNwbGF5OiBub25lICovXHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uIHtcclxuICAgIC13ZWJraXQtZmxleC1mbG93OiBjb2x1bW47XHJcbiAgICBmbGV4LWZsb3c6IGNvbHVtbjtcclxuICB9XHJcbn1cclxuXHJcbi5sb2dpbi1ib2R5IHtcclxuICB3aWR0aDogOTUlO1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuLmhlYWQtc20ge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbWFyZ2luOiA1cHggYXV0bztcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5wYXRpZW50LWxvZ2luIHRhYmxlIHtcclxuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4gIC5wYXRpZW50LWxvZ2luIHRhYmxlIHRyLjMtY29scyB0ZCB7XHJcbiAgICB3aWR0aDogMzMuMzMlXHJcbiAgfVxyXG5cclxuICAucGF0aWVudC1sb2dpbiB0YWJsZSB0ci4yLWNvbHMgdGQge1xyXG4gICAgd2lkdGg6IDUwJVxyXG4gIH1cclxuXHJcbiAgLnBhdGllbnQtbG9naW4gdGFibGUgdHIgdGQge1xyXG4gICAgcGFkZGluZy10b3A6IDBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwcHg7XHJcbiAgfVxyXG4iXX0= */", '', '']]

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../node_modules/postcss-loader/src??embedded!./styles.css */ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Bitbucket\Telemedicine\Telemedicine\TeleMedicine\TeleMedicine\src\styles.css */"./src/styles.css");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map