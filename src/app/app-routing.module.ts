import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooptationFormComponent } from './cooptation-form/cooptation-form.component';


import { LoginComponent } from './login/login.component';

import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';

import { AuthGuard } from './services/auth-guard.service';
import { CooptationListComponent } from './cooptation-list/cooptation-list.component';
import { UpdatecooptationComponent } from './updatecooptation/updatecooptation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultantComponent } from './consultant/consultant.component';

const routes: Routes = [
 { path: 'login', component: LoginComponent },
  { path: 'cooptations', component: CooptationFormComponent, canActivate: [AuthGuard] },
  { path: 'li', component: CooptationListComponent, canActivate: [AuthGuard] },
 { path: 'update/:id', component: UpdatecooptationComponent },
  { path: 'consultant-manager', component: ConsultantComponent },
 { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
