import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Injectable()
export class CustomPaginatorService implements MatPaginatorIntl {
  readonly changes: Subject<void> = new Subject<void>();
  firstPageLabel: string = "First Page";
  itemsPerPageLabel: string = "Pets per page:";
  lastPageLabel: string = " Last Page";
  nextPageLabel: string = "Next Page";
  previousPageLabel: string = "Previous Page";

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return "Page 1 of 1";
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
}
