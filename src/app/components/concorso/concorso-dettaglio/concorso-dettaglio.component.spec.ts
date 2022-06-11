import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConcorsoDettaglioComponent } from './concorso-dettaglio.component';

describe('ConcorsoDettaglioComponent', () => {
  let component: ConcorsoDettaglioComponent;
  let fixture: ComponentFixture<ConcorsoDettaglioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcorsoDettaglioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcorsoDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
