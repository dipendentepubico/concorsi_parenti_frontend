import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '../../services/rx-stomp.service';
import {AlignService} from '../../services/align.service';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit, OnDestroy {
  receivedMessages: string[] = [];

  constructor(public alignService: AlignService, private rxStompService: RxStompService) { }

  ngOnInit() {
    // TODO sottoscrizione di test
    // this.topicSubscription = this.rxStompService
    //   .watch('/topic/messages')
    //   .subscribe((message: IMessage) => {
    //     const items: AlignOutMessage = JSON.parse(message.body);
    //     this.receivedMessages.push( items.message );
    //   });

    // this.alignService.subscribeStomp();
  }

  ngOnDestroy() {
    this.alignService.unSubscribeStomp();
  }

  // onSendMessage() {
  //   const message: AlignInMessage = new AlignInMessage();
  //   message.message = `Message generated at ${new Date()}`;
  //   message.code = 'TODO';
  //   const s = JSON.stringify(message);
  //   this.rxStompService.publish({ destination: '/app/chat', body: s });
  // }

}
