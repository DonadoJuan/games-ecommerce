import { Component, OnInit } from '@angular/core';
import { Videojuego } from '../../domain/videojuego';


@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.scss'],
})

export class VideojuegosComponent implements OnInit {

  private videojuego1 : Videojuego = new Videojuego();
  private videojuego2 : Videojuego = new Videojuego();
  private listaVideoJuegos : Videojuego[] = new Array();
     dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

  constructor() { }

  ngOnInit() {
    

    this.videojuego1._id = "1";
    this.videojuego1.titulo = "Mario";
        this.videojuego2._id = "2";
    this.videojuego2.titulo = "Nino";
    

    this.listaVideoJuegos.push(this.videojuego1);
    this.listaVideoJuegos.push(this.videojuego2);
      
    console.log(this.listaVideoJuegos);

        this.dropdownList = [
                              {"id":1,"itemName":"Crash Remastered", gender: 'Playstation' },
                              {"id":2,"itemName":"God of war 4", gender: 'Playstation' },
                              {"id":3,"itemName":"Mario Odyssey", gender: 'Nintendo' },
                              {"id":4,"itemName":"Pokemon", gender: 'Nintendo' },
                              {"id":5,"itemName":"Gears of war 5", gender: 'Xbox One' },
                              {"id":6,"itemName":"HALO 4", gender: 'Xbox One' }
                            ];
        this.selectedItems = [
                              {"id":2,"itemName":"God of war 4", gender: 'Playstation' },
                              {"id":3,"itemName":"Mario Odyssey", gender: 'Nintendo' },
                              {"id":4,"itemName":"Pokemon", gender: 'Nintendo' },
                              {"id":5,"itemName":"Gears of war 5", gender: 'Xbox One' },
                            ];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Seleccionar categoria",
                                  selectAllText:'Seleccionar todo',
                                  unSelectAllText:'Deseleccionar todo',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class",
                                   groupBy:"gender",
                                }; 

  }

  

    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

}
