import { DistanceDescriptionPipe } from './distance-description.pipe';

describe('DistanceDescriptionPipe', () => {
  // Arrange
  let pipe: DistanceDescriptionPipe;
  beforeEach(() => {
    pipe = new DistanceDescriptionPipe();
  })

  it('create an instance', () => {
    // Act and Arrange
    expect(pipe).toBeTruthy();
  });
  describe("should return an empty string", () => {
    it("if value is null", () => {
      expect(pipe.transform(null)).toBe("");
    });
    it("if value is not a number", () => {
      expect(pipe.transform("not a number")).toBe("");
    });
  });
  it("should return miles if value is more than 1", () => {
    expect(pipe.transform("100")).toMatch(/miles/);
  });
  it("should return mile if value is 1", () => {
    expect(pipe.transform("1")).not.toMatch(/miles/);
  });
  it("should return mile if value is 0", () => {
    expect(pipe.transform("1")).not.toMatch(/miles/);
  });
});
