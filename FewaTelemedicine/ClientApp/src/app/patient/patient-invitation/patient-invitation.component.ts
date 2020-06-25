import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { GlobalModel } from 'src/Common/global.model';

@Component({
    templateUrl: './patient-invitation.component.html'
})
export class PatientInvitationComponent {
   
    constructor(public global:GlobalModel, private routing:Router) {}
}