import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetIconComponent } from './pet-icon.component';

describe('PetIconComponent', () => {
  let component: PetIconComponent;
  let fixture: ComponentFixture<PetIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
