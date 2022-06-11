import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../api/services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {AlignService} from '../../../websocket/services/align.service';
import {Role} from '../../api/models/role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: 'admin',
    password: 'admin2admin'
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: Role[] = [];



  constructor(private authService: AuthService, private alignService: AlignService) { }

  ngOnInit(): void {
    if (this.authService.isAuthorized()) {
      this.isLoggedIn = true;
      this.roles = this.authService.roles();
      this.alignService.subscribeStomp();
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.authService.roles();
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
