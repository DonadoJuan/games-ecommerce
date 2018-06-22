import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuponDescuentoComponent } from './admin-cupon-descuento.component';

describe('AdminCuponDescuentoComponent', () => {
  let component: AdminCuponDescuentoComponent;
  let fixture: ComponentFixture<AdminCuponDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCuponDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCuponDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
