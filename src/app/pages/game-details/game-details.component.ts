import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../core/services/utils/utils.service";
import { Videojuego } from "../../domain/videojuego";
import { Sucursal } from "../../domain/sucursal";
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmarItemCarritoComponent } from '../../core/dialogs/confirmar-item-carrito/confirmar-item-carrito.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../core/services/auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  videojuego: Videojuego;
  sucursal: Sucursal;
  url: string;
  safeUrl: SafeResourceUrl;
  tieneStock: boolean;
  hideCarrito: boolean = false;
  loggedIn: boolean;

  constructor(
    private us: UtilsService, 
    private sanitization: DomSanitizer,
    private cartDialog: MatDialog,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedIn = this.authService.getDatosCliente() != null;
    console.log("loggedIn: ", this.loggedIn);
    if(this.loggedIn) {
      let payload = this.authService.getDatosCliente().payload;
      this.hideCarrito = (payload.perfil !== undefined) ? true : false;
    }
    if(this.us.videojuego) {
      this.videojuego = this.us.videojuego;
      this.tieneStock = this.us.tieneStock;
      this.us.videojuego = null;
      this.us.tieneStock = null;
      this.safeUrl = this.sanitization.bypassSecurityTrustResourceUrl(this.videojuego.urlVideo.replace("watch?v=", "embed/"));
      //this.url = this.videojuego.urlVideo.replace("watch?v=", "v/");
    }
    if(this.us.sucursal) {
      this.sucursal = this.us.sucursal;
      this.videojuego.sucursalId = this.sucursal._id;
      this.us.sucursal = null;
    }
  }

  agregarAlCarrito(addToCarrito){
    if(!this.loggedIn) {
      this.modalService.open(addToCarrito).result.then((result) => {
        this.router.navigate(["wrapper-login"]);
      }, (reason) => {
        this.router.navigate(["wrapper-login"]);
      });
    } else {
      let dialogRef = this.cartDialog.open(ConfirmarItemCarritoComponent, {
        width: '600px',
        data: this.videojuego
      });
    }
    
  }

}
