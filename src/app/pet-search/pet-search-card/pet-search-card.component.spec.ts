import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchCardComponent } from './pet-search-card.component';

describe('PetSearchCardComponent', () => {
  let component: PetSearchCardComponent;
  let fixture: ComponentFixture<PetSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
