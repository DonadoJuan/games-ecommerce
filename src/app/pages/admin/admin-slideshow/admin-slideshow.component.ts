import { Component, OnInit } from '@angular/core';
import { CheckboxComponent } from "../checkbox.component";

@Component({
  selector: 'app-admin-slideshow',
  templateUrl: './admin-slideshow.component.html',
  styleUrls: ['./admin-slideshow.component.scss']
})
export class AdminSlideshowComponent implements OnInit {

  settings: any;
  data: any[];

  constructor() { }

  ngOnInit() {
    this.settings = {
      actions: {
        delete: true,
        add: false,
        edit: false,
      },
      columns: {
        checkbox: {
          title: 'Seleccionar',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%"
        },
        name: {
          title: 'Nombre'
        },
        image: {
          title: 'Imagen',
          type: 'html',
          filter: false,
          sort: false
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped' // this is custom table scss or css class for table
      }
    }

    this.data = [
      {
        checkbox: true,
        name: 'Ni No Kuni II',
        image: '<img src="../../../../assets/slider/ni_no_kuni.jpg" width="200px" height="100px"/>'
      },
      {
        checkbox: true,
        name: 'Mario Odyssey',
        image: '<img src="../../../../assets/slider/mario_odyssey.jpg" width="200px" height="100px"/>'
      },
      {
        checkbox: true,
        name: 'Horizon',
        image: '<img src="../../../../assets/slider/horizon.jpg" width="200px" height="100px"/>'
      }
    ]
  }

}
