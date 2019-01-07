import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../core/services/utils/utils.service";
import { EventEmitter } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper-login',
  templateUrl: './wrapper-login.component.html',
  styleUrls: ['./wrapper-login.component.scss']
})
export class WrapperLoginComponent implements OnInit, OnDestroy {

  //@Output() loginEvent = new EventEmitter();
  tab: string;
  tabSub: Subscription;

  constructor(public utils: UtilsService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'login';
      });
  }

  ngOnDestroy() {
    this.tabSub.unsubscribe();
  }

  login(mail, pass) {
    console.log("Me logueo como empleado");
    let usuario:any = {};
    usuario.mail = mail;
    usuario.pass = pass;
    this.utils.datosLogin = usuario;
    this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
    this.router.navigate(["wrapper-login"]));
  }

}
