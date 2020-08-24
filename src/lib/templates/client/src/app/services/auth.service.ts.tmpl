import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { JwtDecoded } from '../models/jwt-decoded.model';
import { AuthCredentials } from '../models/auth-credentials.model';
import { AuthUser } from '../models/auth-user.model';
import { JWT } from '../models/jwt.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<AuthUser>;
  currentUser: Observable<AuthUser>;
  private authUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * POST AuthCredentials
   */
  login(authCredentials: AuthCredentials): Observable<AuthUser | HttpErrorResponse> {
    return this.http.post<JWT>(`${this.authUrl}/auth/login`, authCredentials, httpOptions).pipe(
      switchMap(jwt => {
          if (jwt && jwt.token) {
            localStorage.setItem('JWT', JSON.stringify(jwt.token));
            return this.http.get<AuthUser>(`${this.authUrl}/auth/profile`, {
              headers: new HttpHeaders(this.getAuthHeaders())
            }).pipe(
              map(user => {
                localStorage.setItem('User', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
              })
            );
          } else {
            return EMPTY;
          }
        }
      ),
      catchError(this.errorHandler.handleErrorWithMessage('authService.login'))
    );
  }

  /**
   * POST AuthCredentials
   */
  register(newUser: AuthUser): Observable<AuthUser | HttpErrorResponse> {
    return this.http.post<JWT>(`${this.authUrl}/auth/register`, newUser, httpOptions).pipe(
      switchMap(jwt => {
          if (jwt && jwt.token) {
            localStorage.setItem('JWT', JSON.stringify(jwt));
            return this.http.get<AuthUser>(`${this.authUrl}/auth/profile`, {
              headers: new HttpHeaders(this.getAuthHeaders())
            }).pipe(
              map(user => {
                localStorage.setItem('User', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
              })
            );
          } else {
            return EMPTY;
          }
        }
      ),
      catchError(this.errorHandler.handleErrorWithMessage('authService.login'))
    );
  }

  logout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('User');
    this.currentUserSubject.next(null);
  }

  /**
   * Returns JWT headers for token-interception
   */
  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.getStoredJWT()}`
    };
  }

  /**
   * Returns AuthUser from localstorage
   */
  getStoredUser(): AuthUser {
    return JSON.parse(localStorage.getItem('User'));
  }

  /**
   * Returns JWT from localstorage
   */
  getStoredJWT(): string {
    return JSON.parse(localStorage.getItem('JWT'));
  }

  /**
   *  Used by AuthGuardService
   *  Returns if user is authenticated according to the authorized role, declared in environment.ts
   */
  isAuthenticated(): Boolean {
    try {
      const token = this.getStoredJWT();
      const decodedToken = jwt_decode<JwtDecoded>(token);
      const dateNow = new Date().getTime() / 1000;
      return (decodedToken.role === environment.authorizedRole && decodedToken.exp > dateNow);
    } catch (e) {
      return false;
    }
  }
}
