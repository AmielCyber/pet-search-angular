import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, Observable, tap} from "rxjs";

import {PetList} from "../../core/models/pet-list.model";
import {PetSearchParams} from "../../core/models/pet-search-params.model";
import {HttpRequestState} from "../../core/models/http-request-state.model";
import {PetHttpService} from "../../core/services/pet-http.service";
import {PetListCacheService} from "./pet-list-cache.service";

@Injectable({
  providedIn: 'root'
})
export class PetListService {
  readonly petListData$: Observable<HttpRequestState<PetList>>
  readonly loadingState: HttpRequestState<PetList>;

  private readonly petListSubject: BehaviorSubject<HttpRequestState<PetList>>;
  private readonly emptyPetListData: HttpRequestState<PetList>;

  constructor(private petHttpService: PetHttpService, private petListCacheService: PetListCacheService) {
    this.emptyPetListData = {isLoading: false, data: this.getEmptyPetList()};
    this.loadingState = {isLoading: true};

    this.petListSubject = new BehaviorSubject<HttpRequestState<PetList>>(this.loadingState);
    this.petListData$ = this.petListSubject.asObservable();
  }

  updatePetListDataFromParams(petSearchParams: PetSearchParams): void {
    const params = JSON.stringify(petSearchParams);
    const cachedList = this.petListCacheService.getList(params);

    if (cachedList) {
      this.petListSubject.next({isLoading: false, data: cachedList});
    } else {
      this.updatePetListFromServer(petSearchParams, params);
    }
  }

  private updatePetListFromServer(petSearchParams: PetSearchParams, params: string) {
    this.petListSubject.next(this.loadingState);
    this.petHttpService.getPetList(petSearchParams)
      .pipe(
        tap(petList => {
          this.petListSubject.next({isLoading: false, data: petList})
          this.petListCacheService.addList(params, petList);
        }),
        catchError(err => {
          this.petListSubject.next({...this.emptyPetListData, error: err.error})
          return EMPTY;
        })
      ).subscribe();
  }

  private getEmptyPetList(): PetList {
    return {
      pets: [],
      pagination: {
        pageSize: 0,
        totalCount: 0,
        currentPage: 0,
        totalPages: 0
      }
    };
  }
}
