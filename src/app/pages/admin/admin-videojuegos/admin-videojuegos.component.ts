import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CheckboxComponent } from "../checkbox.component";
import { NumberComponent } from "../number.component";
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from "../../../core/services/utils/utils.service";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Videojuego } from "../../../domain/videojuego";
import { VideojuegoService } from "../../../core/services/videojuego/videojuego.service";
import { ConfirmDeleteDialog } from "../../admin/admin-empleados/admin-empleados.component";
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-admin-videojuegos',
  templateUrl: './admin-videojuegos.component.html',
  styleUrls: ['./admin-videojuegos.component.scss']
})
export class AdminVideojuegosComponent implements OnInit, OnDestroy {

  settings: any;
  data: any[];
  videojuegoSub: Subscription;
  deleteVideojuegoSub: Subscription;
  videojuegos: Videojuego[] = [];
  dataVideojuegos: any[] = [];
  loading: boolean;
  error: boolean;
  admin: boolean;
  objActions: any;

  constructor(
    private router: Router, 
    private us: UtilsService,
    private videojuegoService: VideojuegoService,
    private sanitization: DomSanitizer,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeGrid();
    let payload = this.authService.getDatosCliente().payload;
    this.admin = (payload.perfil === "Administrador") ? true : false;
    if(this.admin) {
      this.objActions = {
        add: false, edit: false, delete: false, position: 'right', 
        custom:
          [
            { name: 'editar', title: `<i class="fa fa-edit" aria-hidden="true" title="Editar"></i><br>` },
            { name: 'eliminar', title: `<i class="fa fa-trash-o" aria-hidden="true" title="Eliminar"></i>` }
          ]
      }
    } else {
      this.objActions = false;
    }
    this.settings = {
      actions: this.objActions,
      columns: {
        codigo: {
          title: 'Codigo',
          type: 'custom',
          renderComponent: NumberComponent
        },
        titulo: {
          title: 'Titulo'
        },
        genero: {
          title: 'Genero'
        },
        plataforma: {
          title: 'Plataforma'
        },
        min: {
          title: 'Cant. Minima',
          type: 'custom',
          renderComponent: NumberComponent
        },
        max: {
          title: 'Cant. Maxima',
          type: 'custom',
          renderComponent: NumberComponent
        },
        precio: {
          title: 'Precio',
          type: 'custom',
          renderComponent: NumberComponent
        },
        destacado: {
          title: 'Destacado',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%",
          show: this.admin
        },
        imagen: {
          title: 'Imagen',
          type: 'html',
          valuePrepareFunction: (imagen:string) => { return this.sanitization.bypassSecurityTrustHtml(`<img width="100px" src="${imagen}" />`); },
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }

    /*this.data = [
      {
        titulo: 'Ni No Kuni II',
        genero: 'Rol',
        plataforma: 'PS4',
        min: 5,
        max: 10,
        precio: 1500,
        descuento: 0,
        checkbox: true
      },
      {
        titulo: 'Mario Odyssey',
        genero: 'Plataforma',
        plataforma: 'Nintendo Switch',
        min: 15,
        max: 50,
        precio: 1800,
        descuento: 10,
        checkbox: true
      },
      {
        titulo: 'Horizon Zero Dawn',
        genero: 'Aventura',
        plataforma: 'PS4',
        min: 5,
        max: 10,
        precio: 1200,
        descuento: 0,
        checkbox: true
      },
      {
        titulo: 'The Last of Us',
        genero: 'Aventura',
        plataforma: 'PS4',
        min: 1,
        max: 5,
        precio: 1200,
        descuento: 15,
        checkbox: false
      }
    ]*/

  }

  onCustom(event) {
    if (`'${event.action}'` == "'eliminar'") {
      let dialogRef = this.dialog.open(ConfirmDeleteDialog, {
        width: '300px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === "Confirmado") {
          this.videojuegos.forEach(v => {
            if(v.codigo === event.data.codigo) {
              this.deleteVideojuegoSub = this.videojuegoService.deleteVideojuego$(v._id)
                .subscribe(data => {
                  this.initializeGrid();
                }, error => {
                  console.error(error);
                  this.loading = false;
                  this.error = true;
                });
            }
          });
        }
      });

    } else {
      this.videojuegos.forEach(v => {
        if(v.codigo == event.data.codigo) {
          this.us.videojuego = v;
          this.router.navigate(['admin-videojuegos-form']);
        }
      });
    }
  }

  initializeGrid() {
    this.loading = true;
    this.videojuegos = [];
    this.dataVideojuegos = [];
    this.videojuegoSub = this.videojuegoService.getVideojuegos$()
      .subscribe(data => {
        data.forEach(d => {
          this.videojuegos.push(d);
          let generos = "";
          //let plataformas = "";
          d.genero.forEach(g => {
            generos = generos.concat(g + ", ");
          });
          /*d.plataforma.forEach(p => {
            plataformas = plataformas.concat(p + ", ");
          });*/
          //console.log("generos pusheado", generos);
          generos = generos.substring(0, generos.length - 2);
          //plataformas = plataformas.substring(0, plataformas.length - 2);
          //console.log("generos final", generos);
          let image = (d.imagen) ? d.imagen : "http://localhost:3000/img/no-image.png";
          //console.log("image: ", image);
          this.dataVideojuegos.push({
            codigo: d.codigo,
            titulo: d.titulo,
            genero: generos,
            plataforma: d.plataforma,
            min: d.cantidadMinima,
            max: d.cantidadMaxima,
            precio: d.precio,
            destacado: d.destacado,
            imagen: image
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
    this.data = this.dataVideojuegos;
    this.loading = false;
  }

  ngOnDestroy() {
    if(this.deleteVideojuegoSub) {
      this.deleteVideojuegoSub.unsubscribe();
    }
    this.videojuegoSub.unsubscribe();
  }

}
