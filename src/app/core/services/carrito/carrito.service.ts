import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';

@Injectable()
export class CarritoService {

  private videojuegosCarrito: any[] = [];

  constructor(
    private baseService: BaseService, 
    private router: Router) { }
  
    agregarItem(item){
      this.videojuegosCarrito.push(item);
    }

    getVideojuegosCarrito(){
      return this.videojuegosCarrito;
    }


}
