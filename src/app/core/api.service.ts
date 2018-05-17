import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ENV } from './env.config';
import { Barrio } from "../domain/barrio";
import { Domicilio } from "../domain/domicilio";
import { Personal } from "../domain/personal";
import { Sucursal } from "../domain/sucursal";
import { Videojuego } from "../domain/videojuego";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getSucursalesUbicacion$(): Observable<Sucursal[]> {
    return this.http
      .get(`${ENV.BASE_API}sucursales/ubicacion`)
      .pipe(
        catchError((error) => this._handleError(error))
      );   
  }

  getSucursalById$(id: string): Observable<Sucursal> {
    return this.http
      .get(`${ENV.BASE_API}sucursales/${id}`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  updateSucursalStock$(id: string, videojuegos: Videojuego[]): Observable<Sucursal> {
    return this.http
      .put(`${ENV.BASE_API}stock/${id}`, videojuegos)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  
  getBarrios$(): Observable<Barrio[]> {
    return this.http
      .get(`${ENV.BASE_API}barrios`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  getPersonal$(): Observable<Personal[]> {
    return this.http
      .get(`${ENV.BASE_API}personal`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  postPersonal$(personal: Personal): Observable<Personal> {
    return this.http
      .post(`${ENV.BASE_API}personal/new`, personal)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  putPersonal$(id: string, personal: Personal): Observable<Personal> {
    return this.http
      .put(`${ENV.BASE_API}personal/${id}`, personal)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  deletePersonal$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}personal/${id}`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: No se puede completar la solicitud.';
    /*if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }*/
    return Observable.throw(errorMsg);
  }

}
