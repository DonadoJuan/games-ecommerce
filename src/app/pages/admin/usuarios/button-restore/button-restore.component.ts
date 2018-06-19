import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Cliente } from "../../../../domain/cliente";
import { ClienteService } from "../../../../core/services/cliente/cliente.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-button-restore',
  templateUrl: './button-restore.component.html',
  styles: []
})
export class ButtonRestoreComponent implements OnInit, OnDestroy {

  @Input() value;
  cliente: Cliente;
  disabled: boolean = true;
  quitBaneoClienteSub: Subscription; 

  constructor(private modalService: NgbModal, private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.cliente = this.value;
    if(this.cliente.baneos) {
      this.cliente.baneos.forEach(b => {
        if(b.vigente)
          this.disabled = false;
      });
      //this.disabled = !this.disabled;
    } else {
      this.disabled = true;
    }
  }

  restaurar(modalRestaurar) {
    this.modalService.open(modalRestaurar).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      console.log('Acepte');
      this.cliente.baneos.forEach(b => {
        if(b.vigente)
          b.vigente = false;
      });
      this.quitBaneoClienteSub = this.clienteService.putBaneoCliente$(this.cliente._id, this.cliente.baneos)
        .subscribe(data => {
          this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
          this.router.navigate(["usuarios"]));
        }, err => {
          console.error(err);
        });
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('Rechace');
    });
  }

  ngOnDestroy() {
    if(this.quitBaneoClienteSub) {
      this.quitBaneoClienteSub.unsubscribe();
    }
  }

}
