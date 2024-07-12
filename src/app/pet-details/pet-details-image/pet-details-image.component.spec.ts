import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetDetailsImageComponent} from './pet-details-image.component';
import {MatCardModule} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {PhotoSize} from "../../core/models/photo-size.model";

describe('PetDetailsImageComponent', () => {
  let component: PetDetailsImageComponent;
  let fixture: ComponentFixture<PetDetailsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsImageComponent],
      imports: [MatCardModule, MatIconModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetDetailsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty image when no image url array is passed', () => {
    const matIcon = fixture.debugElement.query(By.directive(MatIcon));
    expect(matIcon.nativeElement.getAttribute('aria-label')).toContain('Empty Image');
  });
  it('should not display empty image when a non empty image url array is passed', () => {
    component.photoUrl = getPhotoSizeArray();
    fixture.detectChanges();

    const matIcon = fixture.debugElement.query(By.directive(MatIcon));
    expect(matIcon.nativeElement.getAttribute('aria-label')).not.toContain('Empty Image');
  });
  it('should display image if photo array is greater than 1', () => {
    component.photoUrl = getPhotoSizeArray(1);
    fixture.detectChanges();

    const img: HTMLElement = fixture.nativeElement.querySelector("img");
    expect(img).toBeDefined();
  });
  it('should not display navigation menu if there is only one image', () => {
    component.photoUrl = getPhotoSizeArray(1);
    fixture.detectChanges();

    const menuElement: DebugElement = fixture.debugElement.query(By.css("menu"))
    expect(menuElement).toBeNull();
  });
  it('should have next image button if it has more than  image', () => {
    component.photoUrl = getPhotoSizeArray(2);
    fixture.detectChanges();

    const nextImageButton: HTMLElement = fixture.nativeElement.querySelector('button[aria-label="Next Image"]');
    expect(nextImageButton).toBeDefined();
  });
  it('should have previous image button if it has more than  image', () => {
    component.photoUrl = getPhotoSizeArray(2);
    fixture.detectChanges();

    const prevImageButton: HTMLElement = fixture.nativeElement.querySelector('button[aria-label="Previous Image"]');
    expect(prevImageButton).toBeDefined();
  });
  it('should have the same amount of navigation buttons as the photo size array', () => {
    const photoSizeArray = 5;
    component.photoUrl = getPhotoSizeArray(photoSizeArray);
    component.ngOnInit();
    fixture.detectChanges();

    const navButtons = fixture.debugElement.queryAll(By.css("button span"));
    expect(navButtons.length).toBe(photoSizeArray);
  });
  it('should go to the next image when next image button is clicked', () => {
    component.photoUrl = getPhotoSizeArray();
    component.ngOnInit();
    fixture.detectChanges();


    const nextImageButton: DebugElement = fixture.debugElement.query(By.css('button[aria-label="Next Image"]'));
    nextImageButton.triggerEventHandler("click");

    expect(component.imageIndex).toBe(1);
  });
  it('should go to the previous image when previous image button is clicked', () => {
    component.photoUrl = getPhotoSizeArray();
    component.imageIndex = 2;
    component.ngOnInit();
    fixture.detectChanges();


    const prevImageButton: DebugElement = fixture.debugElement.query(By.css('button[aria-label="Previous Image"]'));
    prevImageButton.triggerEventHandler("click");

    expect(component.imageIndex).toBe(1);
  });
  it('should navigate to the image click on the navigation dot button', () => {
    component.photoUrl = getPhotoSizeArray();
    component.ngOnInit();
    fixture.detectChanges();


    const navButtons: DebugElement[] = fixture.debugElement.queryAll(By.css('.nav-dot-color'));
    const lastButton = navButtons.pop();
    lastButton?.triggerEventHandler("click");

    expect(component.imageIndex).toBe(component.photoUrl.length - 1);
  });
});

function getPhotoSizeArray(size: number = 3): PhotoSize[] {
  const photoSizeArr = new Array<PhotoSize>(size);
  for (let i = 0; i < size; i++) {
    photoSizeArr[i] = getPhotoSize();
  }
  return photoSizeArr;
}

function getPhotoSize(): PhotoSize {
  return {
    small: "small",
    medium: "medium",
    large: "large",
    full: "/assets/meta/favicon-32x32.png",
  };
}

