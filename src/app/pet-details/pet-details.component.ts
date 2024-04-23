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
  // pet$: Observable<Pet> = this.petHttpService.getPet(70808617);

  constructor(private petHttpService: PetHttpService, private sanitizer: DomSanitizer) {
  }

  decodeHtmlEntityString(encodedStr: string | null): string | null {
    const sanitizedStr = this.sanitizer.sanitize(SecurityContext.HTML, encodedStr);
    if(!sanitizedStr)
      return "No description provided."

    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedStr;
    return tempElement.textContent;
  }

}
