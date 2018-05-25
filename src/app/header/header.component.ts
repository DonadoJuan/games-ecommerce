import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ClienteService } from '../core/services/cliente/cliente.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navToggled = new EventEmitter();
  navOpen = false;

  loggedIn: boolean;

  constructor(private router: Router, private clienteService: ClienteService) { }

  logout(){
    this.clienteService.logout();
  }

  ngOnInit() {
    // If nav is open after routing, close it
    this.router.events
      .filter(event => event instanceof NavigationStart && this.navOpen)
      .subscribe(event => this.toggleNav());
    
    this.clienteService.isLoggedIn.subscribe(res => {
      console.log(`se registro un cambio ` + res);
      this.loggedIn = res;
    }); 
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
    this.navToggled.emit(this.navOpen);
  }
}