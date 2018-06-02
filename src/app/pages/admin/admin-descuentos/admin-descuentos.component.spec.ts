import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDescuentosComponent } from './admin-descuentos.component';

describe('AdminDescuentosComponent', () => {
  let component: AdminDescuentosComponent;
  let fixture: ComponentFixture<AdminDescuentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDescuentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
