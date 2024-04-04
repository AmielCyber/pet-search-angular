import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";

import {SelectInputData, SelectOptionData} from "../pet-search-filter-list/select-input.model";

@Component({
  selector: 'app-pet-search-filter-select',
  templateUrl: './pet-search-filter-select.component.html',
  styleUrl: './pet-search-filter-select.component.sass'
})
export class PetSearchFilterSelectComponent<T> {
  @Input({required: true}) selectInputData!: SelectInputData<T>;
  @Input() defaultSelectOption!: SelectOptionData<T>;
  @Output() selectFilterChange = new EventEmitter<T>();

  selectionFilterChange(selectOption: MatSelectChange): void {
    this.selectFilterChange.emit(selectOption.value);
  }
}
