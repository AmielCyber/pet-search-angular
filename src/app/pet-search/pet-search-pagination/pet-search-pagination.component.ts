import {Component, Input} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

import {Pagination} from "../../models/pagination.model";
import {PetSearchParamsService} from "../pet-search-params.service";

@Component({
  selector: 'app-pet-search-pagination',
  templateUrl: './pet-search-pagination.component.html',
  styleUrl: './pet-search-pagination.component.sass'
})
export class PetSearchPaginationComponent {
  @Input({required: true}) pagination?: Pagination;
  @Input({required: true}) isLoading?: boolean;

  // TODO: Add page size options when backend updated
  // TODO: Customize pagination labels

  constructor(private petSearchParamsService: PetSearchParamsService) {
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.petSearchParamsService.setPageURLQuery((pageEvent.pageIndex + 1).toString());
  }
}
