import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsDescriptionComponent } from './pet-details-description.component';

describe('PetDetailsDescriptionComponent', () => {
  let component: PetDetailsDescriptionComponent;
  let fixture: ComponentFixture<PetDetailsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetDetailsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
