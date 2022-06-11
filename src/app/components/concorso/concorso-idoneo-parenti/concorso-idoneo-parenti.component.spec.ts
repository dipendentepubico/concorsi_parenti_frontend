import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConcorsoIdoneoParentiComponent } from './concorso-idoneo-parenti.component';

describe('ConcorsoIdoneoParentiComponent', () => {
  let component: ConcorsoIdoneoParentiComponent;
  let fixture: ComponentFixture<ConcorsoIdoneoParentiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcorsoIdoneoParentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcorsoIdoneoParentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
