import { TestBed } from '@angular/core/testing';

import { PreventPayPageGuard } from './prevent-pay-page.guard';

describe('PreventPayPageGuard', () => {
  let guard: PreventPayPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventPayPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
