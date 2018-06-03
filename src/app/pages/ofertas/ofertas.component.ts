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
  loading: boolean;
  error: boolean;

  constructor(
    private us: UtilsService,
    private sucursalService: SucursalService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.router.navigate(["game-details"]);
  }

  ngOnDestroy() {
    this.sucursalesSub.unsubscribe();
  }

}
