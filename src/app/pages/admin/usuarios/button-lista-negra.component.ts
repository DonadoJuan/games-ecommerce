import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from "../../../core/services/utils/utils.service";
import { Cliente } from "../../../domain/cliente";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-button-lista-negra',
  template: `
  <button (click)="goToListaNegra()" class="btn btn-sm btn-danger" [disabled]="inhabilitado">Banear</button>
  `,
  styles: []
})
export class ButtonListaNegraComponent implements OnInit {

  @Input() value;

  cliente: Cliente;
  inhabilitado: Boolean;

  constructor(private us: UtilsService, private router: Router) { }

  ngOnInit() {
    this.cliente = this.value;
    if(this.cliente.baneos) {
      this.cliente.baneos.forEach(b => {
        if(b.vigente)
          this.inhabilitado = true;
      });
    }
  }

  goToListaNegra() {
    //console.log(this.cliente);
    this.us.cliente = this.cliente;
    this.router.navigate(['lista-negra']);
  }

}
