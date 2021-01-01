import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderModule } from './provider/provider.module';
import { PatientModule } from './patient/patient.module';
import { SecurityLogic } from './_helpers/common/authguard';
import { PageNotFound } from './pagenotfound';


const routes: Routes = [
  { path: '', redirectTo: '/provider/home', pathMatch: 'full' },
  { path: 'provider', loadChildren: () => ProviderModule },
  { path: 'patient', loadChildren: () => PatientModule },
  { path: '**', component : PageNotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
