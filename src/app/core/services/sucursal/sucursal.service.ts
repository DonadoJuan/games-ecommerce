import { Injectable } from '@angular/core';
import { Sucursal } from "../../../domain/sucursal";
import { Videojuego } from "../../../domain/videojuego";
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SucursalService {

  constructor(public baseService: BaseService) { }

  getSucursalesUbicacion$(): Observable<Sucursal[]> {
    return this.baseService.get('sucursales/ubicacion');
  }

  getSucursalById$(id: string): Observable<Sucursal> {
    return this.baseService.get(`sucursales/${id}`)

  }

  updateSucursalStock$(id: string, videojuegos: Videojuego[]): Observable<Sucursal> {
    return this.baseService.put(`sucursales/stock/${id}`, videojuegos);
  }

}
