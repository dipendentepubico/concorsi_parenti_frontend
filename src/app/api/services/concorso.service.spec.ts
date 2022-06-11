import { TestBed } from '@angular/core/testing';

import { ConcorsoService } from './concorso.service';

describe('ConcorsoService', () => {
  let service: ConcorsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcorsoService);
  });

});
