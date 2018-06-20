import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs/Observable';
import { Slider } from "../../../domain/Slider";

@Injectable()
export class SliderService {
  
  constructor(public baseService: BaseService) { }

  postSlider$(file: File, slider: Slider): Observable<Slider> {
    return this.baseService.uploadSlider('slider/new', file, slider, "post");
  }

  getSlider$(): Observable<Slider[]> {
    return this.baseService.get('slider');
  }
  putVisibleSlider$(visible: any): Observable<Slider> {
    return this.baseService.put('slider/visible', visible);
  }

  deleteSlider$(id: string): Observable<any> {
    return this.baseService.delete(`slider/${id}`);
  }

  
}
