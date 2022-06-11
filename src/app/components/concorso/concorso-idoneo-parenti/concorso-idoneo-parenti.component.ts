import {Component, Input, OnInit} from '@angular/core';
import {Parente} from '../../../api/models/parente';

@Component({
  selector: 'app-concorso-idoneo-parenti',
  templateUrl: './concorso-idoneo-parenti.component.html',
  styleUrls: ['./concorso-idoneo-parenti.component.css']
})
export class ConcorsoIdoneoParentiComponent implements OnInit {

  @Input('parenti')
  parenti: Parente[];

  constructor() { }

  ngOnInit(): void {
  }

}
