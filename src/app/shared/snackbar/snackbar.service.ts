import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ProblemDetails} from "get-problem-details";

import {SnackbarData, SnackbarPanelClass, SnackbarType} from "./snackbar-data.model";
import {ProblemDetailsSnackbarComponent} from "./problem-details-snackbar/problem-details-snackbar.component";
import {CustomSnackbarComponent} from "./custom-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly shortDuration = 3000;
  private readonly longDuration = 5000;

  constructor(private snackbar: MatSnackBar) {
  }

  problemDetails(problemDetails: ProblemDetails) {
    this.snackbar.openFromComponent(
      ProblemDetailsSnackbarComponent,
      this.getSnackBarConfig(SnackbarType.problemDetails, "", problemDetails)
    );
  }

  success(message: string) {
    this.snackbar.openFromComponent(
      CustomSnackbarComponent,
      this.getSnackBarConfig(SnackbarType.success, message)
    );
  }

  error(message: string) {
    this.snackbar.openFromComponent(
      CustomSnackbarComponent,
      this.getSnackBarConfig(SnackbarType.error, message)
    );
  }

  info(message: string) {
    this.snackbar.openFromComponent(
      CustomSnackbarComponent,
      this.getSnackBarConfig(SnackbarType.info, message)
    );
  }

  public getSnackBarConfig(snackbarType: SnackbarType, message: string, problemDetails?: ProblemDetails): MatSnackBarConfig {
    const data: SnackbarData | ProblemDetails =
      problemDetails ? problemDetails : this.getSnackbarData(snackbarType, message);
    console.log(this.getPanelClass(snackbarType));
    return {
      duration: this.getDuration(snackbarType),
      panelClass: this.getPanelClass(snackbarType),
      data: data,
    };
  }

  private getDuration(snackbarType: SnackbarType): number {
    if (snackbarType === SnackbarType.problemDetails)
      return this.longDuration;
    return this.shortDuration;
  }

  private getPanelClass(snackbarType: SnackbarType): SnackbarPanelClass {
    switch (snackbarType) {
      case SnackbarType.success:
        return SnackbarPanelClass.success;
      case SnackbarType.info:
        return SnackbarPanelClass.info;
      default:
        return SnackbarPanelClass.error;
    }
  }

  private getSnackbarData(snackbarType: SnackbarType, message: string): SnackbarData {
    return {
      message: message,
      type: snackbarType,
    }
  }
}
