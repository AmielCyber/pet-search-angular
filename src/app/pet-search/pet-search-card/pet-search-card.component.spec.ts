import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from "@angular/material/card";
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {Router, RouterModule} from "@angular/router";
import {By} from "@angular/platform-browser";

import {PetSearchCardComponent} from './pet-search-card.component';
import {PetDetailsService} from "../services/pet-details.service";
import {Pet} from "../../core/models/pet.model";
import {ROUTER_TOKENS} from "../../routes/router-tokens.model";
import {DistanceDescriptionPipe} from "./distance-description.pipe";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

@Component({
  selector: 'dummy-component',
  template: `<h1>Pet Details</h1>`,
})
class DummyComponent {
}


describe('PetSearchCardComponent', () => {
  let component: PetSearchCardComponent;
  let fixture: ComponentFixture<PetSearchCardComponent>;
  let petDetailsServiceMock: jasmine.SpyObj<PetDetailsService>;
  let harness;

  beforeEach(async () => {
    petDetailsServiceMock = jasmine.createSpyObj<PetDetailsService>(["setCachedPet"]);
    await TestBed.configureTestingModule({
      declarations: [PetSearchCardComponent, DistanceDescriptionPipe],
      imports: [MatCardModule,
        RouterModule.forRoot([{path: "**", component: DummyComponent}])
      ],
      providers: [
        {provide: PetDetailsService, useValue: petDetailsServiceMock},
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()

    fixture = TestBed.createComponent(PetSearchCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should contain link to pet details url', () => {
    component.pet = getPetWithPrimaryPhoto();
    const expectedPet = getPetWithPrimaryPhoto();
    const expectedLink = `/${ROUTER_TOKENS.PETS}/${expectedPet.id}`
    fixture.detectChanges();

    const linkElement: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.getAttribute('href')).toBe(expectedLink);
  });
  it('when link is clicked, router should be pet details url', async () => {
    component.pet = getPetWithPrimaryPhoto();
    const expectedPet = getPetWithPrimaryPhoto();
    const expectedLink = `/${ROUTER_TOKENS.PETS}/${expectedPet.id}`
    fixture.detectChanges();

    const linkElement: HTMLElement = fixture.nativeElement.querySelector('a');
    await linkElement.click();
    expect(TestBed.inject(Router).url).toEqual(expectedLink);
  });
  it("should display pet's image", () => {
    component.pet = getPetWithPrimaryPhoto();
    fixture.detectChanges();

    const imgElem: HTMLElement = fixture.nativeElement.querySelector('img');
    expect(imgElem).toBeTruthy();
  });
  it("pet image should pet name as have alternate description", () => {
    component.pet = getPetWithPrimaryPhoto();
    const expectedPet = getPetWithPrimaryPhoto();
    fixture.detectChanges();

    const imgElem: HTMLElement = fixture.nativeElement.querySelector('img');
    expect(imgElem.getAttribute("alt")).toContain(expectedPet.name)
  });
  it("should not display image if pet does not have a primary photo", () => {
    component.pet = getPetWithoutPrimaryPhoto();
    fixture.detectChanges();

    const imgElem: HTMLElement = fixture.nativeElement.querySelector('img');
    expect(imgElem).toBeNull();
  });
  it("should display pet-icon if pet does not have a primary photo", () => {
    component.pet = getPetWithoutPrimaryPhoto();
    fixture.detectChanges();

    const imgElem: DebugElement = fixture.debugElement.query(By.css(".mat-icon"));
    expect(imgElem).toBeTruthy();
  });
  it("display pet's name", () => {
    component.pet = getPetWithPrimaryPhoto();
    const expectedPet = getPetWithPrimaryPhoto();
    fixture.detectChanges();

    const heading: HTMLElement = fixture.nativeElement.querySelector('h6');
    expect(heading.textContent).toContain(expectedPet.name)
  });
  it("display pet's age", () => {
    component.pet = getPetWithPrimaryPhoto();
    const expectedPet = getPetWithPrimaryPhoto();
    fixture.detectChanges();

    const paragraph: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain(expectedPet.age)
  });
  it("display pet's gender", () => {
    component.pet = getPetWithPrimaryPhoto();
    const expectedPet = getPetWithPrimaryPhoto();
    fixture.detectChanges();

    const paragraph: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain(expectedPet.gender)
  });
});

function getPetWithPrimaryPhoto(): Pet {
  return {
    age: "Adult",
    description: "description",
    distance: 4,
    gender: "Unknown",
    id: 0,
    name: "Pet Name",
    photos: [],
    primaryPhotoCropped: {
      small: "/assets/meta/favicon-16x16.png",
      medium: "",
      large: "",
      full: "",
    },
    size: "Medium",
    status: "",
    type: "Cat",
    url: "/assets/meta/favicon-32x32.png"
  };
}

function getPetWithoutPrimaryPhoto(): Pet {
  return {
    age: "Adult",
    description: "description",
    distance: 4,
    gender: "Unknown",
    id: 0,
    name: "Pet Name",
    photos: [],
    primaryPhotoCropped: null,
    size: "Medium",
    status: "",
    type: "Cat",
    url: "/assets/meta/favicon-32x32.png"
  };
}
