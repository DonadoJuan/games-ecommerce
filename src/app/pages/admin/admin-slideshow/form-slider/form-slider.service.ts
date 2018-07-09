import { Injectable } from '@angular/core';

@Injectable()
export class FormSliderService {

  mensajesValidacion: any;

  formErrors = {
    titulo: '',
  };

  strMin = 3; // Nombre, Calle, Email
  titleMax = 50;
  regNombre=/^[a-zA-Z\s]*$/;
  regTitulo = /^[A-Za-z0-9 _.:]*[A-Za-z]+[A-Za-z0-9 _.:]*$/;


  constructor() { 
    this.mensajesValidacion = {
      titulo: {
        required: `El Titulo es <strong>requerido</strong>`,
        minlength: `El Titulo debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El Titulo debe tener ${this.titleMax} caracteres o menos`,
        pattern: `Formato del titulo invalido!`
      }
    };
  }

}
