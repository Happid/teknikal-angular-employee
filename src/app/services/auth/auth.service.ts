import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mySession: User = new User('', '', '');
  public http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      'Content-Type': 'application/json',
    });
  }

  login(data: User): Observable<any> {
    return this.http
      .get<any>(`${environment.urlServer}/login?username=${data.username}&password=${data.password}`, 
      {
        headers: this.getHeader(),
      })
      .pipe(tap((res: Response) => res));
  }

  getSession() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      const lsUser = JSON.parse(userSession);
      this.mySession.token = lsUser.token;
      this.mySession.username = lsUser.username;
      this.mySession.username = lsUser.password;
    }
    return this.mySession;
  }

  removeSession() {
    localStorage.removeItem('userSession');
  }
}
