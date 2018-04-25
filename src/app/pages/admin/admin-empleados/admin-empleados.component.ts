import { Component, OnInit } from '@angular/core';
import { NumberComponent } from "../number.component";
import { CheckboxComponent } from '../checkbox.component';
import { Router, NavigationStart } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin-empleados',
  templateUrl: './admin-empleados.component.html',
  styleUrls: ['./admin-empleados.component.scss']
})
export class AdminEmpleadosComponent implements OnInit {

  settings: any;
  data: any[];

  constructor(router: Router) { }

  ngOnInit() {

    this.settings = {
      actions: {
        add: false, edit: false, delete: false, position: 'right', custom:
          [{ name: 'editar', title: `<i class="fa fa-edit" aria-hidden="true" title="Editar"></i><br>` },
          { name: 'eliminar', title: `<i class="fa fa-trash-o" aria-hidden="true" title="Eliminar"></i>` }]
      },



      columns: {

        nombre: {
          title: 'Nombre'
        },
        legajo: {
          title: 'Legajo',
          type: 'custom',
          renderComponent: NumberComponent
        },
        dni: {
          title: 'Dni',
          type: 'custom',
          renderComponent: NumberComponent
        },
        perfil: {
          title: 'Perfil',
        },
        sucursal: {
          title: 'Sucursal',
        },
        fecha_nac: {
          title: 'Fecha Nacimiento'
        },
        email: {
          title: 'Email'
        },
        domicilio: {
          title: 'Domicilio'
        },
        telefono: {
          title: 'Telefono',
          type: 'custom',
          renderComponent: NumberComponent
        },
        checkbox: {
          title: 'Clave descuento',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%",
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }

    this.data = [
      {
        nombre: 'Maria LaDelBarrio',
        legajo: 123,
        dni: 32111899,
        perfil: 'Empleado',
        sucursal: 'Av. Mitre 750',
        fecha_nac: '14/10/1984',
        email: 'mladelbarrio@padogi.com',
        domicilio: 'Av. Pavon 1133',
        telefono: 45559123
      },
      {
        nombre: 'Mister Ed',
        legajo: 444,
        dni: 27888971,
        perfil: 'Empleado',
        sucursal: 'Av. Mitre 750',
        fecha_nac: '12/02/1975',
        email: 'med@padogi.com',
        domicilio: 'Defensa 1742',
        telefono: 45571134
      },
      {
        nombre: 'Elbo Lastristes',
        legajo: 912,
        dni: 36744198,
        perfil: 'Administrador',
        sucursal: 'Av. Santa Fe 1944',
        fecha_nac: '4/11/1991',
        email: 'elastristes@padogi.com',
        domicilio: 'Av. Asamblea 1132',
        telefono: 47812390
      }
    ];


  }

  onCustom(event) {
    if (`'${event.action}'` == "'eliminar'") {

      //agregar accion para eliminar
    } else {
      //agregar accion  para editar
    }
  }

}
