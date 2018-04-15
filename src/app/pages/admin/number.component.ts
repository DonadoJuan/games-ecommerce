import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-number',
  template: `
    <input type="number"
    [value]="this.numero"
    readonly />
  `,
  styles: []
})
export class NumberComponent implements ViewCell, OnInit {

  @Input() value: number;
  @Input() rowData: any;

  numero: number;

  constructor() { }

  ngOnInit() {
    this.numero = this.value;
  }

}
