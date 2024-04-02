import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSelectionCardComponent } from './pet-selection-card.component';

describe('PetSelectionCardComponent', () => {
  let component: PetSelectionCardComponent;
  let fixture: ComponentFixture<PetSelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSelectionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
