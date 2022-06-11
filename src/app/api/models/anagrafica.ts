import {AbstractApiModel} from './abstract-api-model';

export class Anagrafica extends AbstractApiModel{
  id: number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
}
