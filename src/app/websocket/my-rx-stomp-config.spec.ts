import { MyRxStompConfig } from './my-rx-stomp-config';
import {TokenStorageService} from '../auth/services/token-storage.service';

describe('MyRxStompConfig', () => {
  it('should create an instance', () => {
    expect(new MyRxStompConfig(new TokenStorageService())).toBeTruthy();
  });
});
