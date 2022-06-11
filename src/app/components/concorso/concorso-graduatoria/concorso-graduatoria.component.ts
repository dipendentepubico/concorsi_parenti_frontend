import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GraduatoriaFinale} from '../../../api/models/graduatoria-finale';
import {ConcorsoService} from '../../../api/services/concorso.service';
import {MatTableDataSource} from '@angular/material/table';
import {GraduatoriaAnagrafica} from '../../../api/models/graduatoria-anagrafica';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {Parente} from '../../../api/models/parente';
import {Anagrafica} from '../../../api/models/anagrafica';
import {MatTableFilter} from 'mat-table-filter';


@Component({
  selector: 'app-concorso-graduatoria',
  templateUrl: './concorso-graduatoria.component.html',
  styleUrls: ['./concorso-graduatoria.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConcorsoGraduatoriaComponent implements OnInit, OnChanges {

  @Input()
  concorsoId: number;
  graduatoria: GraduatoriaFinale;

  displayedColumns = ['id', 'posizione', 'anagrafica.codiceFiscale', 'anagrafica.cognome', 'anagrafica.nome', 'actions'];
  dataSource: MatTableDataSource<GraduatoriaAnagrafica>;
  filterEntity: GraduatoriaAnagrafica;
  expandedElement: GraduatoriaAnagrafica | null;
  parentiAnagrafica: Parente[];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private concorsoService: ConcorsoService) { }

  ngOnInit(): void {
    this.filterEntity = new GraduatoriaAnagrafica();
    this.filterEntity.anagrafica = new Anagrafica();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.retrieveGraduatoria();
  }

  private retrieveGraduatoria() {
    this.concorsoService.getGraduatoria(this.concorsoId).subscribe(
      value => {
        this.graduatoria = value;
        this.dataSource = new MatTableDataSource(this.graduatoria.graduatoriaAnagraficaEntityList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property.includes('.')) {
            return property.split('.').reduce((o, i) => o[i], item);
          }
          return item[property];
        };
      }
    );
  }



  expandAnagrafica(anag: GraduatoriaAnagrafica){
    this.expandedElement = this.expandedElement === anag ? null : anag;
    this.concorsoService.getParentiDipendentiByIdoneo(this.concorsoId, anag.id).subscribe(
      value => {
        this.parentiAnagrafica = value;
      }
    );
  }

}
