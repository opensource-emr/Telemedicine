import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


export class Patient{
    PatientName:string="";
    Status:number=0;
    Fever:boolean=false;
    Cough:boolean=false;
    Breathing:boolean=false;
    TiredNess:boolean=false;
    Problem:string="";
    Medication:string = "";
}
export class Doctor{
    DoctorName:string ="";
    Password:string = "";
}