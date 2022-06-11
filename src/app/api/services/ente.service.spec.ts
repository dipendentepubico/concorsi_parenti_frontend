import { TestBed } from '@angular/core/testing';

import { EnteService } from './ente.service';

describe('EnteService', () => {
  let service: EnteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnteService);
  });

});
