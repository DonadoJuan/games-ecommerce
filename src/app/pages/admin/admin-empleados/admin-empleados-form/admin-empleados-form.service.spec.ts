import { TestBed, inject } from '@angular/core/testing';

import { AdminEmpleadosFormService } from './admin-empleados-form.service';

describe('AdminEmpleadosFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEmpleadosFormService]
    });
  });

  it('should be created', inject([AdminEmpleadosFormService], (service: AdminEmpleadosFormService) => {
    expect(service).toBeTruthy();
  }));
});
