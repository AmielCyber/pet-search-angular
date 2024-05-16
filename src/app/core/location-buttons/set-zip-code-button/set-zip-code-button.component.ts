import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {HttpRequestState} from "../../models/http-request-state.model";
import {Location} from "../../models/location.model";
import {ZipCodeDialogComponent} from "../../zip-code-dialog/zip-code-dialog.component";
import {defaultLocation} from "../../data/default-location.data";

@Component({
  selector: 'app-set-zip-code-button',
  templateUrl: './set-zip-code-button.component.html',
})
export class SetZipCodeButtonComponent implements OnChanges {
  @Input({required: true}) locationData?: HttpRequestState<Location>;
  @Output() setNewZipcode: EventEmitter<string>;
  isLoading: boolean = true;
  zipcode: string;

  private readonly zipCodeDialogConfig = {position: {top: "10%"}}

  constructor(public dialog: MatDialog) {
    this.setNewZipcode = new EventEmitter<string>();
    this.zipcode = defaultLocation.zipcode;
  }

  ngOnChanges(): void {
    this.isLoading = this.locationData?.isLoading || !this.locationData?.data;
    if(this.locationData?.data){
      this.zipcode = this.locationData.data.zipcode;
    }
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
