import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pet-details-description',
  templateUrl: './pet-details-description.component.html',
  styleUrl: './pet-details-description.component.sass'
})
export class PetDetailsDescriptionComponent {
  @Input({required: true}) description: string | null = null;
  @Input({required: true}) detailsUrl: string = "";
}
