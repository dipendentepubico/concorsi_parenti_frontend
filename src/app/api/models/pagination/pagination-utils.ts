import {SearchCriteria} from '../../../domain/search-criteria';
import {SearchOperation} from './search-operation';

export class PaginationUtils {


  public static serializeSearchFilter(searchString: SearchCriteria[]) {
    let searchFilter = '';
    if (searchString.length > 0) {
      searchFilter = searchString
        .map<string>(value => {
          // per ogni criteria inserito come filtro dall'utente creo una condizione
          const sc: SearchCriteria = value;
          let formattedValue: string = sc.value;
          // si tratta di una data quindi la serializzo in yyyy-MM-dd
          if (sc.value instanceof Date) {
            formattedValue = sc.value.toISOString().slice(0, 10);
          }

          let whereCondition = '';
          switch (sc.operation) {
            case SearchOperation.EQUALITY:
              whereCondition = sc.key + sc.operation + formattedValue;
              break;
            case SearchOperation.LIKE:
              whereCondition = sc.key + SearchOperation.LIKE + '*' + formattedValue + '*';
              break;
            case SearchOperation.GREATER_THAN:
              whereCondition = sc.key + SearchOperation.GREATER_THAN + formattedValue;
              break;
            case SearchOperation.LESS_THAN:
              whereCondition = sc.key + SearchOperation.LESS_THAN + formattedValue;
              break;
          }
          return whereCondition;
        })
        // riduco tutte le condizioni ad una sola stringa concatenata con virgole
        .reduce((previousValue, currentValue) => previousValue + ',' + currentValue);
    }
    return searchFilter;
  }
}
