import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {SelectInputData, SelectOptionData} from "../../models/select-input.model";
import {selectDistanceInput, selectSortInput} from "../../data/select-filter.data";
import {PetSearchParamsService} from "../pet-search-params.service";

@Component({
  selector: 'app-pet-search-filter-list',
  templateUrl: './pet-search-filter-list.component.html',
  styleUrl: './pet-search-filter-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetSearchFilterListComponent implements OnInit {
  @Input() initSelectedSortValue: string | null = null;
  @Input() initSelectedDistanceValue: string | null = null;
  @Input({required: true}) isLoading?: boolean;
  readonly selectSortInputData: SelectInputData<string> = selectSortInput;
  readonly selectDistanceInputData: SelectInputData<string> = selectDistanceInput;

  selectedSortOption?: SelectOptionData<string>;
  selectedDistanceOption?: SelectOptionData<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private petSearchParamsService: PetSearchParamsService
  ) {
  }

  ngOnInit() {
    this.setSelectedSortOption();
    this.setSelectedDistanceOption();
  }

  onSortChange(sortBy: string): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {sort: sortBy},
        queryParamsHandling: "merge"
      }
    ).then(() => this.petSearchParamsService.setSort(sortBy));
  }

  onDistanceChange(distance: string): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {distance: distance},
        queryParamsHandling: "merge"
      }
    ).then(() => this.petSearchParamsService.setDistance(distance));
  }

  private setSelectedSortOption() {
    this.selectedSortOption =
      this.selectSortInputData.optionValues.find(o => o.value === this.initSelectedSortValue);
  }

  private setSelectedDistanceOption() {
    this.selectedDistanceOption =
      this.selectDistanceInputData.optionValues.find(o => o.value === this.initSelectedDistanceValue);
  }
}
