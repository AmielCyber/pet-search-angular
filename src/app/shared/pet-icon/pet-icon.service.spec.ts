import {TestBed} from '@angular/core/testing';

import {PetIconService} from './pet-icon.service';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

describe('PetIconService', () => {
  let service: PetIconService;
  let mockIconRegistry: MatIconRegistry;
  let mockSanitizer: DomSanitizer;

  beforeEach(() => {
    mockIconRegistry = jasmine.createSpyObj(['addSvgIcon']);
    mockSanitizer = jasmine.createSpyObj(["bypassSecurityTrustResourceUrl"]);
    TestBed.configureTestingModule({
      providers: [
        {provide: MatIconRegistry, useValue: mockIconRegistry},
        {provide: DomSanitizer, useValue: mockSanitizer}
      ]
    });
    service = TestBed.inject(PetIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("icon registry should register pet icon resources", () => {
    const expectedCalls = service["petResourceList"].length;
    expect(mockIconRegistry.addSvgIcon).toHaveBeenCalledTimes(expectedCalls)
  })

  describe("getPetResource", () => {
    it("should return dog resource when argument is 'Dog'", () => {
      const expectedPet = service["dogResource"];
      expect(service.getPetResource("Dog")).toBe(expectedPet);
    })
    it("should return cat resource when argument is 'Cat'", () => {
      const expectedPet = service["catResource"];
      expect(service.getPetResource("Cat")).toBe(expectedPet);
    })
  })
  describe("getPetResourceList", () => {
    it("should have cat resource in list", () => {
      const hasCatResource = service.getPetResourceList().includes(service["catResource"]);
      expect(hasCatResource).toBeTrue();
    })
    it("should have dog resource in list", () => {
      const hasDogResource = service.getPetResourceList().includes(service["dogResource"]);
      expect(hasDogResource).toBeTrue();
    })
  })
});
