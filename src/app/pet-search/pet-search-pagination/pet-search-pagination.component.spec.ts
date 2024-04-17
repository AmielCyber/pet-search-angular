import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchPaginationComponent } from './pet-search-pagination.component';

describe('PetSearchPaginationComponent', () => {
  let component: PetSearchPaginationComponent;
  let fixture: ComponentFixture<PetSearchPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSearchPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
