import { Component, OnInit, ViewChild, pipeDef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Pedido } from "../../domain/pedido";
import { AuthService } from '../../core/services/auth/auth.service';
import { ClienteService } from '../../core/services/cliente/cliente.service';
import  * as _ from "lodash";
import { CuponService } from '../../core/services/cupon/cupon.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  clientesFiltrados: any;
  clientes: any;
  esCliente: boolean;
  hayPedidos: boolean;
  tipoFiltro: any;
  cupones: any;
  
  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private cuponService: CuponService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.hayPedidos = false;
    this.clientes = [];
    this.tipoFiltro = '';
    this.getClientesData();
    
  }

  private getClientesData(){
    let sesionCliente = this.authService.getDatosCliente().payload;

    this.cuponService.getCupones$()
    .subscribe(data=>{
      this.cupones = data;
    });

    this.clienteService.getClientes$()
    .subscribe(data=>{

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

      this.clientesFiltrados = _.cloneDeep(this.clientes);
      this.tipoFiltro = 'Ninguno';
      this.validarNinguno();

    });
  }

  validarNinguno(){
    if(this.tipoFiltro == 'Ninguno')
      this.aplicarFiltro('');
  }

  aplicarFiltro(input){

    let formatInput;

    if(typeof input == 'string'){
      if(!input || input.trim() == ""){
        this.clientesFiltrados = _.cloneDeep(this.clientes);
        return;
      }else{
        formatInput = input.trim().toLowerCase();
      } 
    }

    if(this.tipoFiltro == 'Cliente'){

      this.clientesFiltrados = _.cloneDeep(this.clientes);
      this.clientesFiltrados = this.clientesFiltrados.filter(cl => 
        (cl.nombre.toLowerCase().startsWith(formatInput) || 
        cl.email.toLowerCase().startsWith(formatInput)));

    }else if(this.tipoFiltro == 'Estado'){

      this.clientesFiltrados = _.cloneDeep(this.clientes);
      this.clientesFiltrados.forEach(cl => {
        cl.pedidos = cl.pedidos.filter(ped => ped.estado.toLowerCase().startsWith(formatInput));
      });

    }else if(this.tipoFiltro == 'Cupones'){

      this.clientesFiltrados = _.cloneDeep(this.clientes);
      this.clientesFiltrados.forEach(cl => {
        cl.pedidos = cl.pedidos.filter(ped => 
          (ped.cupon && ped.cupon.codigo.toLowerCase().startsWith(formatInput)));
      });
    }else if(this.tipoFiltro == 'Fecha'){

      this.clientesFiltrados = _.cloneDeep(this.clientes);
      this.clientesFiltrados.forEach(cl => {
        cl.pedidos = cl.pedidos.filter(ped => {
          let fechaPed = new Date(ped.fecha).setHours(0,0,0,0); 
          return fechaPed == input.setHours(0,0,0,0);
        });
      });

    }

  }

  actualizarEstado(idCliente, pedidoModificar){

    let cliente = this.clientes.find(cl => cl._id == idCliente);
    cliente.pedidos.forEach(ped => {
      if(ped._id == pedidoModificar._id){
        ped.estado = pedidoModificar.estado;
      }
    });

    this.clienteService.putCliente$(idCliente, cliente)
    .subscribe(res=>{
      this.getClientesData();
      this.snackBar.open("Estado actualizado!",'',{duration: 2500});
    })
  }

}
