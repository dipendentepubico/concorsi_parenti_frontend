import {Component, Input, OnInit} from '@angular/core';
import {Concorso} from '../../../api/models/concorso';
import {AnagraficaConDipendentiParenti} from '../../../api/models/anagrafica-con-dipendenti-parenti';
import {ConcorsoService} from '../../../api/services/concorso.service';

@Component({
  selector: 'app-concorso-parenti',
  templateUrl: './concorso-parenti.component.html',
  styleUrls: ['./concorso-parenti.component.css']
})
export class ConcorsoParentiComponent implements OnInit {

  @Input()
  concorsoIdonei: Concorso;

  public anagrafiche: AnagraficaConDipendentiParenti[];

  constructor(private concorsoService: ConcorsoService) { }

  ngOnInit(): void {
    this.concorsoService.getParentiDipendentiByConcorso(this.concorsoIdonei.id).subscribe(
     value => this.anagrafiche = value
    );
  }

}
