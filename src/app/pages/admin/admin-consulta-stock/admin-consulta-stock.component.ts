import { Component, OnInit, ViewChild, ViewChildren, OnDestroy, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Videojuego } from "../../../domain/videojuego";
import { Sucursal } from "../../../domain/sucursal";
import { UtilsService } from "../../../core/services/utils/utils.service";
import { SucursalService } from "../../../core/services/sucursal/sucursal.service";
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-admin-consulta-stock',
  templateUrl: './admin-consulta-stock.component.html',
  styleUrls: ['./admin-consulta-stock.component.scss']
})
export class AdminConsultaStockComponent implements OnInit, OnDestroy {

  displayedColumns = ['codigo', 'titulo', 'plataforma', 'stock', 'reponer'];
  //dataSourceUno: MatTableDataSource<any>;
  dataSourceDos: MatTableDataSource<any>;
  dataSourceTres: MatTableDataSource<any>;
  sucursalesSub: Subscription;
  sucursales: Sucursal[] = [];
  dataVideojuegos: any[] = [];
  loading: boolean = false;
  error: boolean = false;
  sucursalId = "5af78c88a4616c223463102a";
  sucursalTabUno: string;
  sucursalTabDos: string;
  sucursalTabTres: string;
  admin: boolean;
  sucursalUno: Sucursal;

  //@ViewChild('sortUno') sortUno: MatSort;

  //@ViewChild('paginatorUno') paginatorUno: MatPaginator;

  @ViewChild('sortDos') sortDos: MatSort;

  @ViewChild('paginatorDos') paginatorDos: MatPaginator;

  @ViewChild('sortTres') sortTres: MatSort;

  @ViewChild('paginatorTres') paginatorTres: MatPaginator;


  constructor(private us: UtilsService, private sucursalService: SucursalService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { 
    //this.dataSourceUno = new MatTableDataSource([]);
    this.dataSourceDos = new MatTableDataSource([]);
    this.dataSourceTres = new MatTableDataSource([]);
  }

  ngOnInit() {
    
    this.loading = true;
    this.admin = true;
    if(this.admin) {
      this.sucursalesSub = this.sucursalService.getSucursales()
      .subscribe(data => {
        this.loading = false;
        this.sucursales = data;
        this.sucursalTabUno = this.sucursales[0].ubicacion.calle + " " + this.sucursales[0].ubicacion.altura;
        this.sucursalTabDos = this.sucursales[1].ubicacion.calle + " " + this.sucursales[1].ubicacion.altura;
        this.sucursalTabTres = this.sucursales[2].ubicacion.calle + " " + this.sucursales[2].ubicacion.altura;
        this.sucursalUno = this.sucursales[0];
        this.cargarDatos();
      }, err => {
        console.log(err);
        this.loading = false;
        this.error = true;
      });
    } else {
      this.sucursalesSub = this.sucursalService.getSucursalById$(this.sucursalId)
      .subscribe(data => {
        this.loading = false;
        this.sucursales.push(data);
        this.sucursalTabUno = this.sucursales[0].ubicacion.calle + " " + this.sucursales[0].ubicacion.altura;
        this.sucursalUno = this.sucursales[0];
        //this.cargarDatos();       
      }, err => {
        console.log(err);
        this.loading = false;
        this.error = true;
      });
    }
    this.setDataSourceAttributes();
  }

  _setDataSource($event) {
    this.setDataSourceAttributes();
  }

  private cargarDatos() {
    let i = 0;
    this.sucursales.forEach(suc => {
      this.dataVideojuegos = [];
      suc.videojuegos.forEach(v => {
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
      if(i === 0){
        //this.dataSourceUno.data = this.dataVideojuegos;
      }

      if(i === 1) {
        this.dataSourceDos.data = this.dataVideojuegos;
      }

      if(i === 2) {
        this.dataSourceTres.data = this.dataVideojuegos;
      }
      i++;
    });
    
  }

  setDataSourceAttributes() {
    //this.dataSourceUno.paginator = this.paginatorUno;
    //this.dataSourceUno.sort = this.sortUno;
    //this.dataSourceDos.paginator = this.paginatorDos;
    //this.dataSourceDos.sort = this.sortDos;
    //this.dataSourceTres.paginator = this.paginatorTres;
    //this.dataSourceTres.sort = this.sortTres;
    //setTimeout(() => this.dataSourceUno.paginator = this.paginatorUno);
    //setTimeout(() => this.dataSourceUno.sort = this.sortUno);

    setTimeout(() => this.dataSourceDos.paginator = this.paginatorDos);
    setTimeout(() => this.dataSourceDos.sort = this.sortDos);

    setTimeout(() => this.dataSourceTres.paginator = this.paginatorTres);
    setTimeout(() => this.dataSourceTres.sort = this.sortTres);
  }

  applyFilterUno(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //this.dataSourceUno.filter = filterValue;
  }

  applyFilterDos(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceDos.filter = filterValue;
  }

  applyFilterTres(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceTres.filter = filterValue;
  }

  ngOnDestroy() {
    this.sucursalesSub.unsubscribe();
    //this.paginatorUno.ngOnDestroy();
    //this.paginatorDos.ngOnDestroy();
    //this.paginatorTres.ngOnDestroy();
    //this.dataSourceUno.disconnect();
    //this.dataSourceDos.disconnect();
    //this.dataSourceTres.disconnect();
  }

}
