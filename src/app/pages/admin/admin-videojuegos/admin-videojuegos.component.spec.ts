import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideojuegosComponent } from './admin-videojuegos.component';

describe('AdminVideojuegosComponent', () => {
  let component: AdminVideojuegosComponent;
  let fixture: ComponentFixture<AdminVideojuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideojuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideojuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
