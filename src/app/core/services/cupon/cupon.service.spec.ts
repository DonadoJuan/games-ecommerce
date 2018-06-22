import { TestBed, inject } from '@angular/core/testing';

import { CuponService } from './cupon.service';

describe('CuponService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuponService]
    });
  });

  it('should be created', inject([CuponService], (service: CuponService) => {
    expect(service).toBeTruthy();
  }));
});
