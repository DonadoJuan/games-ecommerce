import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDetailsComponent } from './button-details.component';

describe('ButtonDetailsComponent', () => {
  let component: ButtonDetailsComponent;
  let fixture: ComponentFixture<ButtonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
