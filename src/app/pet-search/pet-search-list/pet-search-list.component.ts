import {Component, Input} from '@angular/core';
import {PetList} from "../../models/pet-list.model";

@Component({
  selector: 'app-pet-search-list',
  templateUrl: './pet-search-list.component.html',
  styleUrl: './pet-search-list.component.sass',

})
export class PetSearchListComponent {
  @Input({required: true}) petList?: PetList;
}
