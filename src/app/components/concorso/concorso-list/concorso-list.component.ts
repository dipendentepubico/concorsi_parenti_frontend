import {Component, OnInit} from '@angular/core';
import {Concorso} from '../../../api/models/concorso';
import {ConcorsoService} from '../../../api/services/concorso.service';
import {PagedDataSource} from '../../../api/paged-data-source';
import {PagedFilteredTableComponent} from '../../paged-filtered-table/paged-filtered-table.component';
import {CategoriaService} from '../../../api/services/categoria.service';
import {Categoria} from '../../../api/models/categoria';


@Component({
  selector: 'app-concorso-list',
  templateUrl: './concorso-list.component.html',
  styleUrls: ['./concorso-list.component.css']
})
export class ConcorsoListComponent extends PagedFilteredTableComponent<Concorso, ConcorsoService> implements OnInit {
  displayedColumns = ['id', 'guAnno', 'guNumero', 'ente.descrizione', 'categoria.descrizione', 'actions'];
  categoriaList: Categoria[] = [];
  selectedConcorsoId: number;

  constructor(private concorsoService: ConcorsoService, private categoriaService: CategoriaService) {
    super();
  }

  ngOnInit(): void {
    this.categoriaService.getAllModel().subscribe(
      value => this.categoriaList = value
    );

    this.dataSource = new PagedDataSource<Concorso, ConcorsoService>(this.concorsoService);
    this.dataSource.loadModelList();
  }

  selectConcorso(concorsoId: number) {
    this.selectedConcorsoId = concorsoId;
  }
}
