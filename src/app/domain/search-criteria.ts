import {SearchOperation} from '../api/models/pagination/search-operation';

export class SearchCriteria {
  key: string;
  operation: SearchOperation;
  /**
   * string, Date (Datepicker) ecc
   */
  value: any;


  constructor(key: string, operation: SearchOperation, value: any) {
    this.key = key;
    this.operation = operation;
    this.value = value;
  }
}
