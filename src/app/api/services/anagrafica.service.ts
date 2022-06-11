import { Injectable } from '@angular/core';
import {AbstractAPICrudService} from './abstractAPICrudService';
import {Anagrafica} from '../models/anagrafica';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AnagraficaAutocomplete} from '../models/anagrafica-autocomplete';


@Injectable({
  providedIn: 'root'
})
export class AnagraficaService extends AbstractAPICrudService<Anagrafica>{
  protected readonly API_URL_ANAGRAFICA = this.API_URL + 'anagrafica/';
  bsAnagraficaList: BehaviorSubject<AnagraficaAutocomplete[]> = new BehaviorSubject<AnagraficaAutocomplete[]>([]);

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAnagraficaAutocomplete(searchString: string): Observable<AnagraficaAutocomplete[]> {
      this.httpClient.get<AnagraficaAutocomplete[]>(`${this.API_URL_ANAGRAFICA}autocomplete/${searchString}`).subscribe(
        (data) => {
          this.bsAnagraficaList.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
      return this.bsAnagraficaList.asObservable();
    }
}
