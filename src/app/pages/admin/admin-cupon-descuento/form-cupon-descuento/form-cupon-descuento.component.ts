import { Component, OnInit } from '@angular/core';
import { FormCuponModel } from '../../../../core/models/form-cupon.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Cupon } from '../../../../domain/cupon';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCuponDescuentoService } from './form-cupon-descuento.service';
import { Router } from '@angular/router';
import { CuponService } from '../../../../core/services/cupon/cupon.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form-cupon-descuento',
  templateUrl: './form-cupon-descuento.component.html',
  styleUrls: ['./form-cupon-descuento.component.scss'],
  providers:[FormCuponDescuentoService,{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
})
export class FormCuponDescuentoComponent implements OnInit {

  settings: any;
  data: any[];
  formularioVisible: boolean = false;
  formCuponModel: FormCuponModel;
  formCupon: FormGroup;
  error: boolean;
  submitting: boolean;
  submitCuponObj: Cupon;
  formChangeSub: Subscription;
  cuponSub: Subscription;
  formErrors: any;
  minDate = new Date(Date.now());  
  mensajeError : string;


  selectedFile: File | any = {
    name: "Seleccione Imagen"
  };
  seleccionoArchivo: boolean;

  constructor(
              private fb: FormBuilder, 
              private modalService: NgbModal,
              private fcd: FormCuponDescuentoService,
              private cuponService : CuponService,
              private router : Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    
    this.submitting = false;
    this.formCuponModel = new FormCuponModel(null,null,null,null);
    this.formErrors = this.fcd.formErrors;
    this._buildForm();
  }

  private _buildForm() {
    this.formCupon = this.fb.group({
      codigo: [this.formCuponModel.codigo, [
        Validators.required,
        Validators.minLength(this.fcd.strMin),
        Validators.maxLength(this.fcd.strMax),
        Validators.pattern(this.fcd.regNombre)

      ]],
      descuento: [this.formCuponModel.descuento, [
        Validators.required,
        Validators.min(this.fcd.intMin),
        Validators.max(this.fcd.intMax)
      ]],
      validoDesde: [this.formCuponModel.validoDesde, [
        Validators.required,

      ]],
      validoHasta: [this.formCuponModel.validoHasta, [
        Validators.required,
 
      ]]
    
    });
      this.formChangeSub = this.formCupon
      .valueChanges
      .subscribe(data => this._onValueChanged());
    }

    private _onValueChanged() {
      if(!this.formCupon) {return;}
       
      const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
        if (control && control.dirty && control.invalid) {
          const messages = this.fcd.mensajesValidacion[field];
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
          _setErrMsgs(this.formCupon.get(field), this.formErrors, field);
        }
      }
    }


  private _getSubmitObj() {
    let codigo : string =  this.formCupon.get('codigo').value;
    let c = new Cupon(     
      codigo.toUpperCase(),
      this.formCupon.get('descuento').value,
      this.formCupon.get('validoDesde').value,
      this.formCupon.get('validoHasta').value

  );
    return c;
  }

  onSubmit() {
    this.submitting = true;
    this.submitCuponObj = this._getSubmitObj();

    let inicio = new Date(this.formCupon.get('validoDesde').value);
    let fin = new Date( this.formCupon.get('validoHasta').value);
    let descuento = this.formCupon.get('descuento').value;
    if(inicio > fin) {
      this.snackBar.open('Error: La fecha de inicio debe ser menor a la fecha de fin');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000);
      this.submitting = false;
      return;
    }
    if( !Number.isInteger(descuento || descuento > 100 || descuento < 1)) {
      this.snackBar.open('Error: El descuento debe ser un valor numerico entre 1 y 100');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000);
      this.submitting = false;
      return;
    }
   
     this.cuponSub = this.cuponService.postCupon$(this.submitCuponObj)
        .subscribe(res => {
          console.log(res);
          this._handleSubmitSuccess(res);
          this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
          this.router.navigate(["admin-cupon-descuento"]));
        }, err => {
          console.log(err);
          this._handleSubmitError(err);
        });
        
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    //this.router.navigate(['admin-slideshow']);
  }

  private _handleSubmitError(err) {
    console.log(err)
    this.mensajeError = err.error.message;
    this.submitting = false;
    this.error = true;
  }


}
