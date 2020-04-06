import { Patient, Doctor } from './app.model';
import {DomSanitizer} from '@angular/platform-browser';

export class Global{
    patientObj:Patient = null;
    doctorObj:Doctor = null;
    IsDoctor:boolean = false;
    ApiUrl:string = "Home/";
    config:any = null;
    TimerValue:number=10000;
    constructor(){
        this.patientObj = new Patient();
        this.doctorObj = new Doctor();
    }
   

}