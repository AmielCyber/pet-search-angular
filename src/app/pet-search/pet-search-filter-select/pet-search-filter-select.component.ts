import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";

import {SelectInputData, SelectOptionData} from "../models/select-input.model";

@Component({
  selector: 'app-pet-search-filter-select',
  templateUrl: './pet-search-filter-select.component.html',
  styleUrl: './pet-search-filter-select.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetSearchFilterSelectComponent<T> implements OnInit {
  @Input({required: true}) selectInputData?: SelectInputData<T>;
  @Input({required: true}) isLoading?: boolean;
  @Input() selectedOption?: SelectOptionData<T>;
  @Output() selectFilterChange = new EventEmitter<T>();

  ngOnInit() {
    if (!this.selectedOption)
      this.selectedOption = this.selectInputData?.defaultSelectedOption;
  }

  selectionFilterChange(selectOption: MatSelectChange): void {
    this.selectFilterChange.emit(selectOption.value);
  }
}
