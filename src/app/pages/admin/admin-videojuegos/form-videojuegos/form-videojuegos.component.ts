import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-form-videojuegos',
  templateUrl: './form-videojuegos.component.html',
  styleUrls: ['./form-videojuegos.component.scss']
})
export class FormVideojuegosComponent implements OnInit {

  generos: any[] = [];
  companias: any[] = [];
  plataformas: any[] = [];


  constructor() { }

   ngOnInit() {
    this.generos.push({value: '1', viewValue:'RPG'});
    this.generos.push({value: '2', viewValue: 'Deportes'});

    this.companias.push({value: '1', viewValue: 'Naughty Dog'});
    this.companias.push({value: '2', viewValue: 'Square Enix'});

    this.plataformas.push({value: '1', viewValue: 'PS4'});
  }
}
