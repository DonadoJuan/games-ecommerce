import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  barrios: any[] = [];

  constructor() { }

  ngOnInit() {
    this.barrios.push({value: "1", viewValue: "Barracas"});
  }

}
