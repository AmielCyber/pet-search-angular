import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from "rxjs";

import {HttpRequestState} from "../../core/models/http-request-state.model";
import {Location} from "../../core/models/location.model";
import {LocationService} from "../../core/services/location.service";

@Component({
  selector: 'app-pet-search-header',
  templateUrl: './pet-search-header.component.html',
  styleUrl: './pet-search-header.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetSearchHeaderComponent {
  @Input({required: true}) petTypePlural?: string;
  @Input({required: true}) zipcode?: string;
  locationData$: Observable<HttpRequestState<Location>>;

  constructor(private locationService: LocationService) {
    this.locationData$ = this.locationService.locationData$;
  }

  getLocationDetail(locationData: HttpRequestState<Location> | null): string | undefined {
    if (locationData)
      return locationData?.data?.zipcode === this.zipcode ?
        locationData.data?.locationName : this.zipcode;
    return this.zipcode;
  }
}
