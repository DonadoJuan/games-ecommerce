import { Component, OnInit } from '@angular/core';
import { CheckboxComponent } from "../checkbox.component";
import { NumberComponent } from "../number.component";

@Component({
  selector: 'app-admin-videojuegos',
  templateUrl: './admin-videojuegos.component.html',
  styleUrls: ['./admin-videojuegos.component.scss']
})
export class AdminVideojuegosComponent implements OnInit {

  settings: any;
  data: any[];

  constructor() { }

  ngOnInit() {
    this.settings = {
      actions: {
        delete: true,
        add: false,
        edit: true,
      },
      columns: {
        titulo: {
          title: 'Titulo'
        },
        genero: {
          title: 'Genero'
        },
        plataforma: {
          title: 'Plataforma'
        },
        min: {
          title: 'Cant. Minima',
          type: 'custom',
          renderComponent: NumberComponent
        },
        max: {
          title: 'Cant. Maxima',
          type: 'custom',
          renderComponent: NumberComponent
        },
        precio: {
          title: 'Precio',
          type: 'custom',
          renderComponent: NumberComponent
        },
        descuento: {
          title: 'Descuento',
          type: 'custom',
          renderComponent: NumberComponent
        },
        checkbox: {
          title: 'Destacado',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%"
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }

    this.data = [
      {
        titulo: 'Ni No Kuni II',
        genero: 'Rol',
        plataforma: 'PS4',
        min: 5,
        max: 10,
        precio: 1500,
        descuento: 0,
        checkbox: true
      },
      {
        titulo: 'Mario Odyssey',
        genero: 'Plataforma',
        plataforma: 'Nintendo Switch',
        min: 15,
        max: 50,
        precio: 1800,
        descuento: 10,
        checkbox: true
      },
      {
        titulo: 'Horizon Zero Dawn',
        genero: 'Aventura',
        plataforma: 'PS4',
        min: 5,
        max: 10,
        precio: 1200,
        descuento: 0,
        checkbox: true
      },
      {
        titulo: 'The Last of Us',
        genero: 'Aventura',
        plataforma: 'PS4',
        min: 1,
        max: 5,
        precio: 1200,
        descuento: 15,
        checkbox: false
      }
    ]

  }

}
