import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ROUTER_TOKENS} from "../app.routes";

import {PetSearchParamsService} from "./services/pet-search-params.service";

export const petSearchRouteGuard: CanActivateFn = (route, state) => {
  const petSearchParamsService = inject(PetSearchParamsService);
  const router = inject(Router);

  const petTypePlural: string | null = route.paramMap.get("petTypePlural");
  const isValidPetType = petSearchParamsService.isValidPetType(petTypePlural);
  if (!isValidPetType) {
    // TODO: Reroute to error page.
    router.navigate([ROUTER_TOKENS.HOME])
    console.error(`Pet type: ${petTypePlural} not supported.`);
  }

  return isValidPetType;
};
