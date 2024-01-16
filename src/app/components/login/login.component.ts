import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/auth/auth.model';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loadingPage: boolean = false;
  user: User = new User('admin', '12345', '');
  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.service.removeSession();
  }

  ngOnInit(): void {}

  signIn() {
    this.loadingPage = true;
    this.service.login(this.user).subscribe({
      next: (data:User[]) => {
        if(data.length > 0){
          localStorage.setItem('userSession', JSON.stringify(data[0]));
          this.router.navigate(['/employee/list']);
          this.toastr.success('Login Berhasil', 'Sukses', {timeOut: 4000});
        }else{
          this.toastr.error('Login Gagal, Username atau Password Salah', 'Error', {timeOut: 4000});
        }
        this.loadingPage = false;
      },
      error: (e:HttpErrorResponse) => {
        this.toastr.error('JSON Server Belum Run', 'Error', {
          timeOut: 4000,
        });
        this.loadingPage = false;
      }
    });
  }
}
