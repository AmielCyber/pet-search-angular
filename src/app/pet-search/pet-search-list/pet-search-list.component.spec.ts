import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchListComponent } from './pet-search-list.component';

describe('PetSearchListComponent', () => {
  let component: PetSearchListComponent;
  let fixture: ComponentFixture<PetSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSearchListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
