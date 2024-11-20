import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchFilterListComponent } from './pet-search-filter-list.component';

// TODO: Test
describe('PetSearchFilterListComponent', () => {
  let component: PetSearchFilterListComponent;
  let fixture: ComponentFixture<PetSearchFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchFilterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSearchFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
