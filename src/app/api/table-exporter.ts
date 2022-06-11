import {AbstractAPICrudService} from './services/abstractAPICrudService';
import {AbstractApiModel} from './models/abstract-api-model';
import {SearchCriteria} from '../domain/search-criteria';
import {SortedSearchRequest} from './models/pagination/sorted-search-request';
import {PaginationUtils} from './models/pagination/pagination-utils';
import {saveAs} from 'file-saver';
import {HttpResponse} from "@angular/common/http";
import {take} from "rxjs/operators";

export enum ExportType {
  CSV = 'CSV',
  XLSX = 'XLSX'
}

export class TableExporter<M extends AbstractApiModel, S extends AbstractAPICrudService<M>> {
  constructor(private apiService: S) {
  }


  /**
   * Esporta la tabella mostrata a video con l'ordinamento e i filtri impostati al momento.
   * @param exportType      Formato di esportazione {@link ExportType}
   * @param field           Campo ordinamento. Valore di default è id
   * @param direction       Direzione ordinamento. Valore di default è ASC
   * @param searchString    Array di SearchCriteria generati dai filtri utente della tabella
   * @param filename        Opzionale. Senza estensione es. "enti" diventa "enti.csv" o "enti.xlsx"
   */
  export(exportType: ExportType, field: string = 'id',
         direction: SortedSearchRequest.SortDirection = SortedSearchRequest.SortDirection.ASCENDING,
         searchString = new Array<SearchCriteria>(), filename?: string) {
    // genero la stringa di ricerca
    const searchFilter = PaginationUtils.serializeSearchFilter(searchString);
    // creo la request
    const request: SortedSearchRequest = {sortField: field, sortDirection: direction, search: searchFilter};
    // richiamo il servizio
    return this.apiService.exportTableData(exportType, request).pipe(take(1)).subscribe((response: HttpResponse<Blob>) => {
        let blob: Blob;
        switch (exportType) {
          case ExportType.CSV:
            blob = new Blob([response.body], {type: 'text/csv; charset=utf-8'});
            break;
          case ExportType.XLSX:
            blob = new Blob([response.body], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8'});
            break;
        }
        // se nome file non esplicito e ritornato da backend allora uso quest'ultimo
        if (!filename && response.headers.get('Content-Disposition')){
          filename = response.headers.get('Content-Disposition').replace(/(attachment; filename=")([A-Za-z0-9-_\.]+)(")/g, '$2');
        }else if (filename){
          // nome file esplicito. aggiungo estensione
          filename += exportType.toLowerCase();
        }
        // scarico il file
        saveAs(blob, filename);
      },
      (error: any) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully')
    );
  }
}
