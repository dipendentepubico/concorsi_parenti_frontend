import {SortedSearchRequest} from './sorted-search-request';

/**
 * Ricerca ordinata paginata usata dalle tabelle a front
 */
export class PagedSortedSearchRequest extends SortedSearchRequest{
  page = 0;
  size = 5;
}

