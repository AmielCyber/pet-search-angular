import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

import {ErrorPageService} from "../core/services/error-page.service";
import {ROUTER_TOKENS} from "../routes/router-tokens.model";

export const petIdGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  const router = inject(Router);
  const errorPageService = inject(ErrorPageService);

  const petId = route.params["petId"];
  const idNumber = parseInt(petId);

  if (Number.isNaN(idNumber)) {
    errorPageService.setErrorMessage(`Pet id: '${petId}' not supported.`);
    router.navigate([ROUTER_TOKENS.ERROR])
    return false;
  }
  return true;
};
