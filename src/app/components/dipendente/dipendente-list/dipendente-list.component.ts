import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DipendenteService} from '../../../api/services/dipendente.service';
import {PagedDataSource} from '../../../api/paged-data-source';
import {Router} from '@angular/router';
import {Dipendente} from '../../../api/models/dipendente';
import {Categoria} from '../../../api/models/categoria';
import {CategoriaService} from '../../../api/services/categoria.service';
import {PagedFilteredTableComponent} from '../../paged-filtered-table/paged-filtered-table.component';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ExportType, TableExporter} from "../../../api/table-exporter";
import {Ente} from "../../../api/models/ente";
import {EnteService} from "../../../api/services/ente.service";
import {PagedSortedSearchRequest} from "../../../api/models/pagination/paged-sorted-search-request";


@Component({
  selector: 'app-dipendente-list',
  templateUrl: './dipendente-list.component.html',
  styleUrls: ['./dipendente-list.component.css']
})
export class DipendenteListComponent extends PagedFilteredTableComponent<Dipendente, DipendenteService> implements OnInit, OnChanges {

  @Input()
  enteId: number;

  displayedColumns = ['id', 'anagrafica.nome', 'anagrafica.cognome', 'anagrafica.codiceFiscale', 'dataInizio', 'dataFine', 'categoria.descrizione', 'actions'];

  categoriaList: Categoria[] = [];

  selectedDipendenteId: number;

  @ViewChild('dipeListPanel') dipListPanel: MatExpansionPanel;
  @ViewChild('dipePanel') dipPanel: MatExpansionPanel;

  constructor(private router: Router, private dipendenteService: DipendenteService, private categoriaService: CategoriaService) {
    super();
  }

  ngOnInit(): void {
    this.categoriaService.getAllModel().subscribe(
      value => this.categoriaList = value
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new PagedDataSource<Dipendente, DipendenteService>(this.dipendenteService);
    this.dataSource.realApiEndpoint = request => this.dipendenteService.findDipendentiByEnte(request, this.enteId, new Date());
    this.dataSource.loadModelList();
  }

  editDipendente(idDipendente: number) {
    this.selectedDipendenteId = idDipendente;
    this.dipListPanel.close();
    this.dipPanel.open();
  }

  addNewDipendente() {
    this.selectedDipendenteId = null;
    this.dipListPanel.close();
    this.dipPanel.open();
  }

  deleteDipendente(idDipendente: number){
    this.dipendenteService.deleteDipendente(idDipendente).subscribe(
      x => this.ngOnChanges(undefined)
    );
  }

  toggleList($event: boolean) {
    this.dipListPanel.open();
    this.dipPanel.close();
    if ($event){
      // è avvenuta una modifica su un dipendente: ricaricare lista
      this.ngOnChanges(undefined);
    }
  }

  exportTable(expType: string, filename?: string) {
    const exporter: TableExporter<Dipendente, DipendenteService> = new TableExporter(this.dipendenteService);
    // prendo il nome file ritornato da backend
    exporter.export( ExportType[expType.toUpperCase()],  this.sort.active,
      PagedSortedSearchRequest.SortDirection[this.sort.direction.toUpperCase()], Array.from(this.filterMap.values()));

  }

}
