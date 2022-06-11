import { AfterViewInit, Component, OnInit, ViewChild, Directive } from '@angular/core';
import {tap} from 'rxjs/operators';
import {PagedDataSource} from '../../api/paged-data-source';
import {AbstractAPICrudService} from '../../api/services/abstractAPICrudService';
import {AbstractApiModel} from '../../api/models/abstract-api-model';
import {SearchCriteria} from '../../domain/search-criteria';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SearchOperation} from '../../api/models/pagination/search-operation';
import {MatDatepicker} from '@angular/material/datepicker';
import {PagedSortedSearchRequest} from '../../api/models/pagination/paged-sorted-search-request';

@Directive()
export abstract class PagedFilteredTableComponent<M extends AbstractApiModel, S extends AbstractAPICrudService<M>> implements AfterViewInit {

  dataSource: PagedDataSource<M, S>;
  pageSize = 5;
  totalElements: number;
  // la mappa serve ad aggiungere / eliminare il search criteria in modo da passare
  // solo quelli validi al datasource che accetta un array di SearchCriteria
  filterMap: Map<string, SearchCriteria>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  protected constructor() {
    this.filterMap = new Map<string, SearchCriteria>();
  }

  // modo per usare enum in html
  public get searchOperation(): typeof SearchOperation {
    return SearchOperation;
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadTodos())
      )
      .subscribe();

    this.sort.sortChange
      .pipe(
        tap(() => this.loadTodos())
      ).subscribe();
  }

  loadTodos() {
    // mi interessa solo il valore della mappa ossia il SearchCriteria
    this.dataSource.loadModelList(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
      PagedSortedSearchRequest.SortDirection[this.sort.direction.toUpperCase()], Array.from(this.filterMap.values()));
  }

  applyFilter(filterValue: any, filterKey: string, searchOp: SearchOperation){
    // paginazione ricomincia da 0
    this.paginator.pageIndex = 0;
    if ( filterValue == null || (filterValue instanceof String && filterValue.length === 0) ) {
      this.filterMap.delete(filterKey);
    }else{
      this.filterMap.set(filterKey, new SearchCriteria(filterKey, searchOp, filterValue));
    }
    this.loadTodos();
  }

  clearDatePickerFilter(filterKey: string, inputElement: MatDatepicker<any>) {
    // NB questo fa scattare l'applyFilter come se fosse un evento utente
    inputElement.select(null);
  }


}
