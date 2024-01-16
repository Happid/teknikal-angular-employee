import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from '../../services/employee/employee.service';
import { SpinnerComponent } from '../../shared/util/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListPageComponent,
    AddPageComponent,
    DetailPageComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule,
    EmployeeRoutingModule
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
