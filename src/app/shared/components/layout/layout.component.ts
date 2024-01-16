import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/auth/auth.model';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  mySession: User;

  constructor(private service: AuthService) {
    this.mySession = this.service.getSession();
  }

  ngOnInit(): void {}
  
}
