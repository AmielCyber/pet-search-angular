import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {PetHttpService} from './pet-http.service';
import {Pet} from "../models/pet.model";
import {PetList} from "../models/pet-list.model";
import {PetSearchParams} from "../../pet-search/models/pet-search-params.model";

describe('PetHttpService', () => {
  let service: PetHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PetHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getPetList", () => {
    it("should call with the correct url", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: null,
        distance: null,
        sort: null,
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.method).toEqual("GET");
    })
    it("should call with 'type' parameter", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: null,
        distance: null,
        sort: null,
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.params).toMatch(`type=${petSearchParams.type}`)
    })
    it("should call with 'location' parameter", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: null,
        distance: null,
        sort: null,
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.params).toMatch(`location=${petSearchParams.location}`)
    })
    it("should call with 'page' parameter", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: "1",
        distance: null,
        sort: null,
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.params).toMatch(`page=${petSearchParams.page}`)
    })
    it("should call with 'distance' parameter", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: null,
        distance: "50",
        sort: null,
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.params).toMatch(`distance=${petSearchParams.distance}`)
    })
    it("should call with 'sort' parameter", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: null,
        distance: null,
        sort: "distance",
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.params).toMatch(`sort=${petSearchParams.sort}`)
    })
    it("should not contain params with null pet search parameters", () => {
      const expectedUrl = service["petsUrl"];
      const petSearchParams: PetSearchParams = {
        type: "Dog",
        location: "92101",
        page: null,
        distance: null,
        sort: null,
      }
      service.getPetList(petSearchParams).subscribe();
      const regex = new RegExp(expectedUrl, "g");
      const req = httpTestingController.expectOne(req => !!req.url.match(regex));
      req.flush(getExpectedPetListData());
      expect(req.request.params).not.toMatch("page")
      expect(req.request.params).not.toMatch("distance")
      expect(req.request.params).not.toMatch("sort")
    })
  })

  describe("getPetList", () => {
    it("should call with the correct url", () => {
      const petId = 0;
      const expectedUrl = service["petsUrl"] + "/" + petId;
      const expectedPetData = getExpectedPetData();

      service.getPet(petId).subscribe();
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(expectedPetData);
      expect(req.request.method).toBe("GET");
    })
    it("should return a pet object", () => {
      const petId = 0;
      const expectedUrl = service["petsUrl"] + "/" + petId;
      const expectedPetData = getExpectedPetData();

      service.getPet(petId)
        .subscribe(p => expect(p).toEqual(expectedPetData));
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(expectedPetData);
    })

  })
});

function getExpectedPetData(): Pet {
  return {
    age: "Adult",
    description: null,
    distance: null,
    gender: "Female",
    id: 0,
    name: "",
    photos: [],
    primaryPhotoCropped: null,
    size: "Medium",
    status: "",
    type: "Dog",
    url: ""
  }
}

function getExpectedPetListData(): PetList {
  return {
    pets: [],
    pagination: {
      pageSize: 0,
      totalCount: 0,
      currentPage: 0,
      totalPages: 0
    }
  }
}
