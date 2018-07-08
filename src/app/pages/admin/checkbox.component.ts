import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { VideojuegoService } from "../../core/services/videojuego/videojuego.service";
import { SliderService } from '../../core/services/slider/slider.service';

declare var $ :any;
@Component({
  selector: 'app-checkbox',
  template: `
  <input 
  id="myCheckbox"
  name="myCheckbox"
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
  cantVisibles : number;
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
      this.cantVisibles = parseInt(localStorage.getItem("cantVisible"));
      if(this.checked){
        this.cantVisibles++;
      }else{
        this.cantVisibles--;
      }
      console.log("cantidadvisible "+this.cantVisibles);
      if(this.cantVisibles<=5){
      let obj = {
        id: this.rowData._id,
        visible: this.checked
      }
      this.sliderService.putVisibleSlider$(obj)
        .subscribe(data => {

        }, err => {
          console.error(err);
        });
        
       }else{
       
       }
    }
    
  }

}
