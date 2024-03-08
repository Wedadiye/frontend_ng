import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMenegmentComponent } from './products-menegment.component';

describe('ProductsMenegmentComponent', () => {
  let component: ProductsMenegmentComponent;
  let fixture: ComponentFixture<ProductsMenegmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsMenegmentComponent]
    });
    fixture = TestBed.createComponent(ProductsMenegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
