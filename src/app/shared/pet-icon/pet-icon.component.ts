import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {PetIconService} from "./pet-icon.service";
import {PetResource} from "../models/pet-resource.model";

@Component({
  selector: 'app-pet-icon',
  templateUrl: './pet-icon.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PetIconComponent implements OnInit {
  @Input({required: true}) petType!: "Dog" | "Cat";
  petResource?: PetResource;

  constructor(private petIconService: PetIconService) {
  }

  ngOnInit() {
    this.petResource = this.petIconService.getPetResource(this.petType ?? "Dog");
  }
}
