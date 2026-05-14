import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmail } from './confirm-email';

describe('ConfirmEmail', () => {
  let component: ConfirmEmail;
  let fixture: ComponentFixture<ConfirmEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmail],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
