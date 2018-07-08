import { Component, OnInit, Input, Output } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { EventEmitter } from 'events';
import { HeaderComponent } from "../../../header/header.component";

@Component({
  providers:[HeaderComponent ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tab: string;
  cliente: Object = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private headerComponent: HeaderComponent,
    private us: UtilsService
  ) {}

  login(){
    this.authService.loginCliente(this.cliente)
      .subscribe(data => {
        if(data.token) {
          console.log(this.authService.getDatosCliente());
          //this.headerComponent.loginHeader();
          this.us.messageHeader.next('login');
          this.router.navigate(['']);
        }
        else {
          this.authService.loginPersonal(this.cliente)
            .subscribe(d => {
              if(d.token) {
                console.log(this.authService.getDatosCliente());
                //this.headerComponent.loginHeader();
                this.us.messageHeader.next('login');
                this.router.navigate(['']);
              } else {
                this.snackBar.open('Usuario y/o clave erronea','OK');
              }
            }, err => {
              console.log(err.message);
            });
        }
      }, err => {
        console.log(err.message);
      });
  }

  ngOnInit() {
  }

}
