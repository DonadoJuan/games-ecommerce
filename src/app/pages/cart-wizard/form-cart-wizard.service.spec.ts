import { TestBed, inject } from '@angular/core/testing';

import { FormCartWizardService } from './form-cart-wizard.service';

describe('FormCartWizardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormCartWizardService]
    });
  });

  it('should be created', inject([FormCartWizardService], (service: FormCartWizardService) => {
    expect(service).toBeTruthy();
  }));
});
