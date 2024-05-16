import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

import {SetZipCodeButtonComponent} from './set-zip-code-button.component';
import {defaultLocation} from "../../data/default-location.data";


describe('SetZipCodeButtonComponent', () => {
  let component: SetZipCodeButtonComponent;
  let fixture: ComponentFixture<SetZipCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFabButton,
        MatIcon,
        MatDialogModule
      ],
      declarations: [SetZipCodeButtonComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetZipCodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe("openZipcodeDialog", () => {
    it('should open the dialog', () => {
      const openDialogSpy = spyOn(component.dialog, "open").and.returnValue(
        // @ts-ignore
        {
          afterClosed: () => of("11111")
        }
      );
      component.openZipcodeDialog();
      expect(openDialogSpy).toHaveBeenCalled();
    });
    it('should emit zipcode from zipcode dialog component', fakeAsync(() => {
      const expectedZipcode = "11111"
      const openDialogSpy = spyOn(component.dialog, "open").and.returnValue(
        // @ts-ignore
        {
          afterClosed: () => of(expectedZipcode)
        }
      );
      const setNewZipCodeSpy = spyOn(component.setNewZipcode, "emit");
      component.openZipcodeDialog();
      flush()
      expect(setNewZipCodeSpy).toHaveBeenCalled();
    }));
    it('should not emit zipcode from zipcode dialog component if it returned undefined', fakeAsync(() => {
      spyOn(component.dialog, "open").and.returnValue(
        // @ts-ignore
        {
          afterClosed: () => of(undefined)
        }
      );
      const setNewZipCodeSpy = spyOn(component.setNewZipcode, "emit");
      component.openZipcodeDialog();
      flush()
      expect(setNewZipCodeSpy).not.toHaveBeenCalled();
    }));
  })
  it('should be disabled if isLoading is true', () => {
    component.locationData = {isLoading: true, data: defaultLocation};
    component.ngOnChanges();
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeTrue()
  });
  it('should be disabled if data is undefined', () => {
    component.locationData = {isLoading: false, data: undefined};
    component.ngOnChanges();
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeTrue()
  });
  it('should display zipcode', () => {
    const expectedZipcode = "11111";
    component.locationData = {
      isLoading: false, data: {
        zipcode: expectedZipcode,
        locationName: ""
      }
    };
    component.ngOnChanges();
    fixture.detectChanges();

    const buttonElem: HTMLElement = fixture.nativeElement.querySelector('button');
    console.log(buttonElem)
    expect(buttonElem.textContent).toContain(expectedZipcode)
  });
  it('mat-icon should have the location_on icon name', () => {
    const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(matIconElement.attributes["data-mat-icon-name"]).toEqual("location_on");
  });
});
