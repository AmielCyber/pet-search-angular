import {Component, Input, OnInit} from '@angular/core';
import {PetList} from "../../core/models/pet-list.model";

@Component({
  selector: 'app-pet-search-list',
  templateUrl: './pet-search-list.component.html',
  styleUrl: './pet-search-list.component.sass',

})
export class PetSearchListComponent implements OnInit {
  @Input({required: true}) petList?: PetList;
  @Input({required: true}) isLoading?: boolean;
  @Input() pageSize: number = 20;
  protected iterable: Array<undefined> = [];

  ngOnInit(): void {
    this.iterable = new Array(this.pageSize);
  }
}
