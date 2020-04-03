import { Patient, Doctor } from './app.model';

export class Global{
    patientObj:Patient = null;
    doctorObj:Doctor = null;
    IsDoctor:boolean = false;
    ApiUrl:string = "/Home/";
    TimerValue:number=10000;
    constructor(){
        this.patientObj = new Patient();
        this.doctorObj = new Doctor();
    }
}