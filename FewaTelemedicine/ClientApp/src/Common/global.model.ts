//import { PatientModel } from 'src/models/patient.model';
import { DoctorsModel } from 'src/models/doctors.model';
import { PatientsAttendedModel } from 'src/models/patients-attended.model';
import { ParametersModel } from 'src/models/parameters.model';

export class GlobalModel {
   // patientObj: PatientModel = null;
    doctorObj: DoctorsModel = null;
    patientObj:PatientsAttendedModel=null;
    parameterObj:ParametersModel=null;
    IsDoctor: boolean = false;
    IsPatient: boolean = false;
    ApiUrl: string = "api/";
    HospitalUrl: string = "Hospital/";
    ServerUrl:string;
    config: any = null;
    token: string;
    constructor() {
       // this.patientObj = new PatientModel();
        this.doctorObj = new DoctorsModel();
        this.patientObj=new PatientsAttendedModel();
        this.parameterObj=new ParametersModel();
    }
}