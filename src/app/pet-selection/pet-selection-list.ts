import {PetSelection} from "./pet-selection.model";

const catSelection: PetSelection = {
  petType: "cat",
  petTypePlural: "cats",
  iconName: "cat-icon",
  resourceUrl: "assets/icons/cat-icon.svg"
}

const dogSelection: PetSelection = {
  petType: "dog",
  petTypePlural: "dogs",
  iconName: "dog-icon",
  resourceUrl: "assets/icons/dog-icon.svg"
}

export const petSelectionList: PetSelection[] = [
  catSelection,
  dogSelection
];

