import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

import {PetSelectionComponent} from './pet-selection.component';
import {PetSelectionCardComponent} from './pet-selection-card/pet-selection-card.component';

const PET_SELECTION_ROUTES: Routes = [
  {
    path: "",
    component: PetSelectionComponent
  }
]

@NgModule({
  declarations: [
    PetSelectionComponent,
    PetSelectionCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PET_SELECTION_ROUTES),
    MatCard,
    MatIcon,
  ]
})
export class PetSelectionModule {
}