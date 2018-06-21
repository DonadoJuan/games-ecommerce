import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { Subscription } from 'rxjs';
import { Cupon } from '../../../domain/cupon';
import { CuponService } from '../../../core/services/cupon/cupon.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteDialog } from '../admin-empleados/admin-empleados.component';

@Component({
  selector: 'app-admin-cupon-descuento',
  templateUrl: './admin-cupon-descuento.component.html',
  styleUrls: ['./admin-cupon-descuento.component.scss']
})
export class AdminCuponDescuentoComponent implements OnInit, OnDestroy {

  settings: any;
  data: any[];
  dataCupon: any[] = [];
  loading: boolean;
  error: boolean;
  cuponSub: Subscription;
  cuponArr: Cupon[] = [];
  deleteCuponSub: Subscription;
  mensajeError : String = "Ocurrio un error al traer datos del cupon.";
  constructor(private us: UtilsService, 
    private cuponService : CuponService,
    private modalService: NgbModal,
    private router : Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initializeGrid();
    this.settings = {
      actions: {
        add: false, edit: false, delete: false, position: 'right', 
        custom:
          [
            { name: 'eliminar', title: `<i class="fa fa-trash-o" aria-hidden="true" title="Eliminar"></i>` }
          ]
      },

      columns: {
  
        codigo: {
          title: 'Codigo'
        },
        descuento: {
          title: 'Descuento'
        },
        validoDesde: {
          title: 'Fecha Inicio'
        },
        validoHasta: {
          title: 'Fecha Fin'
        },
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }
  }

  initializeGrid() {
    this.loading = true;
    this.cuponArr = [];
    this.dataCupon = [];
    this.cuponSub = this.cuponService.getCupones$()
      .subscribe(data => {
      
        data.forEach(d => {
          this.cuponArr.push(d);
          let validoDesde = new Date(d.validoDesde);
          let validoHasta = new Date(d.validoHasta);

          this.dataCupon.push({
            _id: d._id,
            codigo: d.codigo,
            descuento: d.descuento,
            validoDesde: validoDesde.getDate() + "/" + (validoDesde.getMonth() + 1) + "/" + validoDesde.getFullYear(),
            validoHasta: validoHasta.getDate() + "/" + (validoHasta.getMonth() + 1) + "/" + validoHasta.getFullYear(),
          });
        });
        this.fillData();
      }, 
      error => {
        console.error(error);
        this.loading = false;
        this.error = true;
      });
  }

  fillData() {
    this.data = this.dataCupon;
    this.loading = false;
  }

  
  mostrarFormulario(mostrarForm) {
    this.modalService.open(mostrarForm).result.then((result) => {
    
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onCustom(event) {
    let dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result == "Confirmado") {
        this.cuponArr.forEach(c => {
          if(c.codigo== event.data.codigo) {
            this.deleteCuponSub = this.cuponService.deleteCupon$(c._id)
              .subscribe(
                data => {
                  this.initializeGrid();
                },
                err => {
                  console.error(err);
                  this.mensajeError = "Error al borrar el cupon";
                  this.loading = false;
                  this.error = true;
                });
          }
        });
      }
    });
}
ngOnDestroy() {
  if(this.deleteCuponSub) {
    this.deleteCuponSub.unsubscribe();
  }
  this.cuponSub.unsubscribe();
}

}
