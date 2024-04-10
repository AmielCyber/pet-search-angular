import {PhotoSize} from "./photo-size.model";

export interface Pet {
  id: number;
  url: string;
  type: "Cat" | "Dog"; // May be changed later to support other pet type
  gender: "Male" | "Female" | "Unknown";
  age: "Baby" | "Young" | "Adult" | "Senior";
  size: "small" | "medium" | "large" | "xlarge";
  name: string;
  description: string | null;
  photos: PhotoSize[];
  primary_photo_cropped: PhotoSize | null; // Null if photos is an empty array.
  status: string;
  distance: number | null;
}
