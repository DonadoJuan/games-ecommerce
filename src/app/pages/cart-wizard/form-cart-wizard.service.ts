import { Injectable } from '@angular/core';

@Injectable()
export class FormCartWizardService {
 
  mensajesValidacion: any;
  mensajesValidacionTarjeta: any;

  formErrors = {
    barrio: '',
    calle: '',
    altura: '',
    codigo_postal: ''
  };

  formErrorsTarjeta = {
    tipoTarjeta : '',
    nombre : '',
    numero: '',
    vencimiento:'',
    codigo:'',
    barrio: '',
    calle: '',
    altura: ''
  };
  
  strMin = 3; // Nombre, Calle, Email
  strMax = 30;
  intMin = 1; //Legajo, Altura, Codigo Postal
  intMax = 99999;
  intNumeroMin = 1000000000000000 ;
  intNumeroMax = 9999999999999999999;
  codMin = 1;
  codMax = 9999;
  telMin = 10000000;
  telMax = 9999999999;
  reg = /^\d+$/;
  regCreditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  //regNombre = /^([^0-9]*)$/;
  regNombre=/^[a-zA-Z\s]*$/;
  regCalle = /^[A-Za-z0-9 _.]*[A-Za-z]+[A-Za-z0-9 _.]*$/;

  constructor() { 
    this.mensajesValidacion = {
      barrio: {
        required: `El Barrio es <strong>requerido</strong>`
      },
      calle: {
        required: `La Calle es <strong>requerida</strong>`,
        minlength: `La calle debe tener ${this.strMin} caracteres o mas`,
        maxlength: `La calle debe tener ${this.strMax} caracteres o menos`,
        pattern: `La calle debe tener solo letras o numeros!`
      },
      altura: {
        required: `La Altura es <strong>requerida</strong>`,
        min: `La altura debe ser de ${this.intMin} a ${this.intMax}`,
        max: `La altura debe ser de ${this.intMin} a ${this.intMax}`,
        pattern: `Debe ser un numero entero`
      },
      codigo_postal: {
        required: `El Codigo Postal es <strong>requerido</strong>`,
        min: `El Codigo Postal debe ser de ${this.intMin} a ${this.intMax}`,
        max: `El Codigo Postal debe ser de ${this.intMin} a ${this.intMax}`,
        pattern: `Debe ser un numero entero`
      }
    };

    this.mensajesValidacionTarjeta = {
      tipoTarjeta: {
        required: `El tipo de tarjeta es <strong>requerida</strong>`
      },
      nombre: {
        required: `El Nombre es <strong>requerido</strong>`,
        minlength: `El nombre debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El nombre debe tener ${this.strMax} caracteres o menos`,
        pattern: `El nombre solo puede tener letras!`
      },
      numero: {
        required: `El numero de tarjeta es <strong>requerido</strong>`,
        min: `Numero de tarjeta invalido debe tener como minimo 16 digitos`,
        max: `Numero de tarjeta invalido debe tener como maximo 19 digitos`,
        pattern: `Debe ser un numero entero`
      },
      vencimiento: {
        required: `El vencimiento es <strong>requerido</strong>`
      },
      codigo: {
        required: `El codigo de seguridad es <strong>requerido</strong>`,
        min: `codigo de seguridad invalido`,
        max: `codigo de seguridad invalido debe tener como maximo 4 digitos`,
        pattern: `Debe ser un numero entero`
      },
      barrio: {
        required: `El Barrio es <strong>requerido</strong>`
      },
      calle: {
        required: `La Calle es <strong>requerida</strong>`,
        minlength: `La calle debe tener ${this.strMin} caracteres o mas`,
        maxlength: `La calle debe tener ${this.strMax} caracteres o menos`,
        pattern: `La calle debe tener solo letras o numeros!`
      },
      altura: {
        required: `La Altura es <strong>requerida</strong>`,
        min: `La altura debe ser de ${this.intMin} a ${this.intMax}`,
        max: `La altura debe ser de ${this.intMin} a ${this.intMax}`,
        pattern: `Debe ser un numero entero`
      }
    };
  }
}
