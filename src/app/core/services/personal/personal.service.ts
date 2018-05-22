import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Personal } from "../../../domain/personal";
import { BaseService } from '../base/base.service';

@Injectable()
export class PersonalService {

  constructor(public baseService: BaseService) { }

  getPersonal$(): Observable<Personal[]> {
    return this.baseService.get('personal');
  }

  postPersonal$(personal: Personal): Observable<Personal> {
    return this.baseService.post('personal/new', personal);
  }

  putPersonal$(id: string, personal: Personal): Observable<Personal> {
    return this.baseService.put(`personal/${id}`, personal)
  }

  deletePersonal$(id: string): Observable<any> {
    return this.baseService.delete(`personal/${id}`);
  }

}
