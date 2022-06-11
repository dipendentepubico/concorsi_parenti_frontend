import {Role} from './role';

export class LoginResponse {

  accessToken: string;
  type: string;
  Long: number;
  username: string;
  email: string;
  roles: Role[];

}
