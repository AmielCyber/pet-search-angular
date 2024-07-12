import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetDetailsDescriptionComponent} from './pet-details-description.component';

describe('PetDetailsDescriptionComponent', () => {
  let component: PetDetailsDescriptionComponent;
  let fixture: ComponentFixture<PetDetailsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsDescriptionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetDetailsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have description as the header', () => {
    const header = fixture.nativeElement.querySelector('h4');
    expect(header.textContent).toContain("Description")
  });
  it('should display description from input', () => {
    const expectedDescription = "jfkdslaf;";
    component.description = expectedDescription;
    fixture.detectChanges();

    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain(expectedDescription);
  });
  it('should display link to PetFinder.com', () => {
    const expectedLinkText = "PetFinder.com";

    const anchorTag = fixture.nativeElement.querySelector('a');
    expect(anchorTag.textContent).toContain(expectedLinkText);
  });
  it('should have an anchor tag with input detailsUrl as ref', () => {
    const expectedUrl = "https://PetFinder.com";
    component.detailsUrl = expectedUrl;
    fixture.detectChanges();

    const anchorTag = fixture.nativeElement.querySelector('a');
    expect(anchorTag.getAttribute("href")).toContain(expectedUrl);
  });
});
