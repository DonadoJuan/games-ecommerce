import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { VideojuegoService } from "../../core/services/videojuego/videojuego.service";
import { SliderService } from '../../core/services/slider/slider.service';

@Component({
  selector: 'app-checkbox',
  template: `
  <input 
  type="checkbox"
  (click)="changeBoolean()"
  [checked]="this.checked">
  `,
  styles: []
})
export class CheckboxComponent implements ViewCell, OnInit {

  @Input() value: any;
  @Input() rowData: any;

  checked: boolean;

  constructor(private videojuegoService: VideojuegoService, private sliderService: SliderService) { }

  ngOnInit() {
    this.checked = this.value;
  }

  changeBoolean() {
    this.checked = !this.checked;
    if(this.rowData.codigo) {
      console.log(this.rowData);
      let obj = {
        codigo: this.rowData.codigo,
        destacado: this.checked
      }
      this.videojuegoService.putDestacadoVideojuego$(obj)
        .subscribe(data => {

        }, err => {
          console.error(err);
        });
    } else {
      console.log("slider"+this.checked);
      console.log(this.rowData._id);
      let obj = {
        id: this.rowData._id,
        visible: this.checked
      }
      this.sliderService.putVisibleSlider$(obj)
        .subscribe(data => {

        }, err => {
          console.error(err);
        });
        
    }
    
  }

}
