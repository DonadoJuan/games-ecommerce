import { Injectable } from '@angular/core';

@Injectable()
export class FormVideojuegosService {

  mensajesValidacion: any;

  formErrors = {
    titulo: '',
    codigo:'',
    genero: '',
    plataforma:'',
    cantMinima: '',
    cantMaxima:'',
    urlVideo: '',
    precio:'',
    descripcion: ''
  };

  strMin = 3; // Nombre, Calle, Email
  strMax = 30;
  titleMax = 200;
  dniMin = 1000000;
  dniMax = 99999999;
  intMin = 1; //Legajo, Altura, Codigo Postal
  intMax = 99999;
  codStr = 4;
  reg = /^\d+$/;


  constructor() { 
    this.mensajesValidacion = {
      titulo: {
        required: `El Titulo es <strong>requerido</strong>`,
        minlength: `El Titulo debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El Titulo debe tener ${this.titleMax} caracteres o menos`
      },
      codigo: {
        required: `El codigo es <strong>requerido</strong>`,
        minlength: `El codigo debe ser de ${this.codStr} digitos`,
        maxlength: `El codigo debe ser de ${this.codStr} digitos`,
        pattern: `El codigo debe ser numerico`
      },
      genero: {
        required: `Debe elegir al menos un <strong>Genero</strong>`
      },
      plataforma: {
        required: `Debe elegir una <strong>Plataforma</strong>`
      },
      cantMinima: {
        required: `La cantidad minima es <strong>requerida</strong>`,
        min: `La cantidad minima debe ser ${this.intMin} o mas`,
        max: `La cantidad minima debe ser ${this.intMax} o menos`
      },
      cantMaxima: {
        required: `La cantidad maxima es <strong>requerida</strong>`,
        min: `La cantidad maxima debe tener ${this.intMin} o mas`,
        max: `La cantidad maxima debe tener ${this.intMax} o menos`
      },
      urlVideo: {
        required: `La url del video es <strong>requerida</strong>`,
        minlength: `La url del video debe tener ${this.strMin} caracteres o mas`
      },
      precio: {
        required: `El precio es <strong>requerido</strong>`,
        min: `El precio debe ser ${this.intMin}$ o  mas`,
        max: `El precio debe ser ${this.intMin}$ o menos`
      },
      descripcion: {
        required: `La descripcion es <strong>requerida</strong>`,
        minlength: `La descripcion debe tener ${this.strMin} caracteres o mas`
      }
    };
  }

}
