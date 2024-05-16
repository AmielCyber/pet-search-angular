import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationButtonsComponent} from './location-buttons.component';
import {HttpRequestState} from "../models/http-request-state.model";
import {Location} from "../models/location.model";
import {LocationService} from "../services/location.service";
import {of} from "rxjs";
import {defaultLocation} from "../data/default-location.data";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

@Component({standalone: true, selector: "app-set-zip-code-button", template: ""})
class SetZipCodeButtonComponent {
}

@Component({standalone: true, selector: "app-locate-me-button", template: ""})
class LocateMeButtonComponent {
}

describe('LocationButtonsComponent', () => {
  let component: LocationButtonsComponent;
  let fixture: ComponentFixture<LocationButtonsComponent>;
  let locationServiceMock: jasmine.SpyObj<LocationService>;

  beforeEach(async () => {
    locationServiceMock = jasmine.createSpyObj<LocationService>(
      ["setLocationFromBrowserGeolocation", "setLocationFromZipcode"],
      {
        locationData$: of({isLoading: false, data: defaultLocation})
      }
    );
    await TestBed.configureTestingModule({
      imports: [SetZipCodeButtonComponent, LocateMeButtonComponent],
      declarations: [LocationButtonsComponent],
      providers: [
        {provide: LocationService, useValue: locationServiceMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LocationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setLocationFromBrowserGeolocation in onLocateBrowserLocation', () => {
    component.onLocateBrowserLocation();
    expect(locationServiceMock.setLocationFromBrowserGeolocation).toHaveBeenCalled();
  });
  it('should call setLocationFromZipcode in onSetNewZipcode', () => {
    const expectedZipcode = "92101";
    component.onSetNewZipcode(expectedZipcode);
    expect(locationServiceMock.setLocationFromZipcode).toHaveBeenCalled();
    expect(locationServiceMock.setLocationFromZipcode).toHaveBeenCalledOnceWith(expectedZipcode);
  });

});
