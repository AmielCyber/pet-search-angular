import {Component, Input, OnInit} from '@angular/core';
import {PhotoSize} from "../../core/models/photo-size.model";

@Component({
  selector: 'app-pet-details-image',
  templateUrl: './pet-details-image.component.html',
  styleUrl: './pet-details-image.component.sass'
})
export class PetDetailsImageComponent implements OnInit{
  @Input({required: true}) photosUrl: PhotoSize[] = [];
  @Input({required: true}) name?: string;
  imageIndex = 0;
  protected indices: undefined[] = [];

  ngOnInit(): void {
    this.indices = new Array(this.photosUrl.length);
  }

  hasPrevious(): boolean {
    return this.imageIndex > 0;
  }

  hasNext(): boolean {
    return this.imageIndex < this.photosUrl.length-1;
  }

  handlePreviousClick(): void {
    this.imageIndex = this.hasPrevious()? this.imageIndex - 1 : this.photosUrl.length-1;
  }

  handleNextClick(): void {
    this.imageIndex = this.hasNext()? this.imageIndex + 1 : 0;
  }

  handleImageNavigation(index: number): void {
    this.imageIndex = index;
  }

  getIconType(index: number): string {
    return this.imageIndex !== index? "radio_button_unchecked" : "radio_button_checked"
  }


}
