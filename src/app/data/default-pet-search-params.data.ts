import {defaultLocation} from "../models/location.model";
import {PetSearchParams} from "../models/pet-search-params.model";

import {selectDistanceInput, selectSortInput} from "./select-filter.data";

export const defaultPetSearchParams: PetSearchParams = {
  location: defaultLocation.zipcode,
  page: "1",
  distance: selectDistanceInput.defaultSelectedOption.value.toString(),
  sort: selectSortInput.defaultSelectedOption.value,
}
Object.freeze(defaultPetSearchParams);
