import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Cupon } from '../../../domain/cupon';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CuponService {

  constructor(public baseService: BaseService) { }

  postCupon$(cupon : Cupon): Observable<Cupon> {
    return this.baseService.post('cupones/new', cupon);
  }

  getCupones$(): Observable<Cupon[]> {
    return this.baseService.get('cupones');
  }

  deleteCupon$(id: string): Observable<any> {
    return this.baseService.delete(`cupones/${id}`);
  }
}
