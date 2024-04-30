import {Component} from '@angular/core';
import {Observable, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {ProblemDetails} from "get-problem-details";

import {HttpRequestState} from "../core/models/http-request-state.model";
import {Pet} from "../core/models/pet.model";
import {PetDetailsService} from "./pet-details.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.sass'
})
export class PetDetailsComponent {
  petData$: Observable<HttpRequestState<Pet>>;
  fromSearchRoute: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private petDetailsService: PetDetailsService, private snackbarService: SnackbarService,
              private location: Location) {
    const data: Object = this.router.getCurrentNavigation()?.extras.state ?? {};
    this.fromSearchRoute = Object.hasOwn(data, "fromSearchRoute");

    const petId = this.activatedRoute.snapshot.paramMap.get("petId") ?? "0";
    this.petData$ = this.petDetailsService.getPet(parseInt(petId))
      .pipe(
        tap((pet: HttpRequestState<Pet>) => {
          if (pet.error)
            this.snackbarService.problemDetails(new ProblemDetails(pet.error))
        })
      );
  }

  handleBackClick(): void {
    this.location.historyGo(-1);
  }
}
