import {AbstractApiModel} from './abstract-api-model';

/**
 * Classe padre di ogni classe che mappa una form con captcha
 */
export abstract class CaptchaForm extends AbstractApiModel{
  userEnteredCaptchaCode: string;
}
