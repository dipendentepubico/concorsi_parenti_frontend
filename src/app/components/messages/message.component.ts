import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../api/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {




  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }



}
