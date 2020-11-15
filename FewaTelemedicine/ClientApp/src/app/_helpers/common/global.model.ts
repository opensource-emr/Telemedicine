
import { Patient, Provider, Practice } from '../models/domain-model';

export class Global {
    providerObj: Provider = null;
    patientObj: Patient = null;
    practiceObj: Practice = null;
    isProvider: boolean = false;
    isPatient: boolean = false;
    isLogo: boolean = false;
    apiUrl: string = "/api/";
    practiceUrl: string = "/Practice/";
    serverUrl: string;
    config: any = null;
    token: string;
    currentPractice: string = "";
    currentProvider: string = "";
    isMobile = /iPhone|webOS|mobile|CriOS|iPad|iPod|BlackBerry|IEMobile|'Android' + 'Chrome'|Opera Mini|Android/i;
    constructor() {
        this.providerObj = new Provider();
        this.patientObj = new Patient();
        this.practiceObj = new Practice();
    }
}