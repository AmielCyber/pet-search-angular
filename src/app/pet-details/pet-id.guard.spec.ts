import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { petIdGuard } from './pet-id.guard';

describe('petIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => petIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
