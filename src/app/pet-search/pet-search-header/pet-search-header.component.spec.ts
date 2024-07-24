import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetSearchHeaderComponent} from './pet-search-header.component';
import {LocationService} from "../../core/services/location.service";
import {Location} from "../../core/models/location.model";
import {Observable, of} from "rxjs";
import {HttpRequestState} from "../../core/models/http-request-state.model";
import {defaultLocation} from "../../core/data/default-location.data";

describe('PetSearchHeaderComponent', () => {
  let component: PetSearchHeaderComponent;
  let fixture: ComponentFixture<PetSearchHeaderComponent>;
  let locationServiceMock: jasmine.SpyObj<LocationService>;

  beforeEach(async () => {
    locationServiceMock = jasmine.createSpyObj<LocationService>("locationService", {}, ["locationData$"]);
    await TestBed.configureTestingModule({
      declarations: [PetSearchHeaderComponent],
      providers: [
        {provide: LocationService, useValue: locationServiceMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetSearchHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return the location data name when zipcode is the same as location data', () => {
    const expectedLocationString = defaultLocation.locationName;
    component.zipcode = defaultLocation.zipcode;
    fixture.detectChanges();

    expect(component.getLocationDetail({isLoading: false, data: defaultLocation}))
      .toBe(expectedLocationString);
  });
  it('should return the zipcode input when zipcode is not the same as the location data', () => {
    const expectedZipcode = "90000";
    component.zipcode = expectedZipcode;
    fixture.detectChanges();

    expect(component.getLocationDetail({isLoading: false, data: defaultLocation}))
      .toBe(expectedZipcode);
  });

  it('should display the type of pet in header.', () => {
    const expectedPetType = "Dogs";
    component.petTypePlural = expectedPetType;
    fixture.detectChanges();

    const h2Elem: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2Elem.textContent).toContain(expectedPetType);
  });

  it('should display the location name in the header.', () => {
    const expectedLocationString = defaultLocation.locationName;
    component.locationData$ = of({isLoading: false, data: defaultLocation});
    component.zipcode = defaultLocation.zipcode;
    fixture.detectChanges();

    const h3Elem: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3Elem.textContent).toContain(expectedLocationString);
  });
  it('should display the zipcode in the header.', () => {
    const expectedZipcode = "90000";
    component.zipcode = expectedZipcode;
    component.locationData$ = of({isLoading: false, data: defaultLocation});
    fixture.detectChanges();

    const h3Elem: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3Elem.textContent).toContain(expectedZipcode);
  });
});
