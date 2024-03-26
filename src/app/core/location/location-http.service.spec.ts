import { TestBed } from '@angular/core/testing';

import { LocationHttpService } from './location-http.service';

describe('LocationHttpService', () => {
  let service: LocationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
