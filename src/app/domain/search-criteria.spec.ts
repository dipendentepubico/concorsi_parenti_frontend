import {SearchCriteria} from './search-criteria';
import {SearchOperation} from '../api/models/pagination/search-operation';

describe('SearchCriteria', () => {
  it('should create an instance', () => {
    expect(new SearchCriteria('key', SearchOperation.LIKE, 'value')).toBeTruthy();
  });
});
