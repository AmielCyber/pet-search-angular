import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {ActivatedRoute, ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot} from '@angular/router';

import {petSearchRouteGuard} from './pet-search-route.guard';
import {ErrorPageService} from "../core/services/error-page.service";
import {PetSearchParamsService} from "./services/pet-search-params.service";
import {availablePetsMap} from "./data/available-pets.data";
import {ErrorPageComponent} from "../core/error-page/error-page.component";
import {ROUTER_TOKENS} from "../routes/router-tokens.model";

describe(petSearchRouteGuard.name, () => {
  const expectedPetTypePlural: string = Array.from(availablePetsMap)[0][0];
  describe("when petTypePlural is valid", () => {
    const paramMapMock = new Map<string, string>([["petTypePlural", expectedPetTypePlural]]);
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [ErrorPageService, Router, PetSearchParamsService,
          {
            provide: ActivatedRouteSnapshot,
            useValue: {
              paramMap: paramMapMock,
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {}
          }]
      })
    });
    it('should return true', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const guardResponse = TestBed.runInInjectionContext(() => {
        return petSearchRouteGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();

      expect(guardResponse).toBeTrue();
    }));
    it('should not call error page service', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const errorPageService = TestBed.inject(ErrorPageService);
      const errorPage = spyOn(errorPageService, "setErrorMessage").and.callThrough();
      TestBed.runInInjectionContext(() => {
        return petSearchRouteGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(errorPage).not.toHaveBeenCalled();
    }));
  })

  describe("when petId is invalid", () => {
    const paramMapMock = new Map<string, string>([["petTypePlural", "invalidPetTypePlural"]]);
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [ErrorPageService, Router, PetSearchParamsService,
          {
            provide: ActivatedRouteSnapshot,
            useValue: {
              paramMap: paramMapMock,
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {}
          },
          provideRouter(([{path: "**", component: ErrorPageComponent}]))
        ]
      })
    });
    it('should return false', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const guardResponse = TestBed.runInInjectionContext(() => {
        return petSearchRouteGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();

      expect(guardResponse).toBeFalse();
    }))
    it('should call error page service', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const errorPageService = TestBed.inject(ErrorPageService);
      const errorPage = spyOn(errorPageService, "setErrorMessage").and.callThrough();
      TestBed.runInInjectionContext(() => {
        return petSearchRouteGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(errorPage).toHaveBeenCalled();
    }));
    it('should navigate to error page', fakeAsync(() => {
      const activatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      const router = TestBed.inject(Router);
      TestBed.runInInjectionContext(() => {
        return petSearchRouteGuard(activatedRouteSnapshot, {} as RouterStateSnapshot);
      });
      flush();
      expect(router.url).toBe("/" + ROUTER_TOKENS.ERROR);
    }));
  })
})
