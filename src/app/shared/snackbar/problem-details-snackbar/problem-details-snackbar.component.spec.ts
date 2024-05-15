import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {ProblemDetails} from "get-problem-details";

import {ProblemDetailsSnackbarComponent} from './problem-details-snackbar.component';

describe('ProblemDetailsSnackbarComponent', () => {
  let component: ProblemDetailsSnackbarComponent;
  let fixture: ComponentFixture<ProblemDetailsSnackbarComponent>;
  const expectedData: ProblemDetails = getProblemDetailsObject();
  let mockSnackBarData: ProblemDetails = getProblemDetailsObject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemDetailsSnackbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: mockSnackBarData}
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProblemDetailsSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the correct snackBarDataModel', () => {
    expect(component.snackBarDataModel).toEqual(expectedData);
  });
  it('should have the correct errorMessages', () => {
    const expectedErrorMessages = ["test1", "test2"];
    expect(component.errorMessages).toEqual(expectedErrorMessages);
  });
  it('should display correct snackbar title from problem details', () => {
    expect(fixture.nativeElement.querySelector("h4").textContent).toContain(expectedData.title);
  })
  it('should display correct snackbar detail from problem details', () => {
    const paragraphElements = fixture.nativeElement.querySelectorAll("p") as HTMLElement[];
    let hasDetail = false;
    paragraphElements.forEach(paragraphElement => {
      if (paragraphElement.textContent?.includes(expectedData?.detail as string)) {
        hasDetail = true;
      }
    })
    expect(hasDetail).toBeTrue();
  })
  it('should display correct snackbar errors from problem details', () => {
    const paragraphElements = fixture.nativeElement.querySelectorAll("p") as HTMLElement[];
    let hasErrors = false;
    paragraphElements.forEach(paragraphElement => {
      if (paragraphElement.textContent?.includes("test2")) {
        hasErrors = true;
      }
    })
    expect(hasErrors).toBeTrue();
  })
});

function getProblemDetailsObject(): ProblemDetails {
  return new ProblemDetails({
    title: 'Problem Details Test',
    status: 500,
    type: 'error',
    detail: "testError",
    traceId: "Test id",
    instanceId: "Test instanceId",
    errors: {
      test1: ["test1", "test2"]
    }
  });
}
