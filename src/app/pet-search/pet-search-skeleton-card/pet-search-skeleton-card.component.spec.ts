import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchSkeletonCardComponent } from './pet-search-skeleton-card.component';

describe('PetSearchSkeletonCardComponent', () => {
  let component: PetSearchSkeletonCardComponent;
  let fixture: ComponentFixture<PetSearchSkeletonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchSkeletonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSearchSkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
