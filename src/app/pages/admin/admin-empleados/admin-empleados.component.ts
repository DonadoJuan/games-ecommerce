import { Component, OnInit, OnDestroy } from '@angular/core';
import { NumberComponent } from "../number.component";
import { CheckboxComponent } from '../checkbox.component';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from "../../../core/api.service";
import { Barrio } from "../../../domain/barrio";
import { Domicilio } from "../../../domain/domicilio";
import { Sucursal } from "../../../domain/sucursal";
import { Personal } from "../../../domain/personal";
import { UtilsService } from "../../../core/utils.service";
import { MatDialog, MatDialogRef } from '@angular/material';


//declare var $: any;

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>
  ) { 
      //dialogRef.disableClose = true;
  }

  confirm(): void {
    this.dialogRef.close('Confirmado');
  }

  cancel(): void {
    this.dialogRef.close('Cancelado');
  }

}

@Component({
  selector: 'app-admin-empleados',
  templateUrl: './admin-empleados.component.html',
  styleUrls: ['./admin-empleados.component.scss']
})
export class AdminEmpleadosComponent implements OnInit, OnDestroy {

  settings: any;
  data: any[];
  dataPersonal: any[] = [];
  personal: Personal[] = [];
  personalSub: Subscription;
  deletePersonalSub: Subscription;
  loading: boolean;
  error: boolean;

  constructor(private router: Router, private api: ApiService, private us: UtilsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.initializeGrid();
    this.settings = {
      actions: {
        add: false, edit: false, delete: false, position: 'right', 
        custom:
          [
            { name: 'editar', title: `<i class="fa fa-edit" aria-hidden="true" title="Editar"></i><br>` },
            { name: 'eliminar', title: `<i class="fa fa-trash-o" aria-hidden="true" title="Eliminar"></i>` }
          ]
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
        }
        /*checkbox: {
          title: 'Clave descuento',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%",
        }*/
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }

    //this.data = this.dataPersonal; 
    /*[
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
    ];*/


  }

  initializeGrid() {
    this.loading = true;
    this.personal = [];
    this.dataPersonal = [];
    this.personalSub = this.api.getPersonal$()
      .subscribe(
        data => {
          data.forEach(d => {
            this.personal.push(d);
          });
          this.personal.forEach(p => {
            console.log(p);
            let fecha = new Date(p.fecha_nacimiento);
            this.dataPersonal.push({
              nombre: p.nombre,
              legajo: p.legajo,
              dni: p.dni,
              perfil: p.perfil,
              sucursal: p.sucursal.ubicacion.calle + " " + p.sucursal.ubicacion.altura,
              fecha_nac: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
              email: p.email,
              domicilio: p.domicilio.calle + " " + p.domicilio.altura,
              telefono: p.telefono
            });
          });
          this.fillData();
        }, 
        error => {
          console.error(error);
          this.loading = false;
          this.error = true;
        }
      );
  }

  onCustom(event) {
    if (`'${event.action}'` == "'eliminar'") {
      let dialogRef = this.dialog.open(ConfirmDeleteDialog, {
        width: '300px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result == "Confirmado") {
          this.personal.forEach(p => {
            if(p.dni == event.data.dni) {
              this.deletePersonalSub = this.api.deletePersonal$(p._id)
                .subscribe(
                  data => {
                    this.initializeGrid();
                  },
                  err => console.error(err)
                );
            }
          });
        }
      });
      
    } else {
      this.personal.forEach(p => {
        if(p.dni == event.data.dni) {
          this.us.personal = p;
          this.router.navigate(['admin-empleados-form']);
        }
      });
    }
  }

  fillData() {
    //this.data = null;
    this.data = this.dataPersonal;
    this.loading = false;
  }

  ngOnDestroy() {
    if(this.deletePersonalSub) {
      this.deletePersonalSub.unsubscribe();
    }
    this.personalSub.unsubscribe();
  }

}
