export class Practice {
    practiceId: number;
    name: string = "";
    address: string = "";
    contactNumber: string;
    description: string = "";
    callingPlatform: string;
    url: any = "";
    email: string = "";
    logoPath: any;
    otp:string="";
    logo: any ="";
    
    // email configration 
    emailApiKey: any = "";
    emailApiName: string = "";
    emailPlainBody: string = "";
    emailSubject: string = "";
    emailHtmlBody: any = "";
    emailAdditionalContent: string = "";
    emailMessage: string = "";

    // sms configration
    smsApiAccountSID: any = "";
    smsApiAuthToken: any = "";
    smsPhoneNumber: number;
    serverName: string = "";

}
export class Provider {
    providerId: number;
    userName: string = "";
    password: any = "";
    nameTitle: string = "";
    name: string;
    email: string = "";
    designation: string = "";
    medicalDegree: string = "";
    mobileNumber: string;
    clinic: string = "";
    image: string = "";
    roomName: string = "";
    roomKey: string;
    callingPlatform: string = "";
    practice: any = "";
    url: any = "";
    newPassword: string = "";
    confirmedPassword: string = "";
    otp: string = "";
    profilePhoto: any;
    practiceId:number;
}
export class Patient {
    patientId: number;
    name: string = "";
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    providerNameAttending: string;
    status: number;
    lastUpdated: Date;
    totalCheckupTime: Date;
    email: string = "";
    mobileNumber: string = "";
    labOrdersSent: Boolean = false;
    newPrescriptionsSentToYourPharmacy: boolean = false;
    newPrescriptionsMailedToYou: boolean = false;
    followUpNumber: string = "";
    followUpMeasure: string = "";
    message: string = "";
    medication: string = "";
    callingPlatform: string = "";
    practice: any = "";
    url: any = "";
    provider: Provider;
    advice: Array<ProviderAdvice> = [];
    providerId:number;
    practiceId:number;
    isMobile : boolean;
}
export class ProviderCabin {
    public patient: Patient;
    public provider: Provider;
}
export class ProviderAdvice {
    adviceId: number;
    advice: string = "";
    inputType: string = "";
    providerId: number;
    isChecked: boolean = false;
    practiceId: number;
}
export class ContactUs {
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    message:string;
    constructor() {
        this.firstName="";
        this.lastName="";
        this.email="";
        this.phoneNumber="";
        this.message="";
    }
}