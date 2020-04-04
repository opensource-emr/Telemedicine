(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "@import url('https://fonts.googleapis.com/css?family=Exo+2:500,700&display=swap');\r\nhtml, body{\r\n    height: 100%;\r\n}\r\nbody{\r\n    background: #f8f8f8;\r\n    font-family: 'Exo 2', sans-serif;\r\n    font-weight: 400;\r\n    margin: auto;\r\n}\r\n.doctor-room table{\r\n    width: 100%;\r\n}\r\n.doctor-room{\r\n    display: -webkit-box;\r\n    display: flex;\r\n    flex-wrap: nowrap;\r\n    width: 100%;\r\n    margin: auto;\r\n    position: relative;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    height: 100%;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: row;\r\n}\r\n.doctor-room .patient-info, .doctor-room .screen{\r\n    background-color: #fff;\r\n    -webkit-box-flex: 30%;\r\n            flex: 30%;\r\n  max-width: 30%;\r\n    margin: auto;\r\n    text-align: left;\r\n    line-height: 75px;\r\n    font-size: 15px;\r\n    padding: 0px;\r\n    border-radius: 5px;\r\n    height: 100%;\r\n    z-index: 999;\r\n}\r\n.doctor-room .screen{\r\n    -webkit-box-flex: 75%;\r\n            flex: 75%;\r\n    max-width: 75%;\r\n    padding: 0px;\r\n}\r\n.doctor-room iframe{\r\n    height: 100%;\r\n    width: 100%;\r\n    border: none;\r\n}\r\ninput[type=\"text\"], input[type=\"password\"]{\r\n    height: 40px;\r\n    width: 100%;\r\n    border-radius: 5px;\r\n    border: 1px solid #bbb;\r\n    background: #f5f6fa;\r\n   font-family: 'Exo 2', sans-serif;\r\n   padding: 7px;\r\n   margin-bottom: 7px;\r\n}\r\ntextarea{\r\n   width: 100%;\r\n    border-radius: 5px;\r\n    border: 1px solid #bbb;\r\n    background: #f5f6fa; \r\n    font-family: 'Exo 2', sans-serif;\r\n    padding: 7px;\r\n    margin-bottom: 7px;\r\n}\r\ninput[type=\"button\"], button{\r\n    background: #009688;\r\n    padding: 10px 30px;\r\n    font-family: 'Exo 2';\r\n    color: #fff;\r\n    text-transform: uppercase;\r\n    font-weight: bold;\r\n    border: 1px solid;\r\n    margin-top: 15px;\r\n    cursor: pointer;\r\n}\r\n.info-heading button{\r\n       padding: 4px 10px;\r\n    text-transform: capitalize;\r\n    font-weight: 500;\r\n    margin: 10px 0;\r\n    height: 35px;\r\n    border: none;\r\n}\r\n.patient-info .info-heading{\r\n    display: -webkit-box;\r\n    display: flex;\r\n    flex-wrap: nowrap;\r\n    width: auto;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: row;\r\n    background: #fff;\r\n    margin: auto;\r\n    padding: 10px;\r\n    -webkit-box-pack: justify;\r\n            justify-content: space-between;\r\n    border-bottom: 5px solid #f8f8f8;\r\n}\r\n.patient-info .info-heading input[type=\"button\"]{margin-top: auto}\r\n.patient-info .info-listing, .patient-info .p-all{\r\n    line-height: initial;\r\n    font-size: 13px;\r\n    padding: 10px;\r\n    border-radius: 4px;\r\n    display: block;\r\n    width: 95%;\r\n}\r\n.patient-info .p-all label{\r\n    display: block;\r\n    box-shadow: 0px 0px 10px #eee;\r\n    margin: 10px auto;\r\n    padding: 10px;\r\n    border-radius: 5px;\r\n}\r\n.patient-info .p-all label span{\r\n    font-weight: 400;\r\n}\r\n.badge-yes{\r\n    background: #ef5b5b;\r\n    color: #fff;\r\n    padding: 3px 10px;\r\n    border-radius: 40px;\r\n    font-weight: 400;\r\n    text-transform: uppercase;\r\n    font-size: 10px;\r\n}\r\n.badge-no{\r\n    background: #009688;\r\n    color: #fff;\r\n    padding: 3px 10px;\r\n    border-radius: 40px;\r\n    font-weight: 400;\r\n    text-transform: uppercase;\r\n    font-size: 10px;\r\n}\r\n.p-all{\r\n    max-height: 100%;\r\n    overflow: auto;\r\n}\r\na{\r\n    color: #009688;\r\n    text-decoration: underline;\r\n    cursor: pointer;\r\n    margin: auto;\r\n    display: inline-block;\r\n}\r\na.text-link{\r\n    margin: 10px;\r\n}\r\n.badge-status{\r\n    float: right;\r\n    padding: 5px 10px;\r\n    display: inline-block;\r\n    font-size: 9px;\r\n}\r\n.m-7-a{\r\n    margin: 7px auto;\r\n}\r\n.wait-section{\r\n    display: -webkit-box;\r\n    display: flex;\r\n    flex-wrap: nowrap;\r\n    width: 100%;\r\n    margin: auto;\r\n    position: relative;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    height: 100%;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: row;\r\n}\r\n.wait-section .brand-title{\r\n    display: block;\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n.wait-section .brand-title .waiting-icon svg{\r\n    height: 150px;\r\n    width: auto;\r\n}\r\n.wait-section .brand-title .waiting-icon{\r\n    text-align: center;\r\n}\r\n.wait-section .brand-title h1{\r\n    font-weight: 400;\r\n    font-size: 20px;\r\n    margin-top: 25px;\r\n    color: #333;\r\n}\r\n.user-title{\r\n    color: #009688 !important;\r\n    font-size: 1.5rem !important;\r\n    display: inline !important;\r\n}\r\nimg.brand-img{\r\n  height: 80px;\r\n}\r\n/* Base for label styling */\r\n/* Base for label styling */\r\n[type=\"checkbox\"]:not(:checked),\r\n[type=\"checkbox\"]:checked {\r\n  position: absolute;\r\n  left: -9999px;\r\n}\r\n[type=\"checkbox\"]:not(:checked) + label,\r\n[type=\"checkbox\"]:checked + label {\r\n  position: relative;\r\n  padding-left: 1.55em;\r\n  cursor: pointer;\r\n  margin-bottom: auto;\r\n}\r\n/* checkbox aspect */\r\n[type=\"checkbox\"]:not(:checked) + label:before,\r\n[type=\"checkbox\"]:checked + label:before {\r\ncontent: '';\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 1.25em;\r\n    height: 1.25em;\r\n    border: 1px solid #aaa;\r\n    background: #fff;\r\n    border-radius: 2px;\r\n    box-shadow: inset 0 1px 3px rgba(0,0,0,.1);\r\n}\r\n/* checked mark aspect */\r\n[type=\"checkbox\"]:not(:checked) + label:after,\r\n[type=\"checkbox\"]:checked + label:after {\r\n  content: '\\2713\\0020';\r\n  position: absolute;\r\n  top: .15em; left: .10em;\r\n  font-size: 1.3em;\r\n  line-height: 0.8;\r\n  color: #09ad7e;\r\n  -webkit-transition: all .2s;\r\n  transition: all .2s;\r\n  font-family: 'Lucida Sans Unicode', 'Arial Unicode MS', Arial;\r\n}\r\n/* checked mark aspect changes */\r\n[type=\"checkbox\"]:not(:checked) + label:after {\r\n  opacity: 0;\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n}\r\n[type=\"checkbox\"]:checked + label:after {\r\n  opacity: 1;\r\n  -webkit-transform: scale(1);\r\n          transform: scale(1);\r\n}\r\n/* disabled checkbox */\r\n[type=\"checkbox\"]:disabled:not(:checked) + label:before,\r\n[type=\"checkbox\"]:disabled:checked + label:before {\r\n  box-shadow: none;\r\n  border-color: #bbb;\r\n  background-color: #ddd;\r\n}\r\n[type=\"checkbox\"]:disabled:checked + label:after {\r\n  color: #999;\r\n}\r\n[type=\"checkbox\"]:disabled + label {\r\n  color: #aaa;\r\n}\r\n/* accessibility */\r\n[type=\"checkbox\"]:checked:focus + label:before,\r\n[type=\"checkbox\"]:not(:checked):focus + label:before {\r\n  border: 1px solid #09ad7e;;\r\n}\r\n/* hover style just for information */\r\nlabel:hover:before {\r\n  border: 2px solid #4778d9!important;\r\n}\r\np.fever-checkbox{\r\n    display: inline-block;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    margin-right: 7px;\r\n    text-transform: capitalize;\r\n    margin-bottom: 15px;\r\n    color: #333;\r\n    margin-top: auto;\r\n}\r\n.full-section table{\r\n    width: 100%;\r\n}\r\n.full-section{\r\n    display: -webkit-box;\r\n    display: flex;\r\n    flex-wrap: nowrap;\r\n    width: 100%;\r\n    margin: auto;\r\n    position: relative;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    height: 100%;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n            flex-direction: row;\r\n}\r\n.full-section .patient-login, .full-section .doctor-login, .full-section .brand-title{\r\n    background-color: #fff;\r\n    -webkit-box-flex: 30%;\r\n            flex: 30%;\r\n  max-width: 30%;\r\n    margin: 10px;\r\n    text-align: left;\r\n    line-height: normal;\r\n    font-size: 15px;\r\n    padding: 25px;\r\n    border-radius: 5px;\r\n    height: 60%;\r\n    z-index: 999;\r\n}\r\n.brand-title{\r\n    background-color: transparent !important;\r\n    box-shadow: none !impaortant;\r\n    height: auto !important;\r\n}\r\n.full-section .doctor-login{\r\n    box-shadow: none;\r\n}\r\ninput[type=\"text\"], input[type=\"password\"]{\r\n    height: 40px;\r\n    width: 100%;\r\n    border-radius: 5px;\r\n    border: 1px solid #bbb;\r\n    background: #f5f6fa;\r\n   font-family: 'Exo 2', sans-serif;\r\n   padding: 7px;\r\n   margin-bottom: 7px;\r\n}\r\ntextarea{\r\n   width: 100%;\r\n    border-radius: 5px;\r\n    border: 1px solid #bbb;\r\n    background: #f5f6fa; \r\n    font-family: 'Exo 2', sans-serif;\r\n    padding: 7px;\r\n    margin-bottom: 7px;\r\n}\r\ntable td label{\r\n    font-size: 14px;\r\n    margin: 7px auto;\r\n    display: inline-block;\r\n    font-weight: 500;\r\n}\r\n.brand-title h1{\r\nline-height: normal;\r\n    color: #009688;\r\n    font-size: 2.5rem;\r\n    font-weight: 600;\r\n    margin: 5rem auto;\r\n    margin-top: 1rem;\r\n}\r\n.brand-title h1 span{\r\n    font-size: 35px;\r\n    margin-top: 5px;\r\n    display: block;\r\n    color: #333;\r\n    margin-bottom: 25px;\r\n}\r\nh5.form-header{\r\n    color: #009688;\r\n    line-height: initial;\r\n    font-size: 25px;\r\n    margin-top: auto;\r\n    margin-bottom: 25px;\r\n}\r\nh5.form-header span{\r\n    display: block;\r\n    color: #555;\r\n    font-size: 15px;\r\n}\r\n.full-section:before{\r\n    content: '';\r\n    position: absolute;\r\n    top: 0px;\r\n    right: 0px;\r\n    width: 50%;\r\n    background: #3f51b5;\r\n    height: 100%;\r\n}\r\nimg.brand-img{\r\n  height: 150px;\r\n}\r\n.waiting-icon ul{\r\n    text-align: left;\r\n}\r\n.waiting-icon ul.inline{\r\n    margin: 30px auto;\r\n    text-align: left;\r\n}\r\n.waiting-icon ul li{\r\n    display: block;\r\n    padding: 15px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    box-shadow: none;\r\n    text-align: left;\r\n    margin: auto;\r\n    font-size: 14px;\r\n    position: relative;\r\n}\r\n.waiting-icon ul li span{\r\n    position: absolute;\r\n    background: #009688;\r\n    height: 20px;\r\n    width: 20px;\r\n    text-align: center;\r\n    left: -20px;\r\n    border-radius: 100%;\r\n    color: #fff;\r\n    padding: 2px;\r\n}\r\n.wait-section .report-title{\r\n    width: 70%;\r\n    text-align: center;\r\n    background: #fff;\r\n    margin: 25px auto;\r\n    padding-top: 50px;\r\n    display: inline-block;\r\n    padding-bottom: 50px;\r\n}\r\n.wait-section .report-title h1{\r\n    font-size: 20px;\r\n    font-weight: 400;\r\n}\r\n@media (max-width:900px){\r\n    body{\r\n        padding: 20px;\r\n    }\r\n  .full-section:before{\r\n    background: transparent;\r\n  }\r\n  .full-section{\r\n    -webkit-box-orient: horizontal !important;\r\n    -webkit-box-direction: normal !important;\r\n            flex-direction: row !important;\r\n    height: auto;\r\n    -webkit-box-align: start;\r\n            align-items: flex-start;\r\n  }\r\n  .full-section .patient-login, .full-section .doctor-login, .full-section .brand-title{\r\n    max-width: 100%;\r\n    height: auto;\r\n    -webkit-box-flex: 100%;\r\n            flex: 100%;\r\n    width: 100%;\r\n  }\r\n  .brand-title h1{\r\n    font-size: 1.5rem;\r\n    margin: auto;\r\n  }\r\n  .brand-title h1 span{\r\n    font-size: 1rem;\r\n  }\r\n  img.brand-img{\r\n    height: 80px;\r\n  }\r\n}\r\n@media (max-width:480px){\r\n    body{\r\n        padding: 20px;\r\n        overflow: auto;\r\n    }\r\n    .doctor-room{\r\n        -webkit-box-orient: vertical;\r\n        -webkit-box-direction: normal;\r\n                flex-direction: column;\r\n    }\r\n  .full-section:before{\r\n    background: transparent;\r\n  }\r\n  .full-section{\r\n    -webkit-box-orient: vertical !important;\r\n    -webkit-box-direction: normal !important;\r\n            flex-direction: column !important;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n  }\r\n  .full-section .patient-login, .full-section .doctor-login, .full-section .brand-title{\r\n    max-width: 100%;\r\n    height: auto;\r\n    -webkit-box-flex: 100%;\r\n            flex: 100%;\r\n    width: 100%;\r\n  }\r\n  .brand-title h1{\r\n    font-size: 1.5rem;\r\n    margin: auto;\r\n  }\r\n  .brand-title h1 span{\r\n    font-size: 1rem;\r\n  }\r\n  img.brand-img{\r\n    height: 80px;\r\n  }\r\n  \r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,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QUNiO0VBQ0E7SUFDRSxpQkFBaUI7SUFDakIsWUFBWTtFQUNkO0VBQ0E7SUFDRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxZQUFZO0VBQ2Q7QUFDRjtBQUNBO0lBQ0k7UUFDSSxhQUFhO1FBQ2IsY0FBYztJQUNsQjtJQUNBO1FBQ0ksNEJBQXNCO1FBQXRCLDZCQUFzQjtnQkFBdEIsc0JBQXNCO0lBQzFCO0VBQ0Y7SUFDRSx1QkFBdUI7RUFDekI7RUFDQTtJQUNFLHVDQUFpQztJQUFqQyx3Q0FBaUM7WUFBakMsaUNBQWlDO0lBQ2pDLHlCQUFtQjtZQUFuQixtQkFBbUI7RUFDckI7RUFDQTtJQUNFLGVBQWU7SUFDZixZQUFZO0lBQ1osc0JBQVU7WUFBVixVQUFVO0lBQ1YsV0FBVztFQUNiO0VBQ0E7SUFDRSxpQkFBaUI7SUFDakIsWUFBWTtFQUNkO0VBQ0E7SUFDRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxZQUFZO0VBQ2Q7O0FBRUYiLCJmaWxlIjoic3JjL3N0eWxlcy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUV4bysyOjUwMCw3MDAmZGlzcGxheT1zd2FwJyk7XHJcbmh0bWwsIGJvZHl7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuYm9keXtcclxuICAgIGJhY2tncm91bmQ6ICNmOGY4Zjg7XHJcbiAgICBmb250LWZhbWlseTogJ0V4byAyJywgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbi5kb2N0b3Itcm9vbSB0YWJsZXtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5kb2N0b3Itcm9vbXtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbn1cclxuLmRvY3Rvci1yb29tIC5wYXRpZW50LWluZm8sIC5kb2N0b3Itcm9vbSAuc2NyZWVue1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGZsZXg6IDMwJTtcclxuICBtYXgtd2lkdGg6IDMwJTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBsaW5lLWhlaWdodDogNzVweDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIHBhZGRpbmc6IDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHotaW5kZXg6IDk5OTtcclxufVxyXG4uZG9jdG9yLXJvb20gLnNjcmVlbntcclxuICAgIGZsZXg6IDc1JTtcclxuICAgIG1heC13aWR0aDogNzUlO1xyXG4gICAgcGFkZGluZzogMHB4O1xyXG59XHJcbi5kb2N0b3Itcm9vbSBpZnJhbWV7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJde1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xyXG4gICAgYmFja2dyb3VuZDogI2Y1ZjZmYTtcclxuICAgZm9udC1mYW1pbHk6ICdFeG8gMicsIHNhbnMtc2VyaWY7XHJcbiAgIHBhZGRpbmc6IDdweDtcclxuICAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcbnRleHRhcmVhe1xyXG4gICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNiYmI7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNmZhOyBcclxuICAgIGZvbnQtZmFtaWx5OiAnRXhvIDInLCBzYW5zLXNlcmlmO1xyXG4gICAgcGFkZGluZzogN3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiYnV0dG9uXCJdLCBidXR0b257XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdFeG8gMic7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uaW5mby1oZWFkaW5nIGJ1dHRvbntcclxuICAgICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbn1cclxuLnBhdGllbnQtaW5mbyAuaW5mby1oZWFkaW5ne1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogbm93cmFwO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgI2Y4ZjhmODtcclxufVxyXG4ucGF0aWVudC1pbmZvIC5pbmZvLWhlYWRpbmcgaW5wdXRbdHlwZT1cImJ1dHRvblwiXXttYXJnaW4tdG9wOiBhdXRvfVxyXG4ucGF0aWVudC1pbmZvIC5pbmZvLWxpc3RpbmcsIC5wYXRpZW50LWluZm8gLnAtYWxse1xyXG4gICAgbGluZS1oZWlnaHQ6IGluaXRpYWw7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogOTUlO1xyXG59XHJcbi5wYXRpZW50LWluZm8gLnAtYWxsIGxhYmVse1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggI2VlZTtcclxuICAgIG1hcmdpbjogMTBweCBhdXRvO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG4ucGF0aWVudC1pbmZvIC5wLWFsbCBsYWJlbCBzcGFue1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxufVxyXG4uYmFkZ2UteWVze1xyXG4gICAgYmFja2dyb3VuZDogI2VmNWI1YjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogM3B4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuLmJhZGdlLW5ve1xyXG4gICAgYmFja2dyb3VuZDogIzAwOTY4ODtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogM3B4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuLnAtYWxse1xyXG4gICAgbWF4LWhlaWdodDogMTAwJTtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcbmF7XHJcbiAgICBjb2xvcjogIzAwOTY4ODtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcbmEudGV4dC1saW5re1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbi5iYWRnZS1zdGF0dXN7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtc2l6ZTogOXB4O1xyXG59XHJcbi5tLTctYXtcclxuICAgIG1hcmdpbjogN3B4IGF1dG87XHJcbn1cclxuLndhaXQtc2VjdGlvbntcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbn1cclxuLndhaXQtc2VjdGlvbiAuYnJhbmQtdGl0bGV7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi53YWl0LXNlY3Rpb24gLmJyYW5kLXRpdGxlIC53YWl0aW5nLWljb24gc3Zne1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG59XHJcbi53YWl0LXNlY3Rpb24gLmJyYW5kLXRpdGxlIC53YWl0aW5nLWljb257XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLndhaXQtc2VjdGlvbiAuYnJhbmQtdGl0bGUgaDF7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjVweDtcclxuICAgIGNvbG9yOiAjMzMzO1xyXG59XHJcbi51c2VyLXRpdGxle1xyXG4gICAgY29sb3I6ICMwMDk2ODggIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtICFpbXBvcnRhbnQ7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcclxufVxyXG5pbWcuYnJhbmQtaW1ne1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG4gICAgLyogQmFzZSBmb3IgbGFiZWwgc3R5bGluZyAqL1xyXG4gICAgICAgIC8qIEJhc2UgZm9yIGxhYmVsIHN0eWxpbmcgKi9cclxuW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAtOTk5OXB4O1xyXG59XHJcblt0eXBlPVwiY2hlY2tib3hcIl06bm90KDpjaGVja2VkKSArIGxhYmVsLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQgKyBsYWJlbCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmctbGVmdDogMS41NWVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiBhdXRvO1xyXG59XHJcblxyXG4vKiBjaGVja2JveCBhc3BlY3QgKi9cclxuW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YmVmb3JlLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xyXG5jb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICB3aWR0aDogMS4yNWVtO1xyXG4gICAgaGVpZ2h0OiAxLjI1ZW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYWFhO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDNweCByZ2JhKDAsMCwwLC4xKTtcclxufVxyXG4vKiBjaGVja2VkIG1hcmsgYXNwZWN0ICovXHJcblt0eXBlPVwiY2hlY2tib3hcIl06bm90KDpjaGVja2VkKSArIGxhYmVsOmFmdGVyLFxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQgKyBsYWJlbDphZnRlciB7XHJcbiAgY29udGVudDogJ1xcMjcxM1xcMDAyMCc7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogLjE1ZW07IGxlZnQ6IC4xMGVtO1xyXG4gIGZvbnQtc2l6ZTogMS4zZW07XHJcbiAgbGluZS1oZWlnaHQ6IDAuODtcclxuICBjb2xvcjogIzA5YWQ3ZTtcclxuICB0cmFuc2l0aW9uOiBhbGwgLjJzO1xyXG4gIGZvbnQtZmFtaWx5OiAnTHVjaWRhIFNhbnMgVW5pY29kZScsICdBcmlhbCBVbmljb2RlIE1TJywgQXJpYWw7XHJcbn1cclxuLyogY2hlY2tlZCBtYXJrIGFzcGVjdCBjaGFuZ2VzICovXHJcblt0eXBlPVwiY2hlY2tib3hcIl06bm90KDpjaGVja2VkKSArIGxhYmVsOmFmdGVyIHtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbn1cclxuW3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkICsgbGFiZWw6YWZ0ZXIge1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxufVxyXG4vKiBkaXNhYmxlZCBjaGVja2JveCAqL1xyXG5bdHlwZT1cImNoZWNrYm94XCJdOmRpc2FibGVkOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbDpiZWZvcmUsXHJcblt0eXBlPVwiY2hlY2tib3hcIl06ZGlzYWJsZWQ6Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSB7XHJcbiAgYm94LXNoYWRvdzogbm9uZTtcclxuICBib3JkZXItY29sb3I6ICNiYmI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcclxufVxyXG5bdHlwZT1cImNoZWNrYm94XCJdOmRpc2FibGVkOmNoZWNrZWQgKyBsYWJlbDphZnRlciB7XHJcbiAgY29sb3I6ICM5OTk7XHJcbn1cclxuW3R5cGU9XCJjaGVja2JveFwiXTpkaXNhYmxlZCArIGxhYmVsIHtcclxuICBjb2xvcjogI2FhYTtcclxufVxyXG4vKiBhY2Nlc3NpYmlsaXR5ICovXHJcblt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZDpmb2N1cyArIGxhYmVsOmJlZm9yZSxcclxuW3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmNoZWNrZWQpOmZvY3VzICsgbGFiZWw6YmVmb3JlIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjMDlhZDdlOztcclxufVxyXG5cclxuLyogaG92ZXIgc3R5bGUganVzdCBmb3IgaW5mb3JtYXRpb24gKi9cclxubGFiZWw6aG92ZXI6YmVmb3JlIHtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjNDc3OGQ5IWltcG9ydGFudDtcclxufVxyXG5wLmZldmVyLWNoZWNrYm94e1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIG1hcmdpbi1yaWdodDogN3B4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gICAgY29sb3I6ICMzMzM7XHJcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xyXG59XHJcbi5mdWxsLXNlY3Rpb24gdGFibGV7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG4uZnVsbC1zZWN0aW9ue1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogbm93cmFwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxufVxyXG4uZnVsbC1zZWN0aW9uIC5wYXRpZW50LWxvZ2luLCAuZnVsbC1zZWN0aW9uIC5kb2N0b3ItbG9naW4sIC5mdWxsLXNlY3Rpb24gLmJyYW5kLXRpdGxle1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGZsZXg6IDMwJTtcclxuICBtYXgtd2lkdGg6IDMwJTtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgcGFkZGluZzogMjVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGhlaWdodDogNjAlO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG59XHJcbi5icmFuZC10aXRsZXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBhb3J0YW50O1xyXG4gICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XHJcbn1cclxuLmZ1bGwtc2VjdGlvbiAuZG9jdG9yLWxvZ2lue1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxufVxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJde1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xyXG4gICAgYmFja2dyb3VuZDogI2Y1ZjZmYTtcclxuICAgZm9udC1mYW1pbHk6ICdFeG8gMicsIHNhbnMtc2VyaWY7XHJcbiAgIHBhZGRpbmc6IDdweDtcclxuICAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcbnRleHRhcmVhe1xyXG4gICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNiYmI7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNmZhOyBcclxuICAgIGZvbnQtZmFtaWx5OiAnRXhvIDInLCBzYW5zLXNlcmlmO1xyXG4gICAgcGFkZGluZzogN3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcbnRhYmxlIHRkIGxhYmVse1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luOiA3cHggYXV0bztcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuLmJyYW5kLXRpdGxlIGgxe1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgY29sb3I6ICMwMDk2ODg7XHJcbiAgICBmb250LXNpemU6IDIuNXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBtYXJnaW46IDVyZW0gYXV0bztcclxuICAgIG1hcmdpbi10b3A6IDFyZW07XHJcbn1cclxuLmJyYW5kLXRpdGxlIGgxIHNwYW57XHJcbiAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxufVxyXG5oNS5mb3JtLWhlYWRlcntcclxuICAgIGNvbG9yOiAjMDA5Njg4O1xyXG4gICAgbGluZS1oZWlnaHQ6IGluaXRpYWw7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxufVxyXG5oNS5mb3JtLWhlYWRlciBzcGFue1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBjb2xvcjogIzU1NTtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uZnVsbC1zZWN0aW9uOmJlZm9yZXtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICByaWdodDogMHB4O1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIGJhY2tncm91bmQ6ICMzZjUxYjU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuaW1nLmJyYW5kLWltZ3tcclxuICBoZWlnaHQ6IDE1MHB4O1xyXG59XHJcbi53YWl0aW5nLWljb24gdWx7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi53YWl0aW5nLWljb24gdWwuaW5saW5le1xyXG4gICAgbWFyZ2luOiAzMHB4IGF1dG87XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi53YWl0aW5nLWljb24gdWwgbGl7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4ud2FpdGluZy1pY29uIHVsIGxpIHNwYW57XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDA5Njg4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsZWZ0OiAtMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IDJweDtcclxufVxyXG4ud2FpdC1zZWN0aW9uIC5yZXBvcnQtdGl0bGV7XHJcbiAgICB3aWR0aDogNzAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIG1hcmdpbjogMjVweCBhdXRvO1xyXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG4ud2FpdC1zZWN0aW9uIC5yZXBvcnQtdGl0bGUgaDF7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOjkwMHB4KXtcclxuICAgIGJvZHl7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgIH1cclxuICAuZnVsbC1zZWN0aW9uOmJlZm9yZXtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIH1cclxuICAuZnVsbC1zZWN0aW9ue1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdyAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgfVxyXG4gIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4sIC5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuYnJhbmQtdGl0bGV7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBmbGV4OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC5icmFuZC10aXRsZSBoMXtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuICAuYnJhbmQtdGl0bGUgaDEgc3BhbntcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICB9XHJcbiAgaW1nLmJyYW5kLWltZ3tcclxuICAgIGhlaWdodDogODBweDtcclxuICB9XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6NDgwcHgpe1xyXG4gICAgYm9keXtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgfVxyXG4gICAgLmRvY3Rvci1yb29te1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB9XHJcbiAgLmZ1bGwtc2VjdGlvbjpiZWZvcmV7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICB9XHJcbiAgLmZ1bGwtc2VjdGlvbntcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG4gIC5mdWxsLXNlY3Rpb24gLnBhdGllbnQtbG9naW4sIC5mdWxsLXNlY3Rpb24gLmRvY3Rvci1sb2dpbiwgLmZ1bGwtc2VjdGlvbiAuYnJhbmQtdGl0bGV7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBmbGV4OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC5icmFuZC10aXRsZSBoMXtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuICAuYnJhbmQtdGl0bGUgaDEgc3BhbntcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICB9XHJcbiAgaW1nLmJyYW5kLWltZ3tcclxuICAgIGhlaWdodDogODBweDtcclxuICB9XHJcbiAgXHJcbn1cclxuIl19 */", '', '']]

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

module.exports = __webpack_require__(/*! E:\1april\github\telemedicine\TeleMedicine\TeleMedicine\src\styles.css */"./src/styles.css");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map