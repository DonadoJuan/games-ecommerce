import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCuponDescuentoComponent } from './form-cupon-descuento.component';

describe('FormCuponDescuentoComponent', () => {
  let component: FormCuponDescuentoComponent;
  let fixture: ComponentFixture<FormCuponDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCuponDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCuponDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
