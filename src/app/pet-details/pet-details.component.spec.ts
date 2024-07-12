import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetDetailsComponent} from './pet-details.component';
import {ActivatedRoute, Navigation, Router, RouterModule} from "@angular/router";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {PetDetailsService} from "../pet-search/services/pet-details.service";
import {LocationService} from "../core/services/location.service";
import {of} from "rxjs";
import {defaultLocation} from "../core/data/default-location.data";
import {Pet} from "../core/models/pet.model";
import {HttpRequestState} from "../core/models/http-request-state.model";

@Component({
  selector: 'dummy-component',
  template: `<h1>Pet Search</h1>`,
})
class DummyComponent {
}

describe('PetDetailsComponent', () => {
  let component: PetDetailsComponent;
  let fixture: ComponentFixture<PetDetailsComponent>;
  let petDetailsServiceMock: jasmine.SpyObj<PetDetailsService>;

  beforeEach(async () => {
    petDetailsServiceMock = jasmine.createSpyObj<PetDetailsService>(
      ["getPet"],
    )
    await TestBed.configureTestingModule({
      declarations: [PetDetailsComponent, DummyComponent],
      providers: [
        {provide: PetDetailsService, useValue: petDetailsServiceMock},
      ],
      imports: [
        RouterModule.forRoot([{path: "**", component: DummyComponent}])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  describe("when fromSearch is true", () => {
    it('should display back to search results button if navigation is fromSearch', () => {
      spyOn(Object, "hasOwn" ).and.returnValue(true);
      fixture = TestBed.createComponent(PetDetailsComponent);
      component = fixture.componentInstance;
      petDetailsServiceMock.getPet.and.returnValue(of(getPetHttpRequestState()));
      fixture.detectChanges();

      const buttonElem = fixture.nativeElement.querySelector("button");
      expect(buttonElem.textContent).toContain('BACK');
    });
  })

  describe("when fromSearch is false", () => {
    it('should not display back to search results', () => {
      fixture = TestBed.createComponent(PetDetailsComponent);
      component = fixture.componentInstance;
      petDetailsServiceMock.getPet.and.returnValue(of(getPetHttpRequestState()));
      fixture.detectChanges();

      const buttonElem = fixture.nativeElement.querySelector("button");
      expect(buttonElem).toBeNull();
    });
  })
  it('should display pet name', () => {
    fixture = TestBed.createComponent(PetDetailsComponent);
    component = fixture.componentInstance;
    petDetailsServiceMock.getPet.and.returnValue(of(getPetHttpRequestState()));
    const expectedName = getPetObject().name;
    fixture.detectChanges();

    const headingElem = fixture.nativeElement.querySelector("h2");
    expect(headingElem.textContent).toContain(expectedName);
  });
});

function getPetHttpRequestState(): HttpRequestState<Pet> {
  return {
    data: getPetObject(), isLoading: false
  }
}

function getPetObject(): Pet {
  return {
    age: "Adult",
    description: "",
    distance: 5,
    gender: "Female",
    id: 0,
    name: "name",
    photos: [],
    primaryPhotoCropped: null,
    size: "Medium",
    status: "",
    type: "Cat",
    url: ""

  };
}
