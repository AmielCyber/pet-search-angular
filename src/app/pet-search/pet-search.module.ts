import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";

import {SharedModule} from "../shared/shared.module";
import {PetSearchComponent} from './pet-search.component';
import {petSearchRouteGuard} from "./pet-search-route.guard";
import {PetSearchHeaderComponent} from './pet-search-header/pet-search-header.component';
import {PetSearchFilterListComponent} from './pet-search-filter-list/pet-search-filter-list.component';
import {PetSearchFilterSelectComponent} from './pet-search-filter-select/pet-search-filter-select.component';
import {PetSearchDisplayComponent} from './pet-search-display/pet-search-display.component';
import {PetSearchListComponent} from './pet-search-list/pet-search-list.component';
import {PetSearchPaginationComponent} from './pet-search-pagination/pet-search-pagination.component';
import {PetSearchCardComponent} from './pet-search-card/pet-search-card.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { DistanceDescriptionPipe } from './pet-search-card/distance-description.pipe';

const PET_SEARCH_ROUTES: Routes = [
  {
    path: "",
    component: PetSearchComponent,
    canActivate: [petSearchRouteGuard]
  }
]

@NgModule({
  declarations: [
    PetSearchComponent,
    PetSearchHeaderComponent,
    PetSearchFilterListComponent,
    PetSearchFilterSelectComponent,
    PetSearchDisplayComponent,
    PetSearchListComponent,
    PetSearchPaginationComponent,
    PetSearchCardComponent,
    DistanceDescriptionPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PET_SEARCH_ROUTES),
    SharedModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class PetSearchModule {
}
