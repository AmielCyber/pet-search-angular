import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {PetSearchParams} from "../models/pet-search-params.model";
import {PetList} from "../models/pet-list.model";
import {Pet} from "../models/pet.model";
import {Pagination} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class PetHttpService {
  private readonly petsUrl = environment.petsUrl;
  private readonly defaultPagination: Pagination = {
    currentPage: 0, pageSize: 0, totalCount: 0, totalPages: 0
  }

  constructor(private http: HttpClient) {
  }

  getPetList(petSearchParams: PetSearchParams): Observable<PetList> {
    const params = this.petSearchParamsToHttpParams(petSearchParams);
    return this.http.get<Pet[]>(this.petsUrl, {params, observe: "response"}).pipe(
      map(response => {
        const petList: Pet[] = response.body ?? [];
        let pagination: unknown = JSON.parse(response.headers.get("X-Pagination") ?? "null");
        if (pagination === null)
          pagination = this.defaultPagination;
        return ({
          pets: petList,
          pagination: pagination as Pagination
        })
      })
    );
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
