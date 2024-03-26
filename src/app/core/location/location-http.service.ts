import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

import {environment} from "../../../environments/environment.development";
import {catchError, Observable, throwError} from "rxjs";
import {Location} from "./location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationHttpService {
  private readonly locationCoordsUrl = environment.locationCoordsUrl;
  private readonly locationZipcodeUrl = environment.locationZipcodeUrl;

  constructor(private http: HttpClient) {
  }

  getLocationFromCoordinates(longitude: number, latitude: number): Observable<Location> {
    const params = new HttpParams()
      .set("longitude", longitude)
      .set("latitude", latitude);

    return this.http.get<Location>(this.locationCoordsUrl, {params})
      .pipe(
        catchError(this.handleHttpErrorFromCoordinates)
      );
  }

  getLocationFromZipcode(zipcode: string): Observable<Location> {
    return this.http.get<Location>(`${this.locationZipcodeUrl}/${zipcode}`)
      .pipe(
        catchError(this.handleHttpErrorFromZipcode)
      );
  }

  private handleHttpErrorFromCoordinates(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        return throwError(() => new Error("Invalid coordinates entered."))
      case 404:
        return throwError(() => new Error("Could not locate your given location."))
      default:
        return throwError(() => new Error("There was an error while locating you."))
    }
  }

  private handleHttpErrorFromZipcode(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        return throwError(() => new Error("Invalid zipcode entered."))
      case 404:
        return throwError(() => new Error("Zipcode does not exist."))
      default:
        return throwError(() => new Error("There was an error in validating your entered zipcode."))
    }
  }
}
