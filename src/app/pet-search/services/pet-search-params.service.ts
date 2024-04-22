import {Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {PetSearchParams} from "../models/pet-search-params.model";
import {availablePetsMap} from "../data/available-pets.data";
import {defaultPetSearchParams} from "../data/default-pet-search-params.data";

@Injectable({
  providedIn: 'root'
})
export class PetSearchParamsService {
  private readonly availablePetsMap: Map<string, string>;
  private readonly defaultPetSearchParams: PetSearchParams;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.availablePetsMap = availablePetsMap;
    this.defaultPetSearchParams = defaultPetSearchParams;
  }

  getDefaultPetSearchParams(): PetSearchParams {
    return this.defaultPetSearchParams;
  }

  isValidPetType(petTypePlural: string | null): boolean {
    if (petTypePlural)
      return this.availablePetsMap.has(petTypePlural);
    return false;
  }

  paramsToPetSearchParams(petTypePlural: string, params: Params): PetSearchParams {
    return ({
      type: this.getPetTypeFromPluralPetType(petTypePlural),
      location: params["location"] ?? this.defaultPetSearchParams.location,
      page: params["page"],
      distance: params["distance"],
      sort: params["sort"]
    });
  }

  setLocationURLQuery(zipcode: string): void {
    this.setQuery({location: zipcode, page: "1"});
  }

  setPageURLQuery(pageIndex: string): void {
    this.setQuery({page: pageIndex});
  }

  setDistanceURLQuery(distance: string): void {
    this.setQuery({distance: distance, page: "1"});
  }

  setSortURLQuery(sort: string): void {
    this.setQuery({sort: sort, page: "1"});
  }

  private setQuery(queryEntry: Partial<PetSearchParams>): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryEntry,
        queryParamsHandling: "merge"
      }
    );
  }

  private getPetTypeFromPluralPetType(petTypePlural: string): string {
    return this.availablePetsMap.get(petTypePlural) ?? "";
  }
}
