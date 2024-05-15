import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomSnackbarComponent} from './custom-snackbar.component';
import {SnackbarData, SnackbarType} from "./snackbar-data.model";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";

describe('CustomSnackbarComponent', () => {
  let component: CustomSnackbarComponent;
  let fixture: ComponentFixture<CustomSnackbarComponent>;
  const mockSnackbarData: SnackbarData = {
    message: "test", type: SnackbarType.error
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSnackbarComponent],
      imports: [MatIconModule],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: mockSnackbarData}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display snackbar data model message', () => {
    const headerElement = fixture.nativeElement.querySelector("h4") as HTMLElement;
    expect(headerElement.textContent).toContain(mockSnackbarData.message)
  });
  it("should contain aria-label 'Success' when snackbar type is success", () => {
    component.snackBarDataModel = {
      message: "test", type: SnackbarType.success
    }
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('[aria-label="Success"]') as HTMLElement;
    expect(element).toBeTruthy();
  });
  it("should contain aria-label 'Error' when snackbar type is error", () => {
    component.snackBarDataModel = {
      message: "test", type: SnackbarType.error
    }
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('[aria-label="Error"]') as HTMLElement;
    expect(element).toBeTruthy();
  });
  it("should contain aria-label 'Info' when snackbar type is info", () => {
    component.snackBarDataModel = {
      message: "test", type: SnackbarType.info
    }
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('[aria-label="Info"]') as HTMLElement;
    expect(element).toBeTruthy();
  });
});
