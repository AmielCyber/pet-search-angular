import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {HttpRequestState} from "../models/http-request-state.model";
import {Location} from "../models/location.model";

@Component({
  selector: 'app-locate-me-button',
  templateUrl: './locate-me-button.component.html',
})
export class LocateMeButtonComponent implements OnChanges {
  @Input({required: true}) locationData?: HttpRequestState<Location>;
  @Output() locateBrowserLocation = new EventEmitter<void>();
  isLoading: boolean = this.locationData?.isLoading || !this.locationData?.data;

  ngOnChanges(): void {
    this.isLoading = this.locationData?.isLoading || !this.locationData?.data;
  }
}
