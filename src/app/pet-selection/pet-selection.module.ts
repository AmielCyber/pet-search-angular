import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";

import {PetSelectionComponent} from './pet-selection.component';
import {PetSelectionCardComponent} from './pet-selection-card/pet-selection-card.component';
import {SharedModule} from "../shared/shared.module";

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
    SharedModule,
    MatCardModule,
  ]
})
export class PetSelectionModule {
}
