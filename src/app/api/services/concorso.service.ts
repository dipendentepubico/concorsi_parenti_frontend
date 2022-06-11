import { Injectable } from '@angular/core';
import {AbstractAPICrudService} from './abstractAPICrudService';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Concorso} from '../models/concorso';
import {AnagraficaConDipendentiParenti} from '../models/anagrafica-con-dipendenti-parenti';
import {Page} from '../models/pagination/page';
import {GraduatoriaFinale} from '../models/graduatoria-finale';
import {Parente} from '../models/parente';

@Injectable({
  providedIn: 'root'
})
export class ConcorsoService extends AbstractAPICrudService<Concorso>{
  protected readonly API_URL_CONCORSO = this.API_URL + 'concorso/';
  bsConcorsoList: Subject<Page<Concorso>> = new Subject<Page<Concorso>>();
  sConcorso: Subject<Concorso> = new Subject<Concorso>();
  sAnagraficaConDipendentiParentiList: BehaviorSubject<AnagraficaConDipendentiParenti[]> = new BehaviorSubject<AnagraficaConDipendentiParenti[]>([]);
  sGraduatoria: Subject<GraduatoriaFinale> = new Subject<GraduatoriaFinale>();
  sParenti: Subject<Parente[]> = new Subject<Parente[]>();

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getAllPagedModel(request): Observable<Page<Concorso>> {
    const params = request;
    this.httpClient.get<Page<Concorso>>(this.API_URL_CONCORSO, {params}).subscribe(
      (data) => {
        this.bsConcorsoList.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.bsConcorsoList.asObservable();
  }

  public getConcorsoById(idConcorso: number): Observable<Concorso> {
    this.httpClient.get<Concorso>(`${this.API_URL_CONCORSO}${idConcorso}`).subscribe(
      (value: Concorso ) => {
        this.sConcorso.next(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.sConcorso.asObservable();
  }

  public getParentiDipendentiByConcorso(idConcorso: number): Observable<AnagraficaConDipendentiParenti[]> {
    this.httpClient.get<AnagraficaConDipendentiParenti[]>(`${this.API_URL_CONCORSO}${idConcorso}/idonei-parenti-dipendenti`).subscribe(
      (value: AnagraficaConDipendentiParenti[]) => {
          this.sAnagraficaConDipendentiParentiList.next(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.sAnagraficaConDipendentiParentiList.asObservable();
  }

  public getParentiDipendentiByIdoneo(idConcorso: number, idAnagrafica: number): Observable<Parente[]> {
    this.httpClient.get<Parente[]>(`${this.API_URL_CONCORSO}${idConcorso}/idoneo/${idAnagrafica}/parenti`).subscribe(
      (value: Parente[]) => {
        this.sParenti.next(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.sParenti.asObservable();
  }

  public getGraduatoria(idConcorso: number): Observable<GraduatoriaFinale> {
    this.httpClient.get<GraduatoriaFinale>(`${this.API_URL_CONCORSO}${idConcorso}/graduatoria`).subscribe(
      (value: GraduatoriaFinale) => {
        this.sGraduatoria.next(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.sGraduatoria.asObservable();
  }



}
