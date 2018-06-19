import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckboxComponent } from "../checkbox.component";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Slider } from '../../../domain/slider';
import { FormSliderModel } from '../../../core/models/form-slider.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SliderService } from '../../../core/services/slider/slider.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDeleteDialog } from '../admin-empleados/admin-empleados.component';
import { NumberComponent } from '../number.component';

@Component({
  selector: 'app-admin-slideshow',
  templateUrl: './admin-slideshow.component.html',
  styleUrls: ['./admin-slideshow.component.scss'],
  providers: [SliderService]
})
export class AdminSlideshowComponent implements OnInit, OnDestroy {

  settings: any;
  data: any[];
  formularioVisible: boolean = false;
  formSliderModel: FormSliderModel;
  dataSlider: any[] = [];
  loading: boolean;
  error: boolean;
  sliderSub: Subscription;
  sliderArr: Slider[] = [];
  deleteSliderSub: Subscription;
  mensajeError : String = "Ocurrio un error al traer datos del slider.";



  private listaSlider : Slider[] = new Array();

  constructor(private modalService: NgbModal,
              private us: UtilsService,
              private sliderService : SliderService,
              private sanitization: DomSanitizer,
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
  
        titulo: {
          title: 'Titulo'
        },
        visible: {
          title: 'Visible',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%"
        },
        imagen: {
          title: 'Imagen',
          type: 'html',
          valuePrepareFunction: (imagen:string) => { return this.sanitization.bypassSecurityTrustHtml(`<img width="150px" src="${imagen}" />`); },
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }
    /*
    this.settings = {
      actions: {
        delete: true,
        add: false,
        edit: false,
      },
      columns: {
        checkbox: {
          title: 'Seleccionar',
          type: 'custom',
          renderComponent: CheckboxComponent,
          filter: false,
          width: "10%"
        },
        name: {
          title: 'Nombre'
        },
        image: {
          title: 'Imagen',
          type: 'html',
          filter: false,
          sort: false
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped' // this is custom table scss or css class for table
      }
    }

    this.data = [
      {
        checkbox: true,
        name: 'Ni No Kuni II',
        image: '<img src="../../../../assets/slider/ni_no_kuni.jpg" width="200px" height="100px"/>'
      },
      {
        checkbox: true,
        name: 'Mario Odyssey',
        image: '<img src="../../../../assets/slider/mario_odyssey.jpg" width="200px" height="100px"/>'
      },
      {
        checkbox: true,
        name: 'Horizon',
        image: '<img src="../../../../assets/slider/horizon.jpg" width="200px" height="100px"/>'
      }
    ]
    */
 
  }

  initializeGrid() {
    this.loading = true;
    this.sliderArr = [];
    this.dataSlider = [];
    this.sliderSub = this.sliderService.getSlider$()
      .subscribe(data => {
      
        data.forEach(d => {
          this.sliderArr.push(d);
          console.log(d);
          let image = (d.imagen) ? d.imagen : "http://localhost:3000/img/no-image.png";
          //console.log("image: ", image);
          this.dataSlider.push({
            _id: d._id,
            titulo: d.titulo,
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
    this.data = this.dataSlider;
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
          this.sliderArr.forEach(s => {
            if(s.titulo== event.data.titulo) {
              this.deleteSliderSub = this.sliderService.deleteSlider$(s._id)
                .subscribe(
                  data => {
                    this.initializeGrid();
                  },
                  err => {
                    console.error(err);
                    this.mensajeError = "Error al borrar el videojuego del slider";
                    this.loading = false;
                    this.error = true;
                  });
            }
          });
        }
      });
  }
  ngOnDestroy() {
    if(this.deleteSliderSub) {
      this.deleteSliderSub.unsubscribe();
    }
    this.sliderSub.unsubscribe();
  }

}
