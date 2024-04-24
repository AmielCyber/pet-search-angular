import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsImageComponent } from './pet-details-image.component';

describe('PetDetailsImageComponent', () => {
  let component: PetDetailsImageComponent;
  let fixture: ComponentFixture<PetDetailsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetDetailsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
