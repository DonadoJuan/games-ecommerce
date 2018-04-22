import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpleadosFormComponent } from './admin-empleados-form.component';

describe('AdminEmpleadosFormComponent', () => {
  let component: AdminEmpleadosFormComponent;
  let fixture: ComponentFixture<AdminEmpleadosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmpleadosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmpleadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
