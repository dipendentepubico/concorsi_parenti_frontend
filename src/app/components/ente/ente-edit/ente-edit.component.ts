import { Component, OnInit } from '@angular/core';
import {EnteService} from '../../../api/services/ente.service';
import {ActivatedRoute} from '@angular/router';
import {Ente} from '../../../api/models/ente';
import {MessageService} from '../../../api/services/message.service';
import {Role} from '../../../auth/api/models/role';

@Component({
  selector: 'app-ente-edit',
  templateUrl: './ente-edit.component.html',
  styleUrls: ['./ente-edit.component.css']
})
export class EnteEditComponent implements OnInit {
  enteId: number;
  ente: Ente = new Ente();
  role = Role;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private enteService: EnteService) { }

  ngOnInit(): void {
    this.enteId = this.route.snapshot.params.id;
    if (this.enteId){
      this.enteService.getEnteById(this.enteId).subscribe(
          value => { this.ente = value; }
      );
    }
  }

  onSubmit() {
    if (this.enteId) {
      this.enteService.updateEnte(this.ente);
    }else {
      this.enteService.addEnte(this.ente).subscribe(
        value => this.ente = value
      );
    }
  }


  receiveUserCaptcha($event: string) {
    this.ente.userEnteredCaptchaCode = $event;
  }


}
