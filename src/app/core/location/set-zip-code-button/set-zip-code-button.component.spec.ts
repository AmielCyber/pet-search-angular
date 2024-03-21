import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetZipCodeButtonComponent } from './set-zip-code-button.component';

describe('SetZipCodeButtonComponent', () => {
  let component: SetZipCodeButtonComponent;
  let fixture: ComponentFixture<SetZipCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetZipCodeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetZipCodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
