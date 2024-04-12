import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {ProblemDetails} from "get-problem-details";

@Component({
  selector: 'app-problem-details-snackbar',
  templateUrl: './problem-details-snackbar.component.html',
  styleUrl: './problem-details-snackbar.component.sass'
})
export class ProblemDetailsSnackbarComponent {
  snackBarDataModel: ProblemDetails;
  errorMessages?: string[];

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: ProblemDetails) {
    this.snackBarDataModel = data;
    this.setErrorMessages(data.errors);
  }

  private setErrorMessages(errors?: Record<string, string[]>): void {
    if (errors) {
      const errorMessages = [];
      for (const error of Object.values(errors)) {
        for (const message of error) {
          errorMessages.push(message);
        }
      }
      this.errorMessages = errorMessages;
    }
  }
}
