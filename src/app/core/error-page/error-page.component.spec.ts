import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Directive, Input} from "@angular/core";
import {By} from "@angular/platform-browser";

import {ErrorPageComponent} from './error-page.component';
import {ErrorPageService} from "../services/error-page.service";
import {ROUTER_TOKENS} from "../../app.routes";

@Directive({
  selector: '[routerLink]',
  host: {"(click)": 'onClick()'}
})
class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams?: string;
  navigateTo: string = '';

  onClick() {
    this.navigateTo = this.linkParams ?? "";
  }
}

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let mockErrorPageService: jasmine.SpyObj<ErrorPageService>;

  beforeEach(async () => {
    mockErrorPageService = jasmine.createSpyObj<ErrorPageService>(["getLastErrorMessage"]);
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent, RouterLinkDirectiveStub],
      providers: [
        {provide: ErrorPageService, useValue: mockErrorPageService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should set correct error message from errorPageService', () => {
    const expectedErrorMessage = "test"
    mockErrorPageService.getLastErrorMessage.and.returnValue(expectedErrorMessage);
    fixture.detectChanges();

    expect(component.errorMessage).toEqual(expectedErrorMessage);
  })
  it('should set error header with "error has occurred"', () => {
    fixture.detectChanges();

    expect(component.errorHeader).toContain("error has occurred");
  })
  it('should display error header', () => {
    fixture.detectChanges();
    const headerElement = fixture.nativeElement.querySelector("h4") as HTMLElement;

    expect(headerElement.textContent).toContain("error has occurred");
  })
  it('should display error message', () => {
    const expectedErrorMessage = "test"
    mockErrorPageService.getLastErrorMessage.and.returnValue(expectedErrorMessage);
    fixture.detectChanges();
    const pElement = fixture.nativeElement.querySelector("p") as HTMLElement;

    expect(pElement.textContent).toContain(expectedErrorMessage);
  })
  it('should display link with "take me home"', () => {
    fixture.detectChanges();
    const aElement = fixture.nativeElement.querySelector("a") as HTMLElement;

    expect(aElement.textContent).toMatch(/take me home/i);
  })
  it('should direct to Home page when link is clicked', () => {
    fixture.detectChanges();
    const routerLinkElement = fixture.debugElement.query(By.directive(RouterLinkDirectiveStub))
    routerLinkElement.triggerEventHandler("click");

    const routerLink: RouterLinkDirectiveStub = routerLinkElement.injector.get(RouterLinkDirectiveStub);
    expect(routerLink.navigateTo).toBe(ROUTER_TOKENS.HOME)
  });
});
