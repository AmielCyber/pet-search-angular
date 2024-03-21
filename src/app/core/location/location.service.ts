import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {Location, defaultLocation} from "./location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly location$: Observable<Location>;
  readonly isLoading$: Observable<boolean>;
  private locationSubject = new BehaviorSubject<Location>(defaultLocation);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.location$ = this.locationSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  setLocationFromBrowserCoordinates(): void {
    if(navigator["geolocation"]){
      navigator.geolocation.getCurrentPosition(this.setLocationFromGeolocationCoords, this.setLocationErrorFromBrowser);
    }else{
      this.locationSubject.error(new Error("Geolocation is not supported by your browser."));
    }
  }

  private setLocationFromGeolocationCoords(geolocationPosition: GeolocationPosition){
    // TODO: CALL API
    const newLocation: Location = {
      zipcode: "92101",
      locationName: "San Diego, CA"
    }
    this.locationSubject.next(newLocation);
  }

  private setLocationErrorFromBrowser(): void {
    this.locationSubject.error(new Error("Failed to retrieved your location."))
  }
}
