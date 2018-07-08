import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';

@Injectable()
export class CarritoService {

  private videojuegosCarrito: any[] = [];

  constructor(
    private baseService: BaseService, 
    private router: Router) { 
      let ls = localStorage.getItem('carrito'); 
      if(ls){
        this.videojuegosCarrito = JSON.parse(ls);
      }
    }
  
    agregarItem(item){
      let estaEnCarrito = false;
      this.videojuegosCarrito.forEach(data => {
        if(data.videojuego.codigo == item.videojuego.codigo){
          estaEnCarrito = true;
          data.cantidad = item.cantidad;
          data.videojuego = item.videojuego;
        }
      });
      if(!estaEnCarrito) {
        this.videojuegosCarrito.push(item);
      }
      localStorage.setItem('carrito', JSON.stringify(this.videojuegosCarrito));
    }

    getVideojuegosCarrito(){
      return this.videojuegosCarrito;
    }

    limpiarVideoJuegosCarrito(){
      let length = this.videojuegosCarrito.length;
      this.videojuegosCarrito.splice(0,length);
    }
}
