import {SelectInputData, SelectOptionData} from "../models/select-input.model";

export const sortOptions: SelectOptionData<string>[] = [
  {value: "distance", viewValue: "Nearest"},
  {value: "-distance", viewValue: "Furthest"},
  {value: "recent", viewValue: "Recent"},
  {value: "-recent", viewValue: "Recent Desc"},
];

const defaultSortOption = sortOptions[0];

export const selectSortInput: SelectInputData<string> = {
  labelName: "Sort By",
  defaultSelectedOption: defaultSortOption,
  optionValues: sortOptions
}

export const distanceOptions: SelectOptionData<string>[] = [
  {value: "5", viewValue: "5 miles"},
  {value: "10", viewValue: "10 miles"},
  {value: "25", viewValue: "25 miles"},
  {value: "50", viewValue: "50 miles"},
];

const defaultDistanceOption = distanceOptions[2];
export const selectDistanceInput: SelectInputData<string> = {
  labelName: "Distance",
  defaultSelectedOption: defaultDistanceOption,
  optionValues: distanceOptions
}
