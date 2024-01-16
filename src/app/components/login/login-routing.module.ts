import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const route: Routes = [
  { path: '', component: LoginComponent }
];
 
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
