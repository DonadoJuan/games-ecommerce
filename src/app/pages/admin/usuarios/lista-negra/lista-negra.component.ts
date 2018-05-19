import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from "../../../../core/utils.service";
import { ApiService } from "../../../../core/api.service";
import { Cliente } from "../../../../domain/cliente";
import { Baneo } from "../../../../domain/baneo";
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-negra',
  templateUrl: './lista-negra.component.html',
  styleUrls: ['./lista-negra.component.scss']
})
export class ListaNegraComponent implements OnInit, OnDestroy {

  cliente: Cliente;
  opciones: any[] = [];
  frmLista = {
    tiempo: '',
    motivo: ''
  };
  hastaBaneo: Date;
  baneoClienteSub: Subscription;
  loading: boolean;
  submitting: boolean;
  error: boolean;
  errorMsg: string;

  constructor(private us: UtilsService, private router: Router, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true;
    this.submitting = false;
    this.error = false;
    this.errorMsg = '';
    this.hastaBaneo = new Date();
    if(this.us.cliente) {
      this.cliente = this.us.cliente;
      this.us.cliente = null;
    } else {
      this.cliente = new Cliente(null, null, null, null, null, null, null, null, null);
      this.loading = false;
      this.error = true;
      this.errorMsg = "Ocurrio un error al leer datos del cliente. Por favor, reintente";
    }

    this.opciones.push({value: '1', viewValue: 'Una Semana'});
    this.opciones.push({value: '2', viewValue: 'Un Mes'});
    this.opciones.push({value: '3', viewValue: 'Dos Meses'});
    this.opciones.push({value: '4', viewValue:'Tiempo Indefinido'});
    this.loading = false;
  }

  onSubmit(modalExito) {
    switch(this.frmLista.tiempo) {
      case '1':
        this.hastaBaneo.setDate(this.hastaBaneo.getDate() + 7);
        console.log(this.hastaBaneo);
        break;
      case '2':
        this.hastaBaneo.setDate(this.hastaBaneo.getDate() + 30);
        console.log(this.hastaBaneo);
        break;
      case '3':
        this.hastaBaneo.setDate(this.hastaBaneo.getDate() + 60);
        console.log(this.hastaBaneo);
        break;
      case '4':
        this.hastaBaneo = null; //Tiempo indefinido
        break;
    }

    let baneo = new Baneo(new Date(), this.frmLista.motivo, this.hastaBaneo, true);
    if(!this.cliente.baneos) {
      this.cliente.baneos = new Array<Baneo>();
    }
    this.cliente.baneos.push(baneo);
    //console.log(this.cliente);
    this.submitting = true;
    this.baneoClienteSub = this.api.putBaneoCliente$(this.cliente._id, this.cliente.baneos)
      .subscribe(data => {
        this.submitting = false;
        this.modalService.open(modalExito).result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
          this.router.navigate(['usuarios']);
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.router.navigate(['usuarios']);
        });
      }, err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this.errorMsg = "Ocurrio un error al actualizar datos del cliente";
      });
  }

  volver() {
    this.router.navigate(['usuarios']);
  }

  ngOnDestroy() {
    if(this.baneoClienteSub) {
      this.baneoClienteSub.unsubscribe();
    }
  }

}
