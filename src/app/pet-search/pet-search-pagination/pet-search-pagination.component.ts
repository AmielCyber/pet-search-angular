import {Component, Input} from '@angular/core';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";

import {CustomPaginatorService} from "./custom-paginator.service";
import {Pagination} from "../../core/models/pagination.model";
import {PetSearchParamsService} from "../services/pet-search-params.service";

@Component({
  selector: 'app-pet-search-pagination',
  templateUrl: './pet-search-pagination.component.html',
  styleUrl: './pet-search-pagination.component.sass',
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorService}],
})
export class PetSearchPaginationComponent {
  @Input({required: true}) pagination?: Pagination;
  @Input({required: true}) isLoading?: boolean;

  // TODO: Add page size options when backend updated

  constructor(private petSearchParamsService: PetSearchParamsService) {
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.petSearchParamsService.setPageURLQuery((pageEvent.pageIndex + 1).toString());
  }
}
