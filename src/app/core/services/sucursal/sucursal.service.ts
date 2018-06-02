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
    return this.baseService.get(`sucursales/${id}`);

  }

  getSucursales(): Observable<Sucursal[]> {
    return this.baseService.get(`sucursales`);
  }

  updateSucursalVideojuegos$(id: string, videojuegos: Videojuego[]): Observable<Sucursal> {
    return this.baseService.put(`sucursales/videojuegos/${id}`, videojuegos);
  }

}
