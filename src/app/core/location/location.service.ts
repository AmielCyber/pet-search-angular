import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, finalize, catchError, EMPTY} from "rxjs";

import {Location, defaultLocation} from "../../models/location.model";
import {LocationHttpService} from "./location-http.service";
import {SnackbarService} from "../snackbar/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly location$: Observable<Location>;
  readonly isLoading$: Observable<boolean>;

  private readonly locationSubject = new BehaviorSubject<Location>(defaultLocation);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);
  private previousGeoLocation?: Location;

  constructor(private locationHttpService: LocationHttpService, private snackbarService: SnackbarService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.location$ = this.locationSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  setLocationFromZipcode(zipcode: string): void {
    this.isLoadingSubject.next(true);
    this.locationHttpService.getLocationFromZipcode(zipcode)
      .pipe(
        catchError(err => {
          this.snackbarService.error(err?.message ?? "Failed to update zipcode.")
          return EMPTY;
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe(location => {
        this.locationSubject.next(location)
        this.snackbarService.success("Updated entered zipcode!")
        this.setLocationInQueryParams(location);
      });
  }

  setLocationFromBrowserGeolocation(): void {
    if (this.previousGeoLocation) {
      this.locationSubject.next(this.previousGeoLocation);
      this.snackbarService.success("Updated zipcode from previous browser location!")
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
    this.isLoadingSubject.next(true);

    const coords = geolocationPosition.coords;
    this.locationHttpService.getLocationFromCoordinates(coords.longitude, coords.latitude)
      .pipe(
        catchError(err => {
          this.snackbarService.error(err?.message ?? "Failed to retrieve location.");
          return EMPTY;
        }),
        finalize(() => this.isLoadingSubject.next(false)),
      )
      .subscribe(location => {
        this.snackbarService.success("Updated local zipcode!");
        this.locationSubject.next(location)
        this.previousGeoLocation = location;
        this.setLocationInQueryParams(location);
      });
  }

  private setLocationInQueryParams(location: Location){
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {location: location.zipcode},
        queryParamsHandling: "merge"
      }
    );
  }
}
