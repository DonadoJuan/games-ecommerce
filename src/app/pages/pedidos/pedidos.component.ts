import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Pedido } from "../../domain/pedido";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  displayedColumns = ['fecha', 'cliente', 'destino', 'estado'];
  dataSource: MatTableDataSource<Pedido>;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor() {
    const pedidos: Pedido[] = [];
    for (let i = 1; i <= 100; i++) { 
      pedidos.push({
        id: i,
        fecha: '15/04/2018',
        cliente: 'Bart Simpson ' + i,
        destino: 'Av. Siempreviva 742',
        estado: 'Despachado' 
      }); 
    }

    this.dataSource = new MatTableDataSource(pedidos);
  }

  ngOnInit() {
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
