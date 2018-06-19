import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRestoreComponent } from './button-restore.component';

describe('ButtonRestoreComponent', () => {
  let component: ButtonRestoreComponent;
  let fixture: ComponentFixture<ButtonRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
