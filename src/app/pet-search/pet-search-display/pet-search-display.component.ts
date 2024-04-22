import {Component, Input} from '@angular/core';

import {HttpRequestState} from "../../core/models/http-request-state.model";
import {PetList} from "../../core/models/pet-list.model";

@Component({
  selector: 'app-pet-search-display',
  templateUrl: './pet-search-display.component.html',
  styleUrl: './pet-search-display.component.sass'
})
export class PetSearchDisplayComponent {
  @Input({required: true}) petListData?: HttpRequestState<PetList>;

}
