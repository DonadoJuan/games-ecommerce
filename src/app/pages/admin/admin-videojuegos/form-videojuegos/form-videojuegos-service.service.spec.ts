import { TestBed, inject } from '@angular/core/testing';

import { FormVideojuegosService } from './form-videojuegos-service.service';

describe('FormVideojuegosServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormVideojuegosService]
    });
  });

  it('should be created', inject([FormVideojuegosService], (service: FormVideojuegosService) => {
    expect(service).toBeTruthy();
  }));
});
