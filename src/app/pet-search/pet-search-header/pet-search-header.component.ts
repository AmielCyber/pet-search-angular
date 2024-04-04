import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pet-search-header',
  templateUrl: './pet-search-header.component.html',
  styleUrl: './pet-search-header.component.sass'
})
export class PetSearchHeaderComponent {
  @Input({required: true}) petTypePlural!: string;
  @Input({required: true}) locationName!: string;
  @Input({required: true}) totalCount!: number;
}
