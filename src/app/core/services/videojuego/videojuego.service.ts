import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs/Observable';
import { Videojuego } from "../../../domain/videojuego";

@Injectable()
export class VideojuegoService {
  
  constructor(public baseService: BaseService) { }

  postVideojuego$(file: File, videojuego: Videojuego): Observable<Videojuego> {
    return this.baseService.upload('videojuegos/new', file, videojuego, "post");
  }

  getVideojuegos$(): Observable<Videojuego[]> {
    return this.baseService.get('videojuegos');
  }

  putDestacadoVideojuego$(destacado: any): Observable<Videojuego> {
    return this.baseService.put('videojuegos/destacado', destacado);
  }

  putVideojuego$(id: string, file: File, videojuego: Videojuego): Observable<Videojuego> {
    return this.baseService.upload(`videojuegos/${id}`, file, videojuego, "put");
  }

  deleteVideojuego$(id: string) : Observable<any> {
    return this.baseService.delete(`videojuegos/${id}`);
  }

  getStockGlobal(): Observable<any> {
    return this.baseService.get(`videojuegos/stockGlobal`);
  }
  
}
