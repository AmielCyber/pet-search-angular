import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Directive, Input} from "@angular/core";
import {By} from "@angular/platform-browser";

import {NotFoundComponent} from './not-found.component';
import {ROUTER_TOKENS} from "../../routes/router-tokens.model"

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

describe(NotFoundComponent.name, () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent, RouterLinkDirectiveStub]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have header with "page not found"', () => {
    const header4Elem: HTMLElement = fixture.nativeElement.querySelector('h4');
    expect(header4Elem.textContent).toMatch(/page not found/i);
  });
  it('should display "does not exists"', () => {
    const pElem: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pElem.textContent).toMatch(/does not exists/i);
  });
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
