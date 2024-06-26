import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {HttpRequestState} from "../models/http-request-state.model";
import {Location} from "../models/location.model";
import {LocationService} from "../services/location.service";

@Component({
  selector: 'app-location-buttons',
  templateUrl: './location-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationButtonsComponent implements OnInit {
  locationData$?: Observable<HttpRequestState<Location>>;

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationData$ = this.locationService.locationData$;
  }

  onLocateBrowserLocation(): void {
    this.locationService.setLocationFromBrowserGeolocation();
  }

  onSetNewZipcode(zipcode: string): void {
    this.locationService.setLocationFromZipcode(zipcode);
  }

}
