import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConcorsoGraduatoriaComponent } from './concorso-graduatoria.component';

describe('ConcorsoGraduatoriaComponent', () => {
  let component: ConcorsoGraduatoriaComponent;
  let fixture: ComponentFixture<ConcorsoGraduatoriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcorsoGraduatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcorsoGraduatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
