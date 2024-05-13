import {TestBed} from '@angular/core/testing';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProblemDetails} from "get-problem-details";

import {SnackbarService} from './snackbar.service';
import {SnackbarPanelClass, SnackbarType} from "./snackbar-data.model";

describe('SnackbarService', () => {
  let service: SnackbarService;
  let mockMatSnackBar: MatSnackBar;

  beforeEach(() => {
    mockMatSnackBar = jasmine.createSpyObj(["openFromComponent"])
    TestBed.configureTestingModule({
      providers: [
        {provide: MatSnackBar, useValue: mockMatSnackBar},
      ]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getSnackbarConfig", () => {

    describe("should have short duration", () => {
      it("if snack type is error", () => {
        const actualDuration = service.getSnackBarConfig(SnackbarType.error, "").duration;
        const expectedDuration = service["shortDuration"];
        expect(actualDuration).toBe(expectedDuration)
      })
      it("if snack type is success", () => {
        const actualDuration = service.getSnackBarConfig(SnackbarType.success, "").duration;
        const expectedDuration = service["shortDuration"];
        expect(actualDuration).toBe(expectedDuration)
      })
      it("if snack type is info", () => {
        const actualDuration = service.getSnackBarConfig(SnackbarType.success, "").duration;
        const expectedDuration = service["shortDuration"];
        expect(actualDuration).toBe(expectedDuration)
      })
    })
    describe("should have long duration", () => {
      it("if snack type is problem details", () => {
        const actualDuration = service.getSnackBarConfig(
          SnackbarType.problemDetails, "", new ProblemDetails(null)
        ).duration;
        const expectedDuration = service["longDuration"];
        expect(actualDuration).toBe(expectedDuration)
      })
    })
    describe("should have panel class", () => {
      it("snackbar-success when snack type is success", () => {
        const actualPanelClass = service.getSnackBarConfig(SnackbarType.success, "").panelClass
        expect(actualPanelClass).toBe(SnackbarPanelClass.success);
      })
      it("snackbar-info when snack type is info", () => {
        const actualPanelClass = service.getSnackBarConfig(SnackbarType.info, "").panelClass
        expect(actualPanelClass).toBe(SnackbarPanelClass.info);
      })
      it("snackbar-error when snack type is error", () => {
        const actualPanelClass = service.getSnackBarConfig(SnackbarType.error, "").panelClass
        expect(actualPanelClass).toBe(SnackbarPanelClass.error);
      })
      it("snackbar-error when snack type is problem details", () => {
        const actualPanelClass = service.getSnackBarConfig(SnackbarType.problemDetails, "", new ProblemDetails(null)).panelClass
        expect(actualPanelClass).toBe(SnackbarPanelClass.error);
      })
    })
    describe("should have data", () => {
      it("as problem details if snack type is problem details", () => {
        const actualData = service.getSnackBarConfig(SnackbarType.problemDetails, "", new ProblemDetails(null)).data;
        expect(actualData).toBeInstanceOf(ProblemDetails);
      })
      it("with message and type if snack type is error", () => {
        const actualData = service.getSnackBarConfig(SnackbarType.error, "").data;
        expect(actualData["message"]).not.toBe(undefined)
        expect(actualData["type"]).not.toBe(undefined)
      })
      it("with message and type if snack type is success", () => {
        const actualData = service.getSnackBarConfig(SnackbarType.success, "").data;
        expect(actualData["message"]).not.toBe(undefined)
        expect(actualData["type"]).not.toBe(undefined)
      })
      it("with message and type if snack type is info", () => {
        const actualData = service.getSnackBarConfig(SnackbarType.info, "").data;
        expect(actualData["message"]).not.toBe(undefined)
        expect(actualData["type"]).not.toBe(undefined)
      })
    })
  });
  it("problemDetails() should call getSnackBarConfig with problemDetails passed", () => {
    spyOn(service, "getSnackBarConfig");
    const problemDetails = new ProblemDetails(null)
    service.problemDetails(problemDetails);
    expect(service.getSnackBarConfig).toHaveBeenCalledOnceWith(SnackbarType.problemDetails, "", problemDetails)
  })
  it("success() should call getSnackBarConfig with the correct arguments", () => {
    spyOn(service, "getSnackBarConfig");
    service.success("")
    expect(service.getSnackBarConfig).toHaveBeenCalledOnceWith(SnackbarType.success, "")
  })
  it("error() should call getSnackBarConfig with the correct arguments", () => {
    spyOn(service, "getSnackBarConfig");
    service.error("")
    expect(service.getSnackBarConfig).toHaveBeenCalledOnceWith(SnackbarType.error, "")
  })
  it("info() should call getSnackBarConfig with the correct arguments", () => {
    spyOn(service, "getSnackBarConfig");
    service.info("")
    expect(service.getSnackBarConfig).toHaveBeenCalledOnceWith(SnackbarType.info, "")
  })
});
