import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-empleados-form',
  templateUrl: './admin-empleados-form.component.html',
  styleUrls: ['./admin-empleados-form.component.scss']
})
export class AdminEmpleadosFormComponent implements OnInit {

  perfiles: any[] = [];
  sucursales: any[] = [];
  barrios: any[] = [];

  constructor() { }

  ngOnInit() {
    this.perfiles.push({value: '1', viewValue:'Empleado'});
    this.perfiles.push({value: '2', viewValue: 'Administrador'});

    this.sucursales.push({value: '1', viewValue: 'Av. Mitre 750'});
    this.sucursales.push({value: '2', viewValue: 'Av. Santa Fe 1944'});

    this.barrios.push({value: '1', viewValue: 'Barracas'});
  }

}
