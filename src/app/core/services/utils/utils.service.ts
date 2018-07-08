import { Injectable } from '@angular/core';
import { Barrio } from "../../../domain/barrio";
import { Domicilio } from "../../../domain/domicilio";
import { Sucursal } from "../../../domain/sucursal";
import { Videojuego } from "../../../domain/videojuego";
import { Personal } from "../../../domain/personal";
import { Cliente } from "../../../domain/cliente";
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base/base.service';
import { Slider } from '../../../domain/slider';
import { Cupon } from '../../../domain/cupon';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UtilsService {

  public personal: Personal;
  public cliente: Cliente;
  public videojuego: Videojuego;
  public sucursal: Sucursal;
  public slider : Slider;
  public cupon : Cupon;
  public indiceSucursal: number;
  public tieneStock: boolean;
  private distanceApi = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric";
  private apiKey = "&key=AIzaSyD9Gpn2UZYjQpzm09Gh9WgvWF0oeKNp4rY";

  public messageHeader: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public baseService: BaseService) { }

  calcularCostoEnvio(origen, destino){

    let parsedOrigen = "";
    let parsedDestino = "";
    let distancia = 0;
    let precio = 0;

    if(origen instanceof Array){
      let sucursales = [];
      origen.forEach(s =>{
        sucursales.push(`${s.ubicacion.calle} ${s.ubicacion.altura} ${s.ubicacion.barrio.nombre} CABA`);
      });
      parsedOrigen = `&origins=${sucursales.join('|')}`;

    }else{
      parsedOrigen = `&origins=${origen.ubicacion.calle} ${origen.ubicacion.altura} ${origen.ubicacion.barrio.nombre} CABA`;
    }

    parsedDestino = `&destinations=${destino.calle} ${destino.altura} ${destino.barrio.nombre} CABA`;
    let parsedUrl = this.distanceApi + parsedOrigen + parsedDestino + this.apiKey;
    return this.baseService.baseGet(parsedUrl)
      .pipe(map(data =>{
        if(data.status != "OK")
          return data;

        if(data.rows.length > 1){
          
          for (const key in data.rows) {
            data.rows[key].sucursal_entrega = origen[key];
            data.rows[key].distancia = data.rows[key].elements[0].distance.value;
          }
          let sucursalMasCercana = data.rows.reduce(function(prev, current) {
            return (prev.distancia < current.distancia) ? prev : current
          });
          data.sucursal_entrega = sucursalMasCercana.sucursal_entrega;
          distancia = sucursalMasCercana.distancia;

        }else{
          data.sucursal_entrega = origen;
          distancia = (data.rows[0].elements[0].distance.value);
        }

        data.precio = Math.round((distancia /1000)*20);
        return data;
      }));
  }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

  getBarrios$(): Observable<Barrio[]> {
    return this.baseService.get('barrios');
  }

}
