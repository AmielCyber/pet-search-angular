import { TestBed } from '@angular/core/testing';

import { LocationSnackbarService } from './location-snackbar.service';

describe('LocationSnackbarService', () => {
  let service: LocationSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
