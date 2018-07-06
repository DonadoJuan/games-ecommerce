import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from "../../../core/services/utils/utils.service";
import { Subscription } from 'rxjs/Subscription';
import { Videojuego } from '../../../domain/videojuego';
import { Sucursal } from '../../../domain/sucursal';
import { SucursalService } from "../../../core/services/sucursal/sucursal.service";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-descuentos',
  templateUrl: './admin-descuentos.component.html',
  styleUrls: ['./admin-descuentos.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AdminDescuentosComponent implements OnInit, OnDestroy {

  sucursalSub: Subscription;
  updateSucursal: Subscription;
  dropdownCargarList = [];
  selectedCargarItems = [];
  dropdownSettings = {};
  loading: boolean = false;
  error: boolean = false;
  sucursal: Sucursal;
  sucursalId = "5af78c88a4616c223463102a";
  sucursales: Sucursal[] = [];
  sucursalesSub: Subscription;
  videojuegos: Videojuego[] = [];
  dropdownQuitarList = [];
  selectedQuitarItems = [];
  frmDesc = {
    descuento: null,
    inicioDescuento: null,
    finDescuento: null
  }
  submitting: boolean;
  minDate = new Date(Date.now());  

  constructor(
    private us: UtilsService,
    private sucursalService: SucursalService,
    private adapter: DateAdapter<any>, 
    private modalService: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.traerDatosSucursal();    

    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Seleccionar categoria",
      selectAllText:'Seleccionar todo',
      unSelectAllText:'Deseleccionar todo',
      enableSearchFilter: true,
      classes:"myclass custom-class",
      groupBy:"plataforma",
    }; 
  }

  traerDatosSucursal() {
    this.loading = true;
    this.submitting = false;
    let admin = true;
    if(admin) {
      this.sucursalesSub = this.sucursalService.getSucursales()
      .subscribe(data => {
        this.loading = false;
        this.sucursales = data;
        this.sucursal = this.sucursales[0];
        this.cargarDatos(this.sucursal);
      }, err => {
        console.error(err);
        this.error = true;
        this.loading = false;
      });
    } else {
      this.sucursalSub = this.sucursalService.getSucursalById$(this.sucursalId)
      .subscribe(data => {
        this.sucursal = data;
        this.loading = false;
        this.sucursales.push(this.sucursal);
        this.cargarDatos(this.sucursal);
      }, err => {
        console.error(err);
        this.error = true;
        this.loading = false;
      });
    }
    
  }

  actualizarDatos(event) {
    //console.log("sucursal: ", this.sucursales[event.index]);
    this.sucursal = this.sucursales[event.index];
    this.cargarDatos(this.sucursal);
  }

  private cargarDatos(sucursal: Sucursal) {
    console.log(sucursal);
    this.videojuegos = [];
    this.dropdownCargarList = [];
    this.dropdownQuitarList = [];
    this.selectedCargarItems = [];
    this.selectedQuitarItems = [];

    sucursal.videojuegos.forEach(v => {
      //if(v.activo) {
        this.videojuegos.push(v);
        if(v.descuento === 0) {
          this.dropdownCargarList.push({
            "id": v._id,
            "itemName": v.titulo,
            "titulo": v.titulo,
            "codigo": v.codigo,
            "plataforma": v.plataforma,
            "imagen": v.imagen,
            "precio": v.precio
          });
        } else {
          this.dropdownQuitarList.push({
            "id": v._id,
            "itemName": v.titulo,
            "titulo": v.titulo,
            "codigo": v.codigo,
            "plataforma": v.plataforma,
            "imagen": v.imagen,
            "precio": v.precio,
            "descuento": v.descuento,
            "inicioDescuento": v.inicioDescuento,
            "finDescuento": v.finDescuento
          });
        }
      //}
    });

  }

  onSubmit(modalExito) {
    this.submitting = true;
    let inicio = new Date(this.frmDesc.inicioDescuento);
    let fin = new Date(this.frmDesc.finDescuento);
    if(inicio > fin) {
      this.snackBar.open('Error: La fecha de inicio debe ser menor a la fecha de fin');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000);
      this.submitting = false;
      return;
    }
    if(this.frmDesc.descuento > 100 || this.frmDesc.descuento < 1) {
      this.snackBar.open('Error: El descuento debe ser un valor numerico entre 1 y 100');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000);
      this.submitting = false;
      return;
    }
    this.selectedCargarItems.forEach(sci => {
      this.sucursal.videojuegos.forEach(v => {
        if(sci.codigo === v.codigo) {
          v.descuento = this.frmDesc.descuento;
          v.inicioDescuento = new Date(this.frmDesc.inicioDescuento);
          v.finDescuento = new Date(this.frmDesc.finDescuento);
        }
      });
    });

    this.updateSucursal = this.sucursalService.updateSucursalVideojuegos$(this.sucursal._id, this.sucursal.videojuegos)
      .subscribe(data => {
        this.modalService.open(modalExito).result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
          //window.location.reload();
          this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
          this.router.navigate(["admin-descuentos"]));
          /*this.selectedCargarItems = [];
          this.frmDesc = {
            descuento: null,
            inicioDescuento: null,
            finDescuento: null
          }*/
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          //window.location.reload();
          this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
          this.router.navigate(["admin-descuentos"]));
          /*this.selectedCargarItems = [];
          this.frmDesc = {
            descuento: null,
            inicioDescuento: null,
            finDescuento: null
          }*/
        });
      }, err => {
        console.error(err);
        this.error = true;
        this.submitting = false;
      });

  }

  removerDescuento(product, modalRemover) {
    this.selectedQuitarItems.forEach(sqi => {
      this.sucursal.videojuegos.forEach(v => {
        if(sqi.codigo === v.codigo) {
          v.descuento = 0;
          v.inicioDescuento = null;
          v.finDescuento = null;
        }
      });
    });

    this.updateSucursal = this.sucursalService.updateSucursalVideojuegos$(this.sucursal._id, this.sucursal.videojuegos)
      .subscribe(data => {
        this.modalService.open(modalRemover).result.then((result) => {

        }, (reason) => {
          
        });
        this.traerDatosSucursal();
      }, err => {
        console.error(err);
        this.error = true;
        this.submitting = false;
      });
    
    
  }

  ngOnDestroy() {
    if(this.updateSucursal) {
      this.updateSucursal.unsubscribe();
    }
    if(this.sucursalSub) {
      this.sucursalSub.unsubscribe();
    }
    if(this.sucursalesSub) {
      this.sucursalesSub.unsubscribe();
    }
    
  }

}
