import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";

import {PetSearchComponent} from './pet-search.component';
import {PetSearchHeaderComponent} from './pet-search-header/pet-search-header.component';
import {PetSearchFilterListComponent} from './pet-search-filter-list/pet-search-filter-list.component';
import {PetSearchFilterSelectComponent} from './pet-search-filter-select/pet-search-filter-select.component';


const PET_SEARCH_ROUTES: Routes = [
  {
    path: "",
    component: PetSearchComponent
  }
]

@NgModule({
  declarations: [
    PetSearchComponent,
    PetSearchHeaderComponent,
    PetSearchFilterListComponent,
    PetSearchFilterSelectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PET_SEARCH_ROUTES),
    MatSelectModule,
  ]
})
export class PetSearchModule {
}
