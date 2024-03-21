import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

import { LocateMeButtonComponent } from './locate-me-button/locate-me-button.component';
import { SetZipCodeButtonComponent } from './set-zip-code-button/set-zip-code-button.component';



@NgModule({
  declarations: [
    LocateMeButtonComponent,
    SetZipCodeButtonComponent
  ],
  exports: [
    LocateMeButtonComponent,
    SetZipCodeButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconButton,
    MatIcon,
    MatFabButton
  ]
})
export class LocationModule { }
