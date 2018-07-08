import { Injectable } from '@angular/core';

@Injectable()
export class FormSignupService {
  mensajesValidacion: any;

  formErrors = {
    nombre: '',
    email: '',
    password: '',
    verificar_password: '',
    telefono: '',
    dni: '',
    barrio: '',
    calle: '',
    altura: '',
    codigo_postal: ''
  };

  strMin = 3; // Nombre, Calle, Email
  strMax = 30;
  dniMin = 1000000;
  dniMax = 99999999;
  intMin = 1; //Legajo, Altura, Codigo Postal
  intMax = 99999;
  telMin = 10000000;
  telMax = 9999999999;
  reg = /^\d+$/;
  //regNombre = /^([^0-9]*)$/;
  regNombre=/^([a-zA-Z]*)$/;

  constructor() { 
    this.mensajesValidacion = {
      nombre: {
        required: `El Nombre es <strong>requerido</strong>`,
        minlength: `El nombre debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El nombre debe tener ${this.strMax} caracteres o menos`,
        pattern: `El nombre solo puede tener letras!`
      },
      password: {
        required: `La contraseña es <strong>requerida</strong>`,
        minlength: `La contraseña debe tener ${this.strMin} caracteres o mas`,
        maxlength: `La contraseña debe tener ${this.strMax} caracteres o menos`
      },
      verificar_password: {
        required: `Reingrese la contraseña por favor</strong>`,
        minlength: `La contraseña debe tener ${this.strMin} caracteres o mas`,
        maxlength: `La contraseña debe tener ${this.strMax} caracteres o menos`,
      },
      dni: {
        required: `El Dni es <strong>requerido</strong>`,
        min: `Numero de Dni invalido`,
        max: `Numero de Dni invalido`,
        pattern: `Debe ser un numero entero`
      },
      email: {
        required: `El Email es <strong>requerido</strong>`,
        minlength: `El email debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El email debe tener ${this.strMax} caracteres o menos`,
        email: `La direccion ingresada no tiene formato de correo electronico`
      },
      barrio: {
        required: `El Barrio es <strong>requerido</strong>`
      },
      calle: {
        required: `La Calle es <strong>requerida</strong>`,
        minlength: `La calle debe tener ${this.strMin} caracteres o mas`,
        maxlength: `La calle debe tener ${this.strMax} caracteres o menos`
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
      },
      telefono: {
        required: `El Telefono es <strong>requerido</strong>`,
        min: `Numero de telefono invalido`,
        max: `Numero de telefono invalido`,
        pattern: `Debe ser un numero entero`
      }
    };
  }
}
