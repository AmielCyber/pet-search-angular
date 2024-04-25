import {Component, Input, OnInit} from '@angular/core';

import {PhotoSize} from "../../core/models/photo-size.model";

@Component({
  selector: 'app-pet-details-image',
  templateUrl: './pet-details-image.component.html',
  styleUrl: './pet-details-image.component.sass'
})
export class PetDetailsImageComponent implements OnInit {
  @Input({required: true}) photoUrl: PhotoSize[] = [];
  @Input({required: true}) name: string = "";
  imageIndex = 0;
  navigationDots: undefined[] = [];

  hasImages(): boolean {
    return this.photoUrl.length > 0;
  }

  ngOnInit(): void {
    this.navigationDots = new Array(this.photoUrl.length);
  }

  hasPrevious(): boolean {
    return this.imageIndex > 0;
  }

  hasNext(): boolean {
    return this.imageIndex < this.photoUrl.length - 1;
  }

  handlePreviousImage(): void {
    this.imageIndex = this.hasPrevious() ? this.imageIndex - 1 : this.photoUrl.length - 1;
  }

  handleNextImage(): void {
    this.imageIndex = this.hasNext() ? this.imageIndex + 1 : 0;
  }

  hasMultipleImages(): boolean {
    return this.photoUrl.length > 1;
  }

  handleImageNavigation(index: number): void {
    if (index !== this.imageIndex)
      this.imageIndex = index;
  }

  getImageNavIconName(index: number): string {
    return this.imageIndex !== index ? "radio_button_unchecked" : "radio_button_checked"
  }
}
