import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIcon} from "@angular/material/icon";
import {By} from "@angular/platform-browser";

import {ToggleThemeButtonComponent} from './toggle-theme-button.component';

describe('ToggleThemeButtonComponent', () => {
  let component: ToggleThemeButtonComponent;
  let fixture: ComponentFixture<ToggleThemeButtonComponent>;
  let mediaQuerySpy: jasmine.Spy;

  describe("when browser prefers dark color scheme", () => {
    beforeEach(async () => {
      mediaQuerySpy = spyOn(window, "matchMedia").and.returnValue(
        getMediaQueryListMock("test", true)
      );
      await TestBed.configureTestingModule({
        imports: [
          MatIcon
        ],
        declarations: [ToggleThemeButtonComponent]
      })
        .compileComponents();

      fixture = TestBed.createComponent(ToggleThemeButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('isDarkMode property should be true', () => {
      expect(component.isDarkMode).toBeTrue();
    });
    it('mat-icon should have fontIcon toggle "light_mode"', () => {
      const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
      expect(matIconElement.attributes["data-mat-icon-name"]).toEqual("light_mode");
    });
    it('and clicks button, then dark mode should be set to false', () => {
      const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
      buttonElement.click();
      fixture.detectChanges();
      expect(component.isDarkMode).toBeFalse();
    });
  });
  describe("when browser prefers light color scheme", () => {
    beforeEach(async () => {
      mediaQuerySpy = spyOn(window, "matchMedia").and.returnValue(
        getMediaQueryListMock("test", false)
      );
      await TestBed.configureTestingModule({
        imports: [
          MatIcon
        ],
        declarations: [ToggleThemeButtonComponent]
      })
        .compileComponents();

      fixture = TestBed.createComponent(ToggleThemeButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('isDarkMode property should be false', () => {
      expect(component.isDarkMode).toBeFalse();
    });
    it('mat-icon should have fontIcon toggle "dark_mode"', () => {
      const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
      expect(matIconElement.attributes["data-mat-icon-name"]).toEqual("dark_mode");
    });
    it('and clicks button, then dark mode should be set to true', () => {
      const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
      buttonElement.click();
      fixture.detectChanges();
      expect(component.isDarkMode).toBeTrue();
    });
  })
  describe("when browser does not prefer color scheme", () => {

    beforeEach(async () => {
      mediaQuerySpy = spyOn(window, "matchMedia").and.returnValue(
        getMediaQueryListMock("not all", false)
      );
      await TestBed.configureTestingModule({
        imports: [
          MatIcon
        ],
        declarations: [ToggleThemeButtonComponent]
      })
        .compileComponents();

      fixture = TestBed.createComponent(ToggleThemeButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it("should have dark mode by default", () => {
      expect(component.isDarkMode).toBeTrue();
    })
    it("should have aria label 'toggle color theme'", () => {
      const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.getAttribute("aria-label")).toMatch(/toggle color theme/i);
    })
  });
});

function getMediaQueryListMock(media: string, matches: boolean): MediaQueryList {
  return {
    media: media,
    matches: matches,
    onchange: null,
    addListener: function (callback: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null): void {
      throw new Error('Function not implemented.');
    },
    removeListener: function (callback: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null): void {
      throw new Error('Function not implemented.');
    },
    addEventListener: function <K extends 'change'>(type: K, listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any, options?: boolean | globalThis.AddEventListenerOptions | undefined): void {
      throw new Error('Function not implemented.');
    },
    removeEventListener: function <K extends 'change'>(type: K, listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any, options?: boolean | globalThis.EventListenerOptions | undefined): void {
      throw new Error('Function not implemented.');
    },
    dispatchEvent: function (event: globalThis.Event): boolean {
      throw new Error('Function not implemented.');
    }
  };
}
