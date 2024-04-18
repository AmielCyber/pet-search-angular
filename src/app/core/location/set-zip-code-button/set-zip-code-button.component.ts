import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {HttpRequestState} from "../../../shared/http-request-state.model";
import {Location} from "../../../models/location.model";
import {ZipCodeDialogComponent} from "../zip-code-dialog/zip-code-dialog.component";

@Component({
  selector: 'app-set-zip-code-button',
  templateUrl: './set-zip-code-button.component.html',
})
export class SetZipCodeButtonComponent implements OnChanges {
  @Input({required: true}) locationData?: HttpRequestState<Location>;
  @Output() setNewZipcode: EventEmitter<string>;
  isLoading: boolean;
  zipcode: string;

  private readonly zipCodeDialogConfig = {position: {top: "10%"}}

  constructor(public dialog: MatDialog) {
    this.setNewZipcode = new EventEmitter<string>();
    this.isLoading = this.locationData?.isLoading || !this.locationData?.data;
    this.zipcode = this.locationData?.data?.zipcode ?? "00000";
  }

  ngOnChanges(): void {
    this.isLoading = this.locationData?.isLoading || !this.locationData?.data;
    this.zipcode = this.locationData?.data?.zipcode ?? "00000";
  }

  openZipcodeDialog(): void {
    const dialogRef: MatDialogRef<ZipCodeDialogComponent, string> =
      this.dialog.open(ZipCodeDialogComponent, this.zipCodeDialogConfig);

    dialogRef.afterClosed().subscribe(enteredZipcode => {
      if (enteredZipcode)
        this.setNewZipcode.emit(enteredZipcode);
    });
  }
}
