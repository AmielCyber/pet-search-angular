import {Routes} from "@angular/router";

export enum ROUTER_TOKENS {
  HOME = "",
  SEARCH = "search",
  PET = "pet"
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
  }

]