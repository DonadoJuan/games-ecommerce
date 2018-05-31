import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Videojuego } from '../../domain/videojuego';
import { VideojuegoService } from "../../core/services/videojuego/videojuego.service";
import { UtilsService } from "../../core/services/utils/utils.service";


@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.scss'],
})

export class VideojuegosComponent implements OnInit, OnDestroy {

    private listaVideoJuegos : Videojuego[] = new Array();
    videojuegosSub: Subscription;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    loading: boolean;
    error: boolean;
    myStyles = {};

  constructor(
      private videojuegoService: VideojuegoService,
      private us: UtilsService,
      private router: Router
    ) { }

  ngOnInit() {
        this.loading = true;
        this.error = false;
        this.videojuegosSub = this.videojuegoService.getVideojuegos$()
            .subscribe(data => {
                this.loading = false;
                data.forEach(d => {
                    this.listaVideoJuegos.push(d);
                    let desc;
                    if(d.titulo.length > 24) {
                        desc = d.descripcion.substring(0, 150) + "..."
                      } else {
                        desc = d.descripcion.substring(0, 200) + "..."
                      }
                    this.dropdownList.push({
                        "id": d._id,
                        "itemName": d.titulo,
                        "titulo": d.titulo,
                        "codigo": d.codigo,
                        "descripcion": desc,
                        "imagen": d.imagen,
                        "plataforma": d.plataforma
                    });
                });
            }, error => {
                this.loading = false;
                this.error = true;
                console.error(error);
            });        

        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Seleccionar categoria",
                                  selectAllText:'Seleccionar todo',
                                  unSelectAllText:'Deseleccionar todo',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class",
                                  groupBy:"plataforma",
                                }; 

  }

  

    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

    verDetalles(product: any) {
        this.listaVideoJuegos.forEach(v => {
            if(v.codigo === product.codigo) {
                this.us.videojuego = v;
                this.router.navigate(["game-details"]);
            }
        });
    }

    ngOnDestroy() {
        this.videojuegosSub.unsubscribe();
    }

}
