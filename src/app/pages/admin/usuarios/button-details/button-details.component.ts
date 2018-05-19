import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from "../../../../domain/cliente";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-button-details',
  templateUrl: './button-details.component.html',
  styles: []
})
export class ButtonDetailsComponent implements OnInit {

  @Input() value;
  cliente: Cliente;
  faltas: boolean;
  baneos: boolean;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.cliente = this.value;
    this.faltas = !!this.cliente.faltas;
    this.baneos = !!this.cliente.baneos;
  }

  verDetalle(modalDetalle) {
    this.modalService.open(modalDetalle).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
