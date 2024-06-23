import {PhotoSize} from "./photo-size.model";

export interface Pet {
  id: number;
  url: string;
  type: "Cat" | "Dog"; // May be changed later to support other pet type
  gender: "Male" | "Female" | "Unknown";
  age: "Baby" | "Young" | "Adult" | "Senior";
  size: "Small" | "Medium" | "Large" | "Xlarge";
  name: string;
  description: string | null;
  photos: PhotoSize[];
  primaryPhotoCropped: PhotoSize | null; // Null if photos is an empty array.
  status: string;
  distance: number | null;
}
