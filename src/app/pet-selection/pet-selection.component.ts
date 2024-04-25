import {Component} from '@angular/core';
import {Observable} from "rxjs";

import {Location} from "../core/models/location.model";
import {PetResource} from "../shared/models/pet-resource.model";
import {HttpRequestState} from "../core/models/http-request-state.model";
import {ROUTER_TOKENS} from "../app.routes";
import {PetIconService} from "../shared/pet-icon/pet-icon.service";
import {LocationService} from "../shared/services/location.service";

@Component({
  selector: 'app-pet-selection',
  templateUrl: './pet-selection.component.html',
  styleUrl: './pet-selection.component.sass'
})
export class PetSelectionComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  readonly locationData$: Observable<HttpRequestState<Location>>;
  readonly petResourceList: PetResource[];

  constructor(private petIconService: PetIconService, private locationService: LocationService) {
    this.petResourceList = this.petIconService.getPetResourceList();
    this.locationData$ = this.locationService.locationData$;
  }

}
