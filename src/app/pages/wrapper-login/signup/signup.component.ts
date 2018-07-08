import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../../core/services/utils/utils.service';
import { Barrio } from '../../../domain/barrio';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormClientesModel } from '../../../core/models/form-clientes.model';
import { FormSignupService } from './form-signup.service';
import { Domicilio } from '../../../domain/domicilio';
import { Baneo } from '../../../domain/baneo';
import { Falta } from '../../../domain/falta';
import { Cliente } from '../../../domain/cliente';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


function passwordConfirming(c: AbstractControl):any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd= c.parent.get('verificar_password')

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
      return { noSonIguales: true };

}
}

@Component({
  selector: 'signupClientSuccessDialog',
  template: `<h1 mat-dialog-title>Exito</h1>
            <div mat-dialog-content>
              <p>Se ha registrado con exito.</p>
            </div>
            <div mat-dialog-actions>
              <button mat-button (click)="dialogRef.close()">GENIAL!</button>
            </div>`,
})
export class signupClientSuccessDialog {

  constructor(
    public dialogRef: MatDialogRef<signupClientSuccessDialog>) { }
}


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
 
  get cpwd() {
    return this.formClientes.get('verificar_password');
   }
  constructor(private fb: FormBuilder,
    private fss: FormSignupService,
    private utilsService: UtilsService,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {

    this.utilsService.getBarrios$()
      .subscribe(barrios => {
        this.barrios = [... barrios];
      }, error => {
        console.log(`error al traer los barrios ${error}`);
      });

    this.formErrors = this.fss.formErrors;
    this.formClientesModel = this._setformClientes();
    this._buildForm();
  }

  registrarCliente(){
    let nuevoCliente = this.formClientes.value;
    let barrio = new Barrio(nuevoCliente.barrio);
    this.cliente = {
      nombre: nuevoCliente.nombre,
      email: nuevoCliente.email,
      telefono: nuevoCliente.telefono,
      password: nuevoCliente.password,
      dni: nuevoCliente.dni,
      baneos: [],
      faltas: [],
      domicilio_entrega: [{
        calle: nuevoCliente.calle,
        altura: nuevoCliente.altura,
        barrio: barrio,
        codigo_postal: nuevoCliente.codigo_postal
      }],
      activo: true
    }

    this.clienteService.registrarCliente(this.cliente)
      .subscribe(data => {

        if(data.token){
          let df = this.dialog.open(signupClientSuccessDialog, {
            width: '300px'
          });
          df.beforeClose().subscribe(result => {
            this.router.navigate(['']);
          });

        }else{
          this.snackBar.open('Email ya en uso, elija otro','OK');
        }
      });
  }

  private _setformClientes() {
      return new FormClientesModel(null, null, null, null,null, null, new Domicilio(null,null,new Barrio(null),null),
      new Falta(null,null,null,null),new Baneo(null,null,null,null),null);
  }

  private _buildForm() {
    this.formClientes = this.fb.group({
      nombre: [this.formClientesModel.nombre, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax),
        Validators.pattern(this.fss.regNombre)
      ]],
      password: [this.formClientesModel.password, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax)
      ]], verificar_password: [this.formClientesModel.verificar_password, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax),
        passwordConfirming
            ]],
    
      dni: [this.formClientesModel.dni, [
        Validators.required,
        Validators.min(this.fss.dniMin),
        Validators.max(this.fss.dniMax),
        Validators.pattern(this.fss.reg)
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
      altura: [this.formClientesModel.domicilio_entrega.altura, [
        Validators.required,
        Validators.min(this.fss.intMin),
        Validators.max(this.fss.intMax),
        Validators.pattern(this.fss.reg)
      ]],
      codigo_postal: [this.formClientesModel.domicilio_entrega.codigo_postal, [
        Validators.required,
        Validators.min(this.fss.intMin),
        Validators.max(this.fss.intMax),
        Validators.pattern(this.fss.reg)
      ]],
      telefono: [this.formClientesModel.telefono, [
        Validators.required,
        Validators.min(this.fss.telMin),
        Validators.max(this.fss.telMax),
        Validators.pattern(this.fss.reg)
      ]] 
    });

    this.formChangeSub = this.formClientes
      .valueChanges
      .subscribe(data => this._onValueChanged());
  }

  private _onValueChanged() {

    if(!this.formClientes) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.fss.mensajesValidacion[field];
        for (const key in control.errors) {
          if(control.errors.noSonIguales == true){
            errorsObj[field] = "Las contraseñas deben ser iguales";
          return;  
          }
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
