import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

import {PetSearchFilterSelectComponent} from "./pet-search-filter-select.component";
import {distanceOptions, selectSortInput, selectDistanceInput} from "../data/select-filter.data";

describe(PetSearchFilterSelectComponent.name, () => {
  let component: PetSearchFilterSelectComponent<any>;
  let fixture: ComponentFixture<PetSearchFilterSelectComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormField, MatSelect, MatOption, MatLabel, NoopAnimationsModule],
      declarations: [PetSearchFilterSelectComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetSearchFilterSelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should display label name', () => {
    component.selectInputData = selectDistanceInput;
    component.isLoading = false;
    component.selectedOption = distanceOptions[0];
    fixture.detectChanges();

    const labelDebugElement = fixture.debugElement.query(By.directive(MatLabel));

    expect(labelDebugElement.nativeElement.textContent).toBe(selectDistanceInput.labelName);
  });
  it('should have selection disabled when loading', () => {
    component.selectInputData = selectDistanceInput;
    component.isLoading = true;
    component.selectedOption = distanceOptions[0];
    fixture.detectChanges();

    const selectDebugElement = fixture.debugElement.query(By.directive(MatSelect));
    const selectNativeElement: HTMLElement = selectDebugElement.nativeElement;

    expect(selectNativeElement.getAttribute("aria-disabled")).toBe("true");
  })
  it('should display all option values', () => {
    component.selectInputData = selectSortInput;
    component.isLoading = false;
    fixture.detectChanges();

    const selectElement: HTMLElement = fixture.debugElement.query(By.directive(MatSelect)).nativeElement;
    selectElement.click();
    fixture.detectChanges()

    const optionDebugElements = fixture.debugElement.queryAll(By.directive(MatOption));

    expect(optionDebugElements.length).toBe(selectSortInput.optionValues.length);
  })
  it('should display all option view values', () => {
    component.selectInputData = selectSortInput;
    component.isLoading = false;
    fixture.detectChanges();

    const selectElement: HTMLElement = fixture.debugElement.query(By.directive(MatSelect)).nativeElement;
    selectElement.click();
    fixture.detectChanges()

    const optionDebugElements = fixture.debugElement.queryAll(By.directive(MatOption));
    for (const option of optionDebugElements) {
      expect(option.nativeElement.textContent).toBeTruthy();
    }
  })
});
