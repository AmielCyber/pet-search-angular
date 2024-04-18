import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PetIconComponent} from "./pet-icon/pet-icon.component";
import {MatIcon} from "@angular/material/icon";



@NgModule({
  declarations: [
    PetIconComponent
  ],
  imports: [
    CommonModule,
    MatIcon
  ],
  exports: [
    PetIconComponent
  ]
})
export class SharedModule { }
