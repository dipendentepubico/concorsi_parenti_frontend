import {Anagrafica} from './anagrafica';
import {Categoria} from './categoria';
import {Ente} from './ente';
import {AbstractApiModel} from './abstract-api-model';

export class Dipendente extends AbstractApiModel{

  id: number;
  ente: Ente;
  anagrafica: Anagrafica;
  dataInizio: Date;
  dataFine: Date;
  link: string;
  categoria: Categoria;







}
