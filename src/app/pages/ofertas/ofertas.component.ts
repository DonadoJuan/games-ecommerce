import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Videojuego } from "../../domain/videojuego";
import { Sucursal } from "../../domain/sucursal";
import { SucursalService } from "../../core/services/sucursal/sucursal.service";
import { Router, NavigationStart } from '@angular/router';
import { UtilsService } from "../../core/services/utils/utils.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit, OnDestroy {


  sucursales: Sucursal[];
  sucursalesSub: Subscription;
  sucursalesChangeSub: Subscription;
  loading: boolean;
  error: boolean;
  fechaDelDia: Date;

  constructor(
    private us: UtilsService,
    private sucursalService: SucursalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fechaDelDia = new Date();
    this.loading = true;
    this.sucursalesSub = this.sucursalService.getSucursales()
      .subscribe(data => {
        this.loading = false;
        this.sucursales = data;
      }, err => {
        console.error(err);
        this.loading = false;
        this.error = false;
      })
  }

  verDetalles(product: Videojuego, sucursal: Sucursal) {
    this.us.videojuego = product;
    this.us.sucursal = sucursal;
    this.us.tieneStock = true;
    this.router.navigate(["game-details"]);
  }

  checkOffert(sucursal: Sucursal, product: Videojuego): boolean {
    if(product.activo && product.descuento != 0 && new Date(product.inicioDescuento) <= this.fechaDelDia && product.stock > 0) {
      if(new Date(product.finDescuento) >= this.fechaDelDia) {
        return true;
      } else {
        this.sucursales.forEach(s => {
          if(s._id == sucursal._id) {
            s.videojuegos.forEach(v => {
              if(v.codigo == product.codigo) {
                v.descuento = 0;
                v.inicioDescuento = null;
                v.finDescuento = null;
              }
            });
          }
        });
        this.sucursalesChangeSub = this.sucursalService.updateSucursalVideojuegos$(sucursal._id, sucursal.videojuegos)
          .subscribe(data => {

          }, err => {
            console.error(err);
            this.error = true;
          });
        return false;
      }
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    if(this.sucursalesChangeSub) {
      this.sucursalesChangeSub.unsubscribe();
    } 
    this.sucursalesSub.unsubscribe();
  }

}
