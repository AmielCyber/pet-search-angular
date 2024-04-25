import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pet-details-attributes',
  templateUrl: './pet-details-attributes.component.html',
})
export class PetDetailsAttributesComponent {
  @Input({required: true}) age?: string;
  @Input({required: true}) size?: string;
  @Input({required: true}) gender?: string;
  @Input({required: true}) status?: string;
}
