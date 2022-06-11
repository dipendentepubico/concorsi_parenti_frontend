import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnteListComponent } from './ente-list.component';
import {Ente} from '../../../api/models/ente';
import {asyncData} from '../../../testing/async-observable-helpers';
import {EnteService} from '../../../api/services/ente.service';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Page} from '../../../api/models/pagination/page';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';

describe('EnteListComponent', () => {
  let component: EnteListComponent;
  let fixture: ComponentFixture<EnteListComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  class EnteServiceSpy {
    page: Page<Ente>;

    constructor() {
      const enteList: Array<Ente> = Array<Ente>();
      this.page = new Page<Ente>();

      let ente: Ente = new Ente();
      ente.id = 1;
      ente.codiceIPA = 'CodiceIPA1';
      ente.allineato = false;
      ente.codiceFiscale = 'CF1';
      ente.descrizione = 'Primo Ente di test';
      enteList.push(ente);

      ente = new Ente();
      ente.id = 4;
      ente.codiceIPA = 'CodiceIPA4';
      ente.allineato = true;
      ente.codiceFiscale = 'CF4';
      ente.descrizione = 'Secondo Ente di test';
      enteList.push(ente);

      this.page.content = enteList;
    }

    getAllPagedModel = jasmine.createSpy('getAllPagedModel').and.callFake(() => {
      const observable = asyncData(Object.assign({}, this.page));
      return observable;
    });

    getUploadUrl = jasmine.createSpy('getUploadUrl').and.returnValue('');


  }



  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ EnteListComponent ],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule],
      providers: [
        {provide: EnteService, useClass: EnteServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents().then((fullfillment) => {
      fixture = TestBed.createComponent(EnteListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });



  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve table', () => {
    fixture.detectChanges();  // runs initial lifecycle hooks

    const rowList: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-row'));

    expect(rowList.length)
      .withContext('deve mostrare 2 enti')
      .toBe(2);

    const codiceIpaList: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-cell.mat-column-codiceIPA'));

    expect(codiceIpaList[0].nativeElement.textContent)
      .withContext('il codice ipa deve essere corretto')
      .toBe('CodiceIPA1');


  });


});
