import {Concorso} from './concorso';
import {GraduatoriaAnagrafica} from './graduatoria-anagrafica';

export class GraduatoriaFinale {

  id: number;
  concorso: Concorso;
  data: Date;
  link: string;
  graduatoriaAnagraficaEntityList: Array<GraduatoriaAnagrafica>;

}
