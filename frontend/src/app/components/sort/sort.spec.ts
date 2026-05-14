import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sort } from './sort';

describe('Sort', () => {
  let component: Sort;
  let fixture: ComponentFixture<Sort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sort],
    }).compileComponents();

    fixture = TestBed.createComponent(Sort);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
