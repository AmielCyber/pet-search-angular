import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LocationService} from "../../core/location/location.service";
import {Observable} from "rxjs";

import {Location} from "../../models/location.model";

@Component({
  selector: 'app-pet-search-header',
  templateUrl: './pet-search-header.component.html',
  styleUrl: './pet-search-header.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetSearchHeaderComponent {
  @Input({required: true}) petTypePlural?: string;
  @Input({required: true}) zipcode?: string;
  @Input({required: true}) totalCount?: number;
  location$: Observable<Location> = this.locationService.location$;

  constructor(private locationService: LocationService) {
  }
}
