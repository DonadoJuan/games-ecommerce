import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-negra',
  templateUrl: './lista-negra.component.html',
  styleUrls: ['./lista-negra.component.scss']
})
export class ListaNegraComponent implements OnInit {

  nombre: string = "";
  dni: string = "";
  email: string = "";
  opciones: any[] = [];

  constructor() { }

  ngOnInit() {
    this.nombre = "Elma Tambre";
    this.dni = "23477107";
    this.email = "elma.tambre@gmail.com"

    this.opciones.push({value: '1', viewValue: 'Una Semana'});
    this.opciones.push({value: '2', viewValue: 'Un Mes'});
    this.opciones.push({value: '3', viewValue: 'Dos Meses'});
    this.opciones.push({value: '4', viewValue:'Tiempo Indefinido'});
  }

}
