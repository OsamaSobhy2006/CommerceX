import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrders } from './manage-orders';

describe('ManageOrders', () => {
  let component: ManageOrders;
  let fixture: ComponentFixture<ManageOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
