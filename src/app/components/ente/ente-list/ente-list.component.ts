import {Component, OnInit} from '@angular/core';
import {Ente} from 'src/app/api/models/ente';
import {EnteService} from 'src/app/api/services/ente.service';
import {Router} from '@angular/router';

import {PagedDataSource} from '../../../api/paged-data-source';
import {PagedFilteredTableComponent} from '../../paged-filtered-table/paged-filtered-table.component';
import {ExportType, TableExporter} from '../../../api/table-exporter';
import {PagedSortedSearchRequest} from '../../../api/models/pagination/paged-sorted-search-request';


@Component({
  selector: 'app-ente-list',
  templateUrl: './ente-list.component.html',
  styleUrls: ['./ente-list.component.css']
})
export class EnteListComponent extends PagedFilteredTableComponent<Ente, EnteService> implements OnInit {
  displayedColumns = ['id', 'codiceIPA', 'descrizione', 'codiceFiscale', 'actions'];

  constructor(private router: Router, public enteService: EnteService) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new PagedDataSource<Ente, EnteService>(this.enteService);
    this.dataSource.loadModelList();
  }

  editEnte(indx: number) {
    this.router.navigate(['/ente/ente-edit', indx ]);
  }

  dipConParenti(id: number) {
    this.router.navigate(['/ente/ente-parenti', id ]);
  }

  exportTable(expType: string, filename?: string) {
    const exporter: TableExporter<Ente, EnteService> = new TableExporter(this.enteService);
    // prendo il nome file ritornato da backend
    exporter.export( ExportType[expType.toUpperCase()],  this.sort.active,
      PagedSortedSearchRequest.SortDirection[this.sort.direction.toUpperCase()], Array.from(this.filterMap.values()));

  }

}
