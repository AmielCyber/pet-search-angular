import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ParamMap} from "@angular/router";

import {PetSearchParams} from "../models/pet-search-params.model";
import {defaultPetSearchParams} from "../data/default-pet-search-params.data";

@Injectable({
  providedIn: 'root'
})
export class PetSearchParamsService {
  readonly petSearchParams$: Observable<PetSearchParams>;

  private readonly defaultPetSearchParams: PetSearchParams = defaultPetSearchParams;
  private readonly petSearchParamsSubject: BehaviorSubject<PetSearchParams>;

  constructor() {
    this.petSearchParamsSubject = new BehaviorSubject<PetSearchParams>({...this.defaultPetSearchParams});
    this.petSearchParams$ = this.petSearchParamsSubject.asObservable();
  }

  setParamsFromQueryParamMap(paramMap: ParamMap): void {
    const newSearchParams = this.queryParamMapToPetSearchParams(paramMap);
    this.petSearchParamsSubject.next(newSearchParams);
  }

  setLocation(zipcode: string): void {
    const newSearchParams: PetSearchParams = {
      ...this.petSearchParamsSubject.getValue(),
      location: zipcode
    };
    this.petSearchParamsSubject.next(newSearchParams);
  }

  setPage(pageNumber: number): void {
    const newSearchParams: PetSearchParams = {
      ...this.petSearchParamsSubject.getValue(),
      page: pageNumber.toString(),
    };
    this.petSearchParamsSubject.next(newSearchParams);
  }

  setDistance(distance: string): void {
    const newSearchParams: PetSearchParams = {
      ...this.petSearchParamsSubject.getValue(),
      distance: distance
    };
    this.petSearchParamsSubject.next(newSearchParams);
  }

  setSort(sortBy: string): void {
    const newSearchParams: PetSearchParams = {
      ...this.petSearchParamsSubject.getValue(),
      sort: sortBy
    };
    this.petSearchParamsSubject.next(newSearchParams);
  }

  private queryParamMapToPetSearchParams(paramMap: ParamMap): PetSearchParams {
    console.debug(paramMap.get("location"))
    return ({
      location: paramMap.get("location") ?? this.defaultPetSearchParams.location,
      page: paramMap.get("page"),
      distance: paramMap.get("distance"),
      sort: paramMap.get("sort")
    });
  }
}
