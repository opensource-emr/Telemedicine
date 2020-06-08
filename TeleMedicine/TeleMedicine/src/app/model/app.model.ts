import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
export class User {
  Name: string = "";
  SignalRConnectionId: string = "";
  MobileNumber: string = "";
}

export class Patient extends User {
  PatientId: number;
  //Name: string = "";
  DoctorNameAttending: string = "";
  Age: string = "";
  Gender: string = "";
  Email: string = "";
  //MobileNumber: string = "";
  Address: string = "";

  Fever: boolean = false;
  Cough: boolean = false;
  BreathingDifficulty: boolean = false;
  Tiredness: boolean = false;
  SoreThroat: boolean = false;
  Bodyache: boolean = false;
  ChestPain: boolean = false;
  Diarrhea: boolean = false;
  AnyOtherSymptoms: string = "";

  HeartDisease: boolean = false;
  HighBloodPressure: boolean = false;
  Diabetes: boolean = false;
  Copd: boolean = false;
  Transplant: boolean = false;
  RecentTravel: boolean = false;
  Cancer: boolean = false;
  Exposure: boolean = false;
  PatientMedicalSymptoms: string = "";
  //OtherPatientInformation: string = "";
  Status: number = 0;
  Medication: string = "";
  LastUpdated: Date;
  TotalCheckupTime : number = 0;
}

export class Doctor extends User {
  Password: string = "";
}


export class Message {
  Type: string = "";
  Payload: string = "";
}