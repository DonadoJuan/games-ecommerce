import { Injectable } from '@angular/core';
import { Cliente } from "../../../domain/cliente";
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base/base.service';
import { Baneo } from "../../../domain/baneo";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Pedido } from '../../../domain/pedido';


@Injectable()
export class ClienteService {

  constructor(private baseService: BaseService, private router: Router) { }

  registrarCliente(cliente: Cliente): Observable<any> {
    return this.baseService.post('clientes/registrar', cliente);
  }

  putCliente$(id: string, cliente: Cliente): Observable<Cliente> {
    return this.baseService.put(`clientes/${id}`, cliente)
  }

  getClientes$(): Observable<Cliente[]> {
    return this.baseService.get('clientes');
  }
  
  deleteCliente$(id: string): Observable<any> {
    return this.baseService.delete(`clientes/${id}`);
  }

  putBaneoCliente$(id: string, baneos: Baneo[]): Observable<Cliente> {
    return this.baseService.put(`clientes/baneo/${id}`, baneos);
  }

  registrarPedido(idCliente, nuevoPedido){
    let data = {
      id_cliente: idCliente,
      nuevoPedido: nuevoPedido
    }
    return this.baseService.post('clientes/pedido', data);
  }

}
