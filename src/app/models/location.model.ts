export interface Location {
  zipcode: string;
  locationName: string;
}

export const defaultLocation: Location = {
  zipcode: "92101",
  locationName: "San Diego, California 92101, United States"
}
