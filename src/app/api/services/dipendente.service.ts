import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MessageService} from './message.service';
import {AbstractAPICrudService} from './abstractAPICrudService';
import {Dipendente} from '../models/dipendente';
import {Page} from '../models/pagination/page';
import {DipendenteInsert} from '../models/dipendente-insert';
import {DipendenteUpdate} from '../models/dipendente-update';
import {ExportType} from '../table-exporter';
import {SortedSearchRequest} from '../models/pagination/sorted-search-request';

@Injectable({
  providedIn: 'root'
})
export class DipendenteService extends AbstractAPICrudService<Dipendente>{
  protected readonly API_URL_DIPENDENTE = this.API_URL + 'dipendente/';
  bsDipendenteList: Subject<Page<Dipendente>> = new Subject<Page<Dipendente>>();
  dipendenteSubject: Subject<Dipendente> = new Subject<Dipendente>();
  dipendenteInsertSubject: Subject<DipendenteInsert> = new Subject<DipendenteInsert>();
  dipendenteUpdateSubject: Subject<DipendenteUpdate> = new Subject<DipendenteUpdate>();
  dipendenteInsertIdSubject: Subject<number> = new Subject<number>();
  csvSubject: Subject<HttpResponse<Blob>> = new Subject<HttpResponse<Blob>>();

  constructor(httpClient: HttpClient, private messageService: MessageService) {
    super(httpClient);
  }

  getAllPagedModel(request): Observable<Page<Dipendente>> {
    return undefined;
  }

  public findDipendentiByEnte(request, idEnte: number, dataCheck: Date): Observable<Page<Dipendente>>{
    const params = request;
    this.httpClient.get<Page<Dipendente>>(`${this.API_URL_DIPENDENTE}ente/${idEnte}/${dataCheck.toISOString()}`, {params}).subscribe(
      (data) => {
        this.bsDipendenteList.next(data);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.bsDipendenteList.asObservable();
  }

  public getDipendenteById(idDipendente: number): Observable<Dipendente> {
    this.httpClient.get<Dipendente>(`${this.API_URL_DIPENDENTE}${idDipendente}`).subscribe(
      (value: Dipendente ) => {
        this.dipendenteSubject.next(value);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.dipendenteSubject.asObservable();
  }

  public getDipendente4Edit(idDipendente: number): Observable<DipendenteUpdate> {
    this.httpClient.get<DipendenteUpdate>(`${this.API_URL_DIPENDENTE}edit/${idDipendente}`).subscribe(
      (value: DipendenteUpdate ) => {
        this.dipendenteUpdateSubject.next(value);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.dipendenteUpdateSubject.asObservable();
  }

  public insert(enteId: number, dipendente: DipendenteInsert): Observable<number> {
    this.httpClient.post<number>(`${this.API_URL_DIPENDENTE}ente/${enteId}/dipendente`, dipendente).subscribe(
      (value: number ) => {
        this.dipendenteInsertIdSubject.next(value);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.dipendenteInsertIdSubject.asObservable();
  }

  public update(enteId: number, id: number, dipendente: DipendenteUpdate): Observable<number> {
    dipendente.id = id;
    this.httpClient.put<number>(`${this.API_URL_DIPENDENTE}ente/${enteId}/dipendente`, dipendente).subscribe(
      (value: number ) => {
        this.dipendenteInsertIdSubject.next(value);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.dipendenteInsertIdSubject.asObservable();
  }

  deleteDipendente(idDipendente: number): Observable<Dipendente> {
    return this.httpClient.delete<Dipendente>(`${this.API_URL_DIPENDENTE}${idDipendente}`);
  }


  exportTableData(exportType: ExportType, request: SortedSearchRequest): Observable<HttpResponse<Blob>> {
    const paramsw = request;
    // osservo l'intera risposta per ottenere il nome del file
    this.httpClient.get(`${this.API_URL_DIPENDENTE}export/${exportType}`, {params: paramsw, observe: 'response', responseType: 'blob'} ).subscribe(
      (data) => {
        this.csvSubject.next(data);
      },
      (error: HttpErrorResponse) => {
        this.messageService.add(error.name + ' ' + error.message);
      }
    );
    return this.csvSubject.asObservable();
  }

}
