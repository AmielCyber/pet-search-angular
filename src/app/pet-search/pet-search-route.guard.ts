import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

import {ROUTER_TOKENS} from "../app.routes";
import {PetSearchParamsService} from "./services/pet-search-params.service";
import {ErrorPageService} from "../shared/services/error-page.service";

export const petSearchRouteGuard: CanActivateFn = (route, state) => {
  const petSearchParamsService = inject(PetSearchParamsService);
  const router = inject(Router);
  const errorPageService = inject(ErrorPageService);


  const petTypePlural: string | null = route.paramMap.get("petTypePlural");
  const isValidPetType = petSearchParamsService.isValidPetType(petTypePlural);
  if (!isValidPetType) {
    errorPageService.setErrorMessage(`Pet type '${petTypePlural}' not supported.`);
    router.navigate([ROUTER_TOKENS.ERROR]);
  }

  return isValidPetType;
};
