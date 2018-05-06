import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Barrio } from "../../../../domain/barrio";
import { Domicilio } from "../../../../domain/domicilio";
import { Sucursal } from "../../../../domain/sucursal";
import { FormEmpleadosModel } from "../../../../core/models/form-empleados.model";
import { AdminEmpleadosFormService } from "./admin-empleados-form.service";
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Personal } from "../../../../domain/personal";


@Component({
  selector: 'app-admin-empleados-form',
  templateUrl: './admin-empleados-form.component.html',
  styleUrls: ['./admin-empleados-form.component.scss']
})
export class AdminEmpleadosFormComponent implements OnInit {

  @Input() personal: Personal;
  isEdit: boolean;

  formEmpleados: FormGroup;
  formEmpleadosModel: FormEmpleadosModel;
  formErrors: any;
  formChangeSub: Subscription;

  submitPersonalObj: Personal;
  submitPersonalSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  perfiles: any[] = [];
  sucursales: any[] = [];
  barrios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private aes: AdminEmpleadosFormService,
    private router: Router) { }

  ngOnInit() {
    this.perfiles.push({value: '1', viewValue:'Empleado'});
    this.perfiles.push({value: '2', viewValue: 'Administrador'});

    this.sucursales.push({value: '1', viewValue: 'Av. Mitre 750'});
    this.sucursales.push({value: '2', viewValue: 'Av. Santa Fe 1944'});

    this.barrios.push({value: '1', viewValue: 'Barracas'});

    this.formErrors = this.aes.formErrors;
    this.isEdit = !!this.personal;
    this.submitBtnText = this.isEdit ? 'Modificar Personal' : 'Crear Personal';
    this.formEmpleadosModel = this._setFormEmpleados();
    this._buildForm();
  }


  private _setFormEmpleados() {
    if(!this.isEdit) {
      return new FormEmpleadosModel(null, null, null, null, null, null, null, new Domicilio(null, null, null, null), null);
    } else {
      return new FormEmpleadosModel(
        this.personal.nombre,
        this.personal.legajo,
        this.personal.dni,
        this.personal.fecha_nacimiento,
        this.personal.email,
        this.personal.perfil,
        this.personal.sucursal,
        this.personal.domicilio,
        this.personal.telefono
      );
    }
  }

  private _buildForm() {
    this.formEmpleados = this.fb.group({
      nombre: [this.formEmpleadosModel.nombre, [
        Validators.required,
        Validators.minLength(this.aes.strMin),
        Validators.maxLength(this.aes.strMax)
      ]],
      legajo: [this.formEmpleadosModel.legajo, [
        Validators.required,
        Validators.min(this.aes.intMin),
        Validators.max(this.aes.intMax),
      ]],
      dni: [this.formEmpleadosModel.dni, [
        Validators.required,
        Validators.min(this.aes.dniMin),
        Validators.max(this.aes.dniMax)
      ]],
      fecha_nacimiento: [this.formEmpleadosModel.fecha_nacimiento,
        Validators.required
      ],
      email: [this.formEmpleadosModel.email, [
        Validators.required,
        Validators.minLength(this.aes.strMin),
        Validators.maxLength(this.aes.strMax),
        Validators.email
      ]],
      perfil: [this.formEmpleadosModel.perfil,
        Validators.required
      ],
      sucursal: [this.formEmpleadosModel.sucursal, 
        Validators.required
      ],
      barrio: [this.formEmpleadosModel.domicilio.barrio, 
        Validators.required
      ],
      calle: [this.formEmpleadosModel.domicilio.calle, [
        Validators.required,
        Validators.minLength(this.aes.strMin),
        Validators.maxLength(this.aes.strMax)
      ]],
      altura: [this.formEmpleadosModel.domicilio.altura, [
        Validators.required,
        Validators.min(this.aes.intMin),
        Validators.max(this.aes.intMax)
      ]],
      codigo_postal: [this.formEmpleadosModel.domicilio.codigo_postal, [
        Validators.required,
        Validators.min(this.aes.intMin),
        Validators.max(this.aes.intMax)
      ]],
      telefono: [this.formEmpleadosModel.telefono, [
        Validators.required,
        Validators.min(this.aes.telMin),
        Validators.max(this.aes.telMax)
      ]] 
    });

    this.formChangeSub = this.formEmpleados
      .valueChanges
      .subscribe(data => this._onValueChanged());
  }

  private _onValueChanged() {
    if(!this.formEmpleados) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.aes.mensajesValidacion[field];
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
        _setErrMsgs(this.formEmpleados.get(field), this.formErrors, field);
      }
    }
  }




}
