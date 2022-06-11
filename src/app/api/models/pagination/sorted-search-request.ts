/**
 * Ricerca ordinata senza paginazione. Usata per esportazioni csv.
 */
export class SortedSearchRequest {
  sortField = 'id';
  sortDirection: SortedSearchRequest.SortDirection = SortedSearchRequest.SortDirection.ASCENDING;
  search = '';
}

// tslint:disable-next-line:no-namespace
export namespace SortedSearchRequest
{
  export enum SortDirection {
    ASCENDING = 'ASC',
    DESCENDING = 'DESC'
  }
}
