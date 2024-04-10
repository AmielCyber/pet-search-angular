import { TestBed } from '@angular/core/testing';

import { PetSearchParamsService } from './pet-search-params.service';

describe('PetSearchParamsService', () => {
  let service: PetSearchParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetSearchParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
