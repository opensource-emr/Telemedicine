import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderModule } from './provider/provider.module';
import { PatientModule } from './patient/patient.module';


const routes: Routes = [
  { path: '', redirectTo: '/provider/home', pathMatch: 'full' },
  { path: 'provider', loadChildren: () => ProviderModule },
  { path: 'patient', loadChildren: () => PatientModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
