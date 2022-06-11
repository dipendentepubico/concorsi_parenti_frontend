import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConcorsoParentiComponent } from './concorso-parenti.component';

describe('ConcorsoParentiIdoneoComponent', () => {
  let component: ConcorsoParentiComponent;
  let fixture: ComponentFixture<ConcorsoParentiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcorsoParentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcorsoParentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
