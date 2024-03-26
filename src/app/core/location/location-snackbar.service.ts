import {Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LocationSnackbarService {
  private configuration: MatSnackBarConfig = {
    horizontalPosition: "start",
    verticalPosition: "bottom",
    duration: 2500,
  }


  constructor(private snackbar: MatSnackBar) {
  }

  success(message: string) {
    this.snackbar.open(message, "Dismiss", this.configuration);
  }

  error(message: string) {
    this.snackbar.open(message, "Dismiss", this.configuration);
  }
}
