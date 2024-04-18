import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pet-selection-card',
  templateUrl: './pet-selection-card.component.html',
  styleUrl: './pet-selection-card.component.sass'
})
export class PetSelectionCardComponent {
  @Input({required: true}) petType?: "Dog" | "Cat";
  @Input({required: true}) petTypePlural?: string;
}
