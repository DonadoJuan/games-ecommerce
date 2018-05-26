import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs/Observable';
import { Videojuego } from "../../../domain/videojuego";

@Injectable()
export class VideojuegoService {

  constructor(public baseService: BaseService) { }

  postVideojuego$(file: File, videojuego: Videojuego): Observable<Videojuego> {
    return this.baseService.upload('videojuegos/new', file, videojuego);
  }

  getVideojuegos$(): Observable<Videojuego[]> {
    return this.baseService.get('videojuegos');
  }
  
}
