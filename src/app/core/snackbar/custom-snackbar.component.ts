import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

import {SnackbarData} from "./snackbar-data.model";

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.sass'
})
export class CustomSnackbarComponent {
  snackBarDataModel: SnackbarData;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: SnackbarData) {
    this.snackBarDataModel = data;
  }
}
