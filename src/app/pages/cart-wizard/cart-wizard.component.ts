import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SucursalService } from '../../core/services/sucursal/sucursal.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { UtilsService } from '../../core/services/utils/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'confirm-purchase-dialog',
  templateUrl: 'confirm-purchase-dialog.html',
})
export class ConfirmPurchaseDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmPurchaseDialog>
  ) { 
      dialogRef.disableClose = true;
  }

  confirmMsg(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-cart-wizard',
  templateUrl: './cart-wizard.component.html',
  styleUrls: ['./cart-wizard.component.scss']
})
export class CartWizardComponent implements OnInit {

  formDomicilio: FormGroup;
  cliente: object;
  barrios: object[];
  formaEntrega: String;
  tarjetas: any;
  sucursales: any;
  pedido: any;

  confirmPurchase(): void {
    let dialogRef = this.dialog.open(ConfirmPurchaseDialog, {
      width: '300px'
    });

    dialogRef.beforeClose().subscribe(result => {
      this.router.navigate(['pedidos']);
    });
  }
  removeItem(i: number){
    let vglist = this.pedido.videojuegos;
    let total = 0; 
    vglist.splice(i,1);
    vglist.forEach(item => {
      total += item.subtotal;
    });
    this.pedido.total = total;

  }

  updateTotal(i: number){
    let total = 0;
    let vglist = this.pedido.videojuegos; 
    vglist[i].subtotal =  vglist[i].cantidad * vglist[i].videojuego.precio;
    vglist.forEach(item => {
      total += item.subtotal;
    });
    this.pedido.total = total;
  }

  updateDeliveryOption(){
    if(this.formaEntrega == '1' && this.pedido.sucursal_entrega != undefined){
      this.pedido.domicilio_entrega = undefined; 
      return true;
    }
    if(this.formaEntrega == '2' && this.pedido.domicilio_entrega != undefined){
      this.pedido.sucursal_entrega = undefined; 
      return true;
    }
    return false;
  }

  _buildForm(){

      this.formDomicilio = this.fb.group({
        barrio: ['', [Validators.required]],
        calle: ['', [Validators.required]],
        altura: ['', [Validators.required]],
        codigo_postal: ['', [Validators.required]]
      });
  }

  _getServiceData(){
    this.sucursalService.getSucursalesUbicacion$()
      .subscribe(data => this.sucursales = data);
    this.utilService.getBarrios$()
      .subscribe(data => this.barrios = data);
    this.cliente = this.authService.getDatosCliente().payload;
  }
  
  constructor (
    private dialog: MatDialog, 
    private router: Router,
    private sucursalService: SucursalService,
    private authService: AuthService,
    private utilService: UtilsService,
    private fb: FormBuilder) {}

  
  ngOnInit() {
    this._buildForm();
    this._getServiceData();

    this.pedido = {
      total: 200,
      totalEnvio: 0,
      cupon:{
        codigo:23123,
        descuento: 20
      },
      videojuegos:[
        {
          videojuego:{
            titulo: 'SOUL CALIBUR VI',
            imagen: '../../../../assets/slider/gd-calibur.jpg',
            precio: 100
          },
          cantidad: 1,
          subtotal: 100
        },
        {
          videojuego:{
            titulo: 'SOUL CALIBUR VI',
            imagen: '../../../../assets/slider/gd-calibur.jpg',
            precio: 100
          },
          cantidad: 1,
          subtotal: 100
        }
      ]
    };   

    this.tarjetas = [
      {
        id: "234562",
        marca: "Mastercard",
        num:"..5314"
      },
      {
        id: "634521",
        marca: "Visa",
        num:"..7492"
      }
    ]
  }

}
