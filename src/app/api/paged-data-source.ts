import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Page} from './models/pagination/page';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractAPICrudService} from './services/abstractAPICrudService';
import {AbstractApiModel} from './models/abstract-api-model';
import {PagedSortedSearchRequest} from './models/pagination/paged-sorted-search-request';
import {SearchCriteria} from '../domain/search-criteria';
import {SortedSearchRequest} from './models/pagination/sorted-search-request';
import {PaginationUtils} from './models/pagination/pagination-utils';

/**
 * Il metodo che chiama l'api corretta usando la request.
 * Di default PagedDataSource<M, S<M>> con apiService:S richiama this.apiService<M>.getAllPagedModel(request)
 * Può essere modificato se è necessario passare altre informazioni in input al metodo api es. in DipendenteListComponent ho
 * this.dataSource.realApiEndpoint = request => this.dipendenteService.findDipendentiByEnte(request, this.enteId, new Date());
 */
type PageableGenericEntitySearchApi<A extends AbstractApiModel> = (request: PagedSortedSearchRequest) => Observable<Page<A>>;

export class PagedDataSource<M extends AbstractApiModel, S extends AbstractAPICrudService<M>> implements DataSource<M>{

  private modelSubject = new BehaviorSubject<M[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  public realApiEndpoint: PageableGenericEntitySearchApi<M>;

  constructor(private apiService: S) {
    // generalmente chiamo l'endpoint che ricerca genericamente l'entity
    this.realApiEndpoint = request => this.apiService.getAllPagedModel(request);
  }

  connect(collectionViewer: CollectionViewer): Observable<M[]> {
    return this.modelSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.modelSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadModelList(pageNumber = 0, pageSize = 5, field = 'id',
                direction: SortedSearchRequest.SortDirection = SortedSearchRequest.SortDirection.ASCENDING,
                searchString = new Array<SearchCriteria>() ) {
    this.loadingSubject.next(true);
    // genero la stringa di ricerca
    const searchFilter = PaginationUtils.serializeSearchFilter(searchString);
    // creo la request
    const request: PagedSortedSearchRequest = { page: pageNumber, size: pageSize, sortField: field,
                                                sortDirection: direction, search: searchFilter};
    // passo la request al metodo, eventualmente sovrascritto, che richiama le api
    this.realApiEndpoint(request)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: Page<M>) => {
          this.modelSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }

}
