import { Injectable } from '@angular/core';
import {AbstractAPICrudService} from './abstractAPICrudService';
import {Categoria} from '../models/categoria';
import {Page} from '../models/pagination/page';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PagedSortedSearchRequest} from '../models/pagination/paged-sorted-search-request';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends AbstractAPICrudService<Categoria>{
  protected readonly API_URL_CATEGORIA = this.API_URL + 'categoria/';
  sCategoriaList: Subject<Page<Categoria>> = new Subject<Page<Categoria>>();
  bsCategoriaList: BehaviorSubject<Categoria[]> = new BehaviorSubject<Categoria[]>([]);

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllPagedModel(request): Observable<Page<Categoria>> {
    const params = request;
    this.httpClient.get<Page<Categoria>>(`${this.API_URL_CATEGORIA}/paged`, {params}).subscribe(
      (data) => {
        this.sCategoriaList.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.sCategoriaList.asObservable();
  }

  getAllModel(): Observable<Categoria[]> {
    this.httpClient.get<Categoria[]>(this.API_URL_CATEGORIA).subscribe(
      (data) => {
        this.bsCategoriaList.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.bsCategoriaList.asObservable();
  }

}
