import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIcon} from "@angular/material/icon";
import {By} from "@angular/platform-browser";
import {MatIconTestingModule} from "@angular/material/icon/testing";

import {PetIconComponent} from './pet-icon.component';
import {PetIconService} from "./pet-icon.service";
import {PetResource} from "./pet-resource.model";

describe('PetIconComponent', () => {
  let component: PetIconComponent;
  let fixture: ComponentFixture<PetIconComponent>;
  let mockPetIconService: jasmine.SpyObj<PetIconService>;

  beforeEach(async () => {
    mockPetIconService = jasmine.createSpyObj<PetIconService>(["getPetResource"]);
    await TestBed.configureTestingModule({
      imports: [MatIconTestingModule, MatIcon],
      declarations: [PetIconComponent],
      providers: [
        {provide: PetIconService, useValue: mockPetIconService}
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create pet resource', () => {
    const expectedPetResource: PetResource = {
      petType: "Dog",
      petTypePlural: "Dogs",
      iconName: "",
      resourceUrl: ""
    }
    mockPetIconService.getPetResource.and.returnValue(expectedPetResource);
    fixture.detectChanges();
    expect(component.petResource).toEqual(expectedPetResource)
  });
  it('should call PetIconService with argument Dog in input petType', () => {
    component.petType = "Dog"
    fixture.detectChanges();
    expect(mockPetIconService.getPetResource).toHaveBeenCalledOnceWith("Dog");
  });
  it('should call PetIconService with argument Cat in input petType', () => {
    component.petType = "Cat"
    fixture.detectChanges();
    expect(mockPetIconService.getPetResource).toHaveBeenCalledOnceWith("Cat");
  });
  it('mat-icon should have the resource icon name', () => {
    const petResource: PetResource = {
      petType: "Dog",
      petTypePlural: "Dogs",
      iconName: "expected-icon-name",
      resourceUrl: ""
    }
    mockPetIconService.getPetResource.and.returnValue(petResource);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('mat-icon'));
    expect(element.attributes["data-mat-icon-name"]).toEqual(petResource.iconName);
  });
});
