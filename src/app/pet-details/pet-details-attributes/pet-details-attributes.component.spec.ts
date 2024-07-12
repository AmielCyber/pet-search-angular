import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetDetailsAttributesComponent} from './pet-details-attributes.component';
import {By} from "@angular/platform-browser";

describe('PetDetailsAttributesComponent', () => {
  let component: PetDetailsAttributesComponent;
  let fixture: ComponentFixture<PetDetailsAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsAttributesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetDetailsAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display age', () => {
    const expectedAge = "Adult";
    component.age = expectedAge;
    fixture.detectChanges();

    const pElems = fixture.debugElement.queryAll(By.css('p'));
    const ageElement = pElems.find(p => p.nativeElement.textContent.trim() === expectedAge);

    expect(ageElement).toBeTruthy();
  });
  it('should display size', () => {
    const expectedSize = "Large";
    component.size = expectedSize;
    fixture.detectChanges();

    const pElems = fixture.debugElement.queryAll(By.css('p'));
    const pElement = pElems.find(p => p.nativeElement.textContent.trim() === expectedSize);

    expect(pElement).toBeTruthy();
  });

  it('should display gender', () => {
    const expectedGender = "Female";
    component.gender = expectedGender;
    fixture.detectChanges();

    const pElems = fixture.debugElement.queryAll(By.css('p'));
    const pElement = pElems.find(p => p.nativeElement.textContent.trim() === expectedGender);

    expect(pElement).toBeTruthy();
  });
  it('should display status', () => {
    const expectedStatus = "Adoptable";
    component.status = expectedStatus;
    fixture.detectChanges();

    const pElems = fixture.debugElement.queryAll(By.css('p'));
    const pElement = pElems.find(p => p.nativeElement.textContent.trim() === expectedStatus);
    console.log(pElems)

    expect(pElement).toBeTruthy();
  });
});
