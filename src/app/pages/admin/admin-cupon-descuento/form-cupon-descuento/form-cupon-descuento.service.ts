import { Injectable } from '@angular/core';

@Injectable()
export class FormCuponDescuentoService {

  mensajesValidacion: any;

  formErrors = {
    codigo: '',
    descuento:'',
    validoDesde:'',
    validoHasta:''
  };

  strMin = 5; 
  strMax = 20;

  intMin = 1; 
  intMax = 50;


  constructor() { 
    this.mensajesValidacion = {
      codigo: {
        required: `El Codigo es <strong>requerido</strong>`,
        minlength: `El Codigo debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El Codigo debe tener ${this.strMax} caracteres o menos`
      },
      legajo: {
        required: `El Legajo es <strong>requerido</strong>`,
        min: `El legajo debe ser de ${this.intMin} a ${this.intMax}`,
        max: `El legajo debe ser de ${this.intMin} a ${this.intMax}`
      },
      validoDesde: {
        required: `La Fecha de Inicio es <strong>requerida</strong>`
      },
      validoHasta: {
        required: `La Fecha de Fin es <strong>requerida</strong>`
      }
    };
  }

}
