import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Videojuego } from "../../../../domain/videojuego";
import { Sucursal } from "../../../../domain/sucursal";
import { UtilsService } from "../../../../core/services/utils/utils.service";

@Component({
  selector: 'app-stock-sucursal',
  templateUrl: './stock-sucursal.component.html',
  styleUrls: ['./stock-sucursal.component.scss']
})
export class StockSucursalComponent implements OnInit {

  @Input() sucursal: Sucursal;

  displayedColumns = ['codigo', 'titulo', 'plataforma', 'stock', 'reponer'];
  dataSourceUno: MatTableDataSource<any>;
  dataVideojuegos: any[] = [];

  @ViewChild(MatSort) sortUno: MatSort;
  @ViewChild(MatPaginator) paginatorUno: MatPaginator;

  constructor() { 
    this.dataSourceUno = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.setDataSourceAttributes();
    this.cargarDatos();
  }

  private cargarDatos() {
      this.dataVideojuegos = [];
      this.sucursal.videojuegos.forEach(v => {
        //console.log(v.activo);
        if(v.activo) {
          let reposicion = 0;
          if(v.stock >= v.cantidadMaxima - 10) {
            reposicion = 0;
          } 
          else if(v.stock > v.cantidadMinima) {
            reposicion = v.cantidadMaxima - v.stock;
          } 
          else if(v.stock <= v.cantidadMinima && v.stock > 0) {
            reposicion = v.cantidadMaxima - v.cantidadMinima;
          } 
          else {
            reposicion = v.cantidadMaxima;
          }
  
          this.dataVideojuegos.push({
            codigo: v.codigo,
            titulo: v.titulo,
            plataforma: v.plataforma,
            stock: v.stock,
            reponer: reposicion
          });
        }
      });
      this.dataSourceUno.data = this.dataVideojuegos;
  }

  applyFilterUno(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceUno.filter = filterValue;
  }

  setDataSourceAttributes() {
    //this.dataSourceUno.paginator = this.paginatorUno;
    //this.dataSourceUno.sort = this.sortUno;

    setTimeout(() => this.dataSourceUno.paginator = this.paginatorUno);
    setTimeout(() => this.dataSourceUno.sort = this.sortUno);
  }

}
