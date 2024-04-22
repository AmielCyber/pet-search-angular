import {defaultLocation} from "../../core/data/default-location.data";
import {PetSearchParams} from "../models/pet-search-params.model";
import {selectDistanceInput, selectSortInput} from "./select-filter.data";

export const defaultPetSearchParams: PetSearchParams = {
  type: "cats",
  location: defaultLocation.zipcode,
  page: "1",
  distance: selectDistanceInput.defaultSelectedOption.value.toString(),
  sort: selectSortInput.defaultSelectedOption.value,
}
Object.freeze(defaultPetSearchParams);
