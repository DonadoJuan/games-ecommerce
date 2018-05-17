import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Sucursal } from '../../../domain/sucursal';
import { Videojuego } from "../../../domain/videojuego";
import { ApiService } from "../../../core/api.service";
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.scss']
})
export class AdminStockComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  sucursalId: string;
  sucursal: Sucursal;
  sucursalSub: Subscription;
  updateSucursalSub: Subscription;
  error: boolean;
  videojuego: Videojuego;
  errorMsg: string;
  videojuegosStock: any[] = [];

  constructor(private _formBuilder: FormBuilder, private api: ApiService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.sucursalId = "5af78c88a4616c223463102a";
    this.sucursalSub = this.api.getSucursalById$(this.sucursalId)
        .subscribe(
          data => {this.sucursal = data[0];},
          err => this._handleSubmitError(err)
        );
    this.firstFormGroup = this._formBuilder.group({
      CodigoCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      StockCtrl: ['', Validators.required]
    });
  }

  codeSubmit(stepper: MatStepper) {
    this.videojuego = null;  
    let codigo = this.firstFormGroup.get('CodigoCtrl').value;
    this.sucursal.videojuegos.forEach(videojuego => {
      this.videojuegosStock.forEach(v => {
        if(codigo == v.codigo) {
          this.firstFormGroup.reset();
          stepper.previous();
          this.error = true;
          this.errorMsg = "Ya ingreso stock de ese videojuego. Confirme este lote antes de ingresar mas stock de este videojuego.";
          return;
        }
      });
      if(codigo == videojuego.codigo) {
        console.log(videojuego);
        this.videojuego = videojuego;
        this.error = false;
        this.errorMsg = "";
      }
    });
    if(!!!this.videojuego) {
      console.log('no encontre videojuego');
      /*stepper.selectionChange.subscribe(selection => {
        console.log(selection.selectedStep);
        console.log(selection.previouslySelectedStep);
      });*/
      this.firstFormGroup.reset();
      stepper.previous();
      this.error = true;
      this.errorMsg = "No se encontro videojuego con el codigo ingresado."
      //stepper.selectedIndex = 0;
      //stepper._steps.forEach(s => {s.editable = false}); 
    }
  }

  stockSubmit(stepper: MatStepper) {
    this.error = false;
    this.errorMsg = "";
    let cantidad = this.secondFormGroup.get('StockCtrl').value;
    if(cantidad < 1) {
      this.secondFormGroup.reset();
      stepper.previous();
      this.error = true;
      this.errorMsg = "Cantidad Ingresada invalida";
      return;
    }
    if((this.videojuego.stock + cantidad) <= this.videojuego.cantidadMaxima) {
      console.log('stock valido');
      //this.videojuego.stock += cantidad;
      this.videojuegosStock.push({titulo: this.videojuego.titulo, cantidad: cantidad, codigo: this.videojuego.codigo});
      stepper._steps.forEach(s => {s.editable = false}); 
    } else {
      this.secondFormGroup.reset();
      stepper.previous();
      this.error = true;
      this.errorMsg = "Cantidad Ingresada excede al maximo stock disponible";
    }
  }

  onEnter(cantidad, vj, refreshSotck) {
    //console.log(cantidad);
    //console.log(vj);
    this.error = false;
    this.errorMsg = "";
    if(cantidad < 0) {
      this.error = true;
      this.errorMsg = "No puede introducir una cantidad negativa"
    }
    this.videojuegosStock.forEach(v => {
      if(v.titulo == vj.titulo) {
        v.cantidad = cantidad;
        this.modalService.open(refreshSotck).result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    });
  }

  confirmSubmit(stepper: MatStepper, success) {
    this.sucursal.videojuegos.forEach(v1 => {
      this.videojuegosStock.forEach(v2 => {
        if(v1.titulo == v2.titulo) {
          v1.stock = v1.stock + parseInt(v2.cantidad);
        }
      });
    });
    this.updateSucursalSub = this.api.updateSucursalStock$(this.sucursal._id, this.sucursal.videojuegos)
      .subscribe(
        data => {
          console.log(data);
          this.modalService.open(success).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
          this.router.navigate(['']);
        },
        err => this._handleSubmitError(err)
      );
  }

  nuevo(stepper: MatStepper) {
    stepper._steps.forEach(s => {s.editable = true}); 
    stepper.selectedIndex = 0;
    stepper.reset();
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.error = true;
    this.errorMsg = "Ocurrio un error interno. Por favor, reintente."
  }

  ngOnDestroy() {
    this.sucursalSub.unsubscribe();
    if(this.updateSucursalSub) {
      this.updateSucursalSub.unsubscribe();
    }
  }

}
