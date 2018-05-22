import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Videojuego } from '../../../../domain/videojuego';
import { FormVideojuegosService } from './form-videojuegos-service.service';
import { Subscription } from 'rxjs';
import { FormVideojuegosModel } from '../../../../core/models/form-videojuegos.model';


@Component({
  selector: 'app-form-videojuegos',
  templateUrl: './form-videojuegos.component.html',
  styleUrls: ['./form-videojuegos.component.scss'],
  providers: [FormVideojuegosService]
})
export class FormVideojuegosComponent implements OnInit {

  generos: any[] = [];
  companias: any[] = [];
  plataformas: any[] = [];
  formVideojuegos: FormGroup;
  formVideojuegosModel: FormVideojuegosModel;
  formErrors: any;
  formChangeSub: Subscription;
  @Input() videojuego: Videojuego;


  constructor(private fb: FormBuilder, private fvs: FormVideojuegosService) { }

   ngOnInit() {
    this.generos.push({value: '1', viewValue:'RPG'});
    this.generos.push({value: '2', viewValue: 'Deportes'});

    this.companias.push({value: '1', viewValue: 'Naughty Dog'});
    this.companias.push({value: '2', viewValue: 'Square Enix'});

    this.plataformas.push({value: '1', viewValue: 'PS4'});
debugger;
    this.formErrors = this.fvs.formErrors;
    this.formVideojuegosModel = this._setFormVideojuegos();
    this._buildForm();
  
  } 

  private _setFormVideojuegos() {
  
      return new FormVideojuegosModel(null, null, null, null, null, null, null, null, null);
    }


  private _buildForm() {
    debugger
    this.formVideojuegos = this.fb.group({
      titulo: [this.formVideojuegosModel.titulo, [
        Validators.required,
        Validators.minLength(this.fvs.strMin),
        Validators.maxLength(this.fvs.strMax)
      ]],
      codigo: [this.formVideojuegosModel.codigo, [
        Validators.required,
        Validators.minLength(this.fvs.strMin),
        Validators.maxLength(this.fvs.strMax)
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
        Validators.minLength(this.fvs.strMin),
        Validators.maxLength(this.fvs.strMax)
      ]],
      precio: [this.formVideojuegosModel.precio, [
        Validators.required,
        Validators.min(this.fvs.intMin),
        Validators.max(this.fvs.intMax),
      ]],
      descripcion: [this.formVideojuegosModel.descripcion, [
        Validators.required,
        Validators.minLength(this.fvs.strMin),
        Validators.maxLength(this.fvs.strMax)
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

  
}
