import {TestBed} from '@angular/core/testing';
import {of, throwError} from "rxjs";
import {subscribeSpyTo} from "@hirez_io/observer-spy";

import {LocationService} from './location.service';
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {LocationHttpService} from "./location-http.service";
import {defaultLocation} from "../data/default-location.data";
import {HttpRequestState} from "../models/http-request-state.model";
import {Location} from "../models/location.model";

describe('LocationService', () => {
  let service: LocationService;
  let mockSnackbarService: jasmine.SpyObj<SnackbarService>;
  let mockLocationHttpService: jasmine.SpyObj<LocationHttpService>

  beforeEach(() => {
    mockSnackbarService = jasmine.createSpyObj<SnackbarService>(["error", "success"]);
    mockLocationHttpService = jasmine.createSpyObj<LocationHttpService>(["getLocationFromZipcode", "getLocationFromCoordinates"])
    TestBed.configureTestingModule({
      providers: [
        {provide: LocationHttpService, useValue: mockLocationHttpService},
        {provide: SnackbarService, useValue: mockSnackbarService}
      ]
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe("setLocationFromZipcode", () => {
    const zipcode = "92101";
    it("should initially have locationData with loading state", () => {
      mockLocationHttpService.getLocationFromZipcode.and.returnValue(of(defaultLocation))
      const observerSpy = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service.setLocationFromZipcode(zipcode)
      expect(observerSpy.getValueAt(1).isLoading).toBeTrue();
    })
    it("should return location data with isLoading false when http call is successful", () => {
      const expectedLocationState: HttpRequestState<Location> = {isLoading: false, data: defaultLocation};
      mockLocationHttpService.getLocationFromZipcode.and.returnValue(of(defaultLocation))
      const observerSpy = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service.setLocationFromZipcode(zipcode)
      expect(observerSpy.getLastValue()).toEqual(expectedLocationState);
    })
    it("should call success snackbar when http call is successful", () => {
      mockLocationHttpService.getLocationFromZipcode.and.returnValue(of(defaultLocation))
      service.setLocationFromZipcode(zipcode)
      expect(mockSnackbarService.success).toHaveBeenCalled();
    })
    it("should return starting state when http error occurs", () => {
      mockLocationHttpService.getLocationFromZipcode.and.returnValue(throwError(() => ""))
      const observerSpy = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service.setLocationFromZipcode(zipcode)
      expect(observerSpy.getLastValue()).toEqual(observerSpy.getFirstValue());
    })
    it("should call error snackbar when http error occurs", () => {
      mockLocationHttpService.getLocationFromZipcode.and.returnValue(throwError(() => ""))
      service.setLocationFromZipcode(zipcode)
      expect(mockSnackbarService.error).toHaveBeenCalled();
    })
  })
  describe("setLocationFromBrowser", () => {
    it("should set locationData with loading state initially", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function () {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      mockLocationHttpService.getLocationFromCoordinates.and.returnValue(of(defaultLocation))
      const observerSpy$ = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service.setLocationFromBrowserGeolocation();
      expect(observerSpy$.getValueAt(1).isLoading).toBeTrue();
    });
    it("should update location and set loading to false when http call is successful", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function (): void {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      mockLocationHttpService.getLocationFromCoordinates.and.returnValue(of(defaultLocation))
      const observerSpy$ = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service.setLocationFromBrowserGeolocation();
      expect(observerSpy$.getLastValue()?.data).toBe(defaultLocation);
      expect(observerSpy$.getLastValue()?.isLoading).toBeFalse();
    });
    it("should previous location to current fetched location when http call is successful", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function () {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      mockLocationHttpService.getLocationFromCoordinates.and.returnValue(of(defaultLocation))
      const observerSpy$ = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service.setLocationFromBrowserGeolocation();
      expect(observerSpy$.getLastValue()?.data).toBe(service["previousGeoLocation"]);
    });
    it("should call success snackbar when http call is successful", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function (): void {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      mockLocationHttpService.getLocationFromCoordinates.and.returnValue(of(defaultLocation))
      service.setLocationFromBrowserGeolocation();
      expect(mockSnackbarService.success).toHaveBeenCalled();
    });
    it("should call error snackbar when http call throws error", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function (): void {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      mockLocationHttpService.getLocationFromCoordinates.and.returnValue(throwError(() => ""))
      service.setLocationFromBrowserGeolocation();
      expect(mockSnackbarService.error).toHaveBeenCalled();
    });
    it("should call set state to initial state when http call throws error", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function () {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      const observerSpy$ = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      mockLocationHttpService.getLocationFromCoordinates.and.returnValue(throwError(() => ""))
      service.setLocationFromBrowserGeolocation();
      expect(observerSpy$.getLastValue()).toEqual(observerSpy$.getFirstValue());
    });
    it("should call error snackbar when navigator calls error callback", () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function () {
          arguments[1](new Error("test Error"));
        }
      );
      service.setLocationFromBrowserGeolocation();
      expect(mockSnackbarService.error).toHaveBeenCalled();
    });
    it("should set to previous error if previousGeoLocation is not null", () => {
      const expectedLocation: Location = defaultLocation;
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function () {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      const observerSpy$ = subscribeSpyTo<HttpRequestState<Location>>(service.locationData$)
      service["previousGeoLocation"] = expectedLocation;
      service.setLocationFromBrowserGeolocation();
      expect(observerSpy$.getLastValue()?.data).toEqual(expectedLocation)
    });
    it("should not call navigator nor http if previousGeoLocation is not null", () => {
      const expectedLocation: Location = defaultLocation;
      const geolocationFun = spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function (): void {
          const geoPos = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      service["previousGeoLocation"] = expectedLocation;
      service.setLocationFromBrowserGeolocation();
      expect(mockLocationHttpService.getLocationFromCoordinates).not.toHaveBeenCalled();
      expect(geolocationFun).not.toHaveBeenCalled();
    });
    it("should call success snackbar when previousGeoLocation is not null", () => {
      const expectedLocation: Location = defaultLocation;
      spyOn(window.navigator.geolocation, "getCurrentPosition").and.callFake(
        function () {
          const geoPos: GeolocationPosition = getGeolocationPosition();
          arguments[0](geoPos);
        }
      );
      service["previousGeoLocation"] = expectedLocation;
      service.setLocationFromBrowserGeolocation();
      expect(mockSnackbarService.success).toHaveBeenCalled();
    });
  })
  it("should call error snackbar with 'not supported' message if geolocation is not supported", () => {
    // @ts-ignore
    spyOnProperty(navigator, "geolocation").and.returnValue(undefined);
    service.setLocationFromBrowserGeolocation();
    expect(mockSnackbarService.error).toHaveBeenCalled();
  });

});

function getGeolocationPosition(): GeolocationPosition {
  return {
    coords: {
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null
    },
    timestamp: 0
  }
}
