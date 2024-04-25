import {Component} from '@angular/core';
import {Observable, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
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

  constructor(private activatedRoute: ActivatedRoute, private petDetailsService: PetDetailsService, private snackbarService: SnackbarService) {
    const petId = this.activatedRoute.snapshot.paramMap.get("petId") ?? "0";
    this.petData$ = this.petDetailsService.getPet(parseInt(petId))
      .pipe(
        tap((pet: HttpRequestState<Pet>) => {
          if (pet.error)
            this.snackbarService.problemDetails(new ProblemDetails(pet.error))
        })
      );
  }
}
