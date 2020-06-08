import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../common/app.global';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.finalreport.html'
  })
  export class FinalReportComponent {
    constructor(public httpClient:HttpClient , 
      public routing:Router ,
      public global:Global){
      
      }
      Success(res){
        alert(res.Name);
      }
      Print()
      {
        let popupWinindow;
        var printContents = document.getElementById("Report").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        let documentContent = '<html><head>';
        documentContent += '<link rel="stylesheet" type="text/css" />';
        documentContent += '<style>.print-action{display:none;}</style>';
        documentContent += '</head>';
        documentContent += '<body onload="window.print()" style="margin:8px 0px 0px 50px !important;">' + printContents + '</body></html>'
        popupWinindow.document.write(documentContent);
        popupWinindow.document.close();
      }

  }
  