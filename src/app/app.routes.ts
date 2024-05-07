import {Routes} from "@angular/router";

import {NotFoundComponent} from "./core/not-found/not-found.component";
import {ErrorPageComponent} from "./core/error-page/error-page.component";

export enum ROUTER_TOKENS {
  HOME = "",
  SEARCH = "search",
  PETS = "pets",
  ERROR = "error",
  NOT_FOUND = "**",
}

export const ROUTES: Routes = [
  {
    path: ROUTER_TOKENS.HOME,
    title: "Home",
    loadChildren: () => import("./pet-selection/pet-selection.module").then(m => m.PetSelectionModule),
    pathMatch: "full"
  },
  {
    path: `${ROUTER_TOKENS.SEARCH}/:petTypePlural`,
    title: "Pet Search",
    loadChildren: () => import("./pet-search/pet-search.module").then(m => m.PetSearchModule),
  },
  {
    path: `${ROUTER_TOKENS.PETS}/:petId`,
    title: "Pet Details",
    loadChildren: () => import("./pet-details/pet-details.module").then(m => m.PetDetailsModule),
  },
  {
    path: `${ROUTER_TOKENS.ERROR}`,
    title: "Error",
    component: ErrorPageComponent
  },
  {
    path: `${ROUTER_TOKENS.NOT_FOUND}`,
    title: "Not Found",
    component: NotFoundComponent
  },
];
