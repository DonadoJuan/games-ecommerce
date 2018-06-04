import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../../../../domain/cliente';
import { FormClientesModel } from '../../../../core/models/form-clientes.model';
import { Subscription } from 'rxjs';
import { FormSignupService } from '../../../wrapper-login/signup/form-signup.service';
import { UtilsService } from '../../../../core/services/utils/utils.service';
import { ClienteService } from '../../../../core/services/cliente/cliente.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { signupClientSuccessDialog } from '../../../wrapper-login/signup/signup.component';
import { Falta } from '../../../../domain/falta';
import { Baneo } from '../../../../domain/baneo';
import { Domicilio } from '../../../../domain/domicilio';
import { Barrio } from '../../../../domain/barrio';


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
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss'],
  providers: [FormSignupService]
})
export class FormUsuariosComponent implements OnInit {


  

  @Input()
  cliente : Cliente;

  submitClienteObj: Cliente;
  submitClienteSub: Subscription;

  formClientes: FormGroup;
  formPassword : FormGroup;
  formClientesModel: FormClientesModel;
  formErrors: any;
  formChangeSub: Subscription;
  barrios: any[] = [];
  esValido : boolean = true;
  isEdit :boolean;
  error: boolean;
  submitting: boolean;
  submitBtnText : String;
  tituloForm : String;

  get cpwd() {
    return this.formClientes.get('verificar_password');
   }
  constructor(private fb: FormBuilder,
    private fss: FormSignupService,
    private utilsService: UtilsService,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit() {

    if(this.utilsService.cliente) {
      this.cliente = this.utilsService.cliente;
      this.utilsService.cliente = null;
    }
    this.utilsService.getBarrios$()
      .subscribe(barrios => {
        this.barrios = [... barrios];
      }, error => {
        console.log(`error al traer los barrios ${error}`);
      });

    this.formErrors = this.fss.formErrors;
    this.isEdit = !!this.cliente;
    console.log("cliente "+ this.cliente.nombre);
    this.tituloForm = this.isEdit ?  "Modificacion de Cliente" : "Alta Cliente";
    this.submitBtnText = this.isEdit ? 'Modificar Cliente' : 'Crear Cliente';
    this.formClientesModel = this._setformClientes();
    this._buildForm();
    

    if(this.isEdit){
      this.formClientes.controls['barrio'].setValue(this.cliente.domicilio_entrega[0].barrio);
    }

  }

  /*
  private _getSubmitObj(){
    let nuevoCliente = this.formClientes.value;
    this.cliente = {
      nombre: nuevoCliente.nombre,
      email: nuevoCliente.email,
      telefono: nuevoCliente.telefono,
      password: nuevoCliente.password,
      dni: nuevoCliente.dni,
      baneos: [],
      faltas: [],
      domicilio_entrega: [{
        barrio: nuevoCliente.barrio,
        calle: nuevoCliente.calle,
        altura: nuevoCliente.altura,
        codigo_postal: nuevoCliente.codigo_postal
      }],
      activo: true
    }

  
    this.clienteService.registrarCliente(this.cliente)
      .subscribe(token => {
        let df = this.dialog.open(signupClientSuccessDialog, {
          width: '300px'
        });
        df.beforeClose().subscribe(result => {
          this.router.navigate(['']);
        });
      },
      err => {
        console.log(`Error registrando cliente ${err}`)
      });
  }*/

  private _getSubmitObj() {
    let barrio = new Barrio(this.formClientes.get('barrio').value);
    let domicilio = new Domicilio(
      this.formClientes.get('calle').value,
      this.formClientes.get('altura').value,
      barrio,
      this.formClientes.get('codigo_postal').value
    );

    let c;
    let c1;
    if(this.isEdit){
      /*
       c = new Cliente(
        this.formClientes.get('nombre').value,
        this.formClientes.get('email').value,
        this.cliente.password,
        this.formClientes.get('telefono').value,
        this.formClientes.get('dni').value,
        this.cliente.domicilio_entrega,
        this.cliente.faltas ? this.cliente.faltas : null,
        this.cliente.baneos ? this.cliente.baneos : null,
        this.cliente.activo ? this.cliente.activo : null,
        this.cliente ? this.cliente._id : null
       );
      let nuevoCliente = this.formClientes.value;
     */
    let nuevoCliente = this.formClientes.value;

      c = {
        nombre: nuevoCliente.nombre,
        email: nuevoCliente.email,
        telefono: nuevoCliente.telefono,
        password: this.cliente.password,
        dni: nuevoCliente.dni,
        baneos: this.cliente.baneos ? this.cliente.baneos : null,
        faltas:  this.cliente.faltas ? this.cliente.faltas : null,
        domicilio_entrega: this.cliente.domicilio_entrega ? this.cliente.domicilio_entrega : null,
        activo: this.cliente.activo ? this.cliente.activo : null,
        id: this.cliente ? this.cliente._id : null
      }

      
    }else{
      let nuevoCliente = this.formClientes.value;
      c = {
        nombre: nuevoCliente.nombre,
        email: nuevoCliente.email,
        telefono: nuevoCliente.telefono,
        password: nuevoCliente.password,
        dni: nuevoCliente.dni,
        baneos: [],
        faltas: [],
        domicilio_entrega: [{
          barrio: nuevoCliente.barrio,
          calle: nuevoCliente.calle,
          altura: nuevoCliente.altura,
          codigo_postal: nuevoCliente.codigo_postal
        }],
        activo: true
      }
    }
    return c;
  }

  private _setformClientes() {
    if(!this.isEdit){
      return new FormClientesModel(null, null, null, null, null, null, new Domicilio(null,null,null,null),
      new Falta(null,null,null,null),new Baneo(null,null,null,null,null),null);
    }else{
          return new FormClientesModel(
          this.cliente.nombre,
          this.cliente.email,
          "password",
          "password",
          this.cliente.telefono,
          this.cliente.dni,
          this.cliente.domicilio_entrega[0],
        this.cliente.faltas[0],
          this.cliente.baneos[0],
          this.cliente.activo,
          this.cliente._id
        );
      
    }
  }

  private _buildForm() {
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
      verificar_password: [this.formClientesModel.verificar_password, [
        Validators.required,
        Validators.minLength(this.fss.strMin),
        Validators.maxLength(this.fss.strMax),
        passwordConfirming
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
      altura: [this.formClientesModel.domicilio_entrega.altura, [
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

    if(!this.formClientes) {return;}
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.fss.mensajesValidacion[field];
        for (const key in control.errors) {
          if(control.errors.noSonIguales == true){
            errorsObj[field] = "Las contraseñas deben ser iguales";
          return;  
          }
          if(control.errors.hasOwnProperty(key)) {
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
  
  onSubmit() {
    this.submitting = true;
    this.submitClienteObj = this._getSubmitObj();
    console.log(this.submitClienteObj);
    if(!this.isEdit) {
      this.submitClienteSub = this.clienteService
        .registrarCliente(this.submitClienteObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      console.log(this.cliente);
      this.submitClienteSub = this.clienteService
        .putCliente$(this.cliente._id,this.submitClienteObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }

  }
  
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    this.router.navigate(['usuarios']);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }



    

   

  


}
