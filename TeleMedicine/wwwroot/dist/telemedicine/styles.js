(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap');\r\n\r\nhtml, body {\r\n  height: auto;\r\n  width: 100%;\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  background: #fff;\r\n  font-family: 'Poppins', sans-serif;\r\n  font-weight: 500;\r\n  margin: auto;\r\n  font-size: 12px;\r\n  width: 100%;\r\n}\r\n\r\ntable td {\r\n  font-size: 12px;\r\n  padding: 7px;\r\n}\r\n\r\n.doctor-room table {\r\n  width: 100%;\r\n}\r\n\r\n.doctor-room {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  flex-wrap: nowrap;\r\n  width: 100%;\r\n  margin: auto;\r\n  position: relative;\r\n  -webkit-box-align: center;\r\n          align-items: center;\r\n  height: 100%;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: row;\r\n  position: fixed;\r\n}\r\n\r\n.doctor-room .patient-info, .doctor-room .screen {\r\n    background-color: #fff;\r\n    -webkit-box-flex: 30%;\r\n            flex: 30%;\r\n    min-width: 25%;\r\n    margin: auto;\r\n    text-align: left;\r\n    line-height: 75px;\r\n    font-size: 12px;\r\n    padding: 0px;\r\n    border-radius: 5px;\r\n    height: 100%;\r\n    z-index: 999;\r\n  }\r\n\r\n.doctor-room .screen {\r\n    -webkit-box-flex: 75%;\r\n            flex: 75%;\r\n    max-width: 75%;\r\n    padding: 0px;\r\n  }\r\n\r\n.doctor-room iframe {\r\n    height: 100%;\r\n    width: 100%;\r\n    border: none;\r\n  }\r\n\r\ninput[type=\"text\"], input[type=\"password\"], input[type=\"email\"] {\r\n  height: 30px;\r\n  width: 100%;\r\n  border-radius: 5px;\r\n  border: 1px solid #bbb;\r\n  background: #fff;\r\n  font-family: 'Poppins', sans-serif;\r\n  margin-bottom: 7px;\r\n  display: block;\r\n  max-width: 100%;\r\n  padding: 0 2px;\r\n}\r\n\r\ntextarea {\r\n  min-height: 40px;\r\n  width: 100%;\r\n  border-radius: 5px;\r\n  border: 1px solid #bbb;\r\n  background: #fff;\r\n  font-family: 'Poppins', sans-serif;\r\n  padding: 0 2px;\r\n  margin-bottom: 7px;\r\n}\r\n\r\ninput[type=\"button\"], button {\r\n  background: #009688;\r\n  padding: 10px 30px;\r\n  font-family: 'Poppins';\r\n  color: #fff;\r\n  text-transform: uppercase;\r\n  font-weight: bold;\r\n  border: 1px solid;\r\n  margin-top: 15px;\r\n  cursor: pointer;\r\n}\r\n\r\n.info-heading button {\r\n  padding: 4px 10px;\r\n  text-transform: capitalize;\r\n  font-weight: 500;\r\n  margin: 10px 0;\r\n  height: 35px;\r\n  border: none;\r\n}\r\n\r\n.patient-info .info-heading {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  flex-wrap: nowrap;\r\n  width: auto;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: row;\r\n  background: #fff;\r\n  margin: auto;\r\n  padding: 10px;\r\n  -webkit-box-pack: justify;\r\n          justify-content: space-between;\r\n  border-bottom: 5px solid #f8f8f8;\r\n}\r\n\r\n.patient-info .info-heading input[type=\"button\"] {\r\n    margin-top: auto\r\n  }\r\n\r\n.patient-info .info-listing, .patient-info .p-all {\r\n  line-height: initial;\r\n  font-size: 12px;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n  display: block;\r\n  width: 95%;\r\n}\r\n\r\n.btn-call {\r\n  background: #009688;\r\n  padding: 3px 10px;\r\n  color: #fff;\r\n  text-decoration: none;\r\n  border-radius: 23px;\r\n  font-size: 12px;\r\n  opacity: 0.8;\r\n  margin: 5px 0;\r\n  text-align: center;\r\n}\r\n\r\n.btn-call:hover {\r\n    opacity: 1;\r\n  }\r\n\r\n.patient-info {\r\n  overflow: auto;\r\n}\r\n\r\n.patient-info .p-all {\r\n    background: #f3f5f8;\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n    margin: auto 10px;\r\n    width: 90%;\r\n    overflow: auto;\r\n    height: 550px;\r\n    font-weight: 300;\r\n    color: #444;\r\n    font-size: 12px;\r\n  }\r\n\r\n.patient-info .p-all label {\r\n      display: block;\r\n      margin: auto;\r\n      padding: 10px;\r\n      border-radius: 5px;\r\n    }\r\n\r\n.patient-info .p-all label:nth-of-type(even) {\r\n        background: #fff\r\n      }\r\n\r\n.patient-info .p-all label span {\r\n        font-weight: 400;\r\n      }\r\n\r\n.badge-yes {\r\n  background: #ef5b5b;\r\n  color: #fff;\r\n  padding: 3px 10px;\r\n  border-radius: 40px;\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  font-size: 10px;\r\n}\r\n\r\n.badge-no {\r\n  background: #009688;\r\n  color: #fff;\r\n  padding: 3px 10px;\r\n  border-radius: 40px;\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  font-size: 10px;\r\n}\r\n\r\n.p-all {\r\n  max-height: 100%;\r\n  overflow: auto;\r\n}\r\n\r\na {\r\n  color: #009688;\r\n  text-decoration: underline;\r\n  cursor: pointer;\r\n  margin: auto;\r\n  display: inline-block;\r\n}\r\n\r\na.text-link {\r\n    margin: 10px;\r\n  }\r\n\r\n.badge-status {\r\n  float: right;\r\n  padding: 5px 10px;\r\n  display: inline-block;\r\n  font-size: 9px;\r\n}\r\n\r\n.m-7-a {\r\n  margin: 7px auto;\r\n}\r\n\r\n.wait-section {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  flex-wrap: nowrap;\r\n  width: 100%;\r\n  margin: auto;\r\n  position: relative;\r\n  -webkit-box-align: center;\r\n          align-items: center;\r\n  height: 100%;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-direction: row;\r\n}\r\n\r\n.wait-section .brand-title {\r\n    display: block;\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n\r\n.wait-section .brand-title .waiting-icon svg {\r\n      height: 150px;\r\n      width: auto;\r\n    }\r\n\r\n.wait-section .brand-title .waiting-icon {\r\n      text-align: center;\r\n    }\r\n\r\n.wait-section .brand-title h1 {\r\n      font-weight: 400;\r\n      font-size: 20px;\r\n      margin-top: 25px;\r\n      color: #333;\r\n    }\r\n\r\n.user-title {\r\n  color: #009688 !important;\r\n  font-size: 1.5rem !important;\r\n  display: inline !important;\r\n}\r\n\r\nimg.brand-img {\r\n  height: 80px;\r\n}\r\n\r\n/* Base for label styling */\r\n\r\n/* Base for label styling */\r\n\r\n[type=\"checkbox\"]:not(:checked),\r\n[type=\"checkbox\"]:checked {\r\n  position: absolute;\r\n  left: -9999px;\r\n}\r\n\r\n[type=\"checkbox\"]:not(:checked) + label,\r\n  [type=\"checkbox\"]:checked + label {\r\n    position: relative;\r\n    padding-left: 1.9em;\r\n    cursor: pointer;\r\n    margin-bottom: auto;\r\n  }\r\n\r\n/* checkbox aspect */\r\n\r\n[type=\"checkbox\"]:not(:checked) + label:before,\r\n    [type=\"checkbox\"]:checked + label:before {\r\n      content: '';\r\n      position: absolute;\r\n      left: 0;\r\n      top: 0;\r\n      width: 1.25em;\r\n      height: 1.25em;\r\n      border: 1px solid #aaa;\r\n      background: #fff;\r\n      border-radius: 2px;\r\n      box-shadow: inset 0 1px 3px rgba(0,0,0,.1);\r\n    }\r\n\r\n/* checked mark aspect */\r\n\r\n[type=\"checkbox\"]:not(:checked) + label:after,\r\n    [type=\"checkbox\"]:checked + label:after {\r\n      content: '\\2713\\0020';\r\n      position: absolute;\r\n      top: .15em;\r\n      left: .15em;\r\n      font-size: 1.5em;\r\n      line-height: 0.8;\r\n      color: #09ad7e;\r\n      -webkit-transition: all .2s;\r\n      transition: all .2s;\r\n      font-family: 'Lucida Sans Unicode', 'Arial Unicode MS', Arial;\r\n    }\r\n\r\n/* checked mark aspect changes */\r\n\r\n[type=\"checkbox\"]:not(:checked) + label:after {\r\n      opacity: 0;\r\n      -webkit-transform: scale(0);\r\n              transform: scale(0);\r\n    }\r\n\r\n[type=\"checkbox\"]:checked + label:after {\r\n      opacity: 1;\r\n      -webkit-transform: scale(1);\r\n              transform: scale(1);\r\n    }\r\n\r\n/* disabled checkbox */\r\n\r\n[type=\"checkbox\"]:disabled:not(:checked) + label:before,\r\n[type=\"checkbox\"]:disabled:checked + label:before {\r\n  box-shadow: none;\r\n  border-color: #bbb;\r\n  background-color: #ddd;\r\n}\r\n\r\n[type=\"checkbox\"]:disabled:checked + label:after {\r\n  color: #999;\r\n}\r\n\r\n[type=\"checkbox\"]:disabled + label {\r\n  color: #aaa;\r\n}\r\n\r\n/* accessibility */\r\n\r\n[type=\"checkbox\"]:checked:focus + label:before,\r\n[type=\"checkbox\"]:not(:checked):focus + label:before {\r\n  border: 1px solid #09ad7e;\r\n  ;\r\n}\r\n\r\n/* hover style just for information */\r\n\r\nlabel:hover:before {\r\n  border: 2px solid #4778d9 !important;\r\n}\r\n\r\np.fever-checkbox {\r\n  display: inline-block;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  margin-right: 7px;\r\n  text-transform: capitalize;\r\n  margin-bottom: 5px;\r\n  color: #333;\r\n  margin-top: auto;\r\n  min-width: 130px;\r\n}\r\n\r\n.full-section table {\r\n  width: 100%;\r\n}\r\n\r\n.full-section {\r\n  margin: 0;\r\n  padding: 0;\r\n  display: -webkit-box;\r\n  display: flex;\r\n  -webkit-box-orient: horizontal;\r\n  -webkit-box-direction: normal;\r\n          flex-flow: row;\r\n  height: 100%;\r\n  -webkit-box-align: top;\r\n          align-items: top;\r\n  position: relative;\r\n}\r\n\r\n.full-section .patient-login {\r\n    -webkit-box-flex: 2;\r\n            flex: 2 1 0;\r\n    -webkit-box-ordinal-group: 3;\r\n            order: 2;\r\n  }\r\n\r\n.full-section .brand-title, .full-section .doctor-login {\r\n    -webkit-box-flex: 1;\r\n            flex: 1 6 0;\r\n  }\r\n\r\n.full-section .patient-login, .full-section .doctor-login, .full-section .brand-title {\r\n    margin: 15px;\r\n    z-index: 999;\r\n    min-height: 550px;\r\n  }\r\n\r\n.full-section .patient-login form, .full-section .doctor-login form {\r\n      background: #fff;\r\n      padding: 10px;\r\n      border-radius: 5px;\r\n    }\r\n\r\n.brand-title {\r\n  background-color: transparent !important;\r\n  box-shadow: none !important;\r\n  height: auto !important;\r\n  position: -webkit-sticky;\r\n  position: sticky;\r\n  top: 0\r\n}\r\n\r\n.full-section .doctor-login {\r\n  box-shadow: none;\r\n  -webkit-box-ordinal-group: 3;\r\n          order: 2;\r\n  align-self: flex-start;\r\n  min-height: auto;\r\n  position: -webkit-sticky;\r\n  position: sticky;\r\n  top: 0\r\n}\r\n\r\ntable td label {\r\n  font-size: 12px;\r\n  margin: 7px auto;\r\n  display: block;\r\n  font-weight: 500;\r\n}\r\n\r\n.brand-title h1 {\r\n  line-height: normal;\r\n  color: #009688;\r\n  font-size: 2.0rem;\r\n  font-weight: 600;\r\n  margin: 5rem auto;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.brand-title h1 span {\r\n    font-size: 25px;\r\n    margin-top: 5px;\r\n    display: block;\r\n    color: #333;\r\n    margin-bottom: 10px;\r\n  }\r\n\r\nh5.form-header {\r\n  color: #fff;\r\n  line-height: initial;\r\n  font-size: 25px;\r\n  margin-top: auto;\r\n  margin-bottom: 5px;\r\n}\r\n\r\nh5.form-header span {\r\n    display: inline-block;\r\n    color: #fff;\r\n    font-size: 13px;\r\n    font-weight: 300;\r\n    margin-left: 10px;\r\n    padding-left: 10px;\r\n    border-left: 1px solid;\r\n    line-height: 12px;\r\n  }\r\n\r\n.full-section:before {\r\n  content: '';\r\n  position: fixed;\r\n  top: 0px;\r\n  right: 0px;\r\n  width: 73%;\r\n  background: #3f51b5;\r\n  height: 100%;\r\n}\r\n\r\nimg.brand-img {\r\n  height: 65px;\r\n}\r\n\r\n.waiting-icon ul {\r\n  text-align: left;\r\n}\r\n\r\n.waiting-icon ul.inline {\r\n    margin: 30px;\r\n    text-align: left;\r\n    padding-left: 0px;\r\n  }\r\n\r\n.waiting-icon ul li:nth-of-type(even) {\r\n    background: #f3f6f8;\r\n  }\r\n\r\n.waiting-icon ul li {\r\n    display: block;\r\n    padding: 15px 5px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    box-shadow: none;\r\n    text-align: left;\r\n    margin: auto;\r\n    font-size: 12px;\r\n    position: relative;\r\n  }\r\n\r\n.waiting-icon ul li span {\r\n      position: absolute;\r\n      background: #009688;\r\n      height: 20px;\r\n      width: 20px;\r\n      text-align: center;\r\n      left: -20px;\r\n      border-radius: 100%;\r\n      color: #fff;\r\n      padding: 2px;\r\n    }\r\n\r\n.wait-section .report-title {\r\n  width: 70%;\r\n  text-align: center;\r\n  background: #fff;\r\n  margin: 25px auto;\r\n  padding-top: 50px;\r\n  display: inline-block;\r\n  padding-bottom: 50px;\r\n}\r\n\r\n.wait-section .report-title h1 {\r\n    font-size: 20px;\r\n    font-weight: 400;\r\n  }\r\n\r\n.powered-section {\r\n  bottom: 10px;\r\n  padding: 7px 20px;\r\n  position: fixed;\r\n  text-align: left;\r\n  width: auto;\r\n}\r\n\r\n.powered-section img {\r\n    opacity: 0.6;\r\n    height: 35px;\r\n    left: 25px;\r\n    position: relative;\r\n  }\r\n\r\n.powered-section span {\r\n    display: none;\r\n  }\r\n\r\n@media (max-width:900px) {\r\n  body {\r\n    background: #eeedf6;\r\n  }\r\n\r\n  .doctor-room {\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: column;\r\n    position: relative;\r\n  }\r\n\r\n    .doctor-room .patient-info, .doctor-room .screen {\r\n      margin: 0;\r\n      width: 100%\r\n    }\r\n\r\n  .full-section:before {\r\n    background: transparent;\r\n  }\r\n\r\n  .full-section {\r\n    -webkit-box-orient: vertical !important;\r\n    -webkit-box-direction: normal !important;\r\n            flex-direction: column !important;\r\n    height: auto;\r\n    -webkit-box-align: start;\r\n            align-items: flex-start;\r\n    width: 100%;\r\n    margin: auto;\r\n    margin-bottom: 35px;\r\n  }\r\n\r\n    .full-section .patient-login, .full-section .doctor-login, .full-section .brand-title {\r\n      max-width: 90%;\r\n      height: auto;\r\n      -webkit-box-flex: 100%;\r\n              flex: 100%;\r\n      width: 100%;\r\n      min-height: auto;\r\n      position: relative;\r\n      margin: 10px auto;\r\n    }\r\n\r\n  .brand-title h1 {\r\n    font-size: 1.5rem;\r\n    margin: auto;\r\n  }\r\n\r\n    .brand-title h1 span {\r\n      font-size: 1.5rem;\r\n    }\r\n\r\n  img.brand-img {\r\n    height: 80px;\r\n  }\r\n\r\n  .patient-info .p-all {\r\n    width: 100%;\r\n  }\r\n\r\n  .powered-section {\r\n    position: relative;\r\n    bottom: 20px;\r\n    text-align: right;\r\n    width: 100%;\r\n    z-index: 999;\r\n    opacity: 0.5;\r\n    padding: 0px !important;\r\n  }\r\n\r\n    .powered-section span {\r\n      right: 0;\r\n      position: absolute;\r\n      top: -10px;\r\n      display: block;\r\n    }\r\n\r\n    .powered-section img {\r\n      left: 0px;\r\n    }\r\n}\r\n\r\n@media (max-width:480px) {\r\n  body {\r\n    overflow: auto;\r\n  }\r\n\r\n  h5.form-header, h5.form-header span {\r\n    color: #333;\r\n  }\r\n\r\n  .brand-title {\r\n    text-align: center;\r\n  }\r\n\r\n  .animated-item .waiting-info h1 {\r\n    font-size: 14px !important;\r\n  }\r\n\r\n  .doctor-room .patient-info, .doctor-room .screen {\r\n    margin: 0;\r\n    width: 100%\r\n  }\r\n\r\n  .doctor-room {\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: column;\r\n    position: relative;\r\n  }\r\n\r\n  .full-section:before {\r\n    background: transparent;\r\n    display: none;\r\n  }\r\n\r\n  .full-section {\r\n    -webkit-box-orient: vertical !important;\r\n    -webkit-box-direction: normal !important;\r\n            flex-direction: column !important;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n  }\r\n\r\n    .full-section .patient-login, .full-section .doctor-login, .full-section .brand-title {\r\n      max-width: 100%;\r\n      height: auto;\r\n      -webkit-box-flex: 100%;\r\n              flex: 100%;\r\n      width: 100%;\r\n    }\r\n\r\n  .patient-login table tr td {\r\n    display: block;\r\n  }\r\n\r\n  .brand-title h1 {\r\n    font-size: 1.5rem;\r\n    margin: auto;\r\n  }\r\n\r\n    .brand-title h1 span {\r\n      font-size: 1.5rem;\r\n    }\r\n\r\n  img.brand-img {\r\n    height: 80px;\r\n  }\r\n\r\n  .pi-counter span.counter {\r\n    margin-top: 25px;\r\n  }\r\n}\r\n\r\n.p-que {\r\n  color: #009688;\r\n  font-size: 12px;\r\n  background: #f9f9f9;\r\n  padding: 9px 15px;\r\n}\r\n\r\n.p-que i {\r\n    font-size: 12px;\r\n    margin-right: 7px;\r\n  }\r\n\r\n/*Loader*/\r\n\r\n.loading-container {\r\n  display: -webkit-box;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n          align-items: center;\r\n  min-height: 100%;\r\n}\r\n\r\n.loading-container img {\r\n    -webkit-animation: play 2s ease infinite;\r\n            animation: play 2s ease infinite;\r\n    height: 150px;\r\n    width: 150px;\r\n    border-radius: 100%;\r\n  }\r\n\r\n.animated-item {\r\n  text-align: center;\r\n}\r\n\r\n.animated-item .waiting-info {\r\n    margin-top: 70px;\r\n  }\r\n\r\n.animated-item .waiting-info h1 {\r\n      padding: 11px 3px;\r\n      border: 2px solid #009688;\r\n      font-size: 16px;\r\n      border-radius: 40px;\r\n      color: #009688;\r\n      position: relative;\r\n      z-index: 9;\r\n      font-weight: 500;\r\n      display: inline-block;\r\n    }\r\n\r\n.animated-item .waiting-info .for-info {\r\n      margin-top: 5px;\r\n      color: #5d5d5d;\r\n      font-size: 12px;\r\n      font-weight: 600;\r\n      width: 90%;\r\n      text-align: center;\r\n      margin: auto;\r\n    }\r\n\r\n.pi-counter span.name {\r\n  background: #009688;\r\n  padding: 9px 20px;\r\n  margin-right: 15px;\r\n  border-radius: 40px;\r\n  color: #fff;\r\n}\r\n\r\n.pi-counter span.counter {\r\n  margin-right: 15px;\r\n}\r\n\r\n.animated-item i {\r\n  margin-right: 7px;\r\n  font-size: 15px;\r\n}\r\n\r\n.p-all label i {\r\n  color: #009688;\r\n}\r\n\r\n.p-all label span.label {\r\n  min-width: 40%;\r\n  display: inline-block;\r\n}\r\n\r\ni.fa {\r\n  margin-right: 7px;\r\n}\r\n\r\n@-webkit-keyframes play {\r\n  0% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n\r\n  15% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  25% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: scale(1.2);\r\n            transform: scale(1.2);\r\n  }\r\n  /* 80% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n    }*/\r\n  80% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n}\r\n\r\n@keyframes play {\r\n  0% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n\r\n  15% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  25% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: scale(1.2);\r\n            transform: scale(1.2);\r\n  }\r\n  /* 80% {\r\n    box-shadow: 0 0 0 20px rgba(27, 164, 155, 0.05), 0 0 0 40px rgba(27, 164, 155, 0.05);\r\n    }*/\r\n  80% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n  }\r\n}\r\n\r\n@media all and (max-width: 768px) {\r\n  h5.form-header span, h5.form-header {\r\n    display: inline-block;\r\n    color: #333;\r\n  }\r\n\r\n  .brand-title h1 span {\r\n    margin-bottom: 2px;\r\n  }\r\n}\r\n\r\n@media all and (max-width: 640px) {\r\n  h5.form-header span, h5.form-header {\r\n    display: inline-block;\r\n    color: #333;\r\n  }\r\n\r\n  .hide-sm {\r\n    display: none\r\n  }\r\n\r\n  .full-section {\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n            flex-flow: column;\r\n  }\r\n}\r\n\r\n.login-body {\r\n  width: 95%;\r\n  margin: auto;\r\n}\r\n\r\n.head-sm {\r\n  font-weight: 600;\r\n  margin: 10px auto;\r\n  display: block;\r\n  font-size: 12px;\r\n}\r\n\r\n.patient-login table {\r\n  table-layout: fixed;\r\n  width: 100%;\r\n}\r\n\r\n.patient-login table tr.3-cols td {\r\n    width: 33.33%\r\n  }\r\n\r\n.patient-login table tr.2-cols td {\r\n    width: 50%\r\n  }\r\n\r\n.patient-login table tr td {\r\n    padding-top: 0px;\r\n    padding-bottom: 0px;\r\n  }\r\n\r\n/*# sourceMappingURL=data:application/json;base64,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Q0Usa0JBQWtCO0VBQ3BCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQixXQUFXO0VBQ2I7O0VBRUE7SUFDRTtFQUNGOztFQUVBO0lBRUUsNEJBQWlCO0lBQWpCLDZCQUFpQjtZQUFqQixpQkFBaUI7RUFDbkI7QUFDRjs7QUFFQTtFQUNFLFVBQVU7RUFDVixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjs7QUFFRTtJQUNFO0VBQ0Y7O0FBRUE7SUFDRTtFQUNGOztBQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtFQUNyQiIsImZpbGUiOiJzcmMvc3R5bGVzLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6d2dodEA1MDA7NjAwJmRpc3BsYXk9c3dhcCcpO1xyXG5cclxuaHRtbCwgYm9keSB7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRhYmxlIHRkIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgcGFkZGluZzogN3B4O1xyXG59XHJcblxyXG4uZG9jdG9yLXJvb20gdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZG9jdG9yLXJvb20ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxufVxyXG5cclxuICAuZG9jdG9yLXJvb20gLnBhdGllbnQtaW5mbywgLmRvY3Rvci1yb29tIC5zY3JlZW4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGZsZXg6IDMwJTtcclxuICAgIG1pbi13aWR0aDogMjUlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGxpbmUtaGVpZ2h0OiA3NXB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgcGFkZGluZzogMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gIH1cclxuXHJcbiAgLmRvY3Rvci1yb29tIC5zY3JlZW4ge1xyXG4gICAgZmxleDogNzUlO1xyXG4gICAgbWF4LXdpZHRoOiA3NSU7XHJcbiAgICBwYWRkaW5nOiAwcHg7XHJcbiAgfVxyXG5cclxuICAuZG9jdG9yLXJvb20gaWZyYW1lIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gIH1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSB7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xyXG4gIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuICBtYXJnaW4tYm90dG9tOiA3cHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDAgMnB4O1xyXG59XHJcblxyXG50ZXh0YXJlYSB7XHJcbiAgbWluLWhlaWdodDogNDBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbiAgcGFkZGluZzogMCAycHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiYnV0dG9uXCJdLCBidXR0b24ge1xyXG4gIGJhY2tncm91bmQ6ICMwMDk2ODg7XHJcbiAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucyc7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBib3JkZXI6IDFweCBzb2xpZDtcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmluZm8taGVhZGluZyBidXR0b24ge1xyXG4gIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgaGVpZ2h0OiAzNXB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLnBhdGllbnQtaW5mbyAuaW5mby1oZWFkaW5nIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogbm93cmFwO1xyXG4gIHdpZHRoOiBhdXRvO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICNmOGY4Zjg7XHJcbn1cclxuXHJcbiAgLnBhdGllbnQtaW5mbyAuaW5mby1oZWFkaW5nIGlucHV0W3R5cGU9XCJidXR0b25cIl0ge1xyXG4gICAgbWFyZ2luLXRvcDogYXV0b1xyXG4gIH1cclxuXHJcbi5wYXRpZW50LWluZm8gLmluZm8tbGlzdGluZywgLnBhdGllbnQtaW5mbyAucC1hbGwge1xyXG4gIGxpbmUtaGVpZ2h0OiBpbml0aWFsO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogOTUlO1xyXG59XHJcblxyXG4uYnRuLWNhbGwge1xyXG4gIGJhY2tncm91bmQ6ICMwMDk2ODg7XHJcbiAgcGFkZGluZzogM3B4IDEwcHg7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIzcHg7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIG9wYWNpdHk6IDAuODtcclxuICBtYXJnaW46IDVweCAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuICAuYnRuLWNhbGw6aG92ZXIge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICB9XHJcblxyXG4ucGF0aWVudC1pbmZvIHtcclxuICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuICAucGF0aWVudC1pbmZvIC5wLWFsbCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjNmNWY4O1xyXG4gICAgcGFkZGluZy10b3A6IDA7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcclxuICAgIG1hcmdpbjogYXV0byAxMHB4O1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgaGVpZ2h0OiA1NTBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICBjb2xvcjogIzQ0NDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcblxyXG4gICAgLnBhdGllbnQtaW5mbyAucC1hbGwgbGFiZWwge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgICAucGF0aWVudC1pbmZvIC5wLWFsbCBsYWJlbDpudGgtb2YtdHlwZShldmVuKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZlxyXG4gICAgICB9XHJcblxyXG4gICAgICAucGF0aWVudC1pbmZvIC5wLWFsbCBsYWJlbCBzcGFuIHtcclxuICAgICAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgICB9XHJcblxyXG4uYmFkZ2UteWVzIHtcclxuICBiYWNrZ3JvdW5kOiAjZWY1YjViO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHBhZGRpbmc6IDNweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLmJhZGdlLW5vIHtcclxuICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHBhZGRpbmc6IDNweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLnAtYWxsIHtcclxuICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG5hIHtcclxuICBjb2xvcjogIzAwOTY4ODtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuICBhLnRleHQtbGluayB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbiAgfVxyXG5cclxuLmJhZGdlLXN0YXR1cyB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBmb250LXNpemU6IDlweDtcclxufVxyXG5cclxuLm0tNy1hIHtcclxuICBtYXJnaW46IDdweCBhdXRvO1xyXG59XHJcblxyXG4ud2FpdC1zZWN0aW9uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogbm93cmFwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxufVxyXG5cclxuICAud2FpdC1zZWN0aW9uIC5icmFuZC10aXRsZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgICAud2FpdC1zZWN0aW9uIC5icmFuZC10aXRsZSAud2FpdGluZy1pY29uIHN2ZyB7XHJcbiAgICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgfVxyXG5cclxuICAgIC53YWl0LXNlY3Rpb24gLmJyYW5kLXRpdGxlIC53YWl0aW5nLWljb24ge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLndhaXQtc2VjdGlvbiAuYnJhbmQtdGl0bGUgaDEge1xyXG4gICAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDI1cHg7XHJcbiAgICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgfVxyXG5cclxuLnVzZXItdGl0bGUge1xyXG4gIGNvbG9yOiAjMDA5Njg4ICFpbXBvcnRhbnQ7XHJcbiAgZm9udC1zaXplOiAxLjVyZW0gIWltcG9ydGFudDtcclxuICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcclxufVxyXG5cclxuaW1nLmJyYW5kLWltZyB7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcbi8qIEJhc2UgZm9yIGxhYmVsIHN0eWxpbmcgKi9cclxuLyogQmFzZSBmb3IgbGFiZWwgc3R5bGluZyAqL1xyXG5bdHlwZT1cImNoZWNrYm94XCJdOm5vdCg6Y2hlY2tlZCksXHJcblt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IC05OTk5cHg7XHJcbn1cclxuXHJcbiAgW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWwsXHJcbiAgW3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkICsgbGFiZWwge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxLjllbTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XHJcbiAgfVxyXG5cclxuICAgIC8qIGNoZWNrYm94IGFzcGVjdCAqL1xyXG4gICAgW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YmVmb3JlLFxyXG4gICAgW3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkICsgbGFiZWw6YmVmb3JlIHtcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICB3aWR0aDogMS4yNWVtO1xyXG4gICAgICBoZWlnaHQ6IDEuMjVlbTtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcclxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAzcHggcmdiYSgwLDAsMCwuMSk7XHJcbiAgICB9XHJcbiAgICAvKiBjaGVja2VkIG1hcmsgYXNwZWN0ICovXHJcbiAgICBbdHlwZT1cImNoZWNrYm94XCJdOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbDphZnRlcixcclxuICAgIFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCArIGxhYmVsOmFmdGVyIHtcclxuICAgICAgY29udGVudDogJ1xcMjcxM1xcMDAyMCc7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAuMTVlbTtcclxuICAgICAgbGVmdDogLjE1ZW07XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAwLjg7XHJcbiAgICAgIGNvbG9yOiAjMDlhZDdlO1xyXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgLjJzO1xyXG4gICAgICBmb250LWZhbWlseTogJ0x1Y2lkYSBTYW5zIFVuaWNvZGUnLCAnQXJpYWwgVW5pY29kZSBNUycsIEFyaWFsO1xyXG4gICAgfVxyXG4gICAgLyogY2hlY2tlZCBtYXJrIGFzcGVjdCBjaGFuZ2VzICovXHJcbiAgICBbdHlwZT1cImNoZWNrYm94XCJdOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbDphZnRlciB7XHJcbiAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgW3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkICsgbGFiZWw6YWZ0ZXIge1xyXG4gICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgfVxyXG4vKiBkaXNhYmxlZCBjaGVja2JveCAqL1xyXG5bdHlwZT1cImNoZWNrYm94XCJdOmRpc2FibGVkOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbDpiZWZvcmUsXHJcblt0eXBlPVwiY2hlY2tib3hcIl06ZGlzYWJsZWQ6Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSB7XHJcbiAgYm94LXNoYWRvdzogbm9uZTtcclxuICBib3JkZXItY29sb3I6ICNiYmI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcclxufVxyXG5cclxuW3R5cGU9XCJjaGVja2JveFwiXTpkaXNhYmxlZDpjaGVja2VkICsgbGFiZWw6YWZ0ZXIge1xyXG4gIGNvbG9yOiAjOTk5O1xyXG59XHJcblxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmRpc2FibGVkICsgbGFiZWwge1xyXG4gIGNvbG9yOiAjYWFhO1xyXG59XHJcbi8qIGFjY2Vzc2liaWxpdHkgKi9cclxuW3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkOmZvY3VzICsgbGFiZWw6YmVmb3JlLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOm5vdCg6Y2hlY2tlZCk6Zm9jdXMgKyBsYWJlbDpiZWZvcmUge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwOWFkN2U7XHJcbiAgO1xyXG59XHJcblxyXG4vKiBob3ZlciBzdHlsZSBqdXN0IGZvciBpbmZvcm1hdGlvbiAqL1xyXG5sYWJlbDpob3ZlcjpiZWZvcmUge1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICM0Nzc4ZDkgIWltcG9ydGFudDtcclxufVxyXG5cclxucC5mZXZlci1jaGVja2JveCB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIG1hcmdpbi1yaWdodDogN3B4O1xyXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gIG1hcmdpbi1ib3R0b206IDVweDtcclxuICBjb2xvcjogIzMzMztcclxuICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gIG1pbi13aWR0aDogMTMwcHg7XHJcbn1cclxuXHJcbi5mdWxsLXNlY3Rpb24gdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZnVsbC1zZWN0aW9uIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAtd2Via2l0LWZsZXgtZmxvdzogcm93O1xyXG4gIGZsZXgtZmxvdzogcm93O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBhbGlnbi1pdGVtczogdG9wO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuICAuZnVsbC1zZWN0aW9uIC5wYXRpZW50LWxvZ2luIHtcclxuICAgIC13ZWJraXQtZmxleDogMiAxIDA7XHJcbiAgICBmbGV4OiAyIDEgMDtcclxuICAgIC13ZWJraXQtb3JkZXI6IDI7XHJcbiAgICBvcmRlcjogMjtcclxuICB9XHJcblxyXG4gIC5mdWxsLXNlY3Rpb24gLmJyYW5kLXRpdGxlLCAuZnVsbC1zZWN0aW9uIC5kb2N0b3ItbG9naW4ge1xyXG4gICAgLXdlYmtpdC1mbGV4OiAxIDYgMDtcclxuICAgIGZsZXg6IDEgNiAwO1xyXG4gIH1cclxuXHJcbiAgLmZ1bGwtc2VjdGlvbiAucGF0aWVudC1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuZG9jdG9yLWxvZ2luLCAuZnVsbC1zZWN0aW9uIC5icmFuZC10aXRsZSB7XHJcbiAgICBtYXJnaW46IDE1cHg7XHJcbiAgICB6LWluZGV4OiA5OTk7XHJcbiAgICBtaW4taGVpZ2h0OiA1NTBweDtcclxuICB9XHJcblxyXG4gICAgLmZ1bGwtc2VjdGlvbiAucGF0aWVudC1sb2dpbiBmb3JtLCAuZnVsbC1zZWN0aW9uIC5kb2N0b3ItbG9naW4gZm9ybSB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIH1cclxuXHJcbi5icmFuZC10aXRsZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICB0b3A6IDBcclxufVxyXG5cclxuLmZ1bGwtc2VjdGlvbiAuZG9jdG9yLWxvZ2luIHtcclxuICBib3gtc2hhZG93OiBub25lO1xyXG4gIG9yZGVyOiAyO1xyXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XHJcbiAgbWluLWhlaWdodDogYXV0bztcclxuICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gIHRvcDogMFxyXG59XHJcblxyXG50YWJsZSB0ZCBsYWJlbCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIG1hcmdpbjogN3B4IGF1dG87XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLmJyYW5kLXRpdGxlIGgxIHtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gIGNvbG9yOiAjMDA5Njg4O1xyXG4gIGZvbnQtc2l6ZTogMi4wcmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbWFyZ2luOiA1cmVtIGF1dG87XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG5cclxuICAuYnJhbmQtdGl0bGUgaDEgc3BhbiB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICB9XHJcblxyXG5oNS5mb3JtLWhlYWRlciB7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgbGluZS1oZWlnaHQ6IGluaXRpYWw7XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG4gIG1hcmdpbi10b3A6IGF1dG87XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4gIGg1LmZvcm0taGVhZGVyIHNwYW4ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XHJcbiAgfVxyXG5cclxuLmZ1bGwtc2VjdGlvbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDBweDtcclxuICByaWdodDogMHB4O1xyXG4gIHdpZHRoOiA3MyU7XHJcbiAgYmFja2dyb3VuZDogIzNmNTFiNTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmltZy5icmFuZC1pbWcge1xyXG4gIGhlaWdodDogNjVweDtcclxufVxyXG5cclxuLndhaXRpbmctaWNvbiB1bCB7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuICAud2FpdGluZy1pY29uIHVsLmlubGluZSB7XHJcbiAgICBtYXJnaW46IDMwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgfVxyXG5cclxuICAud2FpdGluZy1pY29uIHVsIGxpOm50aC1vZi10eXBlKGV2ZW4pIHtcclxuICAgIGJhY2tncm91bmQ6ICNmM2Y2Zjg7XHJcbiAgfVxyXG5cclxuICAud2FpdGluZy1pY29uIHVsIGxpIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcGFkZGluZzogMTVweCA1cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gICAgLndhaXRpbmctaWNvbiB1bCBsaSBzcGFuIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gICAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGxlZnQ6IC0yMHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMnB4O1xyXG4gICAgfVxyXG5cclxuLndhaXQtc2VjdGlvbiAucmVwb3J0LXRpdGxlIHtcclxuICB3aWR0aDogNzAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG5cclxuICAud2FpdC1zZWN0aW9uIC5yZXBvcnQtdGl0bGUgaDEge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICB9XHJcblxyXG4ucG93ZXJlZC1zZWN0aW9uIHtcclxuICBib3R0b206IDEwcHg7XHJcbiAgcGFkZGluZzogN3B4IDIwcHg7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgd2lkdGg6IGF1dG87XHJcbn1cclxuXHJcbiAgLnBvd2VyZWQtc2VjdGlvbiBpbWcge1xyXG4gICAgb3BhY2l0eTogMC42O1xyXG4gICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgbGVmdDogMjVweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gIC5wb3dlcmVkLXNlY3Rpb24gc3BhbiB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOjkwMHB4KSB7XHJcbiAgYm9keSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZWVlZGY2O1xyXG4gIH1cclxuXHJcbiAgLmRvY3Rvci1yb29tIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG5cclxuICAgIC5kb2N0b3Itcm9vbSAucGF0aWVudC1pbmZvLCAuZG9jdG9yLXJvb20gLnNjcmVlbiB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgd2lkdGg6IDEwMCVcclxuICAgIH1cclxuXHJcbiAgLmZ1bGwtc2VjdGlvbjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzNXB4O1xyXG4gIH1cclxuXHJcbiAgICAuZnVsbC1zZWN0aW9uIC5wYXRpZW50LWxvZ2luLCAuZnVsbC1zZWN0aW9uIC5kb2N0b3ItbG9naW4sIC5mdWxsLXNlY3Rpb24gLmJyYW5kLXRpdGxlIHtcclxuICAgICAgbWF4LXdpZHRoOiA5MCU7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgZmxleDogMTAwJTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIG1pbi1oZWlnaHQ6IGF1dG87XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbWFyZ2luOiAxMHB4IGF1dG87XHJcbiAgICB9XHJcblxyXG4gIC5icmFuZC10aXRsZSBoMSB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcblxyXG4gICAgLmJyYW5kLXRpdGxlIGgxIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIH1cclxuXHJcbiAgaW1nLmJyYW5kLWltZyB7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgfVxyXG5cclxuICAucGF0aWVudC1pbmZvIC5wLWFsbCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gIC5wb3dlcmVkLXNlY3Rpb24ge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm90dG9tOiAyMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHotaW5kZXg6IDk5OTtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgICAucG93ZXJlZC1zZWN0aW9uIHNwYW4ge1xyXG4gICAgICByaWdodDogMDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IC0xMHB4O1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuXHJcbiAgICAucG93ZXJlZC1zZWN0aW9uIGltZyB7XHJcbiAgICAgIGxlZnQ6IDBweDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6NDgwcHgpIHtcclxuICBib2R5IHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgaDUuZm9ybS1oZWFkZXIsIGg1LmZvcm0taGVhZGVyIHNwYW4ge1xyXG4gICAgY29sb3I6ICMzMzM7XHJcbiAgfVxyXG5cclxuICAuYnJhbmQtdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLmFuaW1hdGVkLWl0ZW0gLndhaXRpbmctaW5mbyBoMSB7XHJcbiAgICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5kb2N0b3Itcm9vbSAucGF0aWVudC1pbmZvLCAuZG9jdG9yLXJvb20gLnNjcmVlbiB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICB3aWR0aDogMTAwJVxyXG4gIH1cclxuXHJcbiAgLmRvY3Rvci1yb29tIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uOmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAuZnVsbC1zZWN0aW9uIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAgIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4sIC5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuYnJhbmQtdGl0bGUge1xyXG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgZmxleDogMTAwJTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gIC5wYXRpZW50LWxvZ2luIHRhYmxlIHRyIHRkIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuXHJcbiAgLmJyYW5kLXRpdGxlIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgICAuYnJhbmQtdGl0bGUgaDEgc3BhbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgfVxyXG5cclxuICBpbWcuYnJhbmQtaW1nIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICB9XHJcblxyXG4gIC5waS1jb3VudGVyIHNwYW4uY291bnRlciB7XHJcbiAgICBtYXJnaW4tdG9wOiAyNXB4O1xyXG4gIH1cclxufVxyXG5cclxuLnAtcXVlIHtcclxuICBjb2xvcjogIzAwOTY4ODtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgYmFja2dyb3VuZDogI2Y5ZjlmOTtcclxuICBwYWRkaW5nOiA5cHggMTVweDtcclxufVxyXG5cclxuICAucC1xdWUgaSB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDdweDtcclxuICB9XHJcbi8qTG9hZGVyKi9cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbiAgLmxvYWRpbmctY29udGFpbmVyIGltZyB7XHJcbiAgICBhbmltYXRpb246IHBsYXkgMnMgZWFzZSBpbmZpbml0ZTtcclxuICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gIH1cclxuXHJcbi5hbmltYXRlZC1pdGVtIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbiAgLmFuaW1hdGVkLWl0ZW0gLndhaXRpbmctaW5mbyB7XHJcbiAgICBtYXJnaW4tdG9wOiA3MHB4O1xyXG4gIH1cclxuXHJcbiAgICAuYW5pbWF0ZWQtaXRlbSAud2FpdGluZy1pbmZvIGgxIHtcclxuICAgICAgcGFkZGluZzogMTFweCAzcHg7XHJcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDk2ODg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNDBweDtcclxuICAgICAgY29sb3I6ICMwMDk2ODg7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgei1pbmRleDogOTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIC5hbmltYXRlZC1pdGVtIC53YWl0aW5nLWluZm8gLmZvci1pbmZvIHtcclxuICAgICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgICBjb2xvcjogIzVkNWQ1ZDtcclxuICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICB3aWR0aDogOTAlO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIG1hcmdpbjogYXV0bztcclxuICAgIH1cclxuXHJcbi5waS1jb3VudGVyIHNwYW4ubmFtZSB7XHJcbiAgYmFja2dyb3VuZDogIzAwOTY4ODtcclxuICBwYWRkaW5nOiA5cHggMjBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLnBpLWNvdW50ZXIgc3Bhbi5jb3VudGVyIHtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbn1cclxuXHJcbi5hbmltYXRlZC1pdGVtIGkge1xyXG4gIG1hcmdpbi1yaWdodDogN3B4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuLnAtYWxsIGxhYmVsIGkge1xyXG4gIGNvbG9yOiAjMDA5Njg4O1xyXG59XHJcblxyXG4ucC1hbGwgbGFiZWwgc3Bhbi5sYWJlbCB7XHJcbiAgbWluLXdpZHRoOiA0MCU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG5pLmZhIHtcclxuICBtYXJnaW4tcmlnaHQ6IDdweDtcclxufVxyXG5cclxuQGtleWZyYW1lcyBwbGF5IHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gIH1cclxuXHJcbiAgMTUlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDIwcHggcmdiYSgyNywgMTY0LCAxNTUsIDAuMDUpO1xyXG4gIH1cclxuXHJcbiAgMjUlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDIwcHggcmdiYSgyNywgMTY0LCAxNTUsIDAuMDUpLCAwIDAgMCA0MHB4IHJnYmEoMjcsIDE2NCwgMTU1LCAwLjA1KTtcclxuICB9XHJcblxyXG4gIDMwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgfVxyXG4gIC8qIDgwJSB7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMCAyMHB4IHJnYmEoMjcsIDE2NCwgMTU1LCAwLjA1KSwgMCAwIDAgNDBweCByZ2JhKDI3LCAxNjQsIDE1NSwgMC4wNSk7XHJcbiAgICB9Ki9cclxuICA4MCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgaDUuZm9ybS1oZWFkZXIgc3BhbiwgaDUuZm9ybS1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6ICMzMzM7XHJcbiAgfVxyXG5cclxuICAuYnJhbmQtdGl0bGUgaDEgc3BhbiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA2NDBweCkge1xyXG4gIGg1LmZvcm0taGVhZGVyIHNwYW4sIGg1LmZvcm0taGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGNvbG9yOiAjMzMzO1xyXG4gIH1cclxuXHJcbiAgLmhpZGUtc20ge1xyXG4gICAgZGlzcGxheTogbm9uZVxyXG4gIH1cclxuXHJcbiAgLmZ1bGwtc2VjdGlvbiB7XHJcbiAgICAtd2Via2l0LWZsZXgtZmxvdzogY29sdW1uO1xyXG4gICAgZmxleC1mbG93OiBjb2x1bW47XHJcbiAgfVxyXG59XHJcblxyXG4ubG9naW4tYm9keSB7XHJcbiAgd2lkdGg6IDk1JTtcclxuICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbi5oZWFkLXNtIHtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIG1hcmdpbjogMTBweCBhdXRvO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLnBhdGllbnQtbG9naW4gdGFibGUge1xyXG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiAgLnBhdGllbnQtbG9naW4gdGFibGUgdHIuMy1jb2xzIHRkIHtcclxuICAgIHdpZHRoOiAzMy4zMyVcclxuICB9XHJcblxyXG4gIC5wYXRpZW50LWxvZ2luIHRhYmxlIHRyLjItY29scyB0ZCB7XHJcbiAgICB3aWR0aDogNTAlXHJcbiAgfVxyXG5cclxuICAucGF0aWVudC1sb2dpbiB0YWJsZSB0ciB0ZCB7XHJcbiAgICBwYWRkaW5nLXRvcDogMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcclxuICB9XHJcbiJdfQ== */", '', '']]

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