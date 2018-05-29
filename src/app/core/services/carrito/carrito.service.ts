import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';

@Injectable()
export class CarritoService {

  videojuegosCarrito: Object[];

  constructor(private baseService: BaseService, private router: Router) { }



}
