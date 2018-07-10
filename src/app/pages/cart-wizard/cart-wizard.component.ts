import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SucursalService } from '../../core/services/sucursal/sucursal.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { UtilsService } from '../../core/services/utils/utils.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CarritoService } from '../../core/services/carrito/carrito.service';
import { Sucursal } from '../../domain/sucursal';
import { SubmittingComponent } from '../../core/submitting.component';
import { LoadingComponent } from '../../core/loading.component';
import { CuponService } from '../../core/services/cupon/cupon.service';
import { ClienteService } from '../../core/services/cliente/cliente.service';
import { FormDomicilioModel } from '../../core/models/form-domicilio.model';
import { Domicilio } from '../../domain/domicilio';
import { FormCartWizardService } from './form-cart-wizard.service';
import { Subscription } from 'rxjs';
import { FormTarjetaModel } from '../../core/models/form-tarjeta.model';

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

  codigoCupon: any;
  tipoPagoCompletado: boolean;
  formaDePago: any;
  esVisibleFormTarjeta: boolean;
  esVisibleFormDomicilio: boolean;
  costoEnvioCalculado: boolean;
  tipoEntregaValida: boolean;
  ofertaSucursalInvalida: boolean;
  formDomicilio: FormGroup;
  formTarjeta: FormGroup;
  cliente: any;
  barrios: object[];
  formaEntrega: String;
  tarjetas: any;
  sucursales: any;
  pedido: any;
  formDomicilioModel: FormDomicilioModel;
  formTarjetaModel : FormTarjetaModel;
  formErrors: any;
  formErrorsTarjeta: any;
  formChangeSub: Subscription;
  formChangeSubTarjeta: Subscription;

  minDate = new Date(Date.now());  


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private sucursalService: SucursalService,
    private authService: AuthService,
    private utilService: UtilsService,
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cuponService: CuponService,
    private clienteService: ClienteService,
    private fcws: FormCartWizardService) { }


  ngOnInit() {
    this.esVisibleFormDomicilio = false;
    this.tipoEntregaValida = false;
    this.costoEnvioCalculado = false;
    this.ofertaSucursalInvalida = false;
    this.formErrors = this.fcws.formErrors;
    this.formErrorsTarjeta = this.fcws.formErrorsTarjeta;

    this.formDomicilioModel = new FormDomicilioModel(new Domicilio(null,null,null,null),null);
    this.formTarjetaModel = new FormTarjetaModel(null,null,null,null,null,new Domicilio(null,null,null,null),null)
    this._buildForms();
    this._buildFormsTarjeta();
    this._getServiceData();
    this.updateTotal();

    this.formDomicilio.valueChanges.subscribe(val => {
      this.actualizarTipoEntrega('otro');
    });
    this.formTarjeta.valueChanges.subscribe(val => {
      this.actualizarTipoPago('otro');
    });
  }

  private _buildForms() {
    this.formDomicilio = this.fb.group({
      barrio: [this.formDomicilioModel.domicilio_entrega.barrio, 
        Validators.required
      ],
      calle: [this.formDomicilioModel.domicilio_entrega.calle, [
        Validators.required,
        Validators.minLength(this.fcws.strMin),
        Validators.maxLength(this.fcws.strMax),
        Validators.pattern(this.fcws.regCalle)

      ]],
      altura: [this.formDomicilioModel.domicilio_entrega.altura, [
        Validators.required,
        Validators.min(this.fcws.intMin),
        Validators.max(this.fcws.intMax),
        Validators.pattern(this.fcws.reg)
      ]],
      codigo_postal: [this.formDomicilioModel.domicilio_entrega.codigo_postal, [
        Validators.required,
        Validators.min(this.fcws.intMin),
        Validators.max(this.fcws.intMax),
        Validators.pattern(this.fcws.reg)
      ]]
    });

    
    this.formChangeSub = this.formDomicilio
      .valueChanges
      .subscribe(data => this._onValueChanged());
  }

  private _onValueChanged() {

    if(!this.formDomicilio) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.fcws.mensajesValidacion[field];
        for (const key in control.errors) {
          if(control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        _setErrMsgs(this.formDomicilio.get(field), this.formErrors, field);
      }
    }
  
  }
  private _buildFormsTarjeta() {

    this.formTarjeta = this.fb.group({
      tipoTarjeta: [this.formTarjetaModel.tipoTarjeta, 
        Validators.required
      ],
      nombre: [this.formTarjetaModel.nombre, [
        Validators.required,
        Validators.minLength(this.fcws.strMin),
        Validators.maxLength(this.fcws.strMax),
        Validators.pattern(this.fcws.regNombre)
      ]],
      numero: [this.formTarjetaModel.numero, [
        Validators.required,
        //Validators.min(this.fcws.intNumeroMin),
        //Validators.max(this.fcws.intNumeroMax),
        Validators.pattern(this.fcws.regCreditCard)
      ]],
      vencimiento: [this.formTarjetaModel.vencimiento, [
        Validators.required
      ]],
      codigo: [this.formTarjetaModel.codigo, [
        Validators.required,
        Validators.min(this.fcws.codMin),
        Validators.max(this.fcws.codMax),
        Validators.pattern(this.fcws.reg)

      ]],
      barrio: [this.formTarjetaModel.domicilio_entrega.barrio, 
        Validators.required
      ],
      calle: [this.formTarjetaModel.domicilio_entrega.calle, [
        Validators.required,
        Validators.minLength(this.fcws.strMin),
        Validators.maxLength(this.fcws.strMax),
        Validators.pattern(this.fcws.regCalle)

      ]],
      altura: [this.formTarjetaModel.domicilio_entrega.altura, [
        Validators.required,
        Validators.min(this.fcws.intMin),
        Validators.max(this.fcws.intMax),
        Validators.pattern(this.fcws.reg)
      ]]
    });

    
    this.formChangeSubTarjeta = this.formTarjeta
      .valueChanges
      .subscribe(data => this._onValueChangedTarjeta());
  }

  private _onValueChangedTarjeta() {

    if(!this.formTarjeta) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.fcws.mensajesValidacionTarjeta[field];
        for (const key in control.errors) {
          if(control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    for(const field in this.formErrorsTarjeta) {
      if(this.formErrorsTarjeta.hasOwnProperty(field)) {
        this.formErrorsTarjeta[field] = '';
        _setErrMsgs(this.formTarjeta.get(field), this.formErrorsTarjeta, field);
      }
    }
  
  }
  private _getServiceData() {
    this.pedido = {};
    this.pedido.videojuegos = this.carritoService.getVideojuegosCarrito();
    this.sucursalService.getSucursalesUbicacion$()
      .subscribe(data => this.sucursales = data);
    this.utilService.getBarrios$()
      .subscribe(data => this.barrios = data);
    this.cliente = this.authService.getDatosCliente().payload;
  }

  private updateTotal() {
    let subtotal = 0;
    this.pedido.total = 0;  

    if(!this.pedido.costoEnvio)
      this.pedido.costoEnvio = 0;
    
    this.pedido.videojuegos.forEach(item => {
      if (item.cantidad < 1 || item.cantidad > 100) {
        item.cantidad = 1;
      }
      item.subtotal = item.cantidad * item.videojuego.precio;
      subtotal += item.subtotal;
    });
    this.pedido.subtotal = subtotal;
    this.pedido.total += this.pedido.subtotal;
    this.pedido.total += this.pedido.costoEnvio;

    if(this.pedido.cupon && this.pedido.cupon.descuento){
      this.pedido.total -= this.pedido.total * (this.pedido.cupon.descuento/100);
    }
  }

  removeItem(i: number) {
    let vglist = this.pedido.videojuegos;
    let total = 0;
    vglist.splice(i, 1);
    vglist.forEach(item => {
      total += item.subtotal;
    });
    this.pedido.subtotal = total;
  }

  actualizarTipoEntrega(tipoEntrega) {
    
    this.tipoEntregaValida = false;
    this.costoEnvioCalculado = false;
    this.esVisibleFormDomicilio = false;
    
    if(tipoEntrega == undefined){
      return;
    }

    if (this.formaEntrega == '1') {
      this.pedido.domicilio_entrega = undefined;
      this.pedido.sucursal_entrega = tipoEntrega;
      this.validarOfertas(tipoEntrega);
      this.pedido.costoEnvio = 0;
    }

    if (this.formaEntrega == '2') {

      if (tipoEntrega != 'otro') {
        this.pedido.domicilio_entrega = tipoEntrega;
        this.tipoEntregaValida = true;
      
      }else{
        this.esVisibleFormDomicilio = true;
        if (tipoEntrega == 'otro' && this.formDomicilio.valid) {
          this.pedido.domicilio_entrega = this.formDomicilio.value;
          this.tipoEntregaValida = true;
        }
      }
    }
  }

  private validarOfertas(sucursalEntrega) {
    this.ofertaSucursalInvalida = false;
    this.tipoEntregaValida = true;

    this.pedido.videojuegos.forEach(itemCarrito => {
      let sucursalOfertaId = itemCarrito.videojuego.sucursalId;
      if (sucursalOfertaId != undefined && sucursalOfertaId != sucursalEntrega._id) {
        this.ofertaSucursalInvalida = true;
        this.tipoEntregaValida = false;
      }
    });
  }

  private obtenerSucursalDeOferta(){
    let sucursalOfertaId = "";
    for (const item of this.pedido.videojuegos) {
      if(item.videojuego.sucursalId != undefined){
        sucursalOfertaId = item.videojuego.sucursalId;
        break;
      }
    }
    for (const s of this.sucursales) {
      if(s._id == sucursalOfertaId){
        return s;
      }      
    }
  }

  calcularCostoEnvio() {
    let dr = this.dialog.open(LoadingComponent,{disableClose: true});
    let origen = this.obtenerSucursalDeOferta();
    let destino = this.pedido.domicilio_entrega;

    if(!origen)
      origen = this.sucursales;

    this.utilService.calcularCostoEnvio(origen, destino)
    .subscribe(res =>{
      dr.close();
      if(res.status == 'OK'){
        this.pedido.costoEnvio = res.precio;
        this.pedido.sucursal_entrega = res.sucursal_entrega;
        this.costoEnvioCalculado = true;
        this.updateTotal();                        
      }else{
        this.pedido.costoEnvio = 0;
        this.costoEnvioCalculado = false;
        this.snackBar.open('Domicilio invalido','',{duration: 2500});
      }
    });
  }

  tipoDeEntregaCompletado(){

    if(!this.tipoEntregaValida)
      return false;
    else if(this.formaEntrega == "2" && !this.costoEnvioCalculado)
      return false;
    else
      return true;
    
  }

  actualizarTipoPago(tipoTarjeta){
    
    this.esVisibleFormTarjeta = false;
    this.tipoPagoCompletado = false;

    if(this.formaDePago == '1' && this.formaEntrega != '2'){
      this.pedido.medio_pago = { medio: "efectivo"};
      this.tipoPagoCompletado = true;

    }else if(this.formaDePago == '2'){

      if(tipoTarjeta == 'otro'){

        this.esVisibleFormTarjeta = true;
        if(this.formTarjeta.valid){
          let otraTarjeta = this.formTarjeta.value;
        this.pedido.medio_pago = {medio: "tarjeta", tarjeta: otraTarjeta};
        this.tipoPagoCompletado = true;
        }

      }else if(tipoTarjeta != undefined){
        this.pedido.medio_pago = {medio: "tarjeta", tarjeta: tipoTarjeta};
        this.tipoPagoCompletado = true;
        this.formTarjeta.markAsPristine();
        this.formTarjeta.markAsUntouched();
      }
    }

  }

  validarCupon(codigo){
    this.cuponService.validarCupon(this.cliente._id, codigo.trim())
    .subscribe(res =>{

      let msg = '';

      if(res.code == '00'){
        this.pedido.cupon = res.cupon;
        this.updateTotal();
        this.snackBar.open('Descuento aplicado!','',{duration: 2500});
      }else{
        this.snackBar.open(res.message,'',{duration: 2500, panelClass:['sb-error']});
      }
    });
  }

  confirmPurchase(): void {
    this.clienteService.registrarPedido(this.cliente._id, this.pedido)
    .subscribe(res=>{

      if(res.code == '00'){

        this.authService.saveToken(res.token);
        this.carritoService.limpiarVideoJuegosCarrito();
        let dialogRef = this.dialog.open(ConfirmPurchaseDialog, {
          width: '300px'
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['pedidos']);
        })

      }else{
        this.snackBar.open(res.message,'',{duration: 2500, panelClass:['sb-error']});
      }

    })
  }


}
