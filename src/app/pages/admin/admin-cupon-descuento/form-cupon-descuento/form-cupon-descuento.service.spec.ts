import { TestBed, inject } from '@angular/core/testing';

import { FormCuponDescuentoService } from './form-cupon-descuento.service';

describe('FormCuponDescuentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormCuponDescuentoService]
    });
  });

  it('should be created', inject([FormCuponDescuentoService], (service: FormCuponDescuentoService) => {
    expect(service).toBeTruthy();
  }));
});
