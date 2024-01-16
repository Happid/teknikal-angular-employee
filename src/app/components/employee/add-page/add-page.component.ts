import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../models/employee/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.css'
})
export class AddPageComponent implements OnInit {
  employee: Employee = new Employee(101, '', '', '', '', '', '', '', 0, '');
  isValidateDate: boolean = true;
  inputbasicSalary: string = '';
  loadingSpinner: boolean = false;

  constructor(
    private router: Router,
    private service: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  btnSave() {
    this.loadingSpinner = true;
    this.employee.basicSalary = Number(
      this.inputbasicSalary
        .replace(/Rp. /g, '')
        .replace(/\./g, '')
        .replace(/\,/g, '.')
    );

    this.service.createNewEmployee(this.employee).subscribe(
      (data) => {
        this.loadingSpinner = false;
        this.toastr.success('Success Create New Employee', 'Success', {
          timeOut: 4000,
        });
        this.router.navigate(['/employee/list']);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Message ' + error.error.message, 'Error', {
          timeOut: 4000,
        });
        this.loadingSpinner = false;
      }
    );
  }

  btnCancel() {
    this.router.navigate(['/employee/list']);
  }

  formatCurrency(event: any) {
    const value = event.target.value;
    let number_string = value.replace(/[^,\d]/g, '').toString();
    let split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    if (split[1]) {
      rupiah = rupiah + ',' + split[1];
    }
    rupiah = 'Rp. ' + rupiah;
    // this.employee.basicSalary = rupiah;
    this.inputbasicSalary = rupiah;
    const input = document.getElementById(
      'grid-basic-salary'
    ) as HTMLInputElement;
    input.value = rupiah;
  }

  dateInput(event: any) {
    const datePicker = new Date(event).getTime();
    const dateNow = new Date().getTime();
    if (datePicker <= dateNow) {
      this.isValidateDate = true;
    } else {
      this.isValidateDate = false;
    }
  }

  chbxStatus(event: any) {
    this.employee.status = event.target.checked;
  }

}
