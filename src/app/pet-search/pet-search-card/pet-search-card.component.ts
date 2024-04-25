import {Component, Input, OnInit} from '@angular/core';

import {Pet} from "../../core/models/pet.model";
import {ROUTER_TOKENS} from "../../app.routes";

@Component({
  selector: 'app-pet-search-card',
  templateUrl: './pet-search-card.component.html',
  styleUrl: './pet-search-card.component.sass'
})
export class PetSearchCardComponent implements OnInit {
  @Input({required: true}) pet?: Pet;
  petImageUrl: string | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.petImageUrl = this.getPetImageUrl();
  }

  private getPetImageUrl(): string | null {
    if (this.pet) {
      if (this.pet.primary_photo_cropped) {
        return this.pet.primary_photo_cropped.small;
      }
      if (this.pet.photos.length > 0) {
        return this.pet.photos[0].small;
      }
    }
    return null;
  }

  protected readonly ROUTER_TOKENS = ROUTER_TOKENS;
}
