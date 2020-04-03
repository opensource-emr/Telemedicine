import { LoginComponent } from './app.login';
import { WaitingRoom } from './app.waitingroomcomponent';
import { DoctorRoomComponent } from './app.doctorroomcomponent';
import { FinalReportComponent } from './app.finalreportcomponent';

export const HomeRoutes = [
    { path: '', component: LoginComponent },
    { path: 'WaitingRoom', component: WaitingRoom},
    { path: 'DoctorRoom', component: DoctorRoomComponent},
    { path: 'FinalReport', component: FinalReportComponent}

];
