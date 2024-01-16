import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ListPageComponent } from './list-page/list-page.component';

const route: Routes = [
 
    { path: 'add', component: AddPageComponent },
    { path: 'detail/:id', component: DetailPageComponent },
    { path: 'list', component: ListPageComponent },
 
];
 
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
