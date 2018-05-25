import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tab: string;
  cliente: Object = {};

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(){
    this.clienteService.login(this.cliente)
      .subscribe(data => {
        if(data.token)
          this.router.navigate(['']);
        else 
          this.snackBar.open('Usuario y/o clave erronea','OK');
      });
  }

  ngOnInit() {
  }

}
