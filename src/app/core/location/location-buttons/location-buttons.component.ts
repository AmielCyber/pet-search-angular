import {Component} from '@angular/core';
import {Observable} from "rxjs";

import {HttpRequestState} from "../../../shared/http-request-state.model";
import {Location} from "../../../models/location.model";
import {LocationService} from "../location.service";

@Component({
  selector: 'app-location-buttons',
  templateUrl: './location-buttons.component.html',
})
export class LocationButtonsComponent {
  locationData$: Observable<HttpRequestState<Location>>;

  constructor(private locationService: LocationService) {
    this.locationData$ = this.locationService.locationData$;
  }

  onLocateBrowserLocation(): void {
    this.locationService.setLocationFromBrowserGeolocation();
  }

  onSetNewZipcode(zipcode: string): void {
    this.locationService.setLocationFromZipcode(zipcode);
  }
}
