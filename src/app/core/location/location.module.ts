import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel, MatHint, MatError} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";

import {LocateMeButtonComponent} from './locate-me-button/locate-me-button.component';
import {SetZipCodeButtonComponent} from './set-zip-code-button/set-zip-code-button.component';
import {ZipCodeDialogComponent} from './zip-code-dialog/zip-code-dialog.component';


@NgModule({
  declarations: [
    LocateMeButtonComponent,
    SetZipCodeButtonComponent,
    ZipCodeDialogComponent,
  ],
  exports: [
    LocateMeButtonComponent,
    SetZipCodeButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconButton,
    MatIcon,
    MatFabButton,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    ReactiveFormsModule,
    MatSuffix,
    MatHint,
    MatError
  ]
})
export class LocationModule {
}
