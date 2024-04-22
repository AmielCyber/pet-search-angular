import {Routes} from "@angular/router";

export enum ROUTER_TOKENS {
  HOME = "",
  SEARCH = "search",
  PETS = "pets"
}

export const ROUTES: Routes = [
  {
    path: ROUTER_TOKENS.HOME,
    loadChildren: () => import("./pet-selection/pet-selection.module").then(m => m.PetSelectionModule),
    pathMatch: "full"
  },
  {
    path: `${ROUTER_TOKENS.SEARCH}/:petTypePlural`,
    loadChildren: () => import("./pet-search/pet-search.module").then(m => m.PetSearchModule),
  },
  {
    path: `${ROUTER_TOKENS.PETS}/:petId`,
    loadChildren: () => import("./pet-details/pet-details.module").then(m => m.PetDetailsModule),
  }
];
