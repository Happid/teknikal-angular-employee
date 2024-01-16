import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/auth/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() mySession: User | undefined;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
     
  }

  btnLogout() {
    this.router.navigate(['']);
  }
}
