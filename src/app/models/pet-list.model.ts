import {Pet} from "./pet.model";
import {Pagination} from "./pagination.model";

export interface PetList {
  pets: Pet[],
  pagination: Pagination
}
