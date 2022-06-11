import { Component, OnInit } from '@angular/core';
import {Concorso} from '../../../api/models/concorso';
import {ActivatedRoute, Route} from '@angular/router';
import {ConcorsoService} from '../../../api/services/concorso.service';

@Component({
  selector: 'app-concorso-dettaglio',
  templateUrl: './concorso-dettaglio.component.html',
  styleUrls: ['./concorso-dettaglio.component.css']
})
export class ConcorsoDettaglioComponent implements OnInit {

  concorso: Concorso;

  constructor(private route: ActivatedRoute, private concorsoService: ConcorsoService) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params.id;
    this.concorsoService.getConcorsoById(id).subscribe(
      data => {
        this.concorso = data;
      }
    );
  }

}
