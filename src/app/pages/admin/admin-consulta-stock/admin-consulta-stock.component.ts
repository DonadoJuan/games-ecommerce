import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Videojuego } from "../../../domain/videojuego";
import { UtilsService } from "../../../core/services/utils/utils.service";
import { SucursalService } from "../../../core/services/sucursal/sucursal.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-consulta-stock',
  templateUrl: './admin-consulta-stock.component.html',
  styleUrls: ['./admin-consulta-stock.component.scss']
})
export class AdminConsultaStockComponent implements OnInit {

  displayedColumns = ['codigo', 'titulo', 'plataforma', 'stock', 'reponer'];
  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  private sort: MatSort;
  sucursalesSub: Subscription;
  videojuegos: Videojuego[] = [];
  dataVideojuegos: any[] = [];
  loading: boolean = false;
  error: boolean = false;
  sucursalId = "5af78c88a4616c223463102a";

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(private us: UtilsService, private sucursalService: SucursalService) { 
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loading = true;
    this.sucursalesSub = this.sucursalService.getSucursales()
      .subscribe(data => {
        this.loading = false;
        data.forEach(s => {
          if(s._id === this.sucursalId) {
            s.videojuegos.forEach(v => {
              console.log(v.activo);
              if(v.activo) {
                this.videojuegos.push(v);
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
          }
        });
        this.dataSource = new MatTableDataSource(this.dataVideojuegos);
      }, err => {
        console.log(err);
        this.loading = false;
        this.error = true;
      });
  }

  setDataSourceAttributes() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
