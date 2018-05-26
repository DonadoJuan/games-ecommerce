import { Component, OnInit, Input } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tab: string;
  cliente: Object = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(){
    this.authService.loginCliente(this.cliente)
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
