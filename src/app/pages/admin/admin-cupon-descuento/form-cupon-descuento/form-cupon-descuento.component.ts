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


  selectedFile: File | any = {
    name: "Seleccione Imagen"
  };
  seleccionoArchivo: boolean;

  constructor(
              private fb: FormBuilder, 
              private modalService: NgbModal,
              private fcd: FormCuponDescuentoService,
              private cuponService : CuponService,
              private router : Router) { }

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
        Validators.maxLength(this.fcd.strMax)
      ]],
      descuento: [this.formCuponModel.codigo, [
        Validators.required,
        Validators.min(this.fcd.intMin),
        Validators.max(this.fcd.intMax)
      ]],
      validoDesde: [this.formCuponModel.codigo, [
        Validators.required,

      ]],
      validoHasta: [this.formCuponModel.codigo, [
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
    let c = new Cupon(     
      this.formCupon.get('codigo').value,
      this.formCupon.get('descuento').value,
      this.formCupon.get('validoDesde').value,
      this.formCupon.get('validoHasta').value

  );
    return c;
  }

  onSubmit() {
    this.submitting = true;
    this.submitCuponObj = this._getSubmitObj();
   
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
    console.error(err);
    this.submitting = false;
    this.error = true;
  }


}
