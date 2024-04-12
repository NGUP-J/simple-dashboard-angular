import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  addUser(model: AddUserRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/User`, model).pipe(
      tap(() => this.Refreshrequired.next())
    )
  }

  getAllUsers(search?: string, orderBy?: string, orderDirection?: string): Observable<AllUser> {
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

    return this.http.get<AllUser>(`${environment.apiBaseUrl}/User`, {
      params: params
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/User/${id}`);
  }
  
  // https://localhost:7093/api/User/139dfb5e-6009-3629-c92b-576336f080eb
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

}
