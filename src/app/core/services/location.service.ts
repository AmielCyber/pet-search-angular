import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, catchError, EMPTY, tap} from "rxjs";

import {Location} from "../models/location.model"
import {HttpRequestState} from "../models/http-request-state.model";
import {LocationHttpService} from "./location-http.service";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {defaultLocation} from "../data/default-location.data";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly locationData$: Observable<HttpRequestState<Location>>;

  private readonly locationSubject: BehaviorSubject<HttpRequestState<Location>>;
  private previousGeoLocation?: Location;
  private readonly defaultLocation: Location;

  constructor(private locationHttpService: LocationHttpService, private snackbarService: SnackbarService) {
    this.defaultLocation = defaultLocation;
    this.locationSubject =
      new BehaviorSubject<HttpRequestState<Location>>({isLoading: false, data: this.defaultLocation});
    this.locationData$ = this.locationSubject.asObservable();
  }

  setLocationFromZipcode(zipcode: string): void {
    this.locationSubject.next(this.getLoadingState());
    this.locationHttpService.getLocationFromZipcode(zipcode)
      .pipe(
        catchError(err => {
          this.snackbarService.error(err?.message ?? "Failed to update zipcode.");
          this.locationSubject.next(this.getStateBeforeLoading());
          return EMPTY;
        }),
        tap(location => {
          this.locationSubject.next({isLoading: false, data: location});
          this.snackbarService.success("Updated entered zipcode!");
        })
      )
      .subscribe();
  }

  setLocationFromBrowserGeolocation(): void {
    if (this.previousGeoLocation) {
      this.locationSubject.next({isLoading: false, data: this.previousGeoLocation});
      this.snackbarService.success("Updated zipcode from previous browser location!");
    } else if (navigator["geolocation"]) {
      navigator.geolocation.getCurrentPosition(
        (g) => this.setLocationFromGeolocationPosition(g),
        (e) => this.snackbarService.error(e.message ?? "Failed to retrieve location.")
      );
    } else {
      this.snackbarService.error("Geolocation is not supported by your browser.");
    }
  }

  private setLocationFromGeolocationPosition(geolocationPosition: GeolocationPosition) {
    this.locationSubject.next(this.getLoadingState());
    const coords = geolocationPosition.coords;
    this.locationHttpService.getLocationFromCoordinates(coords.longitude, coords.latitude)
      .pipe(
        catchError(err => {
          this.snackbarService.error(err?.message ?? "Failed to retrieve location.");
          this.locationSubject.next(this.getStateBeforeLoading());
          return EMPTY;
        }),
        tap(location => {
          this.snackbarService.success("Updated local zipcode!");
          this.locationSubject.next({isLoading: false, data: location})
          this.previousGeoLocation = location;
        })
      )
      .subscribe();
  }

  private getLoadingState(): HttpRequestState<Location> {
    return {
      isLoading: true,
      data: this.locationSubject.value.data
    };
  }

  private getStateBeforeLoading(): HttpRequestState<Location> {
    return {
      isLoading: false,
      data: this.locationSubject.value.data
    };
  }
}
