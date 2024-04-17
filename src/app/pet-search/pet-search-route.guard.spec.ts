import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { petSearchRouteGuard } from './pet-search-route.guard';

describe('petSearchRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => petSearchRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
