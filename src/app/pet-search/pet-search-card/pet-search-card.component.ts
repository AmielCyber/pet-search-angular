import {Component, Input, OnInit} from '@angular/core';

import {Pet} from "../../core/models/pet.model";
import {ROUTER_TOKENS} from "../../routes/router-tokens.model";
import {PetDetailsService} from "../services/pet-details.service";

@Component({
  selector: 'app-pet-search-card',
  templateUrl: './pet-search-card.component.html',
  styleUrl: './pet-search-card.component.sass'
})
export class PetSearchCardComponent implements OnInit {
  @Input({required: true}) pet?: Pet;
  petImageUrl: string | null = null;
  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;

  constructor(private petDetailsService: PetDetailsService) {
  }

  ngOnInit(): void {
    this.petImageUrl = this.getPetImageUrl();
  }

  cachePetDetails(pet: Pet): void {
    this.petDetailsService.setCachedPet(pet)
  }

  private getPetImageUrl(): string | null {
    if (this.pet) {
      if (this.pet.primaryPhotoCropped) {
        return this.pet.primaryPhotoCropped.small;
      }
      if (this.pet.photos.length > 0) {
        return this.pet.photos[0].small;
      }
    }
    return null;
  }
}
