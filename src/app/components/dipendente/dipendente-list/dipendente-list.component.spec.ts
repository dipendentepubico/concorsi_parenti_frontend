import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DipendenteListComponent } from './dipendente-list.component';

describe('DipendenteListComponent', () => {
  let component: DipendenteListComponent;
  let fixture: ComponentFixture<DipendenteListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DipendenteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DipendenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
