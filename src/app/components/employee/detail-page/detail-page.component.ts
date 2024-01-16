import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../models/employee/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent implements OnInit {
  employee: Employee = new Employee(0, '', '', '', '', '', '', '', 0, '');
  isValidateDate: boolean = true;
  inputbasicSalary: string = '';
  loadingSpinner: boolean = false;

  constructor(
    private router: Router,
    private service: EmployeeService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('id'));
    this.getDetail(userIdFromRoute);
  }

  getDetail(idUser: number) {
    this.service.detailEmployee(idUser).subscribe(
      (data) => {
        this.employee = data;
      
        this.dateInput(this.employee.birthDate);
        this.formatCurrency(null, this.employee.basicSalary);
        console.log(this.employee);
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

  btnUpdate() {
    this.loadingSpinner = true;
    this.employee.basicSalary = Number(
      this.inputbasicSalary
        .replace(/Rp. /g, '')
        .replace(/\./g, '')
        .replace(/\,/g, '.')
    );
    this.service.updateEmployee(this.employee.id, this.employee).subscribe(
      (data) => {
        this.loadingSpinner = false;
        this.toastr.warning(
          'Update Employee Username: ' + this.employee.username,
          'Success',
          {
            timeOut: 4000,
          }
        );
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

  formatCurrency(event: any, model: any) {
    let value = '';
    let number_string = '';
    if (model !== null) {
      value = model;
      number_string = model.toString();
    } else {
      value = event.target.value;
      number_string = value.replace(/[^,\d]/g, '').toString();
    }
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
    const input = document.getElementById('grid-basic-salary') as HTMLInputElement;
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
}
