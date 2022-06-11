import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export class AbstractAPIService {
  protected readonly API_URL = environment.apiUrl;

  protected constructor(protected httpClient: HttpClient) { }


}
