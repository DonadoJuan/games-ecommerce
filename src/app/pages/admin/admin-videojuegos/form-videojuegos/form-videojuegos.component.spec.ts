import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVideojuegosComponent } from './form-videojuegos.component';

describe('FormVideojuegosComponent', () => {
  let component: FormVideojuegosComponent;
  let fixture: ComponentFixture<FormVideojuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVideojuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVideojuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
