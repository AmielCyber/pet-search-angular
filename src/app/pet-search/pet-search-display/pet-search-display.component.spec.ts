import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchDisplayComponent } from './pet-search-display.component';

describe('PetSearchDisplayComponent', () => {
  let component: PetSearchDisplayComponent;
  let fixture: ComponentFixture<PetSearchDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
