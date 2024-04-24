import {Component, SecurityContext} from '@angular/core';
import {Observable} from "rxjs";

import {Pet} from "../core/models/pet.model";
import {PetHttpService} from "../core/services/pet-http.service";
import {DomSanitizer} from "@angular/platform-browser";
import {petData} from "./pet.data";

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.sass'
})
export class PetDetailsComponent {
  // TODO: change to actual data
  pet: Pet = petData;
  sanitizedName: string;
  sanitizedDescription: string;
  // pet$: Observable<Pet> = this.petHttpService.getPet(70808617);

  constructor(private petHttpService: PetHttpService, private sanitizer: DomSanitizer) {
    this.sanitizedName = this.decodeHtmlEntityString(this.pet.name);
    this.sanitizedDescription = this.decodeHtmlEntityString(this.pet.description);
  }

  decodeHtmlEntityString(encodedStr: string | null): string {
    const sanitizedStr = this.sanitizer.sanitize(SecurityContext.HTML, encodedStr);
    if(!sanitizedStr)
      return "No description provided."

    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedStr;
    return tempElement.textContent ?? "";
  }

}
