import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router"
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";

import {TopNavBarComponent} from './top-nav-bar/top-nav-bar.component';
import {HomeLinkComponent} from './home-link/home-link.component';
import {LocationButtonsComponent} from './location-buttons/location-buttons.component';
import {SetZipCodeButtonComponent} from './location-buttons/set-zip-code-button/set-zip-code-button.component';
import {LocateMeButtonComponent} from './locate-me-button/locate-me-button.component';
import {ZipCodeDialogComponent} from './zip-code-dialog/zip-code-dialog.component';
import {ToggleThemeButtonComponent} from './location-buttons/toggle-theme-button/toggle-theme-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    TopNavBarComponent,
    HomeLinkComponent,
    LocationButtonsComponent,
    SetZipCodeButtonComponent,
    LocateMeButtonComponent,
    ZipCodeDialogComponent,
    ToggleThemeButtonComponent,
    NotFoundComponent,
    ErrorPageComponent,
  ],
  exports: [
    TopNavBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
  ]
})
export class CoreModule {
}
