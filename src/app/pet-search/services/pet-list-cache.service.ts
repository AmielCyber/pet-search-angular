import {Injectable} from '@angular/core';

import {PetList} from "../../core/models/pet-list.model";

@Injectable({
  providedIn: 'root'
})
export class PetListCacheService {
  private readonly cache: Map<string, PetList>;
  private readonly MAX_SIZE = 30;

  constructor() {
    this.cache = new Map<string, PetList>();
  }

  getList(params: string): PetList | undefined {
    return this.cache.get(params);
  }

  addList(params: string, petList: PetList): void {
    if (this.cache.size >= this.MAX_SIZE) {
      this.clear()
    }
    this.cache.set(params, petList);
  }

  clear(): void {
    this.cache.clear();
  }
}
