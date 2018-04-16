import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlideshowComponent } from './admin-slideshow.component';

describe('AdminSlideshowComponent', () => {
  let component: AdminSlideshowComponent;
  let fixture: ComponentFixture<AdminSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
