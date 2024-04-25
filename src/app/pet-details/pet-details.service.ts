import {Injectable, SecurityContext} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {catchError, concat, map, Observable, of, share, startWith, switchMap, tap} from "rxjs";

import {PetHttpService} from "../shared/services/pet-http.service";
import {HttpRequestState} from "../core/models/http-request-state.model";
import {Pet} from "../core/models/pet.model";

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {

  constructor(private petHttpService: PetHttpService, private sanitizer: DomSanitizer) {
  }

  getPet(petId: number): Observable<HttpRequestState<Pet>> {
    return this.petHttpService.getPet(petId).pipe(
      map(p => this.getPetHttpRequestState(p)),
      startWith({isLoading: true}),
      catchError(err => of({isLoading: false, error: err.error})
      )
    );
  }

  private getPetHttpRequestState(pet: Pet): HttpRequestState<Pet> {
    return ({
      isLoading: false,
      data: {
        ...pet,
        name: this.decodeHtmlEntityString(pet.name),
        description: this.decodeHtmlEntityString(pet.description)
      }
    })
  }

  private decodeHtmlEntityString(encodedStr: string | null): string {
    const sanitizedStr = this.sanitizer.sanitize(SecurityContext.HTML, encodedStr);
    if (!sanitizedStr)
      return "No description provided."

    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedStr;
    return tempElement.textContent ?? "";
  }
}
