import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarItemCarritoComponent } from './confirmar-item-carrito.component';

describe('ConfirmarItemCarritoComponent', () => {
  let component: ConfirmarItemCarritoComponent;
  let fixture: ComponentFixture<ConfirmarItemCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarItemCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarItemCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
