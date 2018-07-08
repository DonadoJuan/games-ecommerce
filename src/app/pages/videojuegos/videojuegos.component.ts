import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Videojuego } from '../../domain/videojuego';
import { VideojuegoService } from "../../core/services/videojuego/videojuego.service";
import { UtilsService } from "../../core/services/utils/utils.service";
import { MatDialog } from '@angular/material';
import { ConfirmarItemCarritoComponent } from "../../core/dialogs/confirmar-item-carrito/confirmar-item-carrito.component";


@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.scss'],
})

export class VideojuegosComponent implements OnInit, OnDestroy {

    private listaVideoJuegos : Videojuego[] = new Array();
    videojuegosSub: Subscription;
    stockGlobalSub: Subscription;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    loading: boolean;
    error: boolean;
    myStyles = {};

  constructor(
      private videojuegoService: VideojuegoService,
      private us: UtilsService,
      private router: Router,
      private cartDialog: MatDialog
    ) { }

  ngOnInit() {
        this.loading = true;
        this.error = false;
        this.videojuegosSub = this.videojuegoService.getVideojuegos$()
            .subscribe(data => {
                data.forEach(d => {
                    this.listaVideoJuegos.push(d);
                });
                this.stockGlobalSub = this.videojuegoService.getStockGlobal()
                    .subscribe(stocks => {
                        this.loading = false;
                        stocks.forEach(s => {
                            this.listaVideoJuegos.forEach(v => {
                                if(v.codigo === s._id.codigo) {
                                    let tieneStock = (s.stock > 0) ? true : false;
                                    let desc;
                                    if(v.titulo.length > 24) {
                                        desc = v.descripcion.substring(0, 150) + "..."
                                    } else {
                                        desc = v.descripcion.substring(0, 200) + "..."
                                    }
                                    this.dropdownList.push({
                                        "id": v._id,
                                        "itemName": v.titulo,
                                        "titulo": v.titulo,
                                        "codigo": v.codigo,
                                        "descripcion": desc,
                                        "imagen": v.imagen,
                                        "plataforma": v.plataforma,
                                        "precio": v.precio,
                                        "tieneStock": tieneStock   
                                    });
                                }
                            });
                        });
                    }, err => {
                        this.loading = false;
                        this.error = true;
                        console.error(err);
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
                this.us.tieneStock = product.tieneStock;
                this.router.navigate(["game-details"]);
            }
        });
    }

    agregarAlcarrito(vj: Videojuego){
        let dialogRef = this.cartDialog.open(ConfirmarItemCarritoComponent, {
            width: '600px',
            data: vj
          });
    }

    ngOnDestroy() {
        this.videojuegosSub.unsubscribe();
        this.stockGlobalSub.unsubscribe();
    }

}
