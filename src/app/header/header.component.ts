import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthService } from '../core/services/auth/auth.service';
import { UtilsService } from '../core/services/utils/utils.service';
import { CarritoService } from '../core/services/carrito/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navToggled = new EventEmitter();
  navOpen = false;

  loggedIn: boolean;
  videojuegosCarrito: any[];
  payload: any;
  cliente: boolean = false;
  empleado: boolean = false;
  admin: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private carritoService: CarritoService,
    private us: UtilsService) { 
      this.us.messageHeader.subscribe((message) => {
        this.loginHeader();
      });
    }

  logout(){
    this.cliente = false;
    this.empleado = false;
    this.admin = false;
    this.authService.logout();
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationStart && this.navOpen)
      .subscribe(event => this.toggleNav());

      this.authService.isLoggedIn.subscribe(res => {
        this.loggedIn = res;
      });
      this.loggedIn = this.authService.getDatosCliente() != null;
      if(this.loggedIn) {
        this.loginHeader();
      } 

    this.videojuegosCarrito = this.carritoService.getVideojuegosCarrito();
    
  }

  public loginHeader() {
    //console.log("llegue al header");
    this.authService.isLoggedIn.subscribe(res => {
      this.loggedIn = res;
    });

    this.loggedIn = this.authService.getDatosCliente() != null;
      if(this.loggedIn) {
        this.payload = this.authService.getDatosCliente().payload;
        console.log(this.payload.perfil);
        if(this.payload.perfil === undefined) {
          this.cliente = true;
        } else if(this.payload.perfil === "Empleado") {
          this.empleado = true;
        } else {
          this.admin = true;
        }
        //this.cdRef.detectChanges();
        console.log("cliente: ", this.cliente);
        console.log("empleado: ", this.empleado);
        console.log("admin: ", this.admin);
      }
      
      //this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
      //this.router.navigate([""]));

  }

  toggleNav() {
    this.navOpen = !this.navOpen;
    this.navToggled.emit(this.navOpen);
  }
}