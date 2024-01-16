import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../../../services/employee/employee.service';
import { ListEmployee, ListEmployees } from '../../../models/employee/employee.model';
import { ModelDatatable } from '../../../models/datatables/datatable.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  loadingSpinner: boolean = false;
  lstEmployee: ListEmployee[] = [];
  objEmployee: ListEmployees = new ListEmployees();
  tblParam: ModelDatatable = new ModelDatatable(10, 0, 0, 10, 100, '', 1, 'asc','');
  isBtnDisabled: boolean = false;

  constructor(
    private service: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.objEmployee;
  }

  ngOnInit(): void {
    const searchValue = localStorage.getItem('searchValue');
    this.getTableEmployee();
    if (searchValue) {
      this.tblParam.search = searchValue;
      if (this.tblParam.search === '') {
        this.getTableEmployee();
      } else {
        this.searchEmployee();
      }
    } else {
      this.getTableEmployee();
    }
  }

  getTableEmployee() {
    this.loadingSpinner = true;
    this.service.getEmployee(this.tblParam.pages, this.tblParam.limit).subscribe(
      (data:ListEmployee[]) => {
        this.lstEmployee = data;
        this.loadingSpinner = false;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Message ' + error.error.message, 'Error', {
          timeOut: 4000,
        });
        this.loadingSpinner = false;
      }
    );
  }

  btnsearchEmployee() {
    localStorage.setItem('searchValue', this.tblParam.search);
    if(this.tblParam.search.length === 0){
      this.getTableEmployee();
    }else{
      this.searchEmployee();
    }
  }

  searchEmployee(){
    this.loadingSpinner = true;
    this.tblParam.skip = 0;
    this.tblParam.activePage = 0;
    this.tblParam.pages = 1;
    this.tblParam.limit = 100;
    this.tblParam.numberPagging = 1;

    let searchValue = this.tblParam.search
    let searchArray:string[] = searchValue.replace(/ /g, '').replaceAll(/AND/g,',').split(',');
    if(searchArray.length === 1){
      searchArray.push('')
    }

    this.service
      .searchEmployee(
        searchArray[0],
        searchArray[1]
      )
      .subscribe(
        (data) => {
          this.lstEmployee = data;
          this.loadingSpinner = false;
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Format Search Salah', 'Error', {
            timeOut: 4000,
          });
          this.loadingSpinner = false;
        }
      );
  }

  deleteEmployee() {
    this.isBtnDisabled = true;
    if (this.objEmployee.id) {
      this.service.deleteEmployee(this.objEmployee.id).subscribe(
        (data) => {
          this.isBtnDisabled = false;
          this.toastr.error(
            'Deleting user: ' + this.objEmployee?.username,
            'Success',
            {
              timeOut: 4000,
            }
          );
          this.btnClsoeModals();
          this.getTableEmployee();
        },
        (error: HttpErrorResponse) => {
          this.isBtnDisabled = false;
          this.toastr.error('Message ' + error.error.message, 'Error', {
            timeOut: 4000,
          });
          this.btnClsoeModals();
        }
      );
    }
  }

  btnAdd() {
    this.router.navigate(['/employee/add']);
  }

  btnDetail(index: number) {
    this.router.navigate([`/employee/detail/${this.lstEmployee[index].id}`]);
  }

  // DATATABLES
  showing(event: any) {
    this.tblParam.skip = 0;
    this.tblParam.activePage = 0;
    this.tblParam.pages = 1;
    this.tblParam.limit = Number(event.target.value);
    this.tblParam.numberPagging = this.tblParam.total / this.tblParam.limit;
    this.getTableEmployee();
  }

  btnActivePage(i: number) {
    this.tblParam.activePage = i;
    this.tblParam.pages = i+1;
    if (this.tblParam.limit) this.tblParam.skip = i * this.tblParam.limit;
    this.getTableEmployee();
  }

  btnActiveNextPage(i: number) {
    this.tblParam.activePage = i + 1;
    this.tblParam.pages = this.tblParam.activePage + 1;
    if (this.tblParam.limit) {
      this.tblParam.skip = (i + 1) * this.tblParam.limit;
    }
    this.getTableEmployee();
  }

  btnActivePreviousPage(i: number) {
    this.tblParam.activePage = i - 1;
    this.tblParam.pages = this.tblParam.activePage + 1;
    if (this.tblParam.limit) {
      this.tblParam.skip = (i - 1) * this.tblParam.limit;
    }
    this.getTableEmployee();
  }

  sort(keyName:string, typeData:string){
    this.tblParam.keyName = keyName;
    if(this.tblParam.order == "asc") {
      this.tblParam.order = "desc";
      if(typeData=="string"){
        this.sortByDsc(keyName);
      }else{
        this.sortNumberDsc(keyName);
      }
    } 
    else {
      this.tblParam.order = "asc";
      if(typeData=="string"){
        this.sortByAsc(keyName);
      }else{
        this.sortNumberAsc(keyName);
      }
    }
  }

  sortByAsc(keyName:string){
    this.lstEmployee.sort((a:any, b:any) => {
        let keyName1 = a[keyName].toLowerCase();
        let keyName2 = b[keyName].toLowerCase();

        if (keyName1 < keyName2) {
            return -1;
        }
        if (keyName1 > keyName2) {
            return 1;
        }
        return 0;
    });
  }

  sortByDsc(keyName:string){
    this.lstEmployee.sort((a:any, b:any) => {
        let keyName1 = a[keyName].toLowerCase();
        let keyName2 = b[keyName].toLowerCase();

        if (keyName1 > keyName2) {
            return -1;
        }
        if (keyName1 < keyName2) {
            return 1;
        }
        return 0;
    });
  }

  sortNumberAsc(keyName:string){
    this.lstEmployee.sort((a:any, b:any) => b[keyName] - a[keyName]);
  }
  
  sortNumberDsc(keyName:string){
    this.lstEmployee.sort((a:any, b:any) => a[keyName] - b[keyName]);
  }

  // MODALS
  btnOpenModals(index: number) {
    const modals = document.getElementById('myModals') as HTMLElement;
    modals.classList.remove('hidden');
    this.objEmployee = this.lstEmployee[index];
  }

  btnClsoeModals() {
    const modals = document.getElementById('myModals') as HTMLElement;
    modals.classList.add('hidden');
  }


}
