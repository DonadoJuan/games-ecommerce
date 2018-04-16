import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartWizardComponent } from './cart-wizard.component';

describe('CartWizardComponent', () => {
  let component: CartWizardComponent;
  let fixture: ComponentFixture<CartWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
