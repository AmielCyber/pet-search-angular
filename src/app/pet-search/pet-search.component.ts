import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, skip, Subscription, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {PetSearchParams} from "./models/pet-search-params.model";
import {HttpRequestState} from "../core/models/http-request-state.model";
import {PetList} from "../core/models/pet-list.model";
import {PetListService} from "./services/pet-list.service";
import {PetSearchParamsService} from "./services/pet-search-params.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {ProblemDetails} from "get-problem-details";
import {LocationService} from "../shared/services/location.service";

@Component({
  selector: 'app-pet-search',
  templateUrl: './pet-search.component.html',
  styleUrl: './pet-search.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetSearchComponent implements OnInit, OnDestroy {
  petTypePlural: string;
  initialSortValue: string;
  initialDistanceValue: string;
  petSearchParams: PetSearchParams;

  petListData$?: Observable<HttpRequestState<PetList>>;
  queryParamsSub: Subscription;
  locationSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private petListService: PetListService,
    private petSearchParamsService: PetSearchParamsService,
    private snackbarService: SnackbarService,
    private locationService: LocationService,
  ) {
    this.petTypePlural = this.activatedRoute.snapshot.paramMap.get("petTypePlural") ?? "";
    this.initialSortValue = this.activatedRoute.snapshot.queryParamMap.get("sort") ?? "";
    this.initialDistanceValue = this.activatedRoute.snapshot.queryParamMap.get("distance") ?? "";
    this.petSearchParams = this.petSearchParamsService.getDefaultPetSearchParams();

    this.queryParamsSub = this.activatedRoute.queryParams.pipe(
      tap(p => {
        this.petSearchParams = this.petSearchParamsService.paramsToPetSearchParams(this.petTypePlural, p);
        this.petListService.updatePetListDataFromParams(this.petSearchParams);
      })).subscribe();
  }

  ngOnInit(): void {
    this.petListData$ = this.petListService.petListData$.pipe(
      tap((p: HttpRequestState<PetList>): void => {
        if (p.error) this.snackbarService.problemDetails(new ProblemDetails(p.error))
      })
    );
    this.locationSub = this.locationService.locationData$
      .pipe(
        skip(1),
        tap(l =>
          this.petSearchParamsService.setLocationURLQuery(l.data?.zipcode ?? this.petSearchParams.location)
        )
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
    this.locationSub?.unsubscribe();
  }
}
