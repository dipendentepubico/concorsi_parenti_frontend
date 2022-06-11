import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {EnteService} from 'src/app/api/services/ente.service';
import {Anagrafica} from 'src/app/api/models/anagrafica';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Ente} from 'src/app/api/models/ente';
import {filter, map} from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-parente-list',
  templateUrl: './parente-list.component.html',
  styleUrls: ['./parente-list.component.css']
})
export class ParenteListComponent implements OnInit {
  ente: Ente;
  displayedColumns = ['id', 'codiceFiscale', 'cognome', 'nome'];
  dataSource: MatTableDataSource<Anagrafica>;

  dataCheck: Date = new Date(); // valore di default in caso di navigazione ma modificabile con calendar quando già in pagina

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute, private enteService: EnteService) {}

  ngOnInit(): void {
    const idEnte: number = this.route.snapshot.params.id;
    this.enteService.getEnteById(idEnte).subscribe(
      data => {
          this.ente = data;
        }
    );
    this.retrieveList(idEnte);
  }

  private retrieveList(idEnte: number) {
    this.enteService.findDipendentiParentiEnte(idEnte, this.dataCheck).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dataCheck = event.value;
    this.retrieveList(this.ente.id);
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
