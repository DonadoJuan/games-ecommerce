import { Component, OnInit } from '@angular/core';
import { FormSliderModel } from '../../../../core/models/form-slider.model';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Slider } from '../../../../domain/slider';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderService } from '../../../../core/services/slider/slider.service';
import { Router } from '@angular/router';
import { CheckboxComponent } from '../../checkbox.component';
import { FormSliderService } from './form-slider.service';
import { AdminSlideshowComponent } from '../admin-slideshow.component';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss'],
  providers: [SliderService, FormSliderService]

})
export class FormSliderComponent implements OnInit {


  settings: any;
  data: any[];
  formularioVisible: boolean = false;
  formSliderModel: FormSliderModel;
  formSlider: FormGroup;
  error: boolean;
  submitting: boolean;
  submitSliderObj: Slider;
  formChangeSub: Subscription;
  sliderSub: Subscription;
  formErrors: any;


  selectedFile: File | any = {
    name: "Seleccione Imagen"
  };
  seleccionoArchivo: boolean;

  constructor(
              private fb: FormBuilder, 
              private modalService: NgbModal,
              private fs: FormSliderService,
              private sliderService : SliderService,
              private router : Router) { }

  ngOnInit() {

    this.seleccionoArchivo = false;
    this.submitting = false;
    this.formSliderModel = new FormSliderModel(null);
    this.formErrors = this.fs.formErrors;
    this._buildForm();
  }

  private _buildForm() {
    this.formSlider = this.fb.group({
      titulo: [this.formSliderModel.titulo, [
        Validators.required,
        Validators.minLength(this.fs.strMin),
        Validators.maxLength(this.fs.titleMax)
      ]]});
      this.formChangeSub = this.formSlider
      .valueChanges
      .subscribe(data => this._onValueChanged());
    }

    private _onValueChanged() {
      if(!this.formSlider) {return;}
      const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
        if (control && control.dirty && control.invalid) {
          const messages = this.fs.mensajesValidacion[field];
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
          _setErrMsgs(this.formSlider.get(field), this.formErrors, field);
        }
      }
    }

  onFileSelected(event) {
    if(event.target.files[0] != undefined) {
      this.selectedFile = <File>event.target.files[0];
      //console.log(this.selectedFile);
      this.seleccionoArchivo = true;
    }
  }

  private _getSubmitObj() {
    let s = new Slider(     
      this.formSlider.get('titulo').value,
      null,
      false
  );
    return s;
  }

  onSubmit() {
    this.submitting = true;
    this.submitSliderObj = this._getSubmitObj();
   
     this.sliderSub = this.sliderService.postSlider$(this.selectedFile, this.submitSliderObj)
        .subscribe(res => {
          console.log(res);
          this._handleSubmitSuccess(res);
          this.router.navigateByUrl('/lista-negra', {skipLocationChange: true}).then(()=>
          this.router.navigate(["admin-slideshow"]));
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
