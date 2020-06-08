import { Patient, Doctor } from '../app/model/app.model';

export class Global{
    patientObj:Patient = null;
    doctorObj:Doctor = null;
    IsDoctor:boolean = false;
    IsPatient:boolean = false;
    ApiUrl:string = "Hospital/";
    config:any = null;
    token: string;
    constructor(){
        this.patientObj = new Patient();
        this.doctorObj = new Doctor();
    }
   

}