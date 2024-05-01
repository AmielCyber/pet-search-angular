import {Injectable, SecurityContext} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {catchError, map, Observable, of, startWith, tap} from "rxjs";

import {PetHttpService} from "../../shared/services/pet-http.service";
import {HttpRequestState} from "../../core/models/http-request-state.model";
import {Pet} from "../../core/models/pet.model";

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {
  private cachedPetDetails?: HttpRequestState<Pet>;

  constructor(private petHttpService: PetHttpService, private sanitizer: DomSanitizer) {
  }

  getPet(petId: number): Observable<HttpRequestState<Pet>> {
    if (this.cachedPetDetails && this.cachedPetDetails.data?.id === petId) {
      return of(this.cachedPetDetails);
    }
    return this.petHttpService.getPet(petId).pipe(
      tap(p => this.cachedPetDetails = {isLoading: false, data: p}),
      map(p => this.getPetHttpRequestState(p)),
      startWith({isLoading: true}),
      catchError(err => of({isLoading: false, error: err.error})
      )
    );
  }

  setCachedPet(pet: Pet): void {
    this.cachedPetDetails = {
      isLoading: false,
      data: pet,
    }
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
