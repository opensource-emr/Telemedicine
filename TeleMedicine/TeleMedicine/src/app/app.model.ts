import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


export class Patient{
    PatientName:string="";
    Age:string="";
    Sex:string="";
    Email:string="";
    MobileNumber:string="";
    Address:string="";
   
    Fever:boolean=false;
    Cough:boolean=false;
    BreathingDifficulty:boolean=false;
    Tiredness:boolean=false;
    SoreThroat:boolean=false;
    Bodyache:boolean=false;
    ChestPain:boolean=false;
    Diarrhea:boolean=false;
    AnyOtherSymptoms:string="";

    HeartDisease:boolean=false;
    HighBloodPressure:boolean=false;
    Diabetes:boolean=false;
    Copd:boolean=false;
    Transplant:boolean=false; 
    RecentTravel:boolean=false;
    Cancer:boolean=false;
    Exposure:boolean=false;
    PatientMedicalSymptomps:string="";
    OtherPatientInformation:string="";


    Status:number=0;
    Medication:string = "";
    LastUpdatedTime:Date;
}
export class Doctor{
    DoctorName:string ="";
    Password:string = "";
}