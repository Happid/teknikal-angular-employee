import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeeService {
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

  getEmployee(page:number, limit: number): Observable<any> {
    return this.http
      .get<any>(
        `${environment.urlServer}/list-employee?_page=${page}&_limit=${limit}`,
        {
          headers: this.getHeader(),
        }
      )
      .pipe(tap((res: Response) => res));
  }

  searchEmployee(firstName: string, lastName?: string): Observable<any> {
    return this.http
      .get<any>(
        `${environment.urlServer}/list-employee?firstName=${firstName}&lastName=${lastName}`,
        {
          headers: this.getHeader(),
        }
      )
      .pipe(tap((res: Response) => res));
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.urlServer}/list-employee/${id}`, {
        headers: this.getHeader(),
      })
      .pipe(tap((res: Response) => res));
  }

  createNewEmployee(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.urlServer}/list-employee`,
       data, 
       {
        headers: this.getHeader(),
      })
      .pipe(tap((res: Response) => res));
  }

  detailEmployee(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.urlServer}/list-employee/${id}`, {
        headers: this.getHeader(),
      })
      .pipe(tap((res: Response) => res));
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http
      .put<any>(`${environment.urlServer}/list-employee/${id}`, 
      data, 
      {
        headers: this.getHeader(),
      })
      .pipe(tap((res: Response) => res));
  }
  
}
