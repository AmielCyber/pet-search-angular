import {defaultLocation} from "../core/data/default-location.data";
import {PetSelectionComponent} from './pet-selection.component';
import {LocationService} from "../core/services/location.service";

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from "rxjs";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'dummy-component',
  template: `<h1>Pet Search</h1>`,
})
class DummyComponent {
}

describe('PetSelectionComponent', () => {
  let component: PetSelectionComponent;
  let fixture: ComponentFixture<PetSelectionComponent>;
  let locationServiceMock: jasmine.SpyObj<LocationService>;

  beforeEach(async () => {
    locationServiceMock = jasmine.createSpyObj<LocationService>(
      ["setLocationFromBrowserGeolocation", "setLocationFromZipcode"],
      {
        locationData$: of({isLoading: false, data: defaultLocation})
      }
    );

    await TestBed.configureTestingModule({
      declarations: [PetSelectionComponent, DummyComponent],
      providers: [
        {provide: LocationService, useValue: locationServiceMock},
      ],
      imports: [
        RouterModule.forRoot([{path: "**", component: DummyComponent}])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()


    fixture = TestBed.createComponent(PetSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header with "Find"', () => {
    const spanElement: HTMLElement = fixture.nativeElement.querySelector("h2");
    expect(spanElement.textContent).toContain("Find");
  });
  it('should have all the links from petResourceList', () => {
    const aTags = fixture.debugElement.queryAll(By.css("a"))
    expect(aTags.length).toBe(component.petResourceList.length);
  });
});
