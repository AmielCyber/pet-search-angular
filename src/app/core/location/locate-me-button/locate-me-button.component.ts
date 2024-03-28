import { Component } from '@angular/core';
import {Observable} from "rxjs";

import {LocationService} from "../location.service";

@Component({
  selector: 'app-locate-me-button',
  templateUrl: './locate-me-button.component.html',
})
export class LocateMeButtonComponent{

  isLoading$: Observable<boolean>;
  constructor(private locationService: LocationService) {
    this.isLoading$ = locationService.isLoading$;
  }

  onBrowserLocation(){
    this.locationService.setLocationFromBrowserGeolocation();
  }

}
