import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { VideojuegoService } from "../../core/services/videojuego/videojuego.service";

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

  constructor(private videojuegoService: VideojuegoService) { }

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
      console.log(this.checked);
    }
    
  }

}
