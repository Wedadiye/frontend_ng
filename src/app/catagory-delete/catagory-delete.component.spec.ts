import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryDeleteComponent } from './catagory-delete.component';

describe('CatagoryDeleteComponent', () => {
  let component: CatagoryDeleteComponent;
  let fixture: ComponentFixture<CatagoryDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatagoryDeleteComponent]
    });
    fixture = TestBed.createComponent(CatagoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
