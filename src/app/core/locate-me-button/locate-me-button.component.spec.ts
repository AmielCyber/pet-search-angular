import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconTestingModule} from "@angular/material/icon/testing";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {By} from "@angular/platform-browser";

import {LocateMeButtonComponent} from './locate-me-button.component';

describe('LocateMeButtonComponent', () => {
  let component: LocateMeButtonComponent;
  let fixture: ComponentFixture<LocateMeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconTestingModule, MatIcon, MatIconButton],
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
  it('should be disabled when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeTrue();
  });
  it('should be disabled when locationData is undefined', () => {
    component.locationData = undefined;
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeTrue();
  });
  it('should have aria label "locate my zipcode"', () => {
    const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(buttonElement.getAttribute("aria-label")).toMatch(/locate my zipcode/i);
  });
  it('mat-icon should have the near_me icon name', () => {
    const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(matIconElement.attributes["data-mat-icon-name"]).toEqual("near_me");
  });
  it('should call output function when is clicked', () => {
    const outSpy = spyOn(component.locateBrowserLocation, "emit");
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('.mat-icon');
    buttonElement.click();
    expect(outSpy).toHaveBeenCalled();
  });
});
