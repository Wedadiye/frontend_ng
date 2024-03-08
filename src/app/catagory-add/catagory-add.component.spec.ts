import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryAddComponent } from './catagory-add.component';

describe('CatagoryAddComponent', () => {
  let component: CatagoryAddComponent;
  let fixture: ComponentFixture<CatagoryAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatagoryAddComponent]
    });
    fixture = TestBed.createComponent(CatagoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
