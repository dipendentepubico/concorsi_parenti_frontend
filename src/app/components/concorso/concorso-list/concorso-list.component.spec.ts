import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConcorsoListComponent } from './concorso-list.component';

describe('ConcorsoListComponent', () => {
  let component: ConcorsoListComponent;
  let fixture: ComponentFixture<ConcorsoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcorsoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcorsoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
