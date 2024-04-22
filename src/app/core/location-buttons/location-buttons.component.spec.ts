import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationButtonsComponent } from './location-buttons.component';

describe('LocationButtonsComponent', () => {
  let component: LocationButtonsComponent;
  let fixture: ComponentFixture<LocationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
