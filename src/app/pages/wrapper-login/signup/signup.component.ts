import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormClientesModel } from '../../../core/models/form-clientes.model';
import { FormSignupService } from './form-signup.service';
import { Domicilio } from '../../../domain/domicilio';
import { Baneo } from '../../../domain/baneo';
import { Falta } from '../../../domain/falta';
import { Cliente } from '../../../domain/cliente';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [FormSignupService]
})
export class SignupComponent implements OnInit {

  @Input()
  cliente : Cliente;

  formClientes: FormGroup;
  formClientesModel: FormClientesModel;
  formErrors: any;
  formChangeSub: Subscription;
  barrios: any[] = [];
 

  constructor(private fb: FormBuilder,
    private fss: FormSignupService) { }

  ngOnInit() {
    this.barrios.push({value: "1", viewValue: "Barracas"});

    this.formErrors = this.fss.formErrors;
    this.formClientesModel = this._setformClientes();
    this._buildForm();
  }

  private _setformClientes() {
      return new FormClientesModel(null, null, null, null, null, new Domicilio(null,null,null,null),
      new Falta(null,null,null,null),new Baneo(null,null,null,null),null);
  }
  private _buildForm() {
    debugger;
    this.formClientes = this.fb.group({
      nombre: [this.formClientesModel.nombre, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax)
      ]],
      password: [this.formClientesModel.password, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax)
      ]],
    
      dni: [this.formClientesModel.dni, [
        Validators.required,
        Validators.min(this.fss.dniMin),
        Validators.max(this.fss.dniMax)
      ]],
      email: [this.formClientesModel.email, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax),
        Validators.email
      ]],
      barrio: [this.formClientesModel.domicilio_entrega.barrio, 
        Validators.required
      ],
      calle: [this.formClientesModel.domicilio_entrega.calle, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax)
      ]],
      altura: [this.formClientesModel.domicilio_entrega, [
        Validators.required,
        Validators.min(this.fss.intMin),
        Validators.max(this.fss.intMax)
      ]],
      codigo_postal: [this.formClientesModel.domicilio_entrega.codigo_postal, [
        Validators.required,
        Validators.min(this.fss.intMin),
        Validators.max(this.fss.intMax)
      ]],
      telefono: [this.formClientesModel.telefono, [
        Validators.required,
        Validators.min(this.fss.telMin),
        Validators.max(this.fss.telMax)
      ]] 
    });

    this.formChangeSub = this.formClientes
      .valueChanges
      .subscribe(data => this._onValueChanged());
  }

  private _onValueChanged() {
    debugger;
    if(!this.formClientes) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.fss.mensajesValidacion[field];
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
        _setErrMsgs(this.formClientes.get(field), this.formErrors, field);
      }
    }
  }
}
