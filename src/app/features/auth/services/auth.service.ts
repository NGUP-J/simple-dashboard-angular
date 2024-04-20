import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/auth/login`,
      {
        email: request.email,
        password: request.password,
      }
    );
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    let email: string | null = null;
    let roles: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      email = localStorage.getItem('user-email');
      roles = localStorage.getItem('user-roles');
    }

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(','),
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
