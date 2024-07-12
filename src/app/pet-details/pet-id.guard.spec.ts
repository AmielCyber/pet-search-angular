import {petIdGuard} from './pet-id.guard';
import {ErrorPageService} from "../core/services/error-page.service";
import {ErrorPageComponent} from "../core/error-page/error-page.component";
import {ROUTER_TOKENS} from "../routes/router-tokens.model";

import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter, Router, RouterStateSnapshot,
} from '@angular/router';

describe('petIdGuard', () => {
  describe("when petId is valid", () => {
    let expectedPetId = "5";
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [ErrorPageService, Router,
          {
            provide: ActivatedRouteSnapshot,
            useValue: {
              params: {
                petId: expectedPetId
              }
            }
          }]
      })
    });
    it('should return true', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const guardResponse = TestBed.runInInjectionContext(() => {
        return petIdGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();

      expect(guardResponse).toBeTrue();
    }));
    it('should not call error page service', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const errorPageService = TestBed.inject(ErrorPageService);
      const errorPage = spyOn(errorPageService, "setErrorMessage").and.callThrough();
      TestBed.runInInjectionContext(() => {
        return petIdGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(errorPage).not.toHaveBeenCalled();
    }));
  })
  describe("when petId is invalid", () => {
    let paramsObj = {
      petId: "error"
    }
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          ErrorPageService, Router,
          {
            provide: ActivatedRouteSnapshot,
            useValue: {
              params: paramsObj,
            }
          },
          provideRouter(([{path: "**", component: ErrorPageComponent}]))
        ]
      })
    });
    it('should return false', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const guardResponse = TestBed.runInInjectionContext(() => {
        return petIdGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(guardResponse).toBeFalse();
    }))
    it('should call error page service', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const errorPageService = TestBed.inject(ErrorPageService);
      const errorPage = spyOn(errorPageService, "setErrorMessage").and.callThrough();
      TestBed.runInInjectionContext(() => {
        return petIdGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(errorPage).toHaveBeenCalled();
    }));
    it('should navigate to error page', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const router = TestBed.inject(Router);
      TestBed.runInInjectionContext(() => {
        return petIdGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(router.url).toBe("/" + ROUTER_TOKENS.ERROR);
    }));
  });
});
