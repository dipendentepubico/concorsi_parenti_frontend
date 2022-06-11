import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DipendenteEditComponent } from './dipendente-edit.component';

describe('DipendenteEditComponent', () => {
  let component: DipendenteEditComponent;
  let fixture: ComponentFixture<DipendenteEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DipendenteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DipendenteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
