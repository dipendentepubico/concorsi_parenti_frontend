import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AbstractAPIService} from './abstract-a-p-i-service';
import {Observable, Subject} from 'rxjs';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class CaptchaService extends AbstractAPIService{
  protected readonly API_URL_CAPTCHA = this.API_URL + 'captcha/';
  imageSubject: Subject<HttpResponse<Blob>> = new Subject<HttpResponse<Blob>>();

  constructor(protected httpClient: HttpClient, private messageService: MessageService) {
    super(httpClient);
  }

  generateCaptcha(): Observable<HttpResponse<Blob>> {
    // osservo l'intera risposta per ottenere il nome del file
    this.httpClient.get(`${this.API_URL_CAPTCHA}`, {observe: 'response', responseType: 'blob'} ).subscribe(
      (data) => {
        this.imageSubject.next(data);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.imageSubject.asObservable();
  }

}
