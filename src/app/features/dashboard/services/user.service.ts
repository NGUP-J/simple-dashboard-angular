import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAddedSubject: Subject<void> = new Subject<void>();
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

  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/User`);
  }
}
