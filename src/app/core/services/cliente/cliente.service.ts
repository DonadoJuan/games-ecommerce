import { Injectable } from '@angular/core';
import { Cliente } from "../../../domain/cliente";
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base/base.service';
import { Baneo } from "../../../domain/baneo";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable()
export class ClienteService {

  token: string = null;
  public isLoggedIn = new Subject<boolean>();

  constructor(private baseService: BaseService, private router: Router) { }

  public login(cliente) : Observable<any>{

    return this.baseService.post('clientes/login', cliente)
            .do(data => {
              if(data.token){
                this.saveToken(data.token);
                this.isLoggedIn.next(true);
              }
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
    this.router.navigate(['wrapper-login']);
  }

  public registrarCliente(cliente: Cliente): Observable<any> {
    return this.baseService.post('clientes/registrar', cliente);
  }

  public getClientes$(): Observable<Cliente[]> {
    return this.baseService.get('clientes');
  }

  public putBaneoCliente$(id: string, baneos: Baneo[]): Observable<Cliente> {
    return this.baseService.put(`clientes/baneo/${id}`, baneos);
  }

}
