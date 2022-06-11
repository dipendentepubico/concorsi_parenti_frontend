import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParenteListComponent } from './parente-list.component';

describe('ParenteListComponent', () => {
  let component: ParenteListComponent;
  let fixture: ComponentFixture<ParenteListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
