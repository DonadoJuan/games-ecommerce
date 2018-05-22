import { Injectable } from '@angular/core';
import { Cliente } from "../../../domain/cliente";
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base/base.service';
import { Baneo } from "../../../domain/baneo";


@Injectable()
export class ClienteService {

  constructor(public baseService: BaseService) { }

  registrarCliente(cliente: Cliente): Observable<any> {
    return this.baseService.post('clientes/registrar', cliente);
  }

  getClientes$(): Observable<Cliente[]> {
    return this.baseService.get('clientes');
  }

  putBaneoCliente$(id: string, baneos: Baneo[]): Observable<Cliente> {
    return this.baseService.put(`clientes/baneo/${id}`, baneos);
  }

}
