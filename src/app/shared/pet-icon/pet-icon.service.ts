import {Injectable} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

import {PetResource} from "./pet-resource.model";

@Injectable({
  providedIn: 'root'
})
export class PetIconService {
  readonly catResource: PetResource = {
    petType: "Cat",
    petTypePlural: "cats",
    iconName: "cat-icon",
    resourceUrl: "assets/icons/cat-icon.svg"
  }

  readonly dogResource: PetResource = {
    petType: "Dog",
    petTypePlural: "dogs",
    iconName: "dog-icon",
    resourceUrl: "assets/icons/dog-icon.svg"
  }

  private readonly petResourceList: PetResource[] = [
    this.catResource,
    this.dogResource
  ]

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const petResource of this.petResourceList) {
      iconRegistry.addSvgIcon(petResource.iconName, sanitizer.bypassSecurityTrustResourceUrl(petResource.resourceUrl));
    }
  }

  getPetResource(petType: "Dog" | "Cat"): PetResource {
    return petType === "Dog" ? this.dogResource : this.catResource;
  }

  getPetResourceList(): PetResource[] {
    return this.petResourceList;
  }
}
