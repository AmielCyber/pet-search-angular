import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLinkComponent } from './home-link.component';
import {MatIconTestingModule} from "@angular/material/icon/testing";
import {MatIcon} from "@angular/material/icon";
import {Directive, Input} from "@angular/core";
import {By} from "@angular/platform-browser";

@Directive({
  selector: '[routerLink]',
  host: {"(click)": 'onClick()'}
})
class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: string[] = [];
  navigateTo: string = '';

  onClick() {
    this.linkParams.forEach(val => this.navigateTo += val);
  }
}
describe('HomeLinkComponent', () => {
  let component: HomeLinkComponent;
  let fixture: ComponentFixture<HomeLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconTestingModule, MatIcon],
      declarations: [HomeLinkComponent, RouterLinkDirectiveStub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display app name as "Pet Search"', () => {
    const spanElement: HTMLElement = fixture.nativeElement.querySelector("span");
    expect(spanElement.textContent).toContain("Pet Search");
  });
  it('should direct to the correct link when link is clicked', () => {
    const expectedLinkDirect = "/test"
    component.homeLink = expectedLinkDirect;
    fixture.detectChanges();
    const routerLinkElement = fixture.debugElement.query(By.directive(RouterLinkDirectiveStub))
    routerLinkElement.triggerEventHandler("click");

    const routerLink: RouterLinkDirectiveStub = routerLinkElement.injector.get(RouterLinkDirectiveStub);
    expect(routerLink.navigateTo).toBe(expectedLinkDirect)
  });
});
