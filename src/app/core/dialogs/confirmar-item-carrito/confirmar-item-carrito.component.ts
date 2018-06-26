import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-confirmar-item-carrito',
  templateUrl: './confirmar-item-carrito.component.html',
  styleUrls: ['./confirmar-item-carrito.component.scss']
})
export class ConfirmarItemCarritoComponent implements OnInit {

  private itemCarrito;

  constructor(
    public dialogRef: MatDialogRef<ConfirmarItemCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public videojuego: any,
    private carritoService: CarritoService) {
      this.videojuego = {... this.videojuego}; 
      this.itemCarrito = {};
      this.itemCarrito.cantidad = 1;
      if(this.videojuego.sucursalId != undefined){
        this.videojuego.precio = this.videojuego.precio - (this.videojuego.precio * (this.videojuego.descuento * 0.01));
      }
    }

  ngOnInit() {
  }

  agregarAlCarrito(){
    this.itemCarrito.videojuego = this.videojuego;
    this.carritoService.agregarItem(this.itemCarrito);
    this.dialogRef.close();
  }

}
