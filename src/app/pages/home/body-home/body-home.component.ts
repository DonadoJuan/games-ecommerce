import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { OwlCarousel } from 'ngx-owl-carousel';
import { VideojuegoService } from "../../../core/services/videojuego/videojuego.service";
import { UtilsService } from "../../../core/services/utils/utils.service";
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Videojuego } from "../../../domain/videojuego";
import { ConfirmarItemCarritoComponent } from '../../../core/dialogs/confirmar-item-carrito/confirmar-item-carrito.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss']
})
export class BodyHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('owlElementPlaystation') owlElementPlaystation: OwlCarousel;
  @ViewChildren('owlElementNintendo') owlElementNintendo: OwlCarousel;
  @ViewChildren('owlElementXbox') owlElementXbox: OwlCarousel;

  carouselOptions: any = {
    items: 4, margin: 10, dots: false, nav: true, rewind: true, autoplay: true, mouseDrag: false, touchDrag: false, pullDrag: false, freeDrag: false,
    //onInitialized : this.cambioAlgo.bind(this),
    //onTranslated: this.tanslado.bind(this) 
  }

  videojuegoSub: Subscription;
  stockGlobalSub: Subscription;
  listVideojuegosPlay: any[] = [];
  listVideojuegosXbox: any[] = [];
  listVideojuegosNintendo: any[] = [];
  listVideojuegos: Videojuego[] = [];
  loading: boolean = false;
  error: boolean = false;
  //carouselPlay: any;


  constructor(
    private videojuegoService: VideojuegoService, 
    private us: UtilsService,
    private router: Router,
    private cartDialog: MatDialog,
    //private renderer: Renderer2
  ) {
    
   }

  ngOnInit() {
    var n = document.getElementsByClassName("owl-nav");
    for(var i=0;i<n.length;i++){
      n[i].removeAttribute("disabled");
    }
    
    this.loading = true;
    this.error = false;

    this.videojuegoSub = this.videojuegoService.getVideojuegos$()
      .subscribe(data => {
        data.forEach(v => {
          this.listVideojuegos.push(v);
        });

        this.stockGlobalSub = this.videojuegoService.getStockGlobal()
          .subscribe(stocks => {
            this.loading = false;
            //console.log("stock global: ", stocks);
            stocks.forEach(d => {
              this.listVideojuegos.forEach(v => {
                if(v.codigo === d._id.codigo) {
                  //console.log(v.titulo + " -  stock:" + d.stock);
                  let tieneStock = (d.stock > 0) ? true : false;

                  let desc;
                  if(v.titulo.length > 24) {
                    desc = v.descripcion.substring(0, 150) + "..."
                  } else {
                    desc = v.descripcion.substring(0, 200) + "..."
                  }
                  let elemento = {
                    _id: v._id,
                    codigo: v.codigo,
                    descripcion: desc,
                    titulo: v.titulo,
                    imagen: v.imagen,
                    plataforma: v.plataforma,
                    destacado: v.destacado,
                    precio: v.precio,
                    tieneStock: tieneStock
                  }
                  switch(elemento.plataforma) {
                    case "PS4":
                      if(elemento.destacado) {
                        this.listVideojuegosPlay.push(elemento);
                      }
                      break;
                    
                    case "Xbox One":
                      if(elemento.destacado) {
                        this.listVideojuegosXbox.push(elemento);
                      }
                      break;
                    
                    case "Nintendo Switch":
                      if(elemento.destacado) {
                        this.listVideojuegosNintendo.push(elemento);
                      }
                      break;
                  }
                }
              });
            })
          }, err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          });
      }, err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      });
  }

  ngAfterViewInit() {
    new WOW({
      live: false
    }).init();
    //console.log(this.owlElementPlaystation);
    /*this.owlElementPlaystation.options = {
      onInitialized: this.cambioAlgo.bind(this),
      onTranslated: this.cambioAlgo.bind(this)
    }*/
    /*this.listenFunc = this.renderer.listen(this.btnDetalle.nativeElement, 'click', (event) => {
      console.log(event);
      console.log('Element clicked');
    });*/
  }

  /*tanslado() {
    //console.log("translado");
    console.log(this.owlElementPlaystation);
    if(this.owlElementPlaystation.first.$owlChild.currentSlideIndex === 5) {
      //this.owlElementPlaystation.first.$owlChild.currentSlideIndex = 1;
      //this.owlElementPlaystation = null;
      //this.owlElementPlaystation.first.$owlChild.destroyOwl();
      //this.owlElementPlaystation.first.$owlChild.initOwl();
      //this.owlElementPlaystation.first.$owlChild.trigger('remove.owl.carousel', [6]);
      //this.owlElementPlaystation.first.$owlChild.trigger('to.owl.carousel', [0,200,true]);
      //this.owlElementPlaystation.first = this.carouselPlay.first;
      //this.owlElementPlaystation.remove();
    }
  }*/

  /*cambioAlgo() {
    //console.log("cambio algo");
    this.carouselPlay = this.owlElementPlaystation;
    console.log(this.carouselPlay);
  }*/

  verDetalles(product: any) {
    console.log(product);
    this.listVideojuegos.forEach(v => {
        if(v.codigo === product.codigo) {
            this.us.videojuego = v;
            this.us.tieneStock = product.tieneStock;
            this.router.navigate(["game-details"]);
        }
    });
  }

  agregarAlCarrito(videojuego){
    let dialogRef = this.cartDialog.open(ConfirmarItemCarritoComponent, {
        width: '600px',
        data: videojuego
      });
  }

  ngOnDestroy() {
    this.videojuegoSub.unsubscribe();
    this.stockGlobalSub.unsubscribe();
  }

}
