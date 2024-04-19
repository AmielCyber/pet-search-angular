import {Component, Input} from '@angular/core';

import {HttpRequestState} from "../../shared/http-request-state.model";
import {PetList} from "../../models/pet-list.model";

@Component({
  selector: 'app-pet-search-display',
  templateUrl: './pet-search-display.component.html',
  styleUrl: './pet-search-display.component.sass'
})
export class PetSearchDisplayComponent {
  @Input({required: true}) petListData?: HttpRequestState<PetList>;

}
