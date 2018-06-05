import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthService } from '../core/services/auth/auth.service';
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

  constructor(
    private router: Router, 
    private authService: AuthService,
    private carritoService: CarritoService) { }

  logout(){
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
    this.videojuegosCarrito = this.carritoService.getVideojuegosCarrito();
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
    this.navToggled.emit(this.navOpen);
  }
}