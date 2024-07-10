import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetSelectionCardComponent} from './pet-selection-card.component';
import {MatCardModule} from "@angular/material/card";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('PetSelectionCardComponent', () => {
  let component: PetSelectionCardComponent;
  let fixture: ComponentFixture<PetSelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSelectionCardComponent],
      imports: [MatCardModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the passed petTypePlural', () => {
    component.petTypePlural = "Dogs";
    fixture.detectChanges();

    const h3Elem: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3Elem.textContent).toContain("Dogs")
  });
});
