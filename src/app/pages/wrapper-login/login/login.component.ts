import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { EventEmitter } from 'events';
import { HeaderComponent } from "../../../header/header.component";
import { Subscription } from 'rxjs/Subscription';

@Component({
  providers:[HeaderComponent ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  tab: string;
  cliente: Object = {};
  fechaDelDia: Date;
  quitBaneoClienteSub: Subscription;
  ejecutoTodo: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private headerComponent: HeaderComponent,
    private us: UtilsService,
    private clienteService: ClienteService
  ) {}

  login(){
    this.authService.loginCliente(this.cliente)
      .subscribe(data => {
        if(data.token) {
          this.ejecutoTodo = true;
          console.log(this.authService.getDatosCliente());
          //this.headerComponent.loginHeader();
          let user = this.authService.getDatosCliente().payload;
          if(user.baneos != null && user.baneos.length > 0) {
            user.baneos.forEach(b => {
              if(b.vigente) {
                if(b.fecha_hasta === null || new Date(b.fecha_hasta) > this.fechaDelDia) {
                  this.snackBar.open('Su usuario ha sido baneado','OK');
                  this.authService.logout();
                  this.ejecutoTodo = false;
                  //return;
                } else {
                  this.ejecutoTodo = false;
                  b.vigente = false;
                  this.quitBaneoClienteSub = this.clienteService.putBaneoCliente$(user._id, user.baneos)
                    .subscribe(data => {
                      console.log("data baneo: ", data);
                      this.us.messageHeader.next('login');
                      this.router.navigate(['']);
                    }, err => {
                      console.error(err);
                    });
                }
              }
            });
          }
          if(this.ejecutoTodo) {
            this.us.messageHeader.next('login');
            this.router.navigate(['']);
          }
          
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
    this.fechaDelDia = new Date();
  }

  ngOnDestroy() {
    if(this.quitBaneoClienteSub) {
      this.quitBaneoClienteSub.unsubscribe();
    }
  }

}
