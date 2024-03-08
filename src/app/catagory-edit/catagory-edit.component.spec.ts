import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryEditComponent } from './catagory-edit.component';

describe('CatagoryEditComponent', () => {
  let component: CatagoryEditComponent;
  let fixture: ComponentFixture<CatagoryEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatagoryEditComponent]
    });
    fixture = TestBed.createComponent(CatagoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
