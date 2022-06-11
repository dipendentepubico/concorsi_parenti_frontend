import { Injectable } from '@angular/core';
import {RxStompService} from './rx-stomp.service';
import {Subscription} from 'rxjs';
import {IMessage} from '@stomp/stompjs';
import {AlignStatusMessage} from '../model/align-status-message';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlignService {
  private alignTopicSubscription: Subscription;
  private alignUserTopicSubscription: Subscription;
  isAlignRunning = false;

  constructor(private rxStompService: RxStompService) { }

  public subscribeStomp(){
    // ottengo info su allineamento già avviato prima della login
    this.alignUserTopicSubscription = this.rxStompService.watch('/user/topic/alignStatus')
      .pipe(first())
      .subscribe((message: IMessage) => {
        const m: AlignStatusMessage = JSON.parse(message.body);
        this.isAlignRunning = m.alignRunning;
      });

    // ottengo info su allineamento avviato dopo la login
    this.alignTopicSubscription = this.rxStompService.watch('/topic/alignStatus')
      .subscribe((message: IMessage) => {
        const m: AlignStatusMessage = JSON.parse(message.body);
        this.isAlignRunning = m.alignRunning;
      });
  }

  public unSubscribeStomp() {
    this.alignUserTopicSubscription.unsubscribe();
    this.alignTopicSubscription.unsubscribe();
  }

}
