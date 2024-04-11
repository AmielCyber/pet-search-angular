import { TestBed } from '@angular/core/testing';

import { PetHttpService } from './pet-http.service';

describe('PetHttpService', () => {
  let service: PetHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
