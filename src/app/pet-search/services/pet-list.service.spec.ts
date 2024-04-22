import { TestBed } from '@angular/core/testing';

import { PetListService } from './pet-list.service';

describe('PetListService', () => {
  let service: PetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
