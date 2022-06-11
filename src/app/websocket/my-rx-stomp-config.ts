import {RxStompConfig} from '@stomp/rx-stomp';
import {RxStomp} from '@stomp/rx-stomp/esm6/rx-stomp';
import {TokenStorageService} from '../auth/services/token-storage.service';

export class MyRxStompConfig extends RxStompConfig {
  constructor(private tokenStorage: TokenStorageService) {
    super();

    this.brokerURL = 'ws://127.0.0.1:8083/websocket';

    this.heartbeatIncoming = 0;
    this.heartbeatOutgoing = 20000;

    this.reconnectDelay = 200;

    this.debug = (msg: string): void => {
      console.log(new Date(), 'rx-stomp diagnostic: ' + msg);
    };

    this.beforeConnect = (client: RxStomp): Promise<void> => {
      return new Promise<void>(resolve => {
        if (this.tokenStorage.getToken()) {
          client.stompClient.connectHeaders = {
            Authorization: 'Bearer ' + this.tokenStorage.getToken()
          };
        }
        resolve();
      });
    };


  }
}
