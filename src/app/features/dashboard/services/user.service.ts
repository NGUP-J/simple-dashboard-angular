import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import { HttpClient, HttpEvent, HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { AllUser } from '../models/all-user.model';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { EditUserRequest } from '../models/edit-user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _refreshrequired=new Subject<void>();

  get Refreshrequired(){
    return this._refreshrequired;
  }
  constructor(private http: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({ headers: request.headers.append('ngsw-bypass', 'true') });
    return next.handle(newRequest);
  }

  addUser(model: AddUserRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/User`, model).pipe(
      tap(() => this.Refreshrequired.next())
    )
  }

  getAllUsers(search?: string, orderBy?: string, orderDirection?: string, pageNumber?: number, pageSize?: number): Observable<AllUser> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (orderDirection) {
      params = params.set('orderDirection', orderDirection);
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    return this.http.get<AllUser>(`${environment.apiBaseUrl}/User`, {
      params: params
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/User/${id}`);
  }
  
  editUser(id: string,EditUser: EditUserRequest): Observable<User> {
    return this.http.put<User>(`${environment.apiBaseUrl}/User/${id}`, EditUser).pipe(
      tap(() => this.Refreshrequired.next())
    )
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiBaseUrl}/User/${id}`).pipe(
      tap(() => this.Refreshrequired.next())
    )
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/User/Count`);
  }

}
