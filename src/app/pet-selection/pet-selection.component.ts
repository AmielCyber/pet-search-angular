import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

import {PetSelection} from "./pet-selection.model";
import {petSelectionList} from "./pet-selection-list";
import {LocationService} from "../core/location/location.service";
import {ROUTER_TOKENS} from "../app.routes";
import {Location} from "../core/location/location.model";

@Component({
  selector: 'app-pet-selection',
  templateUrl: './pet-selection.component.html',
  styleUrl: './pet-selection.component.sass'
})
export class PetSelectionComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  readonly location$: Observable<Location> = this.locationService.location$;
  readonly petSelectionList: PetSelection[] = petSelectionList;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private locationService: LocationService) {
    for (const petSelection of this.petSelectionList) {
      iconRegistry.addSvgIcon(petSelection.iconName, sanitizer.bypassSecurityTrustResourceUrl(petSelection.resourceUrl));
    }
  }

}
