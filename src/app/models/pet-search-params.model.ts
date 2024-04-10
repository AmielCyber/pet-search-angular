import {defaultLocation} from "./location.model";
import {selectSortInput} from "../data/select-filter.data";

export interface PetSearchParams {
  location: string;
  page: string | null;
  distance: string | null;
  sort: string | null;
}

