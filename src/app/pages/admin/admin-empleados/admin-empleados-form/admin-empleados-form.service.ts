import { Injectable } from '@angular/core';

@Injectable()
export class AdminEmpleadosFormService {
  mensajesValidacion: any;

  formErrors = {
    nombre: '',
    legajo: '',
    dni: '',
    fecha_nacimiento: '',
    email: '',
    perfil: '',
    sucursal: '',
    barrio: '',
    calle: '',
    altura: '',
    codigo_postal: '',
    telefono: '',
    password:''
  };

  strMin = 3; // Nombre, Calle, Email
  strMax = 30;
  passMin = 7;
  passMax = 40;
  dniMin = 1000000;
  dniMax = 99999999;
  intMin = 1; //Legajo, Altura, Codigo Postal
  intMax = 99999;
  telMin = 10000000;
  telMax = 9999999999;
  reg = /^\d+$/;
  regNombre=/^[a-zA-Z\s]*$/;
  regCalle = /^[A-Za-z0-9 _.]*[A-Za-z]+[A-Za-z0-9 _.]*$/;

  constructor() { 
    this.mensajesValidacion = {
      nombre: {
        required: `El Nombre es <strong>requerido</strong>`,
        minlength: `El nombre debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El nombre debe tener ${this.strMax} caracteres o menos`,
        pattern: `El nombre solo puede tener letras!`
      },
      legajo: {
        required: `El Legajo es <strong>requerido</strong>`,
        min: `El legajo debe ser de ${this.intMin} a ${this.intMax}`,
        max: `El legajo debe ser de ${this.intMin} a ${this.intMax}`,
        pattern: `Debe ser un numero entero`
      },
      dni: {
        required: `El Dni es <strong>requerido</strong>`,
        min: `Numero de Dni invalido`,
        max: `Numero de Dni invalido`,
        pattern: `Debe ser un numero entero`
      },
      fecha_nacimiento: {
        required: `La Fecha de Nacimiento es <strong>requerida</strong>`
      },
      email: {
        required: `El Email es <strong>requerido</strong>`,
        minlength: `El email debe tener ${this.strMin} caracteres o mas`,
        maxlength: `El email debe tener ${this.strMax} caracteres o menos`,
        email: `La direccion ingresada no tiene formato de correo electronico`
      },
      perfil: {
        required: `El Perfil es <strong>requerido</strong>`
      },
      sucursal: {
        required: `La Sucursal es <strong>requerida</strong>`
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
      },
      password: {
        required: `La contraseña es <strong>requerida</strong>`,
        minlength: `La contraseña debe tener ${this.passMin} caracteres o mas`,
        maxlength: `La contraseña debe tener ${this.passMax} caracteres o menos`
      }

    };
  }

}
