import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractAPIService} from '../../../api/services/abstract-a-p-i-service';
import {LoginResponse} from '../models/login-response';
import {LoginRequest} from '../models/login-request';
import {SignupRequest} from '../models/signup-request';
import {SignupResponse} from '../models/signup-response';
import {TokenStorageService} from '../../services/token-storage.service';
import {Role} from '../models/role';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractAPIService{
  protected readonly API_URL_AUTH = this.API_URL + 'auth/';

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    super(http);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const req: LoginRequest = {username, password};
    return this.http.post<LoginResponse>(this.API_URL_AUTH + 'signin', req, httpOptions).pipe(
      tap<LoginResponse>(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
        }, err => {
          this.isLoginFailed = true;
        }
      )
    );
  }
  register(username: string, email: string, password: string): Observable<SignupResponse> {
    const req: SignupRequest = new SignupRequest();
    req.username = username;
    req.email = email;
    req.password = password;
    return this.http.post<SignupResponse>(this.API_URL_AUTH + 'signup', req, httpOptions);
  }


  isAuthorized(): boolean {
    return this.tokenStorage.getToken() != null;
  }

  hasRole(role: Role) {
    return this.isAuthorized() && this.tokenStorage.getUser().roles.includes(role);
  }

  roles(): Role[]{
    return this.tokenStorage.getUser().roles;
  }

}
