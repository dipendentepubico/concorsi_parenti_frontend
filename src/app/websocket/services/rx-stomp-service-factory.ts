import {RxStompService} from './rx-stomp.service';
import {MyRxStompConfig} from '../my-rx-stomp-config';
import {TokenStorageService} from '../../auth/services/token-storage.service';

export function rxStompServiceFactory(tokenStorage: TokenStorageService) {
  const rxStomp = new RxStompService();
  rxStomp.configure(new MyRxStompConfig(tokenStorage));
  rxStomp.activate();
  return rxStomp;
}
