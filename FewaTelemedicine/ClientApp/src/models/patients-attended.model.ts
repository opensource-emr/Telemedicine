export class PatientsAttendedModel {

  Id:string="";
  DoctorId:String="";
  PatientName:string="";
  AppointmentDate:Date;
  StartTime:Date;
  EndTime:Date;
  TotalCheckUpTime="";
  DoctorNameAttending;
  Status:number=0;
  MeetingId:any;
  Email:any="";
  MobileNumber:any="";
  Message:any="https://localhost:44304/#/Invitation";
  Subject:any="Invitation from doctor";
  LabOrdersSent:boolean=false;
  NewPrescriptionsSentToYourPharmacy:boolean=false;
  NewPrescriptionsMailedToYou:boolean=false;
  FollowUpNumber:string="";
  FollowUpMeasure:string="";
  Medication:string="";
  VideoCallPlatform:string="";
 }