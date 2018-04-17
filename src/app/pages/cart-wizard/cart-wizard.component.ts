import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-wizard',
  templateUrl: './cart-wizard.component.html',
  styleUrls: ['./cart-wizard.component.scss']
})
export class CartWizardComponent implements OnInit {

  settings: any;
  data: any[];

  constructor() { }

  ngOnInit() {
    this.settings = {
      actions: false,
      hideSubHeader: true,
      columns: {
        image: {
          title: 'IMAGEN',
          type: 'html'
        },
        product: {
          title: 'PRODUCTO'
        },
        quantity: {
          title: 'CANTIDAD'
        },
        retailPrice:{
          title: '$ UNITARIO'
        },
        subtotal:{
          title: '$ SUBTOTAL'
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table'
      }
    }

    this.data = [
      {
        product: 'SOUL CALIBUR VI',
        image: '<img src="../../../../assets/slider/gd-calibur.jpg" class="align-center" width="112px" height="130px"/>',
        quantity: "1",
        retailPrice: "$2000",
        subtotal:"$2000"
      },
      {
        product: 'MARIO ODYSSEY',
        image: '<img src="../../../../assets/slider/gd-gta.jpg" class="align-center" width="112px" height="130px"/>',
        quantity: "1",
        retailPrice: "$2000",
        subtotal:"$2000"
      },
      {
        product: 'FAR CRY 5',
        image: '<img src="../../../../assets/slider/gd-farcry5.jpg" class="align-center" width="112px" height="130px"/>',
        quantity: "1",
        retailPrice: "$2000",
        subtotal:"$2000"
      }
    ]
  }

}
