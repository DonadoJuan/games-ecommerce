import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { OwlCarousel } from 'ngx-owl-carousel';
import { VideojuegoService } from "../../../core/services/videojuego/videojuego.service";
import { UtilsService } from "../../../core/services/utils/utils.service";
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Videojuego } from "../../../domain/videojuego";

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss']
})
export class BodyHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('owlElementPlaystation') owlElementPlaystation: OwlCarousel
  @ViewChild('owlElementNintendo') owlElementNintendo: OwlCarousel
  @ViewChild('owlElementXbox') owlElementXbox: OwlCarousel

  videojuegoSub: Subscription;
  listVideojuegosPlay: any[] = [];
  listVideojuegosXbox: any[] = [];
  listVideojuegosNintendo: any[] = [];
  listVideojuegos: Videojuego[] = [];
  loading: boolean = false;
  error: boolean = false;


  constructor(
    private videojuegoService: VideojuegoService, 
    private us: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    var n = document.getElementsByClassName("owl-nav");
    for(var i=0;i<n.length;i++){
      n[i].removeAttribute("disabled");
    }
    this.loading = true;
    this.error = false;
    this.videojuegoSub = this.videojuegoService.getVideojuegos$()
      .subscribe(data => {
        this.loading = false;
        data.forEach(v => {
          this.listVideojuegos.push(v);
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
            destacado: v.destacado
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
  }

  verDetalles(product: any) {
    this.listVideojuegos.forEach(v => {
        if(v.codigo === product.codigo) {
            this.us.videojuego = v;
            this.router.navigate(["game-details"]);
        }
    });
  }

  ngOnDestroy() {
    this.videojuegoSub.unsubscribe();
  }

}
