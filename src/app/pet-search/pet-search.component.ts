import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {PetSearchParams} from "../models/pet-search-params.model";
import {HttpRequestState} from "../shared/http-request-state";
import {PetList} from "../models/pet-list.model";
import {PetListService} from "./pet-list.service";
import {PetSearchParamsService} from "./pet-search-params.service";
import {ProblemDetails} from "get-problem-details";
import {SnackbarService} from "../core/snackbar/snackbar.service";

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private petListService: PetListService,
    private petSearchParamsService: PetSearchParamsService,
    private snackbarService: SnackbarService,
  ) {
    this.petTypePlural = this.activatedRoute.snapshot.paramMap.get("petTypePlural") ?? "";
    this.initialSortValue = this.activatedRoute.snapshot.queryParamMap.get("sort") ?? "";
    this.initialDistanceValue = this.activatedRoute.snapshot.queryParamMap.get("distance") ?? "";
    this.petSearchParams = this.petSearchParamsService.getDefaultPetSearchParams();

    this.queryParamsSub = this.activatedRoute.queryParams.pipe(
      tap(p => {
        this.petSearchParams = this.petSearchParamsService.paramsToPetSearchParams(this.petTypePlural, p);
        this.petListService.updatePetListDataFromParams(this.petSearchParams);
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.petListData$ = this.petListService.petListData$.pipe(
      tap((p: HttpRequestState<PetList>): void => {
        if (p.error) this.snackbarService.problemDetails(new ProblemDetails(p.error))
      })
    );
  }

  ngOnDestroy(): void {
    this.petListService.resetToInitialState();
    this.queryParamsSub.unsubscribe();
  }
}
