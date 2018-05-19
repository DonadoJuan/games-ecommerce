import { Injectable } from '@angular/core';
import { Barrio } from "../domain/barrio";
import { Domicilio } from "../domain/domicilio";
import { Sucursal } from "../domain/sucursal";
import { Videojuego } from "../domain/videojuego";
import { Personal } from "../domain/personal";
import { Cliente } from "../domain/cliente";

@Injectable()
export class UtilsService {

  public personal: Personal;
  public cliente: Cliente;

  constructor() { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

}
