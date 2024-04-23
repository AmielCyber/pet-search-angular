import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsAttributesComponent } from './pet-details-attributes.component';

describe('PetDetailsAttributesComponent', () => {
  let component: PetDetailsAttributesComponent;
  let fixture: ComponentFixture<PetDetailsAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsAttributesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetDetailsAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
