import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchFilterSelectComponent } from './pet-search-filter-select.component';

describe('PetSearchFilterSelectComponent', () => {
  let component: PetSearchFilterSelectComponent;
  let fixture: ComponentFixture<PetSearchFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchFilterSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSearchFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
