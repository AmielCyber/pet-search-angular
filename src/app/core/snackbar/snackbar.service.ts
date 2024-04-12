import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProblemDetails} from "get-problem-details";

import {SnackbarData, SnackbarType} from "./snackbar-data.model";
import {CustomSnackbarComponent} from "./custom-snackbar.component";
import {ProblemDetailsSnackbarComponent} from "./problem-details-snackbar/problem-details-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly shortDuration = 3000;
  private readonly problemDetailsDuration = 5000;

  constructor(private snackbar: MatSnackBar) {
  }

  problemDetails(problemDetails: ProblemDetails) {
    this.snackbar.openFromComponent(ProblemDetailsSnackbarComponent, {
      duration: this.problemDetailsDuration,
      panelClass: "error-snackbar",
      data: problemDetails
    })

  }

  success(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      duration: this.shortDuration,
      panelClass: "success-snackbar",
      data: this.getSnackbarData("success", message),
    },)
  }

  error(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      duration: this.shortDuration,
      panelClass: "error-snackbar",
      data: this.getSnackbarData("error", message),
    },)
  }

  info(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      duration: this.shortDuration,
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
