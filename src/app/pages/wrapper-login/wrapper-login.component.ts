import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../core/services/utils/utils.service";

@Component({
  selector: 'app-wrapper-login',
  templateUrl: './wrapper-login.component.html',
  styleUrls: ['./wrapper-login.component.scss']
})
export class WrapperLoginComponent implements OnInit, OnDestroy {

  tab: string;
  tabSub: Subscription;

  constructor(public utils: UtilsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'login';
      });
  }

  ngOnDestroy() {
    this.tabSub.unsubscribe();
  }

}
