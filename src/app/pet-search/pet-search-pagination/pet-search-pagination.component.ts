import {Component, Input} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

import {Pagination} from "../../models/pagination.model";

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {page: pageEvent.pageIndex + 1},
        queryParamsHandling: "merge"
      }
    );
  }
}
