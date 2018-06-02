import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultaStockComponent } from './admin-consulta-stock.component';

describe('AdminConsultaStockComponent', () => {
  let component: AdminConsultaStockComponent;
  let fixture: ComponentFixture<AdminConsultaStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsultaStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsultaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
