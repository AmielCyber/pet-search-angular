import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

import {SnackbarData, SnackbarType} from "./snackbar-data.model";
import {CustomSnackbarComponent} from "./custom-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private configuration: MatSnackBarConfig = {
    duration: 3000,
  }

  constructor(private snackbar: MatSnackBar) {
  }

  success(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      ...this.configuration,
      panelClass: "success-snackbar",
      data: this.getSnackbarData("success", message),
    },)
  }

  error(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      ...this.configuration,
      panelClass: "error-snackbar",
      data: this.getSnackbarData("error", message),
    },)
  }

  info(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      ...this.configuration,
      panelClass: "info-snackbar",
      data: this.getSnackbarData("info", message),
    },)
  }

  private getSnackbarData(snackbarType: SnackbarType, message: string): SnackbarData {
    return {
      message: message,
      type: snackbarType,
    }
  }
}
