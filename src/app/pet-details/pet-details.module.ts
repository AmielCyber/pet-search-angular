import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";

import { PetDetailsComponent } from './pet-details.component';
import {petIdGuard} from "./pet-id.guard";
import { PetDetailsImageComponent } from './pet-details-image/pet-details-image.component';
import { PetDetailsAttributesComponent } from './pet-details-attributes/pet-details-attributes.component';
import { PetDetailsDescriptionComponent } from './pet-details-description/pet-details-description.component';

const PET_SEARCH_ROUTES: Routes = [
  {
    path: "",
    component: PetDetailsComponent,
    canActivate: [petIdGuard]
  }
]

@NgModule({
  declarations: [
    PetDetailsComponent,
    PetDetailsImageComponent,
    PetDetailsAttributesComponent,
    PetDetailsDescriptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PET_SEARCH_ROUTES),
    MatGridListModule,
    MatCardModule,
  ]
})
export class PetDetailsModule { }
