import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIconAnchor} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { ToggleThemeButtonComponent } from './toggle-theme-button/toggle-theme-button.component';
import {LocationModule} from "./location/location.module";
import { CustomSnackbarComponent } from './snackbar/custom-snackbar.component';



@NgModule({
  declarations: [
    TopNavBarComponent,
    HomeButtonComponent,
    ToggleThemeButtonComponent,
    CustomSnackbarComponent
  ],
  exports: [
    TopNavBarComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFabButton,
    MatIconButton,
    MatIconAnchor,
    CommonModule,
    LocationModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButton,
  ]
})
export class CoreModule { }
