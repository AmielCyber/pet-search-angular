import { TestBed } from '@angular/core/testing';

import { PetListCacheService } from './pet-list-cache.service';

describe('PetListCacheService', () => {
  let service: PetListCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetListCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
