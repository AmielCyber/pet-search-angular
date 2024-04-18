import { TestBed } from '@angular/core/testing';

import { PetIconService } from './pet-icon.service';

describe('PetIconService', () => {
  let service: PetIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
