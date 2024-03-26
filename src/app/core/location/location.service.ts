import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, finalize, catchError, EMPTY} from "rxjs";

import {Location, defaultLocation} from "./location.model";
import {LocationHttpService} from "./location-http.service";
import {LocationSnackbarService} from "./location-snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly location$: Observable<Location>;
  readonly isLoading$: Observable<boolean>;

  private readonly locationSubject = new BehaviorSubject<Location>(defaultLocation);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);
  private previousGeoLocation?: Location;

  constructor(private locationHttpService: LocationHttpService, private locationSnackbarService: LocationSnackbarService) {
    this.location$ = this.locationSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  setLocationFromZipcode(zipcode: string): void {
    this.isLoadingSubject.next(true);
    this.locationHttpService.getLocationFromZipcode(zipcode)
      .pipe(
        catchError(err => {
          this.locationSnackbarService.error(err?.message ?? "Failed to update zipcode.")
          return EMPTY;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe(location => {
        this.locationSubject.next(location)
        this.locationSnackbarService.success("Updated entered zipcode!")
      });
  }

  setLocationFromBrowserGeolocation(): void {
    if (this.previousGeoLocation) {
      this.locationSubject.next(this.previousGeoLocation);
      this.locationSnackbarService.success("Updated zipcode from previous browser location!")
    } else if (navigator["geolocation"]) {
      navigator.geolocation.getCurrentPosition(
        (g) => this.setLocationFromGeolocationPosition(g),
        (e) => this.locationSnackbarService.error(e.message ?? "Failed to retrieve location.")
      );
    } else {
      this.locationSnackbarService.error("Geolocation is not supported by your browser.");
    }
  }

  private setLocationFromGeolocationPosition(geolocationPosition: GeolocationPosition) {
    this.isLoadingSubject.next(true);

    const coords = geolocationPosition.coords;
    this.locationHttpService.getLocationFromCoordinates(coords.longitude, coords.latitude)
      .pipe(
        catchError(err => {
          this.locationSnackbarService.error(err?.message ?? "Failed to retrieve location.");
          return EMPTY;
        }),
        finalize(() => this.isLoadingSubject.next(false)),
      )
      .subscribe(location => {
        this.locationSnackbarService.success("Updated local zipcode!");
        this.locationSubject.next(location)
        this.previousGeoLocation = location;
      });
  }
}
