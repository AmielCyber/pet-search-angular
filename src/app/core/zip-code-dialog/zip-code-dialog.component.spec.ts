import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormFieldModule, MatHint} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

import {ZipCodeDialogComponent} from './zip-code-dialog.component';

function getRandomIntInclusive(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

function getRandomDigitString(length: number): string {
  let arr = new Array<string>(length);
  for (let i = 0; i < length; i++) {
    arr[i] = getRandomIntInclusive(0, 9).toString();
  }
  return arr.join("");
}

describe('ZipCodeDialogComponent', () => {
  let component: ZipCodeDialogComponent;
  let fixture: ComponentFixture<ZipCodeDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ZipCodeDialogComponent, string>>

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj<MatDialogRef<ZipCodeDialogComponent, string>>(["close"])
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
      declarations: [ZipCodeDialogComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ZipCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe("zipcodeForm", () => {
    let zipcodeControl: FormControl<string>;
    beforeEach(() => {
      zipcodeControl = component.zipcodeForm.controls.zipcode;
    })
    it("should be required", () => expect(zipcodeControl.valid).toBeFalse())
    it("should be non-nullable", () => {
      // @ts-ignore
      zipcodeControl.patchValue(null);
      fixture.detectChanges();
      expect(zipcodeControl.valid).toBeFalse();
    })
    it("should be invalid for values less than 5 digits", () => {
      for (let numOfDigits = 1; numOfDigits < 5; numOfDigits++) {
        const digits = getRandomDigitString(numOfDigits);
        zipcodeControl.patchValue(digits);
        expect(zipcodeControl.invalid).toBeTrue();
      }
    })
    it("should be invalid for values more than 5 digits", () => {
      const digits = getRandomDigitString(6);
      zipcodeControl.patchValue(digits)
      fixture.detectChanges();
      expect(zipcodeControl.invalid).toBeTrue();
    })
    it("should be valid for values that are 5 digits", () => {
      const digits = getRandomDigitString(5);
      zipcodeControl.patchValue(digits)
      fixture.detectChanges();
      expect(zipcodeControl.valid).toBeTrue();
    })
    it("should be invalid for values that contain non-integers", () => {
      let val = ["1", "2", "3", "4", "5"];
      val[getRandomIntInclusive(0, 4)] = "a";
      zipcodeControl.patchValue(val.join(""))
      fixture.detectChanges();
      expect(zipcodeControl.invalid).toBeTrue();
    })
  });
  describe("onSubmit()", () => {
    it('should call the dialogRef close method with entered zipcode', () => {
      const expectedZipcode = "11111";
      const zipcodeControl = component.zipcodeForm.controls.zipcode;
      zipcodeControl.patchValue(expectedZipcode);
      fixture.detectChanges();

      component.onSubmit();
      expect(mockDialogRef.close).toHaveBeenCalledOnceWith(expectedZipcode);
    });
    it('should call the dialogRef close method with undefined if zipcode is invalid', () => {
      const zipcodeControl = component.zipcodeForm.controls.zipcode;
      zipcodeControl.patchValue("12abc");
      fixture.detectChanges();

      component.onSubmit();
      expect(mockDialogRef.close).toHaveBeenCalledOnceWith(undefined);
    });
  });
  describe("template", () => {
    it('should have heading "new zip code"', () => {
      const h2Element: HTMLElement = fixture.nativeElement.querySelector('h2');
      expect(h2Element.textContent).toMatch(/new zip code/i);
    });
    it('should have heading "new zip code"', () => {
      const h2Element: HTMLElement = fixture.nativeElement.querySelector('h2');
      expect(h2Element.textContent).toMatch(/new zip code/i);
    });
    it('should have label "zip code"', () => {
      const labelElement: HTMLElement = fixture.nativeElement.querySelector('label');
      expect(labelElement.textContent).toMatch(/zip code/i);
    });
    it('should have hint "enter a 5 digit zip code"', () => {
      const matHintDirective: DebugElement = fixture.debugElement.query(By.directive(MatHint));
      expect(matHintDirective.nativeElement.textContent).toMatch(/enter a 5 digit zip code/i);
    });
    it('should have mat error with text "a valid 5 digit zip code"', () => {
      const zipcodeControl = component.zipcodeForm.controls.zipcode;
      zipcodeControl.markAsTouched()
      fixture.detectChanges()

      const matErrorDirective: DebugElement = fixture.debugElement.query(By.directive(MatError));
      expect(matErrorDirective).toBeTruthy();
      expect(matErrorDirective.nativeElement.textContent).toMatch(/valid 5 digit zip code/i);
    });
    it('form submit button should be disable if zipcode is invalid', () => {
      const zipcodeControl = component.zipcodeForm.controls.zipcode;
      zipcodeControl.patchValue("abcde");
      zipcodeControl.markAsTouched()
      fixture.detectChanges();

      const submitButtonElement = fixture.nativeElement.querySelector("button[type='submit']");
      expect(submitButtonElement.disabled).toBeTrue();
    })
    it('form submit button should be enable if zipcode is valid', () => {
      const zipcodeControl = component.zipcodeForm.controls.zipcode;
      zipcodeControl.patchValue("12345");
      zipcodeControl.markAsTouched()
      fixture.detectChanges();

      const submitButtonElement = fixture.nativeElement.querySelector("button[type='submit']");
      expect(submitButtonElement.disabled).toBeFalse();
    })
    it('form submit button should call onSubmit if form is valid', () => {
      const expectedZipcode = "12345";
      const zipcodeControl = component.zipcodeForm.controls.zipcode;
      zipcodeControl.patchValue(expectedZipcode);
      zipcodeControl.markAsTouched()
      fixture.detectChanges();
      const onSubmitSpy = spyOn(component, "onSubmit");
      const submitButtonElement = fixture.nativeElement.querySelector("button[type='submit']");
      submitButtonElement.click();

      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    })
    describe('input', () => {
      it('should have autocomplete for zipcodes', () => {
        const inputElement = fixture.nativeElement.querySelector('input');
        expect(inputElement.getAttribute("autocomplete")).toEqual("postal-code");
      });
      it('should have minimum length of 5', () => {
        const inputElement = fixture.nativeElement.querySelector('input');
        expect(inputElement.getAttribute("minlength")).toEqual("5");
      });
      it('should have maximum length of 5', () => {
        const inputElement = fixture.nativeElement.querySelector('input');
        expect(inputElement.getAttribute("maxlength")).toEqual("5");
      });
    });
  });
});
