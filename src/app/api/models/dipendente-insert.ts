import {AbstractApiModel} from './abstract-api-model';

export class DipendenteInsert extends AbstractApiModel{
  dataInizio: Date = undefined;
  dataFine: Date = undefined;
  idCategoria: number = undefined;
  idAnagrafica: number = undefined;
  link = undefined;
}
