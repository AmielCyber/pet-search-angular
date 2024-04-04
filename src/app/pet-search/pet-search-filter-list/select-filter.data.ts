import {SelectInputData, SelectOptionData} from "./select-input.model";

const sortOptionValues: SelectOptionData<string>[] = [
  {value: "distance", viewValue: "Nearest"},
  {value: "-distance", viewValue: "Furthest"},
  {value: "recent", viewValue: "Recent"},
  {value: "-recent", viewValue: "Recent Desc"},
];

const defaultSortOption = sortOptionValues[0];

export const selectSortInput: SelectInputData<string> = {
  labelName: "Sort By",
  defaultSelectedOption: defaultSortOption,
  optionValues: sortOptionValues
}

const distanceOptionValues: SelectOptionData<number>[] = [
  {value: 5, viewValue: "5 miles"},
  {value: 10, viewValue: "10 miles"},
  {value: 25, viewValue: "25 miles"},
  {value: 50, viewValue: "50 miles"},
];

const defaultDistanceOption = distanceOptionValues[2];
export const selectDistanceInput: SelectInputData<number> = {
  labelName: "Distance",
  defaultSelectedOption: defaultDistanceOption,
  optionValues: distanceOptionValues
}
