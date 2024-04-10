import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {Location} from "../../../models/location.model";
import {LocationService} from "../location.service";
import {ZipCodeDialogComponent} from "../zip-code-dialog/zip-code-dialog.component";

@Component({
  selector: 'app-set-zip-code-button',
  templateUrl: './set-zip-code-button.component.html',
})
export class SetZipCodeButtonComponent {
  readonly location$: Observable<Location> = this.locationService.location$;
  readonly isLoading$: Observable<boolean> = this.locationService.isLoading$;

  private readonly zipCodeDialogConfig = {position: {top: "10%"}}

  constructor(public dialog: MatDialog, private locationService: LocationService) {
  }

  openZipcodeDialog(): void {
    const dialogRef: MatDialogRef<ZipCodeDialogComponent, string> =
      this.dialog.open(ZipCodeDialogComponent, this.zipCodeDialogConfig);

    dialogRef.afterClosed().subscribe(enteredZipcode => {
      if (enteredZipcode)
        this.setZipcode(enteredZipcode)
    });
  }

  private setZipcode(enteredZipCode: string) {
    this.locationService.setLocationFromZipcode(enteredZipCode);
  }
}
