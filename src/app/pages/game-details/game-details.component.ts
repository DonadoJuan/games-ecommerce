import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../core/services/utils/utils.service";
import { Videojuego } from "../../domain/videojuego";
import { Sucursal } from "../../domain/sucursal";
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  videojuego: Videojuego;
  sucursal: Sucursal;
  url: string;
  safeUrl: SafeResourceUrl

  constructor(private us: UtilsService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    if(this.us.videojuego) {
      this.videojuego = this.us.videojuego;
      this.us.videojuego = null;
      this.safeUrl = this.sanitization.bypassSecurityTrustResourceUrl(this.videojuego.urlVideo.replace("watch?v=", "embed/"));
      //this.url = this.videojuego.urlVideo.replace("watch?v=", "v/");
    }
    if(this.us.sucursal) {
      this.sucursal = this.us.sucursal;
      this.us.sucursal = null;
    }
  }

}
