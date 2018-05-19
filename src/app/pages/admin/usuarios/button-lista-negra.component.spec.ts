import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonListaNegraComponent } from './button-lista-negra.component';

describe('ButtonListaNegraComponent', () => {
  let component: ButtonListaNegraComponent;
  let fixture: ComponentFixture<ButtonListaNegraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonListaNegraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonListaNegraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
