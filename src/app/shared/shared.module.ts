import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";

import {CustomSnackbarComponent} from './snackbar/custom-snackbar.component';
import {ProblemDetailsSnackbarComponent} from './snackbar/problem-details-snackbar/problem-details-snackbar.component';
import {PetIconComponent} from "./pet-icon/pet-icon.component";

@NgModule({
  declarations: [
    CustomSnackbarComponent,
    ProblemDetailsSnackbarComponent,
    PetIconComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    PetIconComponent,
  ]
})
export class SharedModule {
}
