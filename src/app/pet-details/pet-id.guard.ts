import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

import {ROUTER_TOKENS} from "../app.routes";
import {ErrorPageService} from "../shared/services/error-page.service";

export const petIdGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);
  const errorPageService = inject(ErrorPageService);

  const petId = route.params["petId"];
  const idNumber = parseInt(petId);

  if(Number.isNaN(idNumber)){
    errorPageService.setErrorMessage(`Pet id: '${petId}' not supported.`);
    router.navigate([ROUTER_TOKENS.ERROR])
    return false;
  }
  return true;
};
