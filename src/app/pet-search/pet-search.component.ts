import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {availablePetsData} from "./available-pets.data";

@Component({
  selector: 'app-pet-search',
  templateUrl: './pet-search.component.html',
  styleUrl: './pet-search.component.sass'
})
export class PetSearchComponent implements OnInit {
  petTypePlural?: string;
  petTypeErrorMessage?: string;

  private readonly availablePetSet: Set<string> = availablePetsData;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const petTypePlural = this.activatedRoute.snapshot.params['petTypePlural'];
    if (this.availablePetSet.has(petTypePlural)) {
      this.petTypePlural = petTypePlural;
    } else {
      this.petTypeErrorMessage = `Pet Type: '${petTypePlural}' not supported.`;
    }
  }
}
