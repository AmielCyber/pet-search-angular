import { CanActivateFn } from '@angular/router';

export const petIdGuard: CanActivateFn = (route, state): boolean => {
  const petId = route.params["petId"];
  const idNumber = parseInt(petId);

  // TODO: Redirect to error page if petId isNaN
  return !isNaN(idNumber);
};
