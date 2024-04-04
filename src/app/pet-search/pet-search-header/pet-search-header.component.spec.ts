import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchHeaderComponent } from './pet-search-header.component';

describe('PetSearchHeaderComponent', () => {
  let component: PetSearchHeaderComponent;
  let fixture: ComponentFixture<PetSearchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
