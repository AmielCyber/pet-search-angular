import {TestBed} from '@angular/core/testing';

import {ErrorPageService} from './error-page.service';

describe('ErrorPageService', () => {
  let service: ErrorPageService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('geLastErrorMessage should return an empty string when called for the first time', () => {
    spyOn(service, "getLastErrorMessage").and.callThrough();

    const actualStr = service.getLastErrorMessage();

    expect(actualStr).toBe("");
    expect(service.getLastErrorMessage).toHaveBeenCalledTimes(1);
  });
  it('getLastErrorMessage should have the string passed in setErrorMessage when is called', () => {
    const expectedErrorMessage = 'Test Error';

    service.setErrorMessage(expectedErrorMessage);
    const actualErrorMessage = service.getLastErrorMessage();

    expect(actualErrorMessage).toBe(expectedErrorMessage);
  });
  it('getLastErrorMessage should have an empty string when called twice in succession', () => {
    spyOn(service, "getLastErrorMessage").and.callThrough();
    const errorMessage = 'Test Error';

    service.setErrorMessage(errorMessage);
    service.getLastErrorMessage();

    expect(service.getLastErrorMessage()).toBe("");
    expect(service.getLastErrorMessage).toHaveBeenCalledTimes(2);
  });
});
