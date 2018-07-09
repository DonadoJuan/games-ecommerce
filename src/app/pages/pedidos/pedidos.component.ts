import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Pedido } from "../../domain/pedido";
import { AuthService } from '../../core/services/auth/auth.service';
import { ClienteService } from '../../core/services/cliente/cliente.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  clientes: any;
  
  constructor(
    private authService: AuthService,
    private clienteService: ClienteService) {
  }

  ngOnInit() {

    this.clientes = [];
    let sesionCliente = this.authService.getDatosCliente().payload;

    this.clienteService.getClientes$()
    .subscribe((data)=>{

      if(!sesionCliente.perfil){
        this.clientes.push(data.find(c=> c._id == sesionCliente._id));
      }else{
        this.clientes = data;
      }
    });
    
  }

}
