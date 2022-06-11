import {CaptchaForm} from './captcha-form';

export class Ente extends CaptchaForm{
  id: number;
  descrizione: string;
  codiceFiscale: string;
  codiceIPA: string;
  allineato: boolean;
}
