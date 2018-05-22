import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'confirm-purchase-dialog',
  templateUrl: 'confirm-purchase-dialog.html',
})
export class ConfirmPurchaseDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmPurchaseDialog>
  ) { 
      dialogRef.disableClose = true;
  }

  confirmMsg(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-cart-wizard',
  templateUrl: './cart-wizard.component.html',
  styleUrls: ['./cart-wizard.component.scss']
})
export class CartWizardComponent implements OnInit {

  formaEntrega: String;
  tarjetas: any;
  sucursales: any;
  settings: any;
  data: any[];

  confirmPurchase(): void {
    let dialogRef = this.dialog.open(ConfirmPurchaseDialog, {
      width: '300px'
    });

    dialogRef.beforeClose().subscribe(result => {
      this.router.navigate(['pedidos']);
    });
  }
  
  constructor (public dialog: MatDialog, public router: Router) { 
  }

  
  ngOnInit() {

    this.formaEntrega = "1";
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

    this.sucursales = [
      {
        id: "3212354",
        name: "Microcentro - Paraguay 1050"
      },
      {
        id: "3219632",
        name: "Paternal - av. Sarmiento 720"
      },
      {
        id: "945725",
        name: "Puerto Madero - Juana Manso 1240"
      }
    ]

    this.tarjetas = [
      {
        id: "234562",
        marca: "Mastercard",
        num:"..5314"
      },
      {
        id: "634521",
        marca: "Visa",
        num:"..7492"
      }
    ]

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
