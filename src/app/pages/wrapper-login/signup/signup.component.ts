import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { Barrio } from '../../../domain/barrio';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  barrios: Barrio[] = [];

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {

    this.utilsService.getBarrios$()
      .subscribe(barrios => {
        console.log(`ok al traer los barrios ${JSON.stringify(barrios)}`);
        this.barrios = [... barrios];
      }, error => {
        console.log(`error al traer los barrios ${error}`);
      });
  }

}
