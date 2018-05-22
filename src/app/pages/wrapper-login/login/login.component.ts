import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tab: string;
  cliente: Object = {};
  constructor(private clienteService: ClienteService,
  private router: Router) { }

  login(){
    console.log(`datos login ${JSON.stringify(this.cliente)}`);
    this.clienteService.login(this.cliente)
      .subscribe(data => {
        if(data)
          this.router.navigate(['']);
        else
        console.log("error login incorrecto");
      }, err => {
        console.log("error login incorrecto");
      });
  }

  ngOnInit() {
  }

}
