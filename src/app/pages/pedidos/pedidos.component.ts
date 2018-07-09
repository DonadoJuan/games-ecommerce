import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
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
  esCliente: boolean;
  hayPedidos: boolean;
  
  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.hayPedidos = false;
    this.clientes = [];
    let sesionCliente = this.authService.getDatosCliente().payload;

    this.clienteService.getClientes$()
    .subscribe((data)=>{

      if(!sesionCliente.perfil){
        this.esCliente = true;
        this.clientes.push(data.find(c=> c._id == sesionCliente._id));
      }else{
        this.clientes = data;
        this.esCliente = false;
      }

      this.clientes.forEach(cl => {
        if(cl.pedidos.length > 0)
          this.hayPedidos = true;
      });

    });
    
  }

  actualizarEstado(cliente){
    this.clienteService.putCliente$(cliente._id,cliente)
    .subscribe(res=>{
      this.snackBar.open("Estado actualizado!",'',{duration: 2500});
    })
  }

}
