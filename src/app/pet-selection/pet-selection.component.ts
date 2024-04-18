import {Component} from '@angular/core';
import {Observable} from "rxjs";

import {Location} from "../models/location.model";
import {PetResource} from "../shared/pet-resource.model";
import {HttpRequestStateModel} from "../shared/http-request-state.model";
import {ROUTER_TOKENS} from "../app.routes";
import {PetIconService} from "../shared/pet-icon/pet-icon.service";
import {LocationService} from "../core/location/location.service";

@Component({
  selector: 'app-pet-selection',
  templateUrl: './pet-selection.component.html',
  styleUrl: './pet-selection.component.sass'
})
export class PetSelectionComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  readonly locationData$: Observable<HttpRequestStateModel<Location>>;
  readonly petResourceList: PetResource[];

  constructor(private petIconService: PetIconService, private locationService: LocationService) {
    this.petResourceList = this.petIconService.getPetResourceList();
    this.locationData$ = this.locationService.locationData$;
  }

}
