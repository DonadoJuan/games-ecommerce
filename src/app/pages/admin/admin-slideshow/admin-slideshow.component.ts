import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
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
  objeto : any;
  contarVisibles : number = 0;
  @Input() rowData: any;


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
          editable: false,
          editor:[
            {
            type : 'checkbox'
            }
          ],
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
    
    
  }

  initializeGrid() {
    this.loading = true;
    this.sliderArr = [];
    this.dataSlider = [];
    this.sliderSub = this.sliderService.getSlider$()
      .subscribe(data => {
      
        data.forEach(d => {
          this.sliderArr.push(d);
          let image = (d.imagen) ? d.imagen : "http://localhost:3000/img/no-image.png";
          //console.log("image: ", image);
          if(d.visible){
            this.contarVisibles++;
            localStorage.setItem("cantVisible",this.contarVisibles.toString());
            
          }
          this.dataSlider.push({
            _id: d._id,
            titulo: d.titulo,
            imagen: image,
            visible : d.visible
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
            if(s._id== event.data._id) {
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
  checkBoxClick(event){
    console.log(this.settings);

    if(event.target.checked){
      this.contarVisibles++;
    }else{
      this.contarVisibles--;
    }
    console.log(this.contarVisibles);
    if(this.contarVisibles>5){
      this.error = true;
      this.mensajeError = "Solo se pueden mostrar 5 imagenes.";
    }
    localStorage.setItem("cantVisible",this.contarVisibles.toString());

  }

}
