import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AbstractAPICrudService} from './abstractAPICrudService';
import {Ente} from 'src/app/api/models/ente';
import {Anagrafica} from 'src/app/api/models/anagrafica';
import {Page} from '../models/pagination/page';
import {MessageService} from './message.service';
import {SortedSearchRequest} from '../models/pagination/sorted-search-request';
import {ExportType} from '../table-exporter';

@Injectable({
  providedIn: 'root'
})
export class EnteService extends AbstractAPICrudService<Ente>{
  protected readonly API_URL_ENTE = this.API_URL + 'ente/';
  bsEnteList: Subject<Page<Ente>> = new Subject<Page<Ente>>();
  bsDipendenteParenteList: BehaviorSubject<Anagrafica[]> = new BehaviorSubject<Anagrafica[]>([]);
  enteSubject: Subject<Ente> = new Subject<Ente>();
  enteSavedSubject: Subject<Ente> = new Subject<Ente>();

  csvSubject: Subject<HttpResponse<Blob>> = new Subject<HttpResponse<Blob>>();

  constructor(httpClient: HttpClient, private messageService: MessageService) {
    super(httpClient);
  }

  public getAllPagedModel(request): Observable<Page<Ente>> {
    const params = request;
    this.httpClient.get<Page<Ente>>(this.API_URL_ENTE, {params}).subscribe(
      (data) => {
        this.bsEnteList.next(data);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.bsEnteList.asObservable();
  }

  public getEnteById(idEnte: number): Observable<Ente> {
    this.httpClient.get<Ente>(`${this.API_URL_ENTE}${idEnte}`).subscribe(
      (value: Ente ) => {
        this.enteSubject.next(value);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.enteSubject.asObservable();
  }

  public findDipendentiParentiEnte(idEnte: number, dataCheck: Date): Observable<Anagrafica[]>{
    this.httpClient.get<Anagrafica[]>(`${this.API_URL_ENTE}${idEnte}/parenti/${dataCheck.toISOString()}`).subscribe(
      (data) => {
        this.bsDipendenteParenteList.next(data);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.bsDipendenteParenteList.asObservable();
  }




  public addEnte(ente: Ente): Observable<Ente> {
    this.httpClient.post<Ente>(this.API_URL_ENTE, ente).subscribe(
      value => this.enteSavedSubject.next(value)
    );
    return this.enteSavedSubject;
  }

  public updateEnte(ente: Ente): void {
    this.httpClient.put(this.API_URL_ENTE, ente).subscribe(
      (value: object) => {
        console.log(value);
      }, (error: HttpErrorResponse) => {
        if (error.status === 400){
          this.messageService.add(`Sono presenti ${error.error.errors.length} errori di validazione del server`);
          const e = error.error.errors as Array<any>;
          e.forEach((value, index, array) => {
            this.messageService.add(value.objectName + '.' + value.field + ' ' + value.defaultMessage);
          });

        }

      }
    );
  }


  exportTableData(exportType: ExportType, request: SortedSearchRequest): Observable<HttpResponse<Blob>> {
    const paramsw = request;
    // osservo l'intera risposta per ottenere il nome del file
    this.httpClient.get(`${this.API_URL_ENTE}export/${exportType}`, {params: paramsw, observe: 'response', responseType: 'blob'} ).subscribe(
      (data) => {
        this.csvSubject.next(data);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.csvSubject.asObservable();
  }

  public getUploadUrl(): string{
    return `${this.API_URL_ENTE}import/`;
  }

}
