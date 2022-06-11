import { Injectable } from '@angular/core';
import {AbstractAPIService} from '../../api/services/abstract-a-p-i-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractAPIService{
  protected readonly API_URL_USER = this.API_URL + 'test/';

  constructor(private http: HttpClient) {
    super(http);
  }
  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL_USER + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL_USER + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL_USER + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL_USER + 'admin', { responseType: 'text' });
  }
}
