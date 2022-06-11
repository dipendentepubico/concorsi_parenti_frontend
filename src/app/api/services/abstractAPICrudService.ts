import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../models/pagination/page';
import { SortedSearchRequest } from '../models/pagination/sorted-search-request';
import {ExportType} from '../table-exporter';
import {AbstractAPIService} from './abstract-a-p-i-service';

export abstract class AbstractAPICrudService<S> extends AbstractAPIService {
  public getAllPagedModel(request): Observable<Page<S>>{
    throw new Error('Method not implemented.');
  }

  public exportTableData(exportType: ExportType, request: SortedSearchRequest): Observable<HttpResponse<Blob>> {
    throw new Error('Method not implemented.');
  }
}
