import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDetailsSnackbarComponent } from './problem-details-snackbar.component';

describe('ProblemDetailsSnackbarComponent', () => {
  let component: ProblemDetailsSnackbarComponent;
  let fixture: ComponentFixture<ProblemDetailsSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemDetailsSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblemDetailsSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
