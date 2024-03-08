import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryMenegmentComponent } from './catagory-menegment.component';

describe('CatagoryMenegmentComponent', () => {
  let component: CatagoryMenegmentComponent;
  let fixture: ComponentFixture<CatagoryMenegmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatagoryMenegmentComponent]
    });
    fixture = TestBed.createComponent(CatagoryMenegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
