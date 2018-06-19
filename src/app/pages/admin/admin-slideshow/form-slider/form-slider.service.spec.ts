import { TestBed, inject } from '@angular/core/testing';

import { FormSliderService } from './form-slider.service';

describe('FormSliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormSliderService]
    });
  });

  it('should be created', inject([FormSliderService], (service: FormSliderService) => {
    expect(service).toBeTruthy();
  }));
});
