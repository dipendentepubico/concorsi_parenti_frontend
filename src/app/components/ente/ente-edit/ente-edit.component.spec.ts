import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnteEditComponent } from './ente-edit.component';

describe('EnteEditComponent', () => {
  let component: EnteEditComponent;
  let fixture: ComponentFixture<EnteEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
