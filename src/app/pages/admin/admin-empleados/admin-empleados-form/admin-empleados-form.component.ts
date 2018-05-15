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
import { ApiService } from "../../../../core/api.service";
import { UtilsService } from "../../../../core/utils.service";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-admin-empleados-form',
  templateUrl: './admin-empleados-form.component.html',
  styleUrls: ['./admin-empleados-form.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AdminEmpleadosFormComponent implements OnInit, OnDestroy {

  
  @Input() personal: Personal;
  isEdit: boolean;

  formEmpleados: FormGroup;
  formEmpleadosModel: FormEmpleadosModel;
  formErrors: any;
  formChangeSub: Subscription;

  submitPersonalObj: Personal;
  submitPersonalSub: Subscription;
  sucursalesSub: Subscription;
  barriosSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  tituloForm: string;

  perfiles: any[] = [];
  sucursales: any[] = [];
  sucursalesApi: any[] = [];
  barrios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private aes: AdminEmpleadosFormService,
    private router: Router,
    private api: ApiService,
    private adapter: DateAdapter<any>,
    private us: UtilsService) { }

  ngOnInit() {
    if(this.us.personal) {
      this.personal = this.us.personal;
      this.us.personal = null;
    }
    this.sucursalesSub = this.api.getSucursalesUbicacion$()
      .subscribe(
        data => {
          data.forEach(d => {
            this.sucursalesApi.push(d);
            this.sucursales.push({value: d._id, viewValue: d.ubicacion.calle + " " + d.ubicacion.altura});
          })
        },
        err => this._handleSubmitError(err)
      );

    this.barriosSub = this.api.getBarrios$()
      .subscribe(
        data => {
          data.forEach(d => {
            this.barrios.push({value: d.nombre, viewValue: d.nombre})
          });
        },
        err => this._handleSubmitError(err)
      );

    this.perfiles.push({value: 'Empleado', viewValue:'Empleado'});
    this.perfiles.push({value: 'Administrador', viewValue: 'Administrador'});

    this.formErrors = this.aes.formErrors;
    this.isEdit = !!this.personal;
    this.submitBtnText = this.isEdit ? 'Modificar Personal' : 'Crear Personal';
    this.formEmpleadosModel = this._setFormEmpleados();
    this._buildForm();
    this.tituloForm = "Alta de Personal"
    if(this.isEdit) {
      this.tituloForm = "Modificacion de Personal"
      this.formEmpleados.controls['barrio'].setValue(this.personal.domicilio.barrio.nombre);
      this.formEmpleados.controls['sucursal'].setValue(this.personal.sucursal._id);
    }
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

  private _getSubmitObj() {
    let barrio = new Barrio(this.formEmpleados.get('barrio').value);
    let domicilio = new Domicilio(
      this.formEmpleados.get('calle').value,
      this.formEmpleados.get('altura').value,
      barrio,
      this.formEmpleados.get('codigo_postal').value
    );
    let idSucursal = this.formEmpleados.get('sucursal').value;
    let sucursal;
    this.sucursalesApi.forEach(suc => {
      if(suc._id == idSucursal) {
        sucursal = new Sucursal(suc.ubicacion, null, suc._id);
      }
    });
    let fecha = new Date(this.formEmpleados.get('fecha_nacimiento').value);
    let p = new Personal(
      this.formEmpleados.get('nombre').value,
      this.formEmpleados.get('legajo').value,
      this.formEmpleados.get('dni').value,
      fecha,
      this.formEmpleados.get('email').value,
      this.formEmpleados.get('perfil').value,
      sucursal,
      domicilio,
      this.formEmpleados.get('telefono').value,
      this.personal ? this.personal._id : null
    );
    return p;
  }

  onSubmit() {
    this.submitting = true;
    this.submitPersonalObj = this._getSubmitObj();

    if(!this.isEdit) {
      this.submitPersonalSub = this.api
        .postPersonal$(this.submitPersonalObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitPersonalSub = this.api
        .putPersonal$(this.personal._id, this.submitPersonalObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }

  }
  
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.router.navigate(['admin-empleados']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if(this.submitPersonalSub) {
      this.submitPersonalSub.unsubscribe();
    }
    this.sucursalesSub.unsubscribe();
    this.barriosSub.unsubscribe();
    this.formChangeSub.unsubscribe();
  }

}
