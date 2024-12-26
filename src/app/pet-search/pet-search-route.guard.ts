import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";

import {ROUTER_TOKENS} from "../routes/router-tokens.model";
import {PetSearchParamsService} from "./services/pet-search-params.service";
import {ErrorPageService} from "../core/services/error-page.service";

export const petSearchRouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, _: RouterStateSnapshot): boolean => {
  const petSearchParamsService = inject(PetSearchParamsService);
  const router = inject(Router);
  const errorPageService = inject(ErrorPageService);


  const petTypePlural: string | null = route.paramMap.get("petTypePlural");
  const isValidPetType: boolean = petSearchParamsService.isValidPetType(petTypePlural);
  if (!isValidPetType) {
    errorPageService.setErrorMessage(`Pet type '${petTypePlural}' not supported.`);
    router.navigate([ROUTER_TOKENS.ERROR]).then(r => r);
  }

  return isValidPetType;
};
