import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatToolbar} from "@angular/material/toolbar";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

import { TopNavBarComponent } from './top-nav-bar.component';
import {By} from "@angular/platform-browser";

@Component({standalone: true, selector: "app-home-link", template: ""})
class HomeLinkComponent {}
@Component({standalone: true, selector: "app-location-buttons", template: ""})
class LocationButtonsComponent {}
@Component({standalone: true, selector: "app-toggle-theme-button", template: ""})
class ToggleThemeButtonComponent {}

describe('TopNavBarComponent', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbar,
        HomeLinkComponent,
        LocationButtonsComponent,
        ToggleThemeButtonComponent
      ],
      declarations: [TopNavBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a navigation list', () => {
    const navElem = fixture.nativeElement.querySelector("nav");
    expect(navElem).toBeTruthy();
  });
  it('should have a menu list', () => {
    const menuElem = fixture.nativeElement.querySelector("menu");
    expect(menuElem).toBeTruthy();
  });
  it('should have HomeLink component child', () => {
    const homeLinkComponent = fixture.debugElement.query(By.directive(HomeLinkComponent))
    expect(homeLinkComponent).toBeTruthy();
  });
  it('should have location buttons component child', () => {
    const locationButtons = fixture.debugElement.query(By.directive(LocationButtonsComponent))
    expect(locationButtons).toBeTruthy();
  });
  it('should have ToggleThemeButton component child', () => {
    const toggleThemeButton = fixture.debugElement.query(By.directive(ToggleThemeButtonComponent))
    expect(toggleThemeButton).toBeTruthy();
  });
});
