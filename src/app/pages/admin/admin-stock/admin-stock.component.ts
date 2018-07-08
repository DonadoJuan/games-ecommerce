import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Sucursal } from '../../../domain/sucursal';
import { Videojuego } from "../../../domain/videojuego";
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from "../../../core/services/sucursal/sucursal.service";
import { UtilsService } from "../../../core/services/utils/utils.service";

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.scss']
})
export class AdminStockComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') miStepper: MatStepper;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  sucursalId: string;
  sucursal: Sucursal;
  sucursales: Sucursal[] = [];
  sucursalSub: Subscription;
  sucursalesSub: Subscription;
  updateSucursalSub: Subscription;
  error: boolean;
  loading: boolean;
  videojuego: Videojuego;
  errorMsg: string;
  videojuegosStock: any[] = [];
  invalido: boolean = false;
  selectedIndex: number = 0;

  constructor(private _formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private sucursalService: SucursalService, private us: UtilsService) { }

  ngOnInit() {
    this.loading = true;
    this.sucursalId = "5af78c88a4616c223463102a";
    let admin = true;
    if(admin) {
      this.sucursalesSub = this.sucursalService.getSucursales()
      .subscribe(
        data => {
          this.loading = false;
          this.sucursales = data;
          let indice = 0;
          if(this.us.indiceSucursal) {
            indice = this.us.indiceSucursal;
            this.us.indiceSucursal = null;
          }
          this.sucursal = this.sucursales[indice];
          this.selectedIndex = indice;
        }, err => this._handleSubmitError(err)
      );
    } else {
      this.sucursalSub = this.sucursalService.getSucursalById$(this.sucursalId)
        .subscribe(
          data => {
            console.log(data);
            this.loading = false;
            this.sucursales.push(data);
            this.sucursal = this.sucursales[0];
          },
          err => this._handleSubmitError(err)
        );
    }
    
    this.firstFormGroup = this._formBuilder.group({
      CodigoCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      StockCtrl: ['', Validators.required]
    });
  }

  actualizarDatos(event) {
    this.sucursal = this.sucursales[event.index];
    this.us.indiceSucursal = event.index;
    this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
    this.router.navigate(["admin-stock"]));
    //this.videojuegosStock = [];
    //console.log('miStepper: ', this.miStepper);
    //this.miStepper._steps.forEach(s => {s.editable = true}); 
    //this.miStepper.selectedIndex = 0;
    //this.miStepper.reset();
  }

  codeSubmit(stepper: MatStepper) {
    this.videojuego = null;  
    let codigo = this.firstFormGroup.get('CodigoCtrl').value;
    if(!Number.isInteger(codigo)) {
      this.error = true;
      this.errorMsg = "El codigo debe ser un valor numerico";
      return;
    }
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
      if(codigo == videojuego.codigo && videojuego.activo) {
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
    if(!Number.isInteger(cantidad) || cantidad < 1) {
      this.secondFormGroup.reset();
      stepper.previous();
      this.error = true;
      this.errorMsg = "Cantidad Ingresada invalida";
      return;
    }
    /*if((this.videojuego.stock + cantidad) <= this.videojuego.cantidadMaxima) {
      console.log('stock valido');
      //this.videojuego.stock += cantidad;
      this.videojuegosStock.push({titulo: this.videojuego.titulo, cantidad: cantidad, codigo: this.videojuego.codigo});
      stepper._steps.forEach(s => {s.editable = false}); 
    } else {
      this.secondFormGroup.reset();
      stepper.previous();
      this.error = true;
      this.errorMsg = "Cantidad Ingresada excede al maximo stock disponible";
    }*/
    this.videojuegosStock.push({titulo: this.videojuego.titulo, cantidad: cantidad, codigo: this.videojuego.codigo});
    stepper._steps.forEach(s => {s.editable = false}); 
  }

  onEnter(cantidad, vj, refreshSotck) {
    console.log(Number.isInteger(parseInt(cantidad)));
    //console.log(vj);
    this.error = false;
    this.errorMsg = "";
    if(!Number.isInteger(parseInt(cantidad))) {
      this.error = true;
      this.errorMsg = "La cantidad debe ser un valor numerico";
      cantidad = vj.cantidad;
      return;
    }
    if(cantidad < 0) {
      this.error = true;
      this.errorMsg = "No puede introducir una cantidad negativa";
      cantidad = vj.cantidad;
      return;
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
        if(!Number.isInteger(parseInt(v2.cantidad)) || parseInt(v2.cantidad) < 0) {
          this.error = true;
          this.errorMsg = "Existen datos invalidos en las cantidades a reponer";
          return;
        }
        if(v1.titulo == v2.titulo) {
          v1.stock = v1.stock + parseInt(v2.cantidad);
        }
      });
    });
    this.loading = true;
    this.updateSucursalSub = this.sucursalService.updateSucursalVideojuegos$(this.sucursal._id, this.sucursal.videojuegos)
      .subscribe(
        data => {
          this.loading = false;
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
    this.loading = false;
    this.errorMsg = "Ocurrio un error interno. Por favor, reintente."
  }

  ngOnDestroy() {
    if(this.sucursalSub) {
      this.sucursalSub.unsubscribe();
    }
    if(this.sucursalesSub) {
      this.sucursalesSub.unsubscribe();
    }
    if(this.updateSucursalSub) {
      this.updateSucursalSub.unsubscribe();
    }
  }

}
