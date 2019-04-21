import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersImportComponent } from './orders-import.component';

describe('OrdersImportComponent', () => {
  let component: OrdersImportComponent;
  let fixture: ComponentFixture<OrdersImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
