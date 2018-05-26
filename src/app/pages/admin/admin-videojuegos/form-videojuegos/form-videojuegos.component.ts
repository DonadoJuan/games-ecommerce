import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Videojuego } from '../../../../domain/videojuego';
import { FormVideojuegosService } from './form-videojuegos-service.service';
import { Subscription } from 'rxjs';
import { FormVideojuegosModel } from '../../../../core/models/form-videojuegos.model';
import { VideojuegoService } from "../../../../core/services/videojuego/videojuego.service";


@Component({
  selector: 'app-form-videojuegos',
  templateUrl: './form-videojuegos.component.html',
  styleUrls: ['./form-videojuegos.component.scss'],
  providers: [FormVideojuegosService]
})
export class FormVideojuegosComponent implements OnInit, OnDestroy {

  @Input() videojuego: Videojuego;
  isEdit: boolean;

  generos: any[];
  plataformas: any[];
  formVideojuegos: FormGroup;
  formVideojuegosModel: FormVideojuegosModel;
  formErrors: any;
  submitVideojuegoObj: Videojuego;

  formChangeSub: Subscription;
  videojuegoSub: Subscription;

  seleccionoArchivo: boolean;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  tituloForm: string;

  selectedFile: File | any = {
    name: "Seleccione Imagen"
  };

  constructor(
    private fb: FormBuilder, 
    private fvs: FormVideojuegosService,
    private router: Router,
    private videojuegoService: VideojuegoService
  ) { }

   ngOnInit() {
    this.generos = ['Accion', 'Aventura', 'Deportes', 'Mundo Abierto', 'Plataformas', 'RPG'];
    this.plataformas = ['PS4', 'Xbox One', 'Nintendo Switch'];
//debugger;
    this.formErrors = this.fvs.formErrors;
    this.formVideojuegosModel = this._setFormVideojuegos();
    this._buildForm();
    if(!this.isEdit) {
      this.seleccionoArchivo = false;
      this.tituloForm = "Alta de Videojuegos";
      this.submitBtnText = "Registrar Videojuego"
    } else {
      this.tituloForm = "Modificion de Videojuegos";
      this.submitBtnText = "Modificar Videojuego";
    }
  } 

  private _setFormVideojuegos() {
    if(!this.isEdit) {
      return new FormVideojuegosModel(null, null, null, null, null, null, null, null, null, null);
    } else {
      return new FormVideojuegosModel(
        this.videojuego.titulo,
        this.videojuego.codigo,
        this.videojuego.genero,
        this.videojuego.plataforma,
        this.videojuego.cantidadMinima,
        this.videojuego.cantidadMaxima,
        this.videojuego.urlVideo,
        this.videojuego.precio,
        this.videojuego.destacado,
        this.videojuego.descripcion
      );
    }
  }


  private _buildForm() {
    //debugger
    this.formVideojuegos = this.fb.group({
      titulo: [this.formVideojuegosModel.titulo, [
        Validators.required,
        Validators.minLength(this.fvs.strMin),
        Validators.maxLength(this.fvs.strMax)
      ]],
      codigo: [this.formVideojuegosModel.codigo, [
        Validators.required,
        Validators.minLength(this.fvs.codStr),
        Validators.maxLength(this.fvs.codStr),
        Validators.pattern(this.fvs.reg)
      ]],
      genero: [this.formVideojuegosModel.genero, [
        Validators.required
      ]],
      plataforma: [this.formVideojuegosModel.plataforma, [
        Validators.required
      ]],
      cantMinima: [this.formVideojuegosModel.cantMinima, [
        Validators.required,
        Validators.min(this.fvs.intMin),
        Validators.max(this.fvs.intMax),
      ]],
      cantMaxima: [this.formVideojuegosModel.cantMaxima, [
        Validators.required,
        Validators.min(this.fvs.intMin),
        Validators.max(this.fvs.intMax),
      ]],
      urlVideo: [this.formVideojuegosModel.urlVideo, [
        Validators.required,
        Validators.minLength(this.fvs.strMin)
      ]],
      precio: [this.formVideojuegosModel.precio, [
        Validators.required,
        Validators.min(this.fvs.intMin),
        Validators.max(this.fvs.intMax),
      ]],
      destacado: [this.formVideojuegosModel.destacado],
      descripcion: [this.formVideojuegosModel.descripcion, [
        Validators.required,
        Validators.minLength(this.fvs.strMin)
      ]]
    });
    this.formChangeSub = this.formVideojuegos
    .valueChanges
    .subscribe(data => this._onValueChanged());
  }

  private _onValueChanged() {
    if(!this.formVideojuegos) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.fvs.mensajesValidacion[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        _setErrMsgs(this.formVideojuegos.get(field), this.formErrors, field);
      }
    }
  }

  onFileSelected(event) {
    if(event.target.files[0] != undefined) {
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      this.seleccionoArchivo = true;
    }
  }

  private _getSubmitObj() {
    let destacado = (this.formVideojuegos.get('destacado').value) ? this.formVideojuegos.get('destacado').value : false;
    let vj = new Videojuego(
      this.formVideojuegos.get('titulo').value,
      this.formVideojuegos.get('codigo').value,
      this.formVideojuegos.get('genero').value,
      this.formVideojuegos.get('plataforma').value,
      this.formVideojuegos.get('cantMinima').value,
      this.formVideojuegos.get('cantMaxima').value,
      null,
      this.formVideojuegos.get('urlVideo').value,
      this.formVideojuegos.get('precio').value,
      0,
      destacado,
      this.formVideojuegos.get('descripcion').value,
      0
    );
    return vj;
  }

  onSubmit() {
    this.submitting = true;
    this.submitVideojuegoObj = this._getSubmitObj();

    if(!this.isEdit) {
      this.videojuegoSub = this.videojuegoService.postVideojuego$(this.selectedFile, this.submitVideojuegoObj)
        .subscribe(res => {
          console.log(res);
          this._handleSubmitSuccess(res);
        }, err => {
          console.log(err);
          this._handleSubmitError(err);
        });
    }    
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.router.navigate(['admin-videojuegos']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if(this.videojuegoSub) {
      this.videojuegoSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
  
}
