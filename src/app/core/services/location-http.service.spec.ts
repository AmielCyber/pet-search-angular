import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {LocationHttpService} from './location-http.service';
import {HttpParams} from "@angular/common/http";
import {defaultLocation} from "../data/default-location.data";
import {catchError, EMPTY, tap} from "rxjs";

describe('LocationHttpService', () => {
  let service: LocationHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LocationHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe("getLocationFromCoordinates", () => {
    let longitude: number;
    let latitude: number;
    let expectedUrl: string;
    beforeEach(() => {
      longitude = 0;
      latitude = 0;
      const coords = new HttpParams()
        .set("longitude", longitude)
        .set("latitude", latitude)
      expectedUrl = service["locationCoordsUrl"] + "?" + coords.toString();
    })
    it('should call get with the correct url', () => {
      service.getLocationFromCoordinates(longitude, latitude)
        .subscribe();

      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(defaultLocation);
      expect(req.request.method).toBe("GET");
    });
    it('should get a location object', () => {
      service.getLocationFromCoordinates(longitude, latitude)
        .subscribe(loc => expect(loc).toEqual(defaultLocation));
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(defaultLocation);
    });
    it('should get a location object', () => {
      service.getLocationFromCoordinates(longitude, latitude)
        .subscribe(loc => expect(loc).toEqual(defaultLocation));
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(defaultLocation);
    });
    it("should contain 'invalid' message when Error Response is 400", () => {
      service.getLocationFromCoordinates(longitude, latitude)
        .pipe(
          tap(() => fail("should not have a success call")),
          catchError(err => {
            if (err instanceof Error)
              expect(err.message).toContain("Invalid")
            else
              fail("Error is not instance of Error")
            return EMPTY
          })
        )
        .subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush("error", {
        statusText: "",
        status: 400,
      });
    })
    it("should contain 'could not locate' message when Error Response is 404", () => {
      service.getLocationFromCoordinates(longitude, latitude)
        .pipe(
          tap(() => fail("should not have a success call")),
          catchError(err => {
            if (err instanceof Error)
              expect(err.message).toMatch(/could not locate/i)
            else
              fail("Error is not instance of Error")
            return EMPTY
          })
        )
        .subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush("error", {
        statusText: "",
        status: 404,
      });
    })
    it("should contain 'there was an error' message when Error Response is 500", () => {
      service.getLocationFromCoordinates(longitude, latitude)
        .pipe(
          tap(() => fail("should not have a success call")),
          catchError(err => {
            if (err instanceof Error)
              expect(err.message).toMatch(/there was an error/i)
            else
              fail("Error is not instance of Error")
            return EMPTY
          })
        )
        .subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush("error", {
        statusText: "",
        status: 500,
      });
    })
  })
  describe("getLocationFromZipcode", () => {
    let zipcode = "92101"

    it("should call get with the correct url", () => {
      const expectedUrl = service["locationZipcodeUrl"] + "/" + zipcode;
      service.getLocationFromZipcode(zipcode)
        .subscribe();

      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(defaultLocation);
      expect(req.request.method).toBe("GET");
    });
    it("should get a location object", () => {
      const expectedUrl = service["locationZipcodeUrl"] + "/" + zipcode;
      service.getLocationFromZipcode(zipcode)
        .subscribe(loc => expect(loc).toEqual(defaultLocation));
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(defaultLocation);
    })
    it("should contain 'invalid' message when Error Response is 400", () => {
      const expectedUrl = service["locationZipcodeUrl"] + "/" + zipcode;

      service.getLocationFromZipcode(zipcode)
        .pipe(
          tap(() => fail("should not have a success call")),
          catchError(err => {
            if (err instanceof Error)
              expect(err.message).toContain("Invalid")
            else
              fail("Error is not instance of Error")
            return EMPTY
          })
        )
        .subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush("error", {
        statusText: "",
        status: 400,
      });
    })
    it("should contain 'does not exist.' message when Error Response is 404", () => {
      const expectedUrl = service["locationZipcodeUrl"] + "/" + zipcode;

      service.getLocationFromZipcode(zipcode)
        .pipe(
          tap(() => fail("should not have a success call")),
          catchError(err => {
            if (err instanceof Error)
              expect(err.message).toMatch(/does not exist/i)
            else
              fail("Error is not instance of Error")
            return EMPTY
          })
        )
        .subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush("error", {
        statusText: "",
        status: 404,
      });
    })
    it("should contain 'there was an error' message when Error Response is 500", () => {
      const expectedUrl = service["locationZipcodeUrl"] + "/" + zipcode;

      service.getLocationFromZipcode(zipcode)
        .pipe(
          tap(() => fail("should not have a success call")),
          catchError(err => {
            if (err instanceof Error)
              expect(err.message).toMatch(/there was an error/i)
            else
              fail("Error is not instance of Error")
            return EMPTY
          })
        )
        .subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush("error", {
        statusText: "",
        status: 500,
      });
    })

  })
});
