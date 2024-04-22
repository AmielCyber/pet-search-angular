export interface SelectOptionData<T> {
  value: T;
  viewValue: string;
}

export interface SelectInputData<T> {
  labelName: string;
  defaultSelectedOption: SelectOptionData<T>;
  optionValues: SelectOptionData<T>[];
}
