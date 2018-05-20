import { TestBed, inject } from '@angular/core/testing';

import { FormSignupService } from './form-signup.service';

describe('FormSignupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormSignupService]
    });
  });

  it('should be created', inject([FormSignupService], (service: FormSignupService) => {
    expect(service).toBeTruthy();
  }));
});
