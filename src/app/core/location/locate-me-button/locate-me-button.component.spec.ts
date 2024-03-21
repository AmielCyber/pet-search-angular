import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateMeButtonComponent } from './locate-me-button.component';

describe('LocateMeButtonComponent', () => {
  let component: LocateMeButtonComponent;
  let fixture: ComponentFixture<LocateMeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocateMeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocateMeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
