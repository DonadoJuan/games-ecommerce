import { Injectable } from '@angular/core';
import { Cliente } from "../../../domain/cliente";
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base/base.service';
import { Baneo } from "../../../domain/baneo";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CarritoService } from '../carrito/carrito.service';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

  token: string = null;
  public isLoggedIn = new Subject<boolean>();

  constructor(
    private baseService: BaseService, 
    private carritoService: CarritoService, 
    private router: Router){ 
    if(this.getToken()){
      this.isLoggedIn.next(true);
    }
  }

  public loginCliente(cliente) : Observable<any>{

    return this.baseService.post('clientes/login', cliente)
            .do(data => {
              if(data.token){
                this.saveToken(data.token);
                this.isLoggedIn.next(true);
              }
            }).catch(e => {
              return Observable.throw('Unauthorized');
            });
  }

  public loginPersonal(personal) : Observable<any>{

    return this.baseService.post('personal/login', personal)
            .do(data => {
              if(data.token){
                this.saveToken(data.token);
                this.isLoggedIn.next(true);
              }
            }).catch(e => {
              return Observable.throw('Unauthorized');
            });
  }

  public getDatosCliente() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout(): void {
    this.isLoggedIn.next(false);
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('carrito');
    this.router.navigate(['wrapper-login']);
  }

}
