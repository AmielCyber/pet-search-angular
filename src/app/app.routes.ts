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
  }

]
