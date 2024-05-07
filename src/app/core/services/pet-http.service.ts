import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {environment} from "../../../environments/environment";
import {PetSearchParams} from "../../pet-search/models/pet-search-params.model";
import {PetList} from "../models/pet-list.model";
import {Pet} from "../models/pet.model";

@Injectable({
  providedIn: 'root'
})
export class PetHttpService {
  private readonly petsUrl = environment.petsUrl;

  constructor(private http: HttpClient) {
  }

  getPetList(petSearchParams: PetSearchParams): Observable<PetList> {
    const params = this.petSearchParamsToHttpParams(petSearchParams);
    return this.http.get<PetList>(this.petsUrl, {params});
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.petsUrl}/${id}`);
  }

  private petSearchParamsToHttpParams(petSearchParams: PetSearchParams): HttpParams {
    let params = new HttpParams();
    for (const [param, value] of Object.entries(petSearchParams)) {
      if (value)
        params = params.set(param, value);
    }
    return params;
  }
}
