import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, Observable, tap} from "rxjs";

import {PetList} from "../models/pet-list.model";
import {PetSearchParams} from "../models/pet-search-params.model";
import {PetHttpService} from "./pet-http.service";
import {HttpRequestState} from "../shared/http-request-state";

@Injectable({
  providedIn: 'root'
})
export class PetListService {
  readonly petListData$: Observable<HttpRequestState<PetList>>
  readonly loadingState: HttpRequestState<PetList>;

  private readonly petListSubject: BehaviorSubject<HttpRequestState<PetList>>;
  private readonly emptyPetListData: HttpRequestState<PetList>;

  constructor(private petHttpService: PetHttpService) {
    this.emptyPetListData = {isLoading: false, data: this.getEmptyPetList()};
    this.loadingState = {isLoading: true};

    this.petListSubject = new BehaviorSubject<HttpRequestState<PetList>>(this.loadingState);
    this.petListData$ = this.petListSubject.asObservable();
  }

  updatePetListDataFromParams(petSearchParams: PetSearchParams): void {
    this.petListSubject.next(this.loadingState);

    this.petHttpService.getPetList(petSearchParams)
      .pipe(
        tap(petList => this.petListSubject.next({isLoading: false, data: petList})),
        catchError(err => {
          this.petListSubject.next({...this.emptyPetListData, error: err.error})
          return EMPTY;
        })
      ).subscribe();
  }

  resetToInitialState(): void {
    this.petListSubject.next(this.loadingState);
  }

  private getEmptyPetList(): PetList {
    return {
      pets: [],
      pagination: {
        count_per_page: 0,
        total_count: 0,
        current_page: 0,
        total_pages: 0
      }
    };
  }
}
