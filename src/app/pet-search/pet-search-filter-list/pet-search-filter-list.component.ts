import {Component} from '@angular/core';

import {selectDistanceInput, selectSortInput} from "./select-filter.data";
import {SelectInputData} from "./select-input.model";

@Component({
  selector: 'app-pet-search-filter-list',
  templateUrl: './pet-search-filter-list.component.html',
  styleUrl: './pet-search-filter-list.component.sass'
})
export class PetSearchFilterListComponent {
  readonly selectSortInputData: SelectInputData<string> = selectSortInput;
  readonly selectDistanceInputData: SelectInputData<number> = selectDistanceInput;

  onSortChange(sortBy: string): void {
    // TODO: Update URL search params by sort
    console.log(`SortBy: ${sortBy}`);
  }

  onDistanceChange(distance: number): void {
    // TODO: Update URL search params by distance
    console.log(`Distance: ${distance}`);
  }
}
